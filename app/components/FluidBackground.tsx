"use client";

import { useEffect, useRef } from "react";

export function FluidBackground() {
  const initializedRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvas.dataset.fluidCanvas = "true";

    const existingScript = document.querySelector<HTMLScriptElement>("script[data-fluid-sim]");
    if (existingScript) {
      initializedRef.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = "/js/webgl-fluid-simulation.js";
    script.async = true;
    script.dataset.fluidSim = "true";

    script.addEventListener("load", () => {
      initializedRef.current = true;
    });

    document.body.appendChild(script);
  }, []);

  return <canvas ref={canvasRef} className="fluid-canvas" />;
}
