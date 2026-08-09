import type { Student } from "../types/fee";
import StatusBadge from "./StatusBadge";
import StudentActions from "./StudentActions";
interface StudentDetailsPanelProps {
  student: Student | null;
  onClose: () => void;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatComponentName(type: string) {
  return type
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function StudentDetailsPanel({ student, onClose }: StudentDetailsPanelProps) {
  if (!student) {
    return null;
  }

  const outstanding = Math.max(student.balance, 0);
  const credit = Math.max(-student.balance, 0);

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col border-l border-[#334155] bg-[#0F172A] shadow-2xl">
        {/* Header */}
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
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-[#94A3B8] transition hover:bg-[#334155] hover:text-[#F1F5F9]"
          >
            ×
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-5">
            {/* Student identity */}
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
                        Class {student.class}-{student.section} · Roll{" "}
                        {student.rollNo}
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

            {/* Financial summary */}
            <section>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-[#F1F5F9]">
                  Financial Summary
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-4">
                  <p className="text-xs text-[#94A3B8]">Billed</p>

                  <p className="mt-2 text-base font-semibold text-[#F1F5F9]">
                    {formatCurrency(student.totalBilled)}
                  </p>
                </div>

                <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-4">
                  <p className="text-xs text-[#94A3B8]">Paid</p>

                  <p className="mt-2 text-base font-semibold text-[#4ADE80]">
                    {formatCurrency(student.totalPaid)}
                  </p>
                </div>

                <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-4">
                  <p className="text-xs text-[#94A3B8]">Outstanding</p>

                  <p className="mt-2 text-base font-semibold text-[#FBBF24]">
                    {formatCurrency(outstanding)}
                  </p>
                </div>

                <div className="rounded-xl border border-[#334155] bg-[#1E293B] p-4">
                  <p className="text-xs text-[#94A3B8]">Credit</p>

                  <p className="mt-2 text-base font-semibold text-[#4ADE80]">
                    {credit > 0 ? formatCurrency(credit) : "₹0"}
                  </p>
                </div>
              </div>
            </section>
            <StudentActions student={student} />
            {/* Fee breakdown */}
            <section className="rounded-2xl border border-[#334155] bg-[#1E293B]">
              <div className="border-b border-[#334155] px-5 py-4">
                <h3 className="text-sm font-semibold text-[#F1F5F9]">
                  Fee Breakdown
                </h3>
              </div>

              <div className="divide-y divide-[#334155]">
                {student.components.map((component) => {
                  const componentBalance = component.billed - component.paid;

                  return (
                    <div key={component.type} className="px-5 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-[#F1F5F9]">
                            {formatComponentName(component.type)}
                          </p>

                          {component.waiver && (
                            <p className="mt-1 text-xs text-[#818CF8]">
                              {component.waiver.percent}%{" "}
                              {component.waiver.type
                                .replace("_", " ")
                                .toLowerCase()}{" "}
                              · {component.waiver.reason}
                            </p>
                          )}
                        </div>

                        <p className="text-sm font-semibold text-[#F1F5F9]">
                          {formatCurrency(component.billed)}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-[#94A3B8]">
                          Paid{" "}
                          <span className="text-[#4ADE80]">
                            {formatCurrency(component.paid)}
                          </span>
                        </span>

                        <span className="text-[#94A3B8]">
                          Balance{" "}
                          <span
                            className={
                              componentBalance > 0
                                ? "text-[#FBBF24]"
                                : "text-[#4ADE80]"
                            }
                          >
                            {formatCurrency(componentBalance)}
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Guardian */}
            <section className="rounded-2xl border border-[#334155] bg-[#1E293B] p-5">
              <h3 className="text-sm font-semibold text-[#F1F5F9]">
                Guardian Information
              </h3>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs text-[#94A3B8]">Name</p>

                  <p className="mt-1 text-sm text-[#F1F5F9]">
                    {student.guardian.name}
                  </p>
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

            {/* Instalment plan */}
            {student.status === "INSTALMENT_PLAN" &&
              student.nextInstalmentDate &&
              student.nextInstalmentAmount !== undefined && (
                <section className="rounded-2xl border border-[#818CF8]/30 bg-[#818CF8]/5 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#818CF8]/10 text-[#818CF8]">
                      ◷
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#F1F5F9]">
                        Instalment Plan
                      </h3>

                      <p className="mt-1 text-sm text-[#94A3B8]">
                        Next instalment of{" "}
                        <span className="font-medium text-[#F1F5F9]">
                          {formatCurrency(student.nextInstalmentAmount)}
                        </span>{" "}
                        is due on{" "}
                        <span className="font-medium text-[#F1F5F9]">
                          {formatDate(student.nextInstalmentDate)}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </section>
              )}

            {/* Withdrawal / refund */}
            {student.status === "WITHDRAWN" && (
              <section className="rounded-2xl border border-[#FBBF24]/30 bg-[#FBBF24]/5 p-5">
                <h3 className="text-sm font-semibold text-[#F1F5F9]">
                  Withdrawal & Refund
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#94A3B8]">Withdrawn On</p>

                    <p className="mt-1 text-sm text-[#F1F5F9]">
                      {formatDate(student.withdrawnOn ?? null)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#94A3B8]">Refund Due</p>

                    <p className="mt-1 text-sm font-semibold text-[#FBBF24]">
                      {formatCurrency(student.refundDue ?? 0)}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Reminders */}
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

            {/* Payment history */}
            <section className="rounded-2xl border border-[#334155] bg-[#1E293B]">
              <div className="border-b border-[#334155] px-5 py-4">
                <h3 className="text-sm font-semibold text-[#F1F5F9]">
                  Payment History
                </h3>
              </div>

              {student.payments.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-[#94A3B8]">
                    No payment history available.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#334155]">
                  {student.payments.map((payment) => (
                    <div key={payment.id} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-[#F1F5F9]">
                            {formatCurrency(payment.amount)}
                          </p>

                          <p className="mt-1 text-xs text-[#94A3B8]">
                            {formatDate(payment.date)} · {payment.mode}
                          </p>

                          <p className="mt-1 break-all text-xs text-[#64748B]">
                            {payment.reference}
                          </p>
                        </div>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                            payment.status === "SUCCESS"
                              ? "border-[#4ADE80]/20 bg-[#4ADE80]/10 text-[#4ADE80]"
                              : "border-[#FBBF24]/20 bg-[#FBBF24]/10 text-[#FBBF24]"
                          }`}
                        >
                          {payment.status === "SUCCESS" ? "Success" : "Bounced"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Notes */}
            {student.notes && (
              <section className="rounded-2xl border border-[#334155] bg-[#1E293B] p-5">
                <h3 className="text-sm font-semibold text-[#F1F5F9]">
                  Internal Note
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
                  {student.notes}
                </p>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
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

export default StudentDetailsPanel;
