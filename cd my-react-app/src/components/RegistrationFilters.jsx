export default function RegistrationFilters({ search, onSearchChange, status, onStatusChange }) {
  const statuses = ["All", "Pending", "Confirmed", "CheckedIn", "Cancelled"];

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-between">
      <input
        type="text"
        placeholder="Search owner or car model..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-80 bg-white"
      />
      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
              status === s ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}