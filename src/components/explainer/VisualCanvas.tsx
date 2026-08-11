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
  const preserveManualFailureRef = useRef(false);
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);
  const [activeNodeKinds, setActiveNodeKinds] = useState<Set<NodeKind>>(() => new Set(ALL_NODE_KINDS));
  const [activeEdgeKinds, setActiveEdgeKinds] = useState<Set<EdgeKind>>(() => new Set());
  const [selectedIntegrityDiagnosticId, setSelectedIntegrityDiagnosticId] = useState<string | null>(null);
  const [inactiveNodeIds, setInactiveNodeIds] = useState<string[]>([]);
  const [clientToolsOpen, setClientToolsOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
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
  const showTechnicalTools = isTechnicalMode || clientToolsOpen;
  const guidedFocusIds = useMemo(
    () => guidedFocusNodeIds ?? guidedSteps[activeGuidedStepIndex]?.focusNodeIds ?? [],
    [activeGuidedStepIndex, guidedFocusNodeIds, guidedSteps],
  );

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
  const combinedFocusIds = useMemo(
    () => Array.from(new Set([...guidedFocusIds, ...(selectedIntegrityDiagnostic?.nodeIds ?? [])])),
    [guidedFocusIds, selectedIntegrityDiagnostic],
  );

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
      engine.update(reducedMotionRef.current ? 0 : dt);
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
  }, [onFailureScenarioChange, onNodeSelect, resetViewport, updateViewport, zoomAt, zoomFromCenter]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        role="img"
        tabIndex={0}
        aria-label="Diagrama interactivo: arrastra para mover, usa la rueda o las teclas más y menos para acercar o alejar, y pulsa cero para restablecer."
        className="block h-full w-full cursor-grab touch-none bg-core-bg active:cursor-grabbing"
      />
      {prefersReducedMotion ? (
        <p className="sr-only" role="status">
          Animación pausada porque tu dispositivo prefiere reducir el movimiento. El diagrama sigue siendo interactivo.
        </p>
      ) : null}
      {selectedNode ? (
        <NodeDetailCard node={selectedNode} scene={scene} audienceMode={audienceMode} onClose={() => onNodeSelect(null)} />
      ) : null}
      {showTechnicalTools && integrityReport ? (
        <TechnicalIntegrityPanel
          report={integrityReport}
          technicalSources={technicalSources}
          selectedDiagnosticId={selectedIntegrityDiagnosticId}
          onDiagnosticSelect={(diagnostic: TechnicalIntegrityDiagnostic | null) =>
            setSelectedIntegrityDiagnosticId(diagnostic?.id ?? null)
          }
        />
      ) : null}
      {showTechnicalTools ? (
        <>
          <DiagramLegend
            edgeKinds={edgeKinds}
            activeNodeKinds={activeNodeKinds}
            activeEdgeKinds={activeEdgeKinds}
            onToggleNodeKind={toggleNodeKind}
            onToggleEdgeKind={toggleEdgeKind}
            onReset={resetVisibility}
          />
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
        </>
      ) : null}
      {isGuidedMode ? (
        <button
          type="button"
          onClick={() => setClientToolsOpen((value) => !value)}
          aria-expanded={showTechnicalTools}
          className="absolute bottom-16 right-4 z-20 border border-core-border/[0.14] bg-core-panel/95 px-3 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.06em] text-core-text-muted shadow-sm backdrop-blur-sm transition-colors hover:border-core-accent/50 hover:text-core-text"
        >
          {showTechnicalTools ? "Ocultar herramientas" : "Más herramientas"}
          {hasIntegrityAlert || activeFailureScenarioId ? (
            <span className="ml-2 text-core-warning" aria-label="Hay contexto técnico activo">
              •
            </span>
          ) : null}
        </button>
      ) : null}
      <CanvasViewControls
        scale={viewport.scale}
        technical={isTechnicalMode}
        onZoomOut={() => zoomFromCenter(1 / 1.2)}
        onZoomIn={() => zoomFromCenter(1.2)}
        onReset={resetViewport}
      />{/*

          −

      */}<p className={`pointer-events-none absolute bottom-4 bg-core-panel/90 px-3 py-2 font-mono text-[0.65rem] text-core-text-muted ${isGuidedMode ? "left-1/2 -translate-x-1/2" : "right-4"}`}>
        Arrastra para mover · rueda para zoom
      </p>
      <SceneAssuranceBadge report={integrityReport} sourceCount={technicalSources.length} staleSourceCount={technicalSources.filter((source) => source.validity === "review-needed").length} technical={isTechnicalMode} />
    </div>
  );
}
