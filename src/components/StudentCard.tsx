import type { Student } from "../types/fee";
import StatusBadge from "./StatusBadge";
import { formatCurrency } from "./student-table-utils";

interface StudentCardProps {
  student: Student;
  selected: boolean;
  onToggleSelection: (id: string) => void;
  onStudentSelect: (student: Student) => void;
}

export default function StudentCard({
  student,
  selected,
  onToggleSelection,
  onStudentSelect,
}: StudentCardProps) {
  const balance = getBalanceDisplay(student);

  return (
    <button
      type="button"
      onClick={() => onStudentSelect(student)}
      className="w-full p-4 text-left transition hover:bg-[#334155]/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelection(student.id)}
            onClick={(event) => event.stopPropagation()}
            className="h-4 w-4 rounded border-[#334155] bg-[#0F172A] text-[#818CF8]"
          />

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#334155] text-xs font-semibold text-[#818CF8]">
            {student.name
              .split(" ")
              .slice(0, 2)
              .map((name) => name[0])
              .join("")
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#F1F5F9]">
              {student.name}
            </p>

            <p className="mt-1 text-xs text-[#94A3B8]">
              Class {student.class}-{student.section} · Roll {student.rollNo}
            </p>
          </div>
        </div>

        <StatusBadge status={student.status} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-[#94A3B8]">Billed</p>
          <p className="mt-1 text-sm font-medium text-[#F1F5F9]">
            {formatCurrency(student.totalBilled)}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#94A3B8]">Paid</p>
          <p className="mt-1 text-sm font-medium text-[#4ADE80]">
            {formatCurrency(student.totalPaid)}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#94A3B8]">Balance</p>
          <p className={`mt-1 text-sm font-semibold ${balance.className}`}>
            {balance.amount}
          </p>
        </div>
      </div>
    </button>
  );
}

function getBalanceDisplay(student: Student) {
  if (student.balance < 0) {
    return {
      amount: formatCurrency(student.balance),
      label: "Credit",
      className: "text-[#4ADE80]",
    };
  }

  if (student.balance === 0) {
    return {
      amount: "₹0",
      label: "Cleared",
      className: "text-[#4ADE80]",
    };
  }

  return {
    amount: formatCurrency(student.balance),
    label: "Outstanding",
    className: "text-[#FBBF24]",
  };
}
