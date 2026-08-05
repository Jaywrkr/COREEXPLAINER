import { useCallback, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

interface PanelPosition {
  x: number;
  y: number;
}

interface DraggablePanelResult {
  panelRef: (node: HTMLElement | null) => void;
  panelStyle: CSSProperties | undefined;
  dragHandleProps: {
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
    onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
    onPointerUp: (event: ReactPointerEvent<HTMLElement>) => void;
    onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => void;
  };
  isDragging: boolean;
}

const PANEL_GUTTER = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Keeps a floating diagram panel inside its canvas while it is repositioned. */
export function useDraggablePanel(): DraggablePanelResult {
  const panelElementRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const panelRef = useCallback((node: HTMLElement | null) => {
    panelElementRef.current = node;
  }, []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    const panel = panelElementRef.current;
    const canvasSpace = panel?.parentElement;
    if (!panel || !canvasSpace) return;

    const panelRect = panel.getBoundingClientRect();
    const canvasRect = canvasSpace.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: panelRect.left - canvasRect.left,
      originY: panelRect.top - canvasRect.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const panel = panelElementRef.current;
    const canvasSpace = panel?.parentElement;
    if (!drag || drag.pointerId !== event.pointerId || !panel || !canvasSpace) return;

    const canvasRect = canvasSpace.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const maxX = Math.max(PANEL_GUTTER, canvasRect.width - panelRect.width - PANEL_GUTTER);
    const maxY = Math.max(PANEL_GUTTER, canvasRect.height - panelRect.height - PANEL_GUTTER);
    setPosition({
      x: clamp(drag.originX + event.clientX - drag.startX, PANEL_GUTTER, maxX),
      y: clamp(drag.originY + event.clientY - drag.startY, PANEL_GUTTER, maxY),
    });
  }, []);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setIsDragging(false);
  }, []);

  return {
    panelRef,
    panelStyle: position
      ? {
          left: position.x,
          top: position.y,
          right: "auto",
          bottom: "auto",
        }
      : undefined,
    dragHandleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
    isDragging,
  };
}
