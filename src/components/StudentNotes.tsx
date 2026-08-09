import type { Student } from "../types/fee";

interface StudentNotesProps {
  student: Student;
}

export default function StudentNotes({ student }: StudentNotesProps) {
  if (!student.notes) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[#334155] bg-[#1E293B] p-5">
      <h3 className="text-sm font-semibold text-[#F1F5F9]">Internal Note</h3>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{student.notes}</p>
    </section>
  );
}
