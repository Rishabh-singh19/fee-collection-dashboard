import type { Student } from "../types/fee";
import { formatCurrency, formatDate } from "./student-details-utils";

interface PaymentHistoryProps {
  student: Student;
}

export default function PaymentHistory({ student }: PaymentHistoryProps) {
  return (
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
  );
}
