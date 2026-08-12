"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { EdgeKind, NodeKind, Scene, SceneNode } from "@/lib/animation-spec/types";
import type {
  FailureScenario,
  GuidedScenarioStep,
  TechnicalIntegrityDiagnostic,
  TechnicalIntegrityProfile,
  TechnicalSource,
  TargetArchitecture,
} from "@/content/types";
import { evaluateTopologyIntegrity } from "@/lib/technical-integrity/evaluateTopology";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { SceneEngine } from "./engine/sceneEngine";
import { FailureScenarioPanel } from "./FailureScenarioPanel";
import { DiagramLegend } from "./DiagramLegend";
import { NodeDetailCard } from "./NodeDetailCard";
import { TechnicalIntegrityPanel } from "./TechnicalIntegrityPanel";
import type { AudienceMode } from "./AudienceModeToggle";
import { CanvasViewControls } from "./CanvasViewControls";
import { SceneAssuranceBadge } from "./SceneAssuranceBadge";

interface VisualCanvasProps {
  scene: Scene;
  sceneId: string;
  explainerSlug: string;
  targetArchitecture?: TargetArchitecture;
  audienceMode: AudienceMode;
  selectedNode: SceneNode | null;
  onNodeSelect: (node: SceneNode | null) => void;
  failureScenarios?: FailureScenario[];
  activeFailureScenarioId?: string | null;
  onFailureScenarioChange?: (scenarioId: string | null) => void;
  guidedSteps?: GuidedScenarioStep[];
  activeGuidedStepIndex?: number;
  onGuidedStepChange?: (index: number) => void;
  technicalSources?: TechnicalSource[];
  technicalIntegrity?: TechnicalIntegrityProfile;
  selectedDecisionOptionId?: string | null;
  onDecisionOptionChange?: (optionId: string | null) => void;
  guidedFocusNodeIds?: string[];
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
const NOOP_SCENARIO_CHANGE = () => {};
const NOOP_GUIDED_STEP_CHANGE = () => {};
const NOOP_DECISION_CHANGE = () => {};
const ALL_NODE_KINDS: NodeKind[] = ["control-plane", "compute", "storage", "network", "workload", "external"];
type InspectorTab = "integrity" | "layers" | "failures";

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
export function VisualCanvas({
  scene,
  sceneId,
  explainerSlug,
  targetArchitecture,
  audienceMode,
  selectedNode,
  onNodeSelect,
  failureScenarios = [],
  activeFailureScenarioId = null,
  onFailureScenarioChange = NOOP_SCENARIO_CHANGE,
  guidedSteps = [],
  activeGuidedStepIndex = 0,
  onGuidedStepChange = NOOP_GUIDED_STEP_CHANGE,
  technicalSources = [],
  technicalIntegrity,
  selectedDecisionOptionId = null,
  onDecisionOptionChange = NOOP_DECISION_CHANGE,
  guidedFocusNodeIds,
}: VisualCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SceneEngine>(new SceneEngine());
  const viewportRef = useRef<Viewport>(DEFAULT_VIEWPORT);
  const pointerRef = useRef<PointerDrag | null>(null);
  const viewportAnimationRef = useRef<number | null>(null);
  const preserveManualFailureRef = useRef(false);
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);
  const [activeNodeKinds, setActiveNodeKinds] = useState<Set<NodeKind>>(() => new Set(ALL_NODE_KINDS));
  const [activeEdgeKinds, setActiveEdgeKinds] = useState<Set<EdgeKind>>(() => new Set());
  const [selectedIntegrityDiagnosticId, setSelectedIntegrityDiagnosticId] = useState<string | null>(null);
  const [inactiveNodeIds, setInactiveNodeIds] = useState<string[]>([]);
  const [inspectorOpen, setInspectorOpen] = useState(audienceMode === "technical");
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>("integrity");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [, setClientToolsOpen] = useState(false);
  const [showInteractionHint, setShowInteractionHint] = useState(false);
  const reducedMotionRef = useRef(false);
  const { theme } = useTheme();
  const isTechnicalMode = audienceMode === "technical";
  const isGuidedMode = !isTechnicalMode;
  const edgeKinds = useMemo(
    () => Array.from(new Set(scene.edges.map((edge) => edge.kind))),
    [scene],
  );
  const integrityReport = useMemo(
    () => evaluateTopologyIntegrity(
      scene,
      technicalIntegrity?.scenes[sceneId],
      technicalIntegrity?.domain,
      technicalIntegrity?.assurance,
      inactiveNodeIds,
    ),
    [inactiveNodeIds, scene, sceneId, technicalIntegrity],
  );
  const selectedIntegrityDiagnostic = integrityReport?.diagnostics.find(
    (diagnostic) => diagnostic.id === selectedIntegrityDiagnosticId,
  ) ?? null;
  const hasIntegrityAlert = Boolean(
    integrityReport && (integrityReport.status !== "valid" || integrityReport.inactiveNodeIds.length > 0),
  );
  const showTechnicalTools = inspectorOpen;
  const guidedFocusIds = useMemo(
    () => guidedFocusNodeIds ?? guidedSteps[activeGuidedStepIndex]?.focusNodeIds ?? [],
    [activeGuidedStepIndex, guidedFocusNodeIds, guidedSteps],
  );

