import type { Student } from "../types/fee";
import StudentCard from "./StudentCard";

interface MobileStudentCardListProps {
  students: Student[];
  selectedStudentIds: string[];
  onToggleStudentSelection: (id: string) => void;
  onStudentSelect: (student: Student) => void;
}

export default function MobileStudentCardList({
  students,
  selectedStudentIds,
  onToggleStudentSelection,
  onStudentSelect,
}: MobileStudentCardListProps) {
  return (
    <div className="divide-y divide-[#334155] lg:hidden">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          selected={selectedStudentIds.includes(student.id)}
          onToggleSelection={onToggleStudentSelection}
          onStudentSelect={onStudentSelect}
        />
      ))}
    </div>
  );
}
