import type { Student } from "../types/fee";
import StatusBadge from "./StatusBadge";
import { formatCurrency, getBalanceDisplay } from "./student-table-utils";

interface SelectableStudentRowProps {
  student: Student;
  selected: boolean;
  onToggleSelection: (id: string) => void;
  onStudentSelect: (student: Student) => void;
}

export default function SelectableStudentRow({
  student,
  selected,
  onToggleSelection,
  onStudentSelect,
}: SelectableStudentRowProps) {
  const balance = getBalanceDisplay(student);

  return (
    <tr
      key={student.id}
      onClick={() => onStudentSelect(student)}
      className="cursor-pointer border-b border-[#334155]/70 transition hover:bg-[#334155]/40"
    >
      <td className="px-5 py-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelection(student.id)}
          onClick={(event) => event.stopPropagation()}
          className="h-4 w-4 rounded border-[#334155] bg-[#0F172A] text-[#818CF8]"
        />
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#334155] text-xs font-semibold text-[#818CF8]">
            {student.name
              .split(" ")
              .slice(0, 2)
              .map((name) => name[0])
              .join("")
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#F1F5F9]">
              {student.name}
            </p>
            <p className="mt-0.5 text-xs text-[#94A3B8]">
              {student.admissionNo}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="text-sm text-[#F1F5F9]">
          {student.class}-{student.section}
        </p>
        <p className="mt-0.5 text-xs text-[#94A3B8]">Roll {student.rollNo}</p>
      </td>

      <td className="px-5 py-4 text-right">
        <span className="text-sm text-[#F1F5F9]">
          {formatCurrency(student.totalBilled)}
        </span>
      </td>

      <td className="px-5 py-4 text-right">
        <span className="text-sm text-[#4ADE80]">
          {formatCurrency(student.totalPaid)}
        </span>
      </td>

      <td className="px-5 py-4 text-right">
        <p className={`text-sm font-semibold ${balance.className}`}>
          {balance.amount}
        </p>
        <p className="mt-0.5 text-xs text-[#94A3B8]">{balance.label}</p>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={student.status} />
      </td>

      <td className="px-5 py-4 text-right">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onStudentSelect(student);
          }}
          className="rounded-lg px-3 py-2 text-xs font-medium text-[#818CF8] transition hover:bg-[#818CF8]/10 hover:text-[#A5B4FC]"
        >
          View
        </button>
      </td>
    </tr>
  );
}
