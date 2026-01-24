const SEGMENTS = [
  {
    key: "poor",
    label: "Плохо",
    from: -90,
    to: -54,
    color: "#EF4444",
  },
  {
    key: "low",
    label: "Низкое",
    from: -50,
    to: -14,
    color: "#F97316",
  },
  {
    key: "satisfactory",
    label: "Удовлетворительно",
    from: -10,
    to: 26,
    color: "#EAB308",
  },
  {
    key: "good",
    label: "Хорошо",
    from: 30,
    to: 66,
    color: "#22C55E",
  },
  {
    key: "excellent",
    label: "Отлично",
    from: 70,
    to: 90,
    color: "#3B82F6",
  },
];
function getNeedleAngle(level) {
  const segment =
    SEGMENTS.find((s) => s.key === level) ??
    SEGMENTS.find((s) => s.key === "satisfactory");

  return (segment.from + segment.to) / 2;
}
function Arc({ from, to, color }) {
  const radius = 50;
  const centerX = 60;
  const centerY = 60;

  const polarToCartesian = (angle) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  const start = polarToCartesian(from);
  const end = polarToCartesian(to);
  const largeArcFlag = to - from <= 180 ? "0" : "1";

  const d = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
  `;

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="10"
      strokeLinecap="round"
    />
  );
}
export default function Gauge({
  qualityLevel = "satisfactory",
  label,
  temp,
}) {
  const needleAngle = getNeedleAngle(qualityLevel);

  return (
    <div className="flex items-center gap-4">
      <svg width="120" height="70" viewBox="0 0 120 70">
        {/* SEGMENTS */}
        {SEGMENTS.map((seg) => (
          <Arc
            key={seg.key}
            from={seg.from}
            to={seg.to}
            color={seg.color}
          />
        ))}

        {/* NEEDLE */}
        <g transform={`translate(60 60) rotate(${needleAngle})`}>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-38"
            stroke="#2563EB"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="5" fill="#2563EB" />
        </g>
      </svg>

      <div className="flex flex-col">
        <p className="text-blue-900 font-medium text-sm">
          {label ??
            SEGMENTS.find((s) => s.key === qualityLevel)?.label}
        </p>
        <p className="text-blue-700 text-sm">
          🌡 {temp}°C
        </p>
      </div>
    </div>
  );
}