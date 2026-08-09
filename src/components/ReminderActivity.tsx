import type { Student } from "../types/fee";
import { formatDateTime } from "./student-details-utils";

interface ReminderActivityProps {
  student: Student;
}

export default function ReminderActivity({ student }: ReminderActivityProps) {
  return (
    <section className="rounded-2xl border border-[#334155] bg-[#1E293B] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#F1F5F9]">
          Reminder Activity
        </h3>

        <span className="rounded-full bg-[#334155] px-2.5 py-1 text-xs text-[#94A3B8]">
          {student.remindersSent} sent
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs text-[#94A3B8]">Last reminder</p>
        <p className="mt-1 text-sm text-[#F1F5F9]">
          {formatDateTime(student.lastReminderAt)}
        </p>

        {student.reminderDeliveryStatus === "FAILED" && (
          <p className="mt-2 text-xs text-[#FBBF24]">
            Last reminder delivery failed.
          </p>
        )}
      </div>
    </section>
  );
}
