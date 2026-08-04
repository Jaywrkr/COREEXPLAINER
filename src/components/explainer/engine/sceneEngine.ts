import type { Scene, SceneEdge, SceneNode } from "@/lib/animation-spec/types";
import { palette } from "./palette";

/**
 * Canvas simulation engine for animation-spec.json scenes.
 *
 * Ported from the first hand-built CoreSolutions prototype
 * (docs/examples/vcf) into a generic, reusable engine: nothing here knows
 * about VCF, hosts, or vSAN — it only knows nodes, edges, capacity, and
 * packet flow. Content (src/content) and visuals (this engine) are
 * intentionally decoupled — see docs/ai-context/decisions.md.
 *
 * Packets are a real discrete-event simulation (emission rate, travel
 * time, fan-out propagation, capacity decay), not a decorative CSS
 * animation, per docs/ai-context/animation-guidelines.md.
 */

const CARD_W = 128;
const CARD_H = 46;
const TRAVEL_MS = 1000;
const CAPACITY_DECAY_MS = 300;
const KILL_BUTTON_RADIUS = 10;

const KIND_COLOR: Record<SceneNode["kind"], string> = {
  "control-plane": palette.navy,
  compute: palette.accent,
  storage: palette.textMuted,
  network: palette.textSecondary,
  workload: palette.success,
  external: palette.accent,
};

interface RuntimeNode extends SceneNode {
  rx: number;
  dead: boolean;
  emitAccumMs: number;
  decayAccumMs: number;
  /** Hit-test target for the kill/revive control, set during draw(). */
  killButton?: { x: number; y: number; r: number };
}

interface Packet {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  toId: string;
  color: string;
}

interface Point {
  x: number;
  y: number;
}

