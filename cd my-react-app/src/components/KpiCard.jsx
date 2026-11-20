// src/components/KpiCard.jsx
export default function KpiCard({ title, value, accentColor = "border-l-blue-500" }) {
  return (
    <div className={`bg-white p-4 rounded-xl border border-gray-200 border-l-4 ${accentColor} shadow-sm`}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}