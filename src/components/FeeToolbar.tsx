import type { FeeStatus } from "../types/fee";
import type { RefObject } from "react";

interface FeeToolbarProps {
  search: string;
  status: FeeStatus | "ALL" | "OTHER";
  reminderFilter: "ALL" | "CONTACTED" | "NEVER_CONTACTED";
  classFilter: string;
  minDue: number | "";
  maxDue: number | "";
  sortBy: "name" | "balance" | "daysOverdue";
  activeFilterCount: number;
  isFilterPanelOpen: boolean;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: FeeStatus | "ALL" | "OTHER") => void;
  onReminderFilterChange: (
    value: "ALL" | "CONTACTED" | "NEVER_CONTACTED",
  ) => void;
  onClassChange: (value: string) => void;
  onMinDueChange: (value: number | "") => void;
  onMaxDueChange: (value: number | "") => void;
  onSortChange: (value: "name" | "balance" | "daysOverdue") => void;
  onReset: () => void;
  onToggleFilters: () => void;
}

function FeeToolbar({
  search,
  status,
  reminderFilter,
  classFilter,
  minDue,
  maxDue,
  sortBy,
  activeFilterCount,
  isFilterPanelOpen,
  searchInputRef,
  onSearchChange,
  onStatusChange,
  onReminderFilterChange,
  onClassChange,
  onMinDueChange,
  onMaxDueChange,
  onSortChange,
  onReset,
  onToggleFilters,
}: FeeToolbarProps) {
  const hasFilters =
    search !== "" ||
    status !== "ALL" ||
    reminderFilter !== "ALL" ||
    classFilter !== "ALL" ||
    minDue !== "" ||
    maxDue !== "" ||
    sortBy !== "name";

  return (
    <section className="rounded-2xl bg-[#1E293B] p-4 shadow-[0_15px_30px_-20px_rgba(0,0,0,0.35)] transition hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)]">
      <div className="grid gap-4">
        {/* Search */}
        <div className="w-full">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              ⌕
            </span>

            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search student, admission no. or guardian..."
              aria-label="Search students"
              className="w-full rounded-xl border border-[#334155] bg-[#0F172A] py-2.5 pl-10 pr-4 text-sm text-[#F1F5F9] outline-none placeholder:text-[#64748B] transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
            />
          </div>

          <p className="mt-2 text-xs text-[#94A3B8]">
            Press{" "}
            <kbd className="rounded border border-[#334155] bg-[#0F172A] px-1.5 py-0.5 text-xs text-[#F1F5F9]">
              /
            </kbd>{" "}
            to search,{" "}
            <kbd className="rounded border border-[#334155] bg-[#0F172A] px-1.5 py-0.5 text-xs text-[#F1F5F9]">
              Esc
            </kbd>{" "}
            to close details or filters.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.8fr_auto] lg:items-end">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                Payment status
              </label>

              <div className="relative">
                <select
                  value={status}
                  onChange={(event) =>
                    onStatusChange(
                      event.target.value as FeeStatus | "ALL" | "OTHER",
                    )
                  }
                  className="w-full cursor-pointer rounded-xl border border-[#334155] bg-[#0F172A] px-3 pr-10 py-2.5 text-sm text-[#F1F5F9] outline-none appearance-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
                >
                  <option value="ALL">All statuses</option>
                  <option value="OVERDUE">Overdue</option>
                  <option value="PARTIALLY_PAID">Partially paid</option>
                  <option value="PAID">Paid</option>
                  <option value="OTHER">Other</option>
                </select>

                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#94A3B8]">
                  ▾
                </span>
              </div>
            </div>

            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                Class
              </label>

              <div className="relative">
                <select
                  value={classFilter}
                  onChange={(event) => onClassChange(event.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-[#334155] bg-[#0F172A] px-3 pr-10 py-2.5 text-sm text-[#F1F5F9] outline-none appearance-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
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

                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#94A3B8]">
                  ▾
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onToggleFilters}
              className="rounded-2xl border border-[#334155] bg-[#0F172A] px-3 py-2 text-sm font-medium text-[#F1F5F9] transition hover:border-[#818CF8] hover:text-[#F1F5F9]"
            >
              {isFilterPanelOpen ? "Hide filters" : "Show filters"}
              {activeFilterCount > 0 ? ` · ${activeFilterCount}` : ""}
            </button>

            <button
              type="button"
              onClick={onReset}
              disabled={!hasFilters}
              className="rounded-2xl border border-[#334155] bg-[#0F172A] px-4 py-2 text-sm font-medium text-[#94A3B8] transition hover:border-[#818CF8] hover:text-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear filters
            </button>
          </div>

          <div className="text-xs text-[#94A3B8]">
            Use filters to narrow the students who need attention.
          </div>
        </div>

        <div
          className={`overflow-hidden rounded-2xl bg-[#0F172A] shadow-[0_10px_25px_-15px_rgba(0,0,0,0.35)] transition-all duration-200 motion-reduce:transition-none ${
            isFilterPanelOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isFilterPanelOpen}
        >
          <div className="space-y-4 p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                  Reminder status
                </label>
                <div className="relative">
                  <select
                    value={reminderFilter}
                    onChange={(event) =>
                      onReminderFilterChange(
                        event.target.value as
                          | "ALL"
                          | "CONTACTED"
                          | "NEVER_CONTACTED",
                      )
                    }
                    className="w-full cursor-pointer rounded-xl border border-[#334155] bg-[#0F172A] px-3 pr-10 py-2.5 text-sm text-[#F1F5F9] outline-none appearance-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
                  >
                    <option value="ALL">All reminder status</option>
                    <option value="NEVER_CONTACTED">Never contacted</option>
                    <option value="CONTACTED">Contacted</option>
                  </select>

                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#94A3B8]">
                    ▾
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                  Amount due min
                </label>
                <input
                  type="number"
                  value={minDue === "" ? "" : minDue}
                  onChange={(event) =>
                    onMinDueChange(
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value),
                    )
                  }
                  placeholder="₹0"
                  className="w-full rounded-xl border border-[#334155] bg-[#0F172A] px-3 py-2.5 text-sm text-[#F1F5F9] outline-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                  Amount due max
                </label>
                <input
                  type="number"
                  value={maxDue === "" ? "" : maxDue}
                  onChange={(event) =>
                    onMaxDueChange(
                      event.target.value === ""
                        ? ""
                        : Number(event.target.value),
                    )
                  }
                  placeholder="₹50,000"
                  className="w-full rounded-xl border border-[#334155] bg-[#0F172A] px-3 py-2.5 text-sm text-[#F1F5F9] outline-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
                  Sort by
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      onSortChange(
                        event.target.value as
                          | "name"
                          | "balance"
                          | "daysOverdue",
                      )
                    }
                    className="w-full cursor-pointer rounded-xl border border-[#334155] bg-[#0F172A] px-3 pr-10 py-2.5 text-sm text-[#F1F5F9] outline-none appearance-none transition focus:border-[#818CF8] focus:ring-2 focus:ring-[#818CF8]/20"
                  >
                    <option value="name">Student name: A → Z</option>
                    <option value="balance">Amount due: high → low</option>
                    <option value="daysOverdue">
                      Days overdue: high → low
                    </option>
                  </select>

                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#94A3B8]">
                    ▾
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#94A3B8]">
              {activeFilterCount > 0
                ? `${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active`
                : "No filters active"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeeToolbar;
