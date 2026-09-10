export function Sunburst({
  petals = 10,
  rx = 5,
  ry = 22,
  className = "h-5 w-5",
  color = "currentColor",
}: {
  petals?: number;
  rx?: number;
  ry?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy={ry + 2}
          rx={rx}
          ry={ry}
          fill={color}
          transform={`rotate(${(360 / petals) * i} 50 50)`}
        />
      ))}
    </svg>
  );
}
