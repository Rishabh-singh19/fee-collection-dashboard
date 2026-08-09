import type { Student } from "../types/fee";
import StatusBadge from "./StatusBadge";
import { formatDate } from "./student-details-utils";

interface StudentIdentityProps {
  student: Student;
}

export default function StudentIdentity({ student }: StudentIdentityProps) {
  return (
    <section className="rounded-2xl border border-[#334155] bg-[#1E293B] p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#334155] text-lg font-bold text-[#818CF8]">
          {student.name
            .split(" ")
            .slice(0, 2)
            .map((name) => name[0])
            .join("")
            .toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#F1F5F9]">
                {student.name}
              </h3>

              <p className="mt-1 text-sm text-[#94A3B8]">
                Class {student.class}-{student.section} · Roll {student.rollNo}
              </p>
            </div>

            <StatusBadge status={student.status} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-[#94A3B8]">Admission No.</p>
              <p className="mt-1 text-sm font-medium text-[#F1F5F9]">
                {student.admissionNo}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#94A3B8]">Family ID</p>
              <p className="mt-1 text-sm font-medium text-[#F1F5F9]">
                {student.familyId}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#94A3B8]">Last Payment</p>
              <p className="mt-1 text-sm font-medium text-[#F1F5F9]">
                {formatDate(student.lastPaymentDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
