import { Bomb, PuzzlePiece, Scissors } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

const views = [
  { id: "assembled", label: "Assembled view", Icon: PuzzlePiece },
  { id: "cutaway", label: "Cutaway view", Icon: Scissors },
  { id: "exploded", label: "Exploded view", Icon: Bomb },
];

export function HeroCycloidalDrive() {
  const frame = useRef(null);
  const [activeView, setActiveView] = useState("assembled");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.origin === window.location.origin
        && event.source === frame.current?.contentWindow
        && event.data?.type === "sweep-drive:ready"
      ) {
        setIsReady(true);
      }
      if (
        event.origin === window.location.origin
        && event.source === frame.current?.contentWindow
        && event.data?.type === "sweep-drive:scroll"
      ) {
        window.scrollBy({
          left: Number(event.data.deltaX) || 0,
          top: Number(event.data.deltaY) || 0,
          behavior: "auto",
        });
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const sendView = (view) => {
    setActiveView(view);
    frame.current?.contentWindow?.postMessage(
      { type: "sweep-drive:set-view", view },
      window.location.origin,
    );
  };

  return (
    <div className={isReady ? "hero-model is-ready" : "hero-model"} aria-label="Interactive 26 to 1 cycloidal drive">
      <div className="hero-model-heading">
        <h2>Nema 17 26:1 Dual Cycloidal Actuator</h2>
        <p>Inspired by Sweep Dynamics</p>
      </div>
      <iframe
        ref={frame}
        className="hero-model-frame"
        src="/sweep-drive/index.html?embed&hero"
        title="Interactive 26 to 1 cycloidal drive model"
        loading="eager"
        onLoad={() => sendView(activeView)}
      />
      <div className="hero-model-controls" role="group" aria-label="Cycloidal drive view">
        {views.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className="hero-model-control"
            aria-label={label}
            aria-pressed={activeView === id}
            title={label}
            onClick={() => sendView(id)}
          >
            <Icon weight="light" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
