import type { Student } from "../types/fee";
import SelectableStudentRow from "./SelectableStudentRow";

interface DesktopStudentTableProps {
  students: Student[];
  selectedStudentIds: string[];
  onToggleStudentSelection: (id: string) => void;
  onStudentSelect: (student: Student) => void;
}

export default function DesktopStudentTable({
  students,
  selectedStudentIds,
  onToggleStudentSelection,
  onStudentSelect,
}: DesktopStudentTableProps) {
  return (
    <div className="hidden overflow-x-auto lg:block">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-[#334155] bg-[#0F172A]/40">
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]"></th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Student
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Class
            </th>
            <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Billed
            </th>
            <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Paid
            </th>
            <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Balance
            </th>
            <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Status
            </th>
            <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <SelectableStudentRow
              key={student.id}
              student={student}
              selected={selectedStudentIds.includes(student.id)}
              onToggleSelection={onToggleStudentSelection}
              onStudentSelect={onStudentSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