  useEffect(() => {
    setInspectorOpen(isTechnicalMode);
    if (!isTechnicalMode) setInspectorTab("layers");
  }, [isTechnicalMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
      setPrefersReducedMotion(mediaQuery.matches);
    };
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    try {
      setShowInteractionHint(window.localStorage.getItem("coresolutions:canvas-hint-dismissed") !== "1");
    } catch {
      setShowInteractionHint(true);
    }
  }, []);

  const dismissInteractionHint = useCallback(() => {
    setShowInteractionHint(false);
    try { window.localStorage.setItem("coresolutions:canvas-hint-dismissed", "1"); } catch { /* optional preference */ }
  }, []);
  const combinedFocusIds = useMemo(
    () => Array.from(new Set([...guidedFocusIds, ...(selectedIntegrityDiagnostic?.nodeIds ?? [])])),
    [guidedFocusIds, selectedIntegrityDiagnostic],
  );

  const updateViewport = useCallback((next: Viewport) => {
    viewportRef.current = next;
    setViewport(next);
  }, []);

  const animateViewportTo = useCallback((next: Viewport) => {
    if (viewportAnimationRef.current !== null) window.cancelAnimationFrame(viewportAnimationRef.current);
    if (reducedMotionRef.current) {
      updateViewport(next);
      return;
    }
    const origin = viewportRef.current;
    const started = performance.now();
    const duration = 520;
    const tick = (now: number) => {
      const progress = clamp((now - started) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      updateViewport({
        scale: origin.scale + (next.scale - origin.scale) * eased,
        x: origin.x + (next.x - origin.x) * eased,
        y: origin.y + (next.y - origin.y) * eased,
      });
      viewportAnimationRef.current = progress < 1 ? window.requestAnimationFrame(tick) : null;
    };
    viewportAnimationRef.current = window.requestAnimationFrame(tick);
  }, [updateViewport]);

  const resetViewport = useCallback(() => {
    if (viewportAnimationRef.current !== null) {
      window.cancelAnimationFrame(viewportAnimationRef.current);
      viewportAnimationRef.current = null;
    }
    updateViewport(DEFAULT_VIEWPORT);
  }, [updateViewport]);

  const zoomAt = useCallback((focalX: number, focalY: number, requestedScale: number) => {
    if (viewportAnimationRef.current !== null) {
      window.cancelAnimationFrame(viewportAnimationRef.current);
      viewportAnimationRef.current = null;
    }
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

  const fitToScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || scene.nodes.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 80 || rect.height < 80) return;
    const minX = Math.min(...scene.nodes.map((node) => node.x));
    const maxX = Math.max(...scene.nodes.map((node) => node.x));
    const minY = Math.min(...scene.nodes.map((node) => node.y));
    const maxY = Math.max(...scene.nodes.map((node) => node.y));
    const centerX = ((minX + maxX) / 2) * rect.width;
    const centerY = ((minY + maxY) / 2) * rect.height;
    const groupWidth = Math.max((maxX - minX) * rect.width, 240);
    const groupHeight = Math.max((maxY - minY) * rect.height, 160);
    const scale = clamp(Math.min(rect.width / (groupWidth + 180), rect.height / (groupHeight + 140)), 0.65, 1.35);
    animateViewportTo({
      scale,
      x: rect.width / 2 - centerX * scale,
      y: rect.height / 2 - centerY * scale,
    });
  }, [animateViewportTo, scene.nodes]);

  const focusOnNodes = useCallback((nodeIds: readonly string[]) => {
    const canvas = canvasRef.current;
    if (!canvas || nodeIds.length === 0) return;
    const targets = scene.nodes.filter((node) => nodeIds.includes(node.id));
    if (targets.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 80 || rect.height < 80) return;
    const minX = Math.min(...targets.map((node) => node.x));
    const maxX = Math.max(...targets.map((node) => node.x));
    const minY = Math.min(...targets.map((node) => node.y));
    const maxY = Math.max(...targets.map((node) => node.y));
    const centerX = ((minX + maxX) / 2) * rect.width;
    const centerY = ((minY + maxY) / 2) * rect.height;
    const groupWidth = Math.max((maxX - minX) * rect.width, 180);
    const groupHeight = Math.max((maxY - minY) * rect.height, 120);
    const scale = clamp(Math.min(rect.width / (groupWidth + 220), rect.height / (groupHeight + 180)), 0.9, 1.55);
    animateViewportTo({
      scale,
      x: rect.width / 2 - centerX * scale,
      y: rect.height / 2 - centerY * scale,
    });
  }, [animateViewportTo, scene.nodes]);

  const toggleNodeKind = useCallback((kind: NodeKind) => {
    setActiveNodeKinds((current) => {
      const next = new Set(current);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });
  }, []);

  const toggleEdgeKind = useCallback((kind: EdgeKind) => {
    setActiveEdgeKinds((current) => {
      const next = new Set(current);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });
  }, []);

  const resetVisibility = useCallback(() => {
    setActiveNodeKinds(new Set(ALL_NODE_KINDS));
    setActiveEdgeKinds(new Set(edgeKinds));
  }, [edgeKinds]);

  useEffect(() => {
    engineRef.current.loadScene(scene);
    preserveManualFailureRef.current = false;
    setActiveNodeKinds(new Set(ALL_NODE_KINDS));
    setActiveEdgeKinds(new Set(edgeKinds));
    resetViewport();
    setSelectedIntegrityDiagnosticId(null);
    setInactiveNodeIds([]);
  }, [edgeKinds, resetViewport, scene]);

  useEffect(() => {
    setClientToolsOpen(false);
  }, [audienceMode, sceneId]);

  useEffect(() => {
    if (isGuidedMode && (activeFailureScenarioId || hasIntegrityAlert)) setClientToolsOpen(true);
  }, [activeFailureScenarioId, hasIntegrityAlert, isGuidedMode]);

  useEffect(() => {
    const hiddenNodeKinds = new Set(ALL_NODE_KINDS.filter((kind) => !activeNodeKinds.has(kind)));
    const hiddenEdgeKinds = new Set(edgeKinds.filter((kind) => !activeEdgeKinds.has(kind)));
    engineRef.current.setVisibility(hiddenNodeKinds, hiddenEdgeKinds);
  }, [activeEdgeKinds, activeNodeKinds, edgeKinds]);

  useEffect(() => {
    if (preserveManualFailureRef.current) {
      preserveManualFailureRef.current = false;
      return;
    }
    const scenario = failureScenarios.find((item) => item.id === activeFailureScenarioId);
    engineRef.current.setFailureState(scenario?.deadNodeIds ?? []);
    setInactiveNodeIds(scenario?.deadNodeIds ?? []);
  }, [activeFailureScenarioId, failureScenarios]);

  useEffect(() => {
    engineRef.current.setFocusNodes(combinedFocusIds);
  }, [combinedFocusIds]);

  useEffect(() => {
    if (guidedFocusIds.length === 0 || isTechnicalMode) return;
    const frame = window.requestAnimationFrame(() => focusOnNodes(guidedFocusIds));
    return () => window.cancelAnimationFrame(frame);
  }, [focusOnNodes, guidedFocusIds, isTechnicalMode]);

  useEffect(() => {
    engineRef.current.setTheme(theme);
  }, [theme]);

  useEffect(() => () => {
    if (viewportAnimationRef.current !== null) window.cancelAnimationFrame(viewportAnimationRef.current);
  }, []);

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
      if (viewportAnimationRef.current !== null) {
        window.cancelAnimationFrame(viewportAnimationRef.current);
        viewportAnimationRef.current = null;
      }
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
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
      if (!drag || drag.pointerId !== event.pointerId) {
        const rect = canvas.getBoundingClientRect();
        const current = viewportRef.current;
        const node = engine.getNodeAt(
          (event.clientX - rect.left - current.x) / current.scale,
          (event.clientY - rect.top - current.y) / current.scale,
        );
        engine.setHoveredNode(node?.id ?? null);
        canvas.style.cursor = node ? "pointer" : "grab";
        return;
      }

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) drag.moved = true;
      if (!drag.moved) return;

      engine.setHoveredNode(null);
      canvas.style.cursor = "grabbing";
      updateViewport({ scale: viewportRef.current.scale, x: drag.originX + deltaX, y: drag.originY + deltaY });
    };

    const handlePointerEnd = (event: PointerEvent) => {
      const drag = pointerRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      pointerRef.current = null;
      const rect = canvas.getBoundingClientRect();
      const current = viewportRef.current;

      if (!drag.moved) {
        const node = engine.handleClick(
          (event.clientX - rect.left - current.x) / current.scale,
          (event.clientY - rect.top - current.y) / current.scale,
        );
        onNodeSelect(node);
        if (engine.didToggleFailure()) {
          preserveManualFailureRef.current = true;
          setInactiveNodeIds(engine.getDeadNodeIds());
          onFailureScenarioChange(null);
        }
      }

      const hoveredNode = engine.getNodeAt(
        (event.clientX - rect.left - current.x) / current.scale,
        (event.clientY - rect.top - current.y) / current.scale,
      );
      engine.setHoveredNode(hoveredNode?.id ?? null);
      canvas.style.cursor = hoveredNode ? "pointer" : "grab";
    };

    const handlePointerCancel = (event: PointerEvent) => {
      if (pointerRef.current?.pointerId === event.pointerId) pointerRef.current = null;
      engine.setHoveredNode(null);
      canvas.style.cursor = "grab";
    };

    const handlePointerLeave = () => {
      if (!pointerRef.current) {
        engine.setHoveredNode(null);
        canvas.style.cursor = "grab";
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomFromCenter(1.15);
      } else if (event.key === "-") {
        event.preventDefault();
        zoomFromCenter(1 / 1.15);
      } else if (event.key === "0") {
        event.preventDefault();
        resetViewport();
      } else if (event.key.toLowerCase() === "a") {
        event.preventDefault();
        fitToScene();
      }
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerEnd);
    canvas.addEventListener("pointercancel", handlePointerCancel);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("keydown", handleKeyDown);

    let last = performance.now();
    let frameId = 0;
    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      engine.update(reducedMotionRef.current || motionPaused ? 0 : dt);
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
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("keydown", handleKeyDown);
    };
  }, [fitToScene, motionPaused, onFailureScenarioChange, onNodeSelect, resetViewport, updateViewport, zoomAt, zoomFromCenter]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-describedby={`scene-description-${sceneId}`}
        tabIndex={0}
        aria-label="Diagrama interactivo: arrastra para mover, usa la rueda o las teclas más y menos para acercar o alejar, pulsa A para ajustar y cero para restablecer."
        className="block h-full w-full cursor-grab touch-none bg-core-bg active:cursor-grabbing"
      />
      <div id={`scene-description-${sceneId}`} className="sr-only">
        <p>La escena contiene {scene.nodes.length} componentes y {scene.edges.length} relaciones.</p>
        <ul>
          {scene.nodes.map((node) => <li key={node.id}>{node.name}{node.subtitle ? `: ${node.subtitle}` : ""}</li>)}
        </ul>
        <ul>
          {scene.edges.map((edge) => {
            const from = scene.nodes.find((node) => node.id === edge.from)?.name ?? edge.from;
            const to = scene.nodes.find((node) => node.id === edge.to)?.name ?? edge.to;
            return <li key={`${edge.from}-${edge.to}-${edge.kind}`}>{from} conecta con {to} mediante {edge.kind}.</li>;
          })}
        </ul>
        <p>Usa más y menos para zoom y cero para restablecer la vista.</p>
      </div>
      {prefersReducedMotion ? (
        <p className="sr-only" role="status">
          Animación pausada porque tu dispositivo prefiere reducir el movimiento. El diagrama sigue siendo interactivo.
        </p>
      ) : null}
      {selectedNode ? (
        <NodeDetailCard node={selectedNode} scene={scene} audienceMode={audienceMode} onClose={() => onNodeSelect(null)} />
      ) : null}
      {showTechnicalTools ? (
        <div className="absolute right-4 top-4 z-30 flex max-w-[calc(100%-2rem)] flex-wrap items-center gap-1 border border-core-border/[0.14] bg-core-panel/95 p-1.5 font-mono text-[0.58rem] shadow-sm backdrop-blur-sm" aria-label="Inspector técnico">
          <span className="px-2 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-core-accent">Inspeccionar</span>
          <button type="button" onClick={() => setInspectorTab("integrity")} aria-pressed={inspectorTab === "integrity"} className={`border px-2 py-1 transition-colors ${inspectorTab === "integrity" ? "border-core-accent/50 text-core-text" : "border-transparent text-core-text-muted hover:border-core-border/[0.18] hover:text-core-text"}`}>Integridad</button>
          <button type="button" onClick={() => setInspectorTab("layers")} aria-pressed={inspectorTab === "layers"} className={`border px-2 py-1 transition-colors ${inspectorTab === "layers" ? "border-core-accent/50 text-core-text" : "border-transparent text-core-text-muted hover:border-core-border/[0.18] hover:text-core-text"}`}>Capas</button>
          <button type="button" onClick={() => setInspectorTab("failures")} aria-pressed={inspectorTab === "failures"} className={`border px-2 py-1 transition-colors ${inspectorTab === "failures" ? "border-core-accent/50 text-core-text" : "border-transparent text-core-text-muted hover:border-core-border/[0.18] hover:text-core-text"}`}>Escenarios</button>
          <button type="button" onClick={() => setInspectorOpen(false)} className="border-l border-core-border/[0.14] px-2 py-1 text-core-text-muted hover:text-core-text" aria-label="Cerrar inspector técnico">×</button>
        </div>
      ) : null}
      {showTechnicalTools && inspectorTab === "integrity" && integrityReport ? (
        <TechnicalIntegrityPanel
          report={integrityReport}
          technicalSources={technicalSources}
          selectedDiagnosticId={selectedIntegrityDiagnosticId}
          onDiagnosticSelect={(diagnostic: TechnicalIntegrityDiagnostic | null) =>
            setSelectedIntegrityDiagnosticId(diagnostic?.id ?? null)
          }
        />
      ) : null}
      {showTechnicalTools && inspectorTab === "layers" ? (
        <DiagramLegend
          edgeKinds={edgeKinds}
          activeNodeKinds={activeNodeKinds}
          activeEdgeKinds={activeEdgeKinds}
          onToggleNodeKind={toggleNodeKind}
          onToggleEdgeKind={toggleEdgeKind}
          onReset={resetVisibility}
        />
      ) : null}
      {showTechnicalTools && inspectorTab === "failures" ? (
        <FailureScenarioPanel
          scene={scene}
          explainerSlug={explainerSlug}
          targetArchitecture={targetArchitecture}
          integrityReport={integrityReport}
          scenarios={failureScenarios}
          activeScenarioId={activeFailureScenarioId}
          onSelectScenario={onFailureScenarioChange}
          guidedSteps={guidedSteps}
          activeGuidedStepIndex={activeGuidedStepIndex}
          onGuidedStepChange={onGuidedStepChange}
          technicalSources={technicalSources}
          selectedDecisionOptionId={selectedDecisionOptionId}
          onDecisionOptionChange={onDecisionOptionChange}
        />
      ) : null}
      {isGuidedMode || isTechnicalMode ? (
        <button
          type="button"
          onClick={() => setInspectorOpen((value) => !value)}
          aria-expanded={showTechnicalTools}
          className="absolute bottom-16 right-4 z-20 border border-core-border/[0.14] bg-core-panel/95 px-3 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.06em] text-core-text-muted shadow-sm backdrop-blur-sm transition-colors hover:border-core-accent/50 hover:text-core-text"
        >
          {showTechnicalTools ? "Cerrar inspector" : "Inspeccionar"}
          {hasIntegrityAlert || activeFailureScenarioId ? (
            <span className="ml-2 text-core-warning" aria-label="Hay contexto técnico activo">
              •
            </span>
          ) : null}
        </button>
      ) : null}
      {showInteractionHint ? (
        <aside className="absolute bottom-4 left-4 z-20 w-[min(20rem,calc(100%-2rem))] border border-core-accent/30 bg-core-panel/95 p-3 shadow-lg backdrop-blur-sm" aria-label="Cómo explorar el diagrama">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-core-accent">Explora el diagrama</p>
              <p className="mt-1 text-[0.7rem] leading-relaxed text-core-text-secondary">Arrastra para moverte, usa la rueda para acercar y pulsa un nodo para ver su función.</p>
            </div>
            <button type="button" onClick={dismissInteractionHint} className="shrink-0 border border-core-border/[0.14] px-1.5 py-1 font-mono text-[0.58rem] text-core-text-muted transition-colors hover:border-core-accent/60 hover:text-core-text" aria-label="Cerrar ayuda del diagrama">×</button>
          </div>
          <p className="mt-2 border-t border-core-border/[0.1] pt-2 font-mono text-[0.56rem] text-core-text-muted">También puedes usar +, − y 0 en el teclado.</p>
        </aside>
      ) : null}
      <CanvasViewControls
        scale={viewport.scale}
        technical={isTechnicalMode}
        motionPaused={motionPaused || prefersReducedMotion}
        onToggleMotion={() => setMotionPaused((value) => !value)}
        onZoomOut={() => zoomFromCenter(1 / 1.2)}
        onZoomIn={() => zoomFromCenter(1.2)}
        onReset={resetViewport}
        onFit={fitToScene}
      />{/*

          −

      */}<p className={`pointer-events-none absolute bottom-4 bg-core-panel/90 px-3 py-2 font-mono text-[0.65rem] text-core-text-muted ${isGuidedMode ? "left-1/2 -translate-x-1/2" : "right-4"}`}>
        Arrastra para mover · rueda para zoom
      </p>
      <SceneAssuranceBadge report={integrityReport} sourceCount={technicalSources.length} staleSourceCount={technicalSources.filter((source) => source.validity === "review-needed").length} technical={isTechnicalMode} />
    </div>
  );
}
