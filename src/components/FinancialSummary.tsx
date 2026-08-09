import type { Student } from "../types/fee";
import { formatCurrency } from "./student-details-utils";

interface FinancialSummaryProps {
  student: Student;
}

export default function FinancialSummary({ student }: FinancialSummaryProps) {
  const outstanding = Math.max(student.balance, 0);
  const credit = Math.max(-student.balance, 0);

  return (
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
  );
}
