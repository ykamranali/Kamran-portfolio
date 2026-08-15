"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
} from "react";

interface Point {
  x: number;
  y: number;
}

/**
 * Groups card centers into visual rows/columns (based on actual measured
 * position, so it adapts to any responsive grid-cols-* breakpoint) and
 * returns the pairs that should be wired together: every card to its
 * row-neighbour and every card to its column-neighbour. This produces a
 * PCB / network-mesh pattern rather than a single daisy chain.
 */
function computeEdges(centers: Point[]): [number, number][] {
  if (centers.length < 2) return [];

  const order = centers.map((_, i) => i).sort((a, b) => centers[a].y - centers[b].y || centers[a].x - centers[b].x);

  const rows: number[][] = [];
  const tolerance = 24;
  for (const i of order) {
    const row = rows.find((r) => Math.abs(centers[r[0]].y - centers[i].y) < tolerance);
    if (row) row.push(i);
    else rows.push([i]);
  }
  rows.forEach((row) => row.sort((a, b) => centers[a].x - centers[b].x));

  const edges: [number, number][] = [];
  rows.forEach((row) => {
    for (let k = 0; k < row.length - 1; k++) edges.push([row[k], row[k + 1]]);
  });
  for (let r = 0; r < rows.length - 1; r++) {
    const a = rows[r];
    const b = rows[r + 1];
    const n = Math.min(a.length, b.length);
    for (let k = 0; k < n; k++) edges.push([a[k], b[k]]);
  }
  return edges;
}

function buildPath(a: Point, b: Point): string {
  if (Math.abs(a.x - b.x) < 2) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  if (Math.abs(a.y - b.y) < 2) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} L ${midX} ${a.y} L ${midX} ${b.y} L ${b.x} ${b.y}`;
}

export default function CircuitGrid({
  children,
  className = "",
  primaryColor = "#00E5FF",
  secondaryColor = "#8A2EFF",
}: {
  children: React.ReactNode;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}) {
  const gradientId = useId().replace(/[:]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [edges, setEdges] = useState<{ path: string; key: string; delay: number }[]>([]);
  const [nodes, setNodes] = useState<Point[]>([]);

  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;

    const centers: Point[] = cardRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - cRect.left + r.width / 2, y: r.top - cRect.top + r.height / 2 };
    });

    const edgeList = computeEdges(centers);
    setBox({ w: cRect.width, h: cRect.height });
    setEdges(
      edgeList.map(([a, b], i) => ({
        path: buildPath(centers[a], centers[b]),
        key: `${a}-${b}`,
        delay: (i % 5) * 0.35,
      }))
    );
    setNodes(centers);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    const settleTimer = setTimeout(measure, 350);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(settleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, items.length]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {box.w > 0 && edges.length > 0 && (
        <svg
          className="absolute inset-0 z-0 pointer-events-none overflow-visible"
          width={box.w}
          height={box.h}
          viewBox={`0 0 ${box.w} ${box.h}`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>

          {edges.map((edge) => (
            <g key={edge.key}>
              {/* base trace */}
              <path d={edge.path} fill="none" stroke={`url(#${gradientId})`} strokeWidth={1.25} strokeOpacity={0.35} />
              {/* animated flowing highlight */}
              <path
                d={edge.path}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="4 18"
                className="circuit-flow"
                style={{
                  filter: `drop-shadow(0 0 5px ${primaryColor})`,
                  animationDelay: `${edge.delay}s`,
                }}
              />
              {/* traveling data pulse */}
              <circle r={2.8} fill={primaryColor} style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}>
                <animateMotion dur={`${4.5 + edge.delay}s`} repeatCount="indefinite" begin={`${edge.delay}s`} path={edge.path} />
              </circle>
            </g>
          ))}

          {nodes.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={2.5}
              fill={primaryColor}
              className="circuit-node-pulse"
              style={{ filter: `drop-shadow(0 0 5px ${primaryColor})`, animationDelay: `${(i % 4) * 0.4}s` }}
            />
          ))}
        </svg>
      )}

      {items.map((child, i) =>
        cloneElement(child as ReactElement<any>, {
          key: (child as ReactElement<any>).key ?? i,
          ref: (el: HTMLElement | null) => {
            cardRefs.current[i] = el;
          },
        })
      )}
    </div>
  );
}
