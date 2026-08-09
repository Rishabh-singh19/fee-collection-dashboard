import type { Student } from "../types/fee";
import { formatCurrency } from "./student-table-utils";

interface StudentTableHeaderProps {
  totalStudents: number;
  studentsThisPage: number;
  currentPage: number;
  totalPages: number;
  selectedCount: number;
  allSelected: boolean;
  onToggleSelectAll: () => void;
  onSendRemainder: () => void;
  onSendRemainderToAllFiltered: () => void;
}

export default function StudentTableHeader({
  totalStudents,
  studentsThisPage,
  currentPage,
  totalPages,
  selectedCount,
  allSelected,
  onToggleSelectAll,
  onSendRemainder,
  onSendRemainderToAllFiltered,
}: StudentTableHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#334155] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-base font-semibold text-[#F1F5F9]">
          Student Accounts
        </h2>
        <p className="mt-1 text-sm text-[#94A3B8]">
          {selectedCount > 0
            ? `${selectedCount} selected`
            : `Showing ${studentsThisPage} of ${totalStudents} students on page ${currentPage} of ${totalPages}`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onSendRemainder}
          disabled={selectedCount === 0}
          className="rounded-lg border border-[#334155] bg-[#1E293B] px-4 py-2 text-sm font-medium text-[#F1F5F9] transition hover:bg-[#334155]/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send remainder to selected
        </button>

        <button
          type="button"
          onClick={onSendRemainderToAllFiltered}
          disabled={totalStudents === 0}
          className="rounded-lg border border-[#334155] bg-[#1E293B] px-4 py-2 text-sm font-medium text-[#F1F5F9] transition hover:bg-[#334155]/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send remainder to all filtered
        </button>

        <button
          type="button"
          onClick={onToggleSelectAll}
          className="rounded-lg border border-[#334155] bg-[#1E293B] px-4 py-2 text-sm font-medium text-[#F1F5F9] transition hover:bg-[#334155]/80"
        >
          {allSelected ? "Clear selection" : "Select all"}
        </button>
      </div>
    </div>
  );
}
