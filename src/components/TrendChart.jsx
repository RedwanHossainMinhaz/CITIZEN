// A small dependency-free line chart. `data` is an array of { label, value }.
export default function TrendChart({ data, max = 100 }) {
  const width = 640;
  const height = 220;
  const padding = 28;

  const stepX = (width - padding * 2) / (data.length - 1 || 1);
  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (d.value / max) * (height - padding * 2);
    return { x, y, ...d };
  });

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${path} L ${points[points.length - 1]?.x ?? 0} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 0.5, 1].map((f) => (
        <line
          key={f}
          x1={padding}
          x2={width - padding}
          y1={height - padding - f * (height - padding * 2)}
          y2={height - padding - f * (height - padding * 2)}
          stroke="#e2e8f0"
          strokeDasharray="4 4"
        />
      ))}

      <path d={areaPath} fill="url(#trendFill)" className="animate-fadeIn" />
      <path
        d={path}
        fill="none"
        stroke="#2563eb"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-fadeIn"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          animation: 'drawLine 1s ease-out forwards',
        }}
      />

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#2563eb" className="transition-transform duration-150" />
          <text x={p.x} y={height - 6} textAnchor="middle" fontSize="11" fill="#94a3b8">
            {p.label}
          </text>
        </g>
      ))}

      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
