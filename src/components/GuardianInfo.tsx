import type { Student } from "../types/fee";

interface GuardianInfoProps {
  student: Student;
}

export default function GuardianInfo({ student }: GuardianInfoProps) {
  return (
    <section className="rounded-2xl border border-[#334155] bg-[#1E293B] p-5">
      <h3 className="text-sm font-semibold text-[#F1F5F9]">
        Guardian Information
      </h3>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-xs text-[#94A3B8]">Name</p>
          <p className="mt-1 text-sm text-[#F1F5F9]">{student.guardian.name}</p>
        </div>

        <div>
          <p className="text-xs text-[#94A3B8]">Phone</p>
          <p className="mt-1 text-sm text-[#F1F5F9]">
            {student.guardian.phone}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#94A3B8]">Email</p>
          <p className="mt-1 break-all text-sm text-[#F1F5F9]">
            {student.guardian.email ?? "No email on file"}
          </p>
        </div>
      </div>
    </section>
  );
}
