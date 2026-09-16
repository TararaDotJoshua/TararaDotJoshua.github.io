import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';
const canvas=document.querySelector('#viewer'), loading=document.querySelector('#loading');
try { await start(); } catch(error) { loading.hidden=false;loading.textContent='The 3D viewer could not load. Please reload using a WebGL-enabled browser.';console.error(error); }
async function start(){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,stencil:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.localClippingEnabled=true;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,1200);const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.enablePan=false;controls.enableZoom=false;controls.minDistance=75;controls.maxDistance=400;controls.maxPolarAngle=Math.PI*.85;
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xffffff,0x89947e,2));const key=new THREE.DirectionalLight(0xfff7e9,3);key.position.set(70,100,90);scene.add(key);const rim=new THREE.DirectionalLight(0xe8eeff,2);rim.position.set(-70,20,-70);scene.add(rim);
 const root=new THREE.Group();scene.add(root);
 const finishes={black:{color:0x111313,roughness:.48,metalness:.04},white:{color:0xe9e9e3,roughness:.36,metalness:.03},steel:{color:0xa9afb2,metalness:.9,roughness:.24},blue:{color:0x234cba,roughness:.33,metalness:.2},green:{color:0x224d24,roughness:.6,metalness:.1}};
 const edgeMaterialSettings={color:0x050606,transparent:true,opacity:.82,toneMapped:false};
 function addCadEdges(mesh,thresholdAngle=28){
  mesh.material.polygonOffset=true;mesh.material.polygonOffsetFactor=1;mesh.material.polygonOffsetUnits=1;
  const edges=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,thresholdAngle),new THREE.LineBasicMaterial(edgeMaterialSettings));
  edges.name=`${mesh.name} · CAD edges`;edges.renderOrder=2;mesh.add(edges);mesh.userData.edges=edges;
 }
 const [metaResponse,binaryResponse]=await Promise.all([fetch('./models/drive.json'),fetch('./models/drive.bin')]);if(!metaResponse.ok||!binaryResponse.ok)throw Error('Model request failed');const meta=await metaResponse.json(),buffer=await binaryResponse.arrayBuffer();
 const parts=[];const clip=new THREE.Plane(new THREE.Vector3(-.7,0,-.714),0);let sectionOrder=10;
 function addSectionCap(mesh){
  if(mesh.userData.sectionCap)return mesh.userData.sectionCap;
  const group=new THREE.Group();group.name=`${mesh.name} · section fill`;
  const stencilSettings={depthWrite:false,depthTest:false,colorWrite:false,stencilWrite:true,stencilFunc:THREE.AlwaysStencilFunc,stencilFail:THREE.KeepStencilOp,clippingPlanes:[clip]};
  const back=new THREE.Mesh(mesh.geometry,new THREE.MeshBasicMaterial({...stencilSettings,side:THREE.BackSide,stencilZFail:THREE.IncrementWrapStencilOp,stencilZPass:THREE.IncrementWrapStencilOp}));
  const front=new THREE.Mesh(mesh.geometry,new THREE.MeshBasicMaterial({...stencilSettings,side:THREE.FrontSide,stencilZFail:THREE.DecrementWrapStencilOp,stencilZPass:THREE.DecrementWrapStencilOp}));
  back.renderOrder=sectionOrder;front.renderOrder=sectionOrder;
  const capGeometry=new THREE.PlaneGeometry(180,180);capGeometry.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),clip.normal));capGeometry.translate(...clip.normal.clone().multiplyScalar(-clip.constant).toArray());
  const capMaterial=new THREE.MeshStandardMaterial({color:mesh.material.color,roughness:.62,metalness:.04,side:THREE.DoubleSide,stencilWrite:true,stencilRef:0,stencilFunc:THREE.NotEqualStencilFunc,stencilFail:THREE.ReplaceStencilOp,stencilZFail:THREE.ReplaceStencilOp,stencilZPass:THREE.ReplaceStencilOp,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  const cap=new THREE.Mesh(capGeometry,capMaterial);cap.name=`${mesh.name} · solid cut face`;cap.renderOrder=sectionOrder+1;
  group.add(back,front,cap);group.visible=false;mesh.add(group);mesh.userData.sectionCap=group;sectionOrder+=2;return group;
 }
 for(const part of meta.parts){const geometry=new THREE.BufferGeometry();for(const name of ['position','normal']){const a=part[name];geometry.setAttribute(name,new THREE.BufferAttribute(new Float32Array(buffer,a.offset,a.length),3));}geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(buffer,part.index.offset,part.index.length),1));
 // CAD uses negative Y upwards. Rotate the actual vertices to keep clipping in world space.
 geometry.translate(...part.correction);geometry.rotateX(Math.PI);geometry.translate(0,-6,0);geometry.computeBoundingSphere();
 const material=new THREE.MeshStandardMaterial({...finishes[part.finish],side:THREE.DoubleSide});const mesh=new THREE.Mesh(geometry,material);mesh.name=part.name;mesh.userData=part;addCadEdges(mesh);root.add(mesh);parts.push(mesh);}
 // The supplied STEP omits the outer barrel visible in the product reference.
 // Keep this inferred presentation part separate from the 168 imported meshes.
 const ring=new THREE.Shape();ring.absarc(0,0,30.8,0,Math.PI*2,false);const hole=new THREE.Path();hole.absarc(0,0,26.5,0,Math.PI*2,true);ring.holes.push(hole);
 const shellGeometry=new THREE.ExtrudeGeometry(ring,{depth:27,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.25,bevelThickness:.25,curveSegments:96});shellGeometry.rotateX(-Math.PI/2);shellGeometry.translate(0,-2,0);
 const shell=new THREE.Mesh(shellGeometry,new THREE.MeshStandardMaterial({...finishes.black,side:THREE.DoubleSide}));shell.name='Outer barrel · inferred from product reference';shell.userData={id:168,layer:3,finish:'black'};addCadEdges(shell,18);root.add(shell);parts.push(shell);
 let mode='assembled',explosion=0,desiredExplosion=0;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function reset(){camera.position.set(110,90,135);controls.target.set(0,-2,0);controls.update();}
 reset();
 function setMode(value){mode=value;shell.visible=value!=='exploded';desiredExplosion=value==='exploded'?1:0;for(const mesh of parts){const p=mesh.userData;const section=[115,128,142,168].includes(p.id)||p.finish==='blue'||(mesh.name==='Revolve1'&&mesh.geometry.boundingSphere.radius>20);const clippingPlanes=value==='cutaway'&&section?[clip]:[];mesh.material.clippingPlanes=clippingPlanes;mesh.material.needsUpdate=true;mesh.userData.edges.material.clippingPlanes=clippingPlanes;mesh.userData.edges.material.needsUpdate=true;if(section)addSectionCap(mesh).visible=value==='cutaway';}if(value==='exploded'){camera.position.set(155,125,190);controls.target.set(0,25,0);}else reset();}
 window.addEventListener('message',event=>{if(event.origin!==location.origin||event.data?.type!=='sweep-drive:set-view')return;if(['assembled','cutaway','exploded'].includes(event.data.view))setMode(event.data.view);});
 canvas.addEventListener('wheel',event=>{if(window.parent===window)return;event.preventDefault();const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;window.parent.postMessage({type:'sweep-drive:scroll',deltaX:event.deltaX*unit,deltaY:event.deltaY*unit},location.origin);},{passive:false});
 canvas.addEventListener('keydown',event=>{if(event.key==='Home'){reset();event.preventDefault();}});
 const resize=new ResizeObserver(()=>{const {width,height}=canvas.getBoundingClientRect();renderer.setSize(width,height,false);camera.aspect=width/height;camera.fov=camera.aspect<.8?44:34;camera.updateProjectionMatrix();});resize.observe(canvas);
 let visible=true;new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}).observe(canvas);
 loading.hidden=true;setMode('assembled');if(window.parent!==window)window.parent.postMessage({type:'sweep-drive:ready'},location.origin);let last=performance.now();
 renderer.setAnimationLoop(now=>{const delta=Math.min((now-last)/1000,.05);last=now;if(!visible||document.hidden)return;explosion=reduced?desiredExplosion:THREE.MathUtils.damp(explosion,desiredExplosion,8,delta);for(const mesh of parts)mesh.position.y=explosion*(mesh.userData.layer*12-12);controls.update(delta);renderer.render(scene,camera);});
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();loading.hidden=false;loading.textContent='Graphics context interrupted. Reload to restore the viewer.';});
}
