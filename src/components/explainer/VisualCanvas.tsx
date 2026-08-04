"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Scene, SceneNode } from "@/lib/animation-spec/types";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { SceneEngine } from "./engine/sceneEngine";
import { NodeDetailCard } from "./NodeDetailCard";

interface VisualCanvasProps {
  scene: Scene;
  selectedNode: SceneNode | null;
  onNodeSelect: (node: SceneNode | null) => void;
}

interface Viewport {
  scale: number;
  x: number;
  y: number;
}

interface PointerDrag {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  moved: boolean;
}

const MIN_ZOOM = 0.65;
const MAX_ZOOM = 2.5;
const DEFAULT_VIEWPORT: Viewport = { scale: 1, x: 0, y: 0 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Owns the <canvas> element and the requestAnimationFrame loop. All drawing
 * logic lives in SceneEngine (engine/sceneEngine.ts) — this component only
 * wires DOM lifecycle (sizing, resize, clicks, rAF, theme) to it. The
 * canvas's own background comes from the `bg-core-bg` class, so it themes
 * via CSS like everything else; only what SceneEngine draws needs to be
 * told the theme explicitly (canvas can't read CSS variables).
 */
export function VisualCanvas({ scene, selectedNode, onNodeSelect }: VisualCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SceneEngine>(new SceneEngine());
  const viewportRef = useRef<Viewport>(DEFAULT_VIEWPORT);
  const pointerRef = useRef<PointerDrag | null>(null);
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);
  const { theme } = useTheme();

  const updateViewport = useCallback((next: Viewport) => {
    viewportRef.current = next;
    setViewport(next);
  }, []);

  const resetViewport = useCallback(() => updateViewport(DEFAULT_VIEWPORT), [updateViewport]);

  const zoomAt = useCallback((focalX: number, focalY: number, requestedScale: number) => {
    const current = viewportRef.current;
    const scale = clamp(requestedScale, MIN_ZOOM, MAX_ZOOM);
    const ratio = scale / current.scale;

    updateViewport({
      scale,
      x: focalX - (focalX - current.x) * ratio,
      y: focalY - (focalY - current.y) * ratio,
    });
  }, [updateViewport]);

  const zoomFromCenter = useCallback((factor: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    zoomAt(rect.width / 2, rect.height / 2, viewportRef.current.scale * factor);
  }, [zoomAt]);

  useEffect(() => {
    engineRef.current.loadScene(scene);
    resetViewport();
  }, [scene, resetViewport]);

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

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const focalX = event.clientX - rect.left;
      const focalY = event.clientY - rect.top;
      zoomAt(focalX, focalY, viewportRef.current.scale * Math.exp(-event.deltaY * 0.001));
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      canvas.setPointerCapture(event.pointerId);
      pointerRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: viewportRef.current.x,
        originY: viewportRef.current.y,
        moved: false,
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const drag = pointerRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) drag.moved = true;
      if (!drag.moved) return;

      updateViewport({ scale: viewportRef.current.scale, x: drag.originX + deltaX, y: drag.originY + deltaY });
    };

    const handlePointerEnd = (event: PointerEvent) => {
      const drag = pointerRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      pointerRef.current = null;

      if (!drag.moved) {
        const rect = canvas.getBoundingClientRect();
        const current = viewportRef.current;
        const node = engine.handleClick(
          (event.clientX - rect.left - current.x) / current.scale,
          (event.clientY - rect.top - current.y) / current.scale,
        );
        onNodeSelect(node);
      }
    };

    const handlePointerCancel = (event: PointerEvent) => {
      if (pointerRef.current?.pointerId === event.pointerId) pointerRef.current = null;
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerEnd);
    canvas.addEventListener("pointercancel", handlePointerCancel);

    let last = performance.now();
    let frameId = 0;
    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      engine.update(dt);
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      const current = viewportRef.current;
      ctx.save();
      ctx.translate(current.x, current.y);
      ctx.scale(current.scale, current.scale);
      engine.draw(ctx, false);
      ctx.restore();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerEnd);
      canvas.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [onNodeSelect, updateViewport, zoomAt]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        aria-label="Diagrama interactivo: arrastra para mover y usa la rueda para acercar o alejar."
        className="block h-full w-full cursor-grab touch-none bg-core-bg active:cursor-grabbing"
      />
      {selectedNode ? <NodeDetailCard node={selectedNode} onClose={() => onNodeSelect(null)} /> : null}
      <div className="absolute left-4 top-4 flex border border-core-border/[0.14] bg-core-panel font-mono text-xs text-core-text-secondary shadow-sm">
        <button
          type="button"
          onClick={() => zoomFromCenter(1 / 1.2)}
          className="px-3 py-2 transition-colors hover:bg-core-accent/10 hover:text-core-text"
          aria-label="Alejar diagrama"
        >
          −
        </button>
        <span className="flex min-w-14 items-center justify-center border-x border-core-border/[0.14] px-2 text-core-text" aria-live="polite">
          {Math.round(viewport.scale * 100)}%
        </span>
        <button
          type="button"
          onClick={() => zoomFromCenter(1.2)}
          className="px-3 py-2 transition-colors hover:bg-core-accent/10 hover:text-core-text"
          aria-label="Acercar diagrama"
        >
          +
        </button>
        <button
          type="button"
          onClick={resetViewport}
          className="border-l border-core-border/[0.14] px-3 py-2 transition-colors hover:bg-core-accent/10 hover:text-core-text"
        >
          Restablecer
        </button>
      </div>
      <p className="pointer-events-none absolute bottom-4 right-4 bg-core-panel/90 px-3 py-2 font-mono text-[0.65rem] text-core-text-muted">
        Arrastra para mover · rueda para zoom
      </p>
    </div>
  );
}
