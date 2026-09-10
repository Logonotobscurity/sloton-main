const VIOLET = { top: "#C7B0F0", left: "#8E6FD1", right: "#7A5CBC" };
const CITRON = { top: "#F2ED9A", left: "#D9CF4E", right: "#BFB53C" };
const CHART = { top: "#D8F76E", left: "#A9D62F", right: "#8FBB22" };

function Cube({ x, y, size, tone }: { x: number; y: number; size: number; tone: typeof VIOLET }) {
  const w = size;
  const h = size * 0.5;
  const d = size * 0.82;
  const top = `${x},${y} ${x + w},${y + h} ${x},${y + 2 * h} ${x - w},${y + h}`;
  const left = `${x - w},${y + h} ${x},${y + 2 * h} ${x},${y + 2 * h + d} ${x - w},${y + h + d}`;
  const right = `${x + w},${y + h} ${x},${y + 2 * h} ${x},${y + 2 * h + d} ${x + w},${y + h + d}`;
  return (
    <g>
      <polygon points={top} fill={tone.top} />
      <polygon points={left} fill={tone.left} />
      <polygon points={right} fill={tone.right} />
    </g>
  );
}

export function TesseraCubes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 260" className={className} aria-hidden="true">
      <Cube x={80} y={110} size={30} tone={VIOLET} />
      <Cube x={218} y={92} size={30} tone={CHART} />
      <Cube x={150} y={116} size={34} tone={CITRON} />
      <Cube x={104} y={162} size={28} tone={VIOLET} />
      <Cube x={172} y={168} size={30} tone={CHART} />
      <line x1="190" y1="150" x2="190" y2="52" stroke="#C9F24A" strokeWidth="3" />
      <polygon points="190,34 200,58 180,58" fill="#C9F24A" />
      <circle cx="118" cy="236" r="7" fill="#C9F24A" />
    </svg>
  );
}
