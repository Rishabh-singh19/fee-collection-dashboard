interface StudentPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function StudentPagination({
  currentPage,
  totalPages,
  onPageChange,
}: StudentPaginationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-[#334155] bg-[#0F172A]/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[#94A3B8]">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-lg border border-[#334155] bg-[#1E293B] px-3 py-2 text-sm font-medium text-[#F1F5F9] transition hover:bg-[#334155]/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-[#334155] bg-[#1E293B] px-3 py-2 text-sm font-medium text-[#F1F5F9] transition hover:bg-[#334155]/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
