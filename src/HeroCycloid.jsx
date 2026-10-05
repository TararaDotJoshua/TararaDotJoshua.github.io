import { motion, useScroll, useVelocity } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

// Generative line drawing of the 26:1 dual cycloidal stage behind the hero name.
// 27 ring pins, two 26-lobe discs 180° out of phase. Scroll velocity spins the input shaft faster.
const ease = [0.16, 1, 0.3, 1];
const PINS = 27;
const LOBES = PINS - 1;
const PIN_CIRCLE = 200;
const PIN_RADIUS = 9;
const ECCENTRICITY = 5;

function cycloidPath() {
  const steps = 1400;
  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    const psi = Math.atan2(Math.sin((1 - PINS) * t), PIN_CIRCLE / (ECCENTRICITY * PINS) - Math.cos((1 - PINS) * t));
    const x = PIN_CIRCLE * Math.cos(t) - PIN_RADIUS * Math.cos(t + psi) - ECCENTRICITY * Math.cos(PINS * t);
    const y = -PIN_CIRCLE * Math.sin(t) + PIN_RADIUS * Math.sin(t + psi) + ECCENTRICITY * Math.sin(PINS * t);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

export function HeroCycloid({ reduced }) {
  const svg = useRef(null);
  const discA = useRef(null);
  const discB = useRef(null);
  const profilePath = useMemo(() => cycloidPath(), []);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  useEffect(() => {
    if (reduced) return undefined;
    let frame;
    let last = performance.now();
    let input = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (svg.current) observer.observe(svg.current);
    const tick = (now) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      input += delta * (0.9 + Math.min(Math.abs(scrollVelocity.get()) / 220, 9));
      const output = (-input / LOBES) * (180 / Math.PI);
      const ex = Math.cos(input) * ECCENTRICITY;
      const ey = Math.sin(input) * ECCENTRICITY;
      discA.current?.setAttribute("transform", `translate(${ex} ${ey}) rotate(${output})`);
      discB.current?.setAttribute("transform", `translate(${-ex} ${-ey}) rotate(${output + 180 / LOBES})`);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reduced, scrollVelocity]);

  const pins = Array.from({ length: PINS }, (_, index) => {
    const angle = (index / PINS) * Math.PI * 2;
    return { x: Math.cos(angle) * PIN_CIRCLE, y: Math.sin(angle) * PIN_CIRCLE };
  });
  const bolts = Array.from({ length: 6 }, (_, index) => {
    const angle = (index / 6) * Math.PI * 2;
    return { x: Math.cos(angle) * 112, y: Math.sin(angle) * 112 };
  });

  return (
    <motion.svg
      ref={svg}
      className="hero-cycloid"
      viewBox="-260 -260 520 520"
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 0.94, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 2.2, ease }}
    >
      <circle className="cycloid-faint" r="238" />
      <circle className="cycloid-faint" r={PIN_CIRCLE} strokeDasharray="2 6" />
      {pins.map((pin, index) => <circle key={index} className="cycloid-pin" cx={pin.x} cy={pin.y} r={PIN_RADIUS} />)}
      <g ref={discB} className="cycloid-disc is-back">
        <path d={profilePath} />
      </g>
      <g ref={discA} className="cycloid-disc">
        <path d={profilePath} />
        {bolts.map((bolt, index) => <circle key={index} cx={bolt.x} cy={bolt.y} r={26} />)}
        <circle r="52" />
      </g>
      <circle r="34" className="cycloid-shaft" />
    </motion.svg>
  );
}
