// src/components/Pagination.jsx
export default function Pagination({ page, pageSize, totalCount, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <span>Showing page {page} of {totalPages} ({totalCount} total)</span>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border rounded-lg bg-white disabled:opacity-40"
        >
          Previous
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border rounded-lg bg-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}