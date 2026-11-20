// src/components/PaymentBadge.jsx
export default function PaymentBadge({ status }) {
  const styles = {
    Unpaid: "bg-amber-100 text-amber-700",
    Partial: "bg-blue-100 text-blue-700",
    Paid: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.Unpaid}`}>
      {status}
    </span>
  );
}