import type { FeeStatus } from "../types/fee";

interface FeeToolbarProps {
  search: string;
  status: FeeStatus | "ALL";
  classFilter: string;
  sortBy: "name" | "balance" | "status";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: FeeStatus | "ALL") => void;
  onClassChange: (value: string) => void;
  onSortChange: (value: "name" | "balance" | "status") => void;
  onReset: () => void;
}

function FeeToolbar({
  search,
  status,
  classFilter,
  sortBy,
  onSearchChange,
  onStatusChange,
  onClassChange,
  onSortChange,
  onReset,
}: FeeToolbarProps) {
  const hasFilters =
    search !== "" ||
    status !== "ALL" ||
    classFilter !== "ALL" ||
    sortBy !== "name";

  return (
    <section className="rounded-2xl border border-[#334155] bg-[#1E293B] p-4">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative w-full">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search student, admission no. or guardian..."
            className="w-full rounded-xl border border-[#334155] bg-[#0F172A] py-2.5 pl-10 pr-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#64748B] transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Status */}
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value as FeeStatus | "ALL")
              }
              className="w-full cursor-pointer rounded-xl border border-[#334155] bg-[#0F172A] px-3 py-2.5 text-sm text-[#F1F5F9] outline-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
            >
              <option value="ALL">All statuses</option>
              <option value="OVERDUE">Overdue</option>
              <option value="PARTIALLY_PAID">Partially paid</option>
              <option value="PAID">Paid</option>
              <option value="PAYMENT_FAILED">Payment failed</option>
              <option value="INSTALMENT_PLAN">Instalment plan</option>
              <option value="CREDIT_BALANCE">Credit balance</option>
              <option value="WITHDRAWN">Withdrawn</option>
            </select>
          </div>

          {/* Class */}
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
              Class
            </label>

            <select
              value={classFilter}
              onChange={(event) => onClassChange(event.target.value)}
              className="w-full cursor-pointer rounded-xl border border-[#334155] bg-[#0F172A] px-3 py-2.5 text-sm text-[#F1F5F9] outline-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
            >
              <option value="ALL">All classes</option>

              {Array.from({ length: 12 }, (_, index) => {
                const className = String(index + 1);

                return (
                  <option key={className} value={className}>
                    Class {className}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Sort */}
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
              Sort by
            </label>

            <select
              value={sortBy}
              onChange={(event) =>
                onSortChange(
                  event.target.value as "name" | "balance" | "status",
                )
              }
              className="w-full cursor-pointer rounded-xl border border-[#334155] bg-[#0F172A] px-3 py-2.5 text-sm text-[#F1F5F9] outline-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
            >
              <option value="name">Student name</option>
              <option value="balance">Outstanding amount</option>
              <option value="status">Fee status</option>
            </select>
          </div>

          {/* Reset */}
          <div className="lg:pt-5">
            <button
              type="button"
              onClick={onReset}
              disabled={!hasFilters}
              className="w-full rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-2.5 text-sm font-medium text-[#94A3B8] transition hover:border-[#818CF8] hover:text-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40 lg:w-auto"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeeToolbar;
