import type { NodeKind } from "@/lib/animation-spec/types";

/**
 * One glyph per NodeKind, not per node — a new topic never needs to author
 * or generate icon assets, it just picks a kind (see
 * docs/ai-context/animation-guidelines.md). Drawn with canvas primitives
 * only (no images/fonts-as-icons) so it stays dependency-free and matches
 * the brand's sharp-corner rule — no circles except the kill/revive
 * control, which is the one documented exception (docs/product/brand.md).
 */

type IconDrawer = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => void;

const drawControlPlane: IconDrawer = (ctx, x, y, size, color) => {
  // Hub with four spokes — one node coordinating others.
  const cx = x + size / 2;
  const cy = y + size / 2;
  const core = size * 0.16;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  const spokes: [number, number][] = [
    [0, -size * 0.4],
    [0, size * 0.4],
    [-size * 0.4, 0],
    [size * 0.4, 0],
  ];
  for (const [dx, dy] of spokes) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + dx, cy + dy);
    ctx.stroke();
  }
  ctx.fillStyle = color;
  ctx.fillRect(cx - core, cy - core, core * 2, core * 2);
};

const drawCompute: IconDrawer = (ctx, x, y, size, color) => {
  // Stacked server rack units.
  const unitH = size * 0.22;
  const gap = size * 0.1;
  const w = size * 0.82;
  const startX = x + (size - w) / 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 3; i += 1) {
    const unitY = y + size * 0.08 + i * (unitH + gap);
    ctx.strokeRect(startX, unitY, w, unitH);
    ctx.fillStyle = color;
    ctx.fillRect(startX + w - unitH * 0.6, unitY + unitH / 2 - 1, unitH * 0.35, 2);
  }
};

const drawStorage: IconDrawer = (ctx, x, y, size, color) => {
  // Stacked platters, simplified to rectangles to keep the sharp-corner rule.
  const plateH = size * 0.2;
  const gap = size * 0.12;
  const w = size * 0.78;
  const startX = x + (size - w) / 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 3; i += 1) {
    const plateY = y + size * 0.12 + i * (plateH + gap);
    ctx.strokeRect(startX, plateY, w, plateH);
  }
};

const drawNetwork: IconDrawer = (ctx, x, y, size, color) => {
  // Three linked nodes — a small topology.
  const p = size * 0.16;
  const points: [number, number][] = [
    [x + size / 2, y + p],
    [x + p, y + size - p],
    [x + size - p, y + size - p],
  ];
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(points[0]![0], points[0]![1]);
  ctx.lineTo(points[1]![0], points[1]![1]);
  ctx.moveTo(points[0]![0], points[0]![1]);
  ctx.lineTo(points[2]![0], points[2]![1]);
  ctx.moveTo(points[1]![0], points[1]![1]);
  ctx.lineTo(points[2]![0], points[2]![1]);
  ctx.stroke();
  ctx.fillStyle = color;
  const dot = size * 0.1;
  for (const [px, py] of points) {
    ctx.fillRect(px - dot / 2, py - dot / 2, dot, dot);
  }
};

const drawWorkload: IconDrawer = (ctx, x, y, size, color) => {
  // A running process: frame + play mark.
  const w = size * 0.78;
  const h = size * 0.6;
  const startX = x + (size - w) / 2;
  const startY = y + (size - h) / 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(startX, startY, w, h);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX + w * 0.38, startY + h * 0.24);
  ctx.lineTo(startX + w * 0.38, startY + h * 0.76);
  ctx.lineTo(startX + w * 0.78, startY + h * 0.5);
  ctx.closePath();
  ctx.fill();
};

const drawExternal: IconDrawer = (ctx, x, y, size, color) => {
  // An arrow entering the boundary — an actor outside the platform.
  const midY = y + size / 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x + size * 0.18, midY);
  ctx.lineTo(x + size * 0.68, midY);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + size * 0.6, midY - size * 0.16);
  ctx.lineTo(x + size * 0.6, midY + size * 0.16);
  ctx.lineTo(x + size * 0.82, midY);
  ctx.closePath();
  ctx.fill();
  ctx.strokeRect(x + size * 0.82, y + size * 0.18, size * 0.1, size * 0.64);
};

const ICONS: Record<NodeKind, IconDrawer> = {
  "control-plane": drawControlPlane,
  compute: drawCompute,
  storage: drawStorage,
  network: drawNetwork,
  workload: drawWorkload,
  external: drawExternal,
};

export function drawKindIcon(
  ctx: CanvasRenderingContext2D,
  kind: NodeKind,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.save();
  ICONS[kind](ctx, x, y, size, color);
  ctx.restore();
}
