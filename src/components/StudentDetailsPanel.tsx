import type { Student } from "../types/fee";
import StudentActions from "./StudentActions";
import StudentIdentity from "./StudentIdentity";
import FinancialSummary from "./FinancialSummary";
import FeeBreakdown from "./FeeBreakdown";
import GuardianInfo from "./GuardianInfo";
import ReminderActivity from "./ReminderActivity";
import PaymentHistory from "./PaymentHistory";
import StudentNotes from "./StudentNotes";

interface StudentDetailsPanelProps {
  student: Student | null;
  onClose: () => void;
}

export default function StudentDetailsPanel({
  student,
  onClose,
}: StudentDetailsPanelProps) {
  if (!student) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col border-l border-[#334155] bg-[#0F172A] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#334155] px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Student Account
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[#F1F5F9]">
              Fee Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details panel"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-[#94A3B8] transition hover:bg-[#334155] hover:text-[#F1F5F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#818CF8] focus-visible:outline-offset-2"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-5">
            <StudentIdentity student={student} />
            <FinancialSummary student={student} />
            <StudentActions student={student} />
            <FeeBreakdown student={student} />
            <GuardianInfo student={student} />

            {student.status === "INSTALMENT_PLAN" &&
              student.nextInstalmentDate &&
              student.nextInstalmentAmount !== undefined && (
                <section className="rounded-2xl border border-[#818CF8]/30 bg-[#818CF8]/5 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#818CF8]/10 text-[#818CF8]">
                      ?
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#F1F5F9]">
                        Instalment Plan
                      </h3>
                      <p className="mt-1 text-sm text-[#94A3B8]">
                        Next instalment of{" "}
                        <span className="font-medium text-[#F1F5F9]">
                          {student.nextInstalmentAmount.toLocaleString(
                            "en-IN",
                            {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            },
                          )}
                        </span>{" "}
                        is due on{" "}
                        <span className="font-medium text-[#F1F5F9]">
                          {new Date(
                            student.nextInstalmentDate,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </section>
              )}

            {student.status === "WITHDRAWN" && (
              <section className="rounded-2xl border border-[#FBBF24]/30 bg-[#FBBF24]/5 p-5">
                <h3 className="text-sm font-semibold text-[#F1F5F9]">
                  Withdrawal & Refund
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#94A3B8]">Withdrawn On</p>
                    <p className="mt-1 text-sm text-[#F1F5F9]">
                      {student.withdrawnOn
                        ? new Date(student.withdrawnOn).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )
                        : "�"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">Refund Due</p>
                    <p className="mt-1 text-sm font-semibold text-[#FBBF24]">
                      {(student.refundDue ?? 0).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
              </section>
            )}

            <ReminderActivity student={student} />
            <PaymentHistory student={student} />
            <StudentNotes student={student} />
          </div>
        </div>

        <div className="border-t border-[#334155] bg-[#0F172A] p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#818CF8] px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#A5B4FC]"
          >
            Done
          </button>
        </div>
      </aside>
    </div>
  );
}
