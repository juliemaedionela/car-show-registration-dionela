// src/components/RegistrationTable.jsx
import StatusBadge from "./StatusBadge";
import PaymentBadge from "./PaymentBadge";

export default function RegistrationTable({ items, loading }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead className="bg-gray-50 border-b text-gray-600">
          <tr>
            <th className="p-4">Owner & Vehicle</th>
            <th className="p-4">Category</th>
            <th className="p-4">Fee / Paid</th>
            <th className="p-4">Payment</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {loading ? (
            <tr><td colSpan="5" className="p-6 text-center text-gray-400">Loading registrations...</td></tr>
          ) : items.length === 0 ? (
            <tr><td colSpan="5" className="p-6 text-center text-gray-400">No matching registrations found.</td></tr>
          ) : (
            items.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{reg.ownerName}</div>
                  <div className="text-gray-500 text-xs">{reg.carModel}</div>
                </td>
                <td className="p-4">{reg.category}</td>
                <td className="p-4">
                  ₱{reg.amountPaid.toLocaleString()} / <span className="text-gray-400">₱{reg.entryFee.toLocaleString()}</span>
                </td>
                <td className="p-4"><PaymentBadge status={reg.paymentStatus} /></td>
                <td className="p-4"><StatusBadge status={reg.status} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}