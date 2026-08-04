"use client";

import { useEffect, useRef } from "react";
import type { Scene } from "@/lib/animation-spec/types";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { SceneEngine } from "./engine/sceneEngine";

interface VisualCanvasProps {
  scene: Scene;
}

/**
 * Owns the <canvas> element and the requestAnimationFrame loop. All drawing
 * logic lives in SceneEngine (engine/sceneEngine.ts) — this component only
 * wires DOM lifecycle (sizing, resize, clicks, rAF, theme) to it. The
 * canvas's own background comes from the `bg-core-bg` class, so it themes
 * via CSS like everything else; only what SceneEngine draws needs to be
 * told the theme explicitly (canvas can't read CSS variables).
 */
export function VisualCanvas({ scene }: VisualCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SceneEngine>(new SceneEngine());
  const { theme } = useTheme();

  useEffect(() => {
    engineRef.current.loadScene(scene);
  }, [scene]);

  useEffect(() => {
    engineRef.current.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const engine = engineRef.current;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      engine.setSize(rect.width, rect.height);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      engine.handleClick(event.clientX - rect.left, event.clientY - rect.top);
    };
    canvas.addEventListener("click", handleClick);

    let last = performance.now();
    let frameId = 0;
    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      engine.update(dt);
      engine.draw(ctx);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full cursor-default bg-core-bg" />;
}
