export default function MetricRow({ label, value, underline = true }) {
  return (
    <div
      className={`
        flex justify-between items-center
        text-sm text-blue-900
        ${underline ? "border-b border-blue-200/60 pb-2" : ""}
      `}
    >
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
