import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 delta = uv - uMouse;
    delta.x *= aspect;
    float influence = exp(-dot(delta, delta) * 4.2);
    float slowDrift = sin((uv.y * 1.55 + uTime * 0.035) * 3.14159) * 0.045;
    float cursorPull = delta.y * influence * 0.12;
    float field = uv.x + slowDrift + cursorPull;

    vec3 ember = vec3(0.98, 0.14, 0.015);
    vec3 red = vec3(0.52, 0.015, 0.035);
    vec3 magenta = vec3(0.62, 0.015, 0.45);
    vec3 violet = vec3(0.19, 0.015, 0.52);
    vec3 blue = vec3(0.015, 0.20, 0.98);

    vec3 color = mix(ember, red, smoothstep(0.02, 0.30, field));
    color = mix(color, magenta, smoothstep(0.25, 0.55, field));
    color = mix(color, violet, smoothstep(0.48, 0.72, field));
    color = mix(color, blue, smoothstep(0.66, 0.98, field));
    float darkValley = 1.0 - 0.62 * exp(-pow((field - 0.34) / 0.17, 2.0));
    color *= darkValley;
    color += vec3(0.055, 0.025, 0.085) * influence;
    float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.095;
    color += grain;
    color *= 0.96 - 0.08 * distance(uv, vec2(0.5));
    color = max(color, vec3(0.0392, 0.0392, 0.0431));
    gl_FragColor = vec4(color, 1.0);
  }
`;

function WavePlane() {
  const material = useRef();
  const targetMouse = useRef(new THREE.Vector2(0.72, 0.57));
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.72, 0.57) },
    uResolution: { value: new THREE.Vector2(1440, 1024) },
  }), []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      targetMouse.current.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uMouse.value.lerp(targetMouse.current, 0.045);
    material.current.uniforms.uResolution.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
}

export function GradientWave() {
  return <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={1} gl={{ antialias: false, powerPreference: "high-performance" }}><WavePlane /></Canvas>;
}