function edgePoint(fromX: number, fromY: number, toX: number, toY: number): Point {
  const dx = toX - fromX;
  const dy = toY - fromY;
  if (dx === 0 && dy === 0) return { x: fromX, y: fromY };
  const scaleX = Math.abs(dx) > 0.0001 ? CARD_W / 2 / Math.abs(dx) : Infinity;
  const scaleY = Math.abs(dy) > 0.0001 ? CARD_H / 2 / Math.abs(dy) : Infinity;
  const scale = Math.min(scaleX, scaleY);
  return { x: fromX + dx * scale, y: fromY + dy * scale };
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, font: string) {
  ctx.save();
  ctx.font = font;
  if (ctx.measureText(text).width <= maxWidth) {
    ctx.restore();
    return text;
  }
  let truncated = text;
  while (truncated.length > 1 && ctx.measureText(`${truncated}…`).width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  ctx.restore();
  return `${truncated}…`;
}

export class SceneEngine {
  private nodes: RuntimeNode[] = [];
  private edges: SceneEdge[] = [];
  private packets: Packet[] = [];
  private width = 0;
  private height = 0;

  loadScene(scene: Scene) {
    this.nodes = scene.nodes.map((n) => ({ ...n, rx: 0, dead: false, emitAccumMs: 0, decayAccumMs: 0 }));
    this.edges = scene.edges;
    this.packets = [];
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  private nodeById(id: string) {
    return this.nodes.find((n) => n.id === id);
  }

  private toPixels(node: SceneNode): Point {
    return { x: node.x * this.width, y: node.y * this.height };
  }

  private outgoingTargets(node: RuntimeNode): RuntimeNode[] {
    return this.edges
      .filter((e) => e.from === node.id)
      .map((e) => this.nodeById(e.to))
      .filter((n): n is RuntimeNode => Boolean(n) && !n!.dead);
  }

  private spawnPacket(from: RuntimeNode, to: RuntimeNode) {
    const pa = this.toPixels(from);
    const pb = this.toPixels(to);
    const p1 = edgePoint(pa.x, pa.y, pb.x, pb.y);
    const p2 = edgePoint(pb.x, pb.y, pa.x, pa.y);
    this.packets.push({
      fromX: p1.x,
      fromY: p1.y,
      toX: p2.x,
      toY: p2.y,
      progress: 0,
      toId: to.id,
      color: KIND_COLOR[from.kind],
    });
  }

  /** Advance the simulation by `dt` milliseconds (real elapsed frame time). */
  update(dt: number) {
    for (const node of this.nodes) {
      if (!node.rps || node.dead) continue;
      const targets = this.outgoingTargets(node);
      if (targets.length === 0) continue;

      node.emitAccumMs += dt;
      const interval = 1000 / node.rps;
      while (node.emitAccumMs >= interval) {
        node.emitAccumMs -= interval;
        const target = targets[Math.floor(Math.random() * targets.length)]!;
        this.spawnPacket(node, target);
      }
    }

    for (const packet of this.packets) {
      packet.progress += dt / TRAVEL_MS;
    }

    const arrived = this.packets.filter((p) => p.progress >= 1);
    for (const packet of arrived) {
      const target = this.nodeById(packet.toId);
      if (!target || target.dead) continue;
      if (target.capacity) target.rx += 1;

      // Fan-out: a node with its own outgoing edges (and no rps of its own)
      // automatically forwards, e.g. a cluster relaying to several VMs.
      const further = this.outgoingTargets(target);
      if (further.length > 0 && !target.rps) {
        const next = further[Math.floor(Math.random() * further.length)]!;
        this.spawnPacket(target, next);
      }
    }
    this.packets = this.packets.filter((p) => p.progress < 1);

    for (const node of this.nodes) {
      if (!node.capacity) continue;
      node.decayAccumMs += dt;
      if (node.decayAccumMs > CAPACITY_DECAY_MS) {
        node.decayAccumMs = 0;
        node.rx = Math.max(0, node.rx - 1);
      }
    }
  }

  /** Toggle a killable node dead/alive if (x, y) — in canvas pixel space — hits its control. */
  handleClick(x: number, y: number) {
    for (const node of this.nodes) {
      if (!node.killButton) continue;
      const dx = x - node.killButton.x;
      const dy = y - node.killButton.y;
      if (dx * dx + dy * dy < node.killButton.r * node.killButton.r) {
        node.dead = !node.dead;
        if (node.dead) node.rx = 0;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);

    for (const edge of this.edges) {
      const from = this.nodeById(edge.from);
      const to = this.nodeById(edge.to);
      if (from && to) this.drawEdge(ctx, from, to);
    }

    for (const packet of this.packets) this.drawPacket(ctx, packet);
    for (const node of this.nodes) this.drawNode(ctx, node);
  }

  private drawEdge(ctx: CanvasRenderingContext2D, a: SceneNode, b: SceneNode) {
    const pa = this.toPixels(a);
    const pb = this.toPixels(b);
    const p1 = edgePoint(pa.x, pa.y, pb.x, pb.y);
    const p2 = edgePoint(pb.x, pb.y, pa.x, pa.y);

    ctx.strokeStyle = "rgba(245,246,250,0.14)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    ctx.fillStyle = "rgba(245,246,250,0.3)";
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p2.x - 6 * Math.cos(angle - 0.5), p2.y - 6 * Math.sin(angle - 0.5));
    ctx.lineTo(p2.x - 6 * Math.cos(angle + 0.5), p2.y - 6 * Math.sin(angle + 0.5));
    ctx.closePath();
    ctx.fill();
  }

  private drawNode(ctx: CanvasRenderingContext2D, node: RuntimeNode) {
    const center = this.toPixels(node);
    const x = center.x - CARD_W / 2;
    const y = center.y - CARD_H / 2;
    const color = KIND_COLOR[node.kind];

    ctx.save();
    if (node.dead) ctx.globalAlpha = 0.4;

    ctx.fillStyle = palette.panel;
    ctx.fillRect(x, y, CARD_W, CARD_H);
    ctx.strokeStyle = "rgba(245,246,250,0.09)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, CARD_W - 1, CARD_H - 1);

    const iconSize = 22;
    ctx.fillStyle = `${color}1e`;
    ctx.fillRect(x + 8, y + (CARD_H - iconSize) / 2, iconSize, iconSize);
    ctx.fillStyle = color;
    ctx.fillRect(x + 8 + iconSize / 2 - 3, y + (CARD_H - iconSize) / 2 + iconSize / 2 - 3, 6, 6);

    const textX = x + 8 + iconSize + 8;
    const nameFont = '600 11px "IBM Plex Sans", sans-serif';
    ctx.fillStyle = palette.text;
    ctx.font = nameFont;
    ctx.textBaseline = "middle";
    ctx.fillText(
      fitText(ctx, node.name, CARD_W - (textX - x) - 8, nameFont),
      textX,
      y + (node.subtitle || node.capacity ? 15 : CARD_H / 2),
    );

    if (node.capacity) {
      const pct = Math.min(1, node.rx / node.capacity);
      const barW = CARD_W - (textX - x) - 10;
      const barX = textX;
      const barY = y + CARD_H - 11;
      ctx.fillStyle = "rgba(245,246,250,0.08)";
      ctx.fillRect(barX, barY, barW, 2.5);
      ctx.fillStyle = pct > 1 ? palette.error : pct > 0.85 ? palette.warning : palette.success;
      ctx.fillRect(barX, barY, barW * Math.min(1, pct), 2.5);
    } else if (node.subtitle) {
      const subFont = '500 9px "IBM Plex Mono", monospace';
      ctx.fillStyle = palette.textMuted;
      ctx.font = subFont;
      ctx.fillText(fitText(ctx, node.subtitle, CARD_W - (textX - x) - 8, subFont), textX, y + 29);
    }

    ctx.restore();

    if (node.dead) {
      ctx.strokeStyle = "rgba(194,59,59,0.6)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 10);
      ctx.lineTo(x + CARD_W - 10, y + CARD_H - 10);
      ctx.moveTo(x + CARD_W - 10, y + 10);
      ctx.lineTo(x + 10, y + CARD_H - 10);
      ctx.stroke();
    }

    if (node.killable) {
      const bx = x + CARD_W - 1;
      const by = y + 1;
      ctx.fillStyle = node.dead ? palette.success : palette.error;
      ctx.beginPath();
      ctx.arc(bx, by, KILL_BUTTON_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = palette.bg;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      if (node.dead) {
        ctx.moveTo(bx - 1.5, by - 2.2);
        ctx.lineTo(bx + 2.2, by);
        ctx.lineTo(bx - 1.5, by + 2.2);
      } else {
        ctx.moveTo(bx - 2.2, by - 2.2);
        ctx.lineTo(bx + 2.2, by + 2.2);
        ctx.moveTo(bx + 2.2, by - 2.2);
        ctx.lineTo(bx - 2.2, by + 2.2);
      }
      ctx.stroke();
      ctx.lineCap = "butt";
      node.killButton = { x: bx, y: by, r: KILL_BUTTON_RADIUS };
    } else {
      node.killButton = undefined;
    }
  }

  private drawPacket(ctx: CanvasRenderingContext2D, packet: Packet) {
    const x = packet.fromX + (packet.toX - packet.fromX) * packet.progress;
    const y = packet.fromY + (packet.toY - packet.fromY) * packet.progress;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 4.5);
    gradient.addColorStop(0, `${packet.color}99`);
    gradient.addColorStop(0.6, `${packet.color}20`);
    gradient.addColorStop(1, `${packet.color}00`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = packet.color;
    ctx.beginPath();
    ctx.arc(x, y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
}
