// src/components/StatusBadge.jsx
export default function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-gray-100 text-gray-700",
    Confirmed: "bg-indigo-100 text-indigo-700",
    CheckedIn: "bg-purple-100 text-purple-700",
    Cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
}