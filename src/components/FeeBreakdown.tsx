import type { Student } from "../types/fee";
import { formatCurrency, formatComponentName } from "./student-details-utils";

interface FeeBreakdownProps {
  student: Student;
}

export default function FeeBreakdown({ student }: FeeBreakdownProps) {
  return (
    <section className="rounded-2xl border border-[#334155] bg-[#1E293B]">
      <div className="border-b border-[#334155] px-5 py-4">
        <h3 className="text-sm font-semibold text-[#F1F5F9]">Fee Breakdown</h3>
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
                      {component.waiver.type.replace("_", " ").toLowerCase()} ·{" "}
                      {component.waiver.reason}
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
                      componentBalance > 0 ? "text-[#FBBF24]" : "text-[#4ADE80]"
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
  );
}
