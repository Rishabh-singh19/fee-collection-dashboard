import type { Student } from "../types/fee";
import StatusBadge from "./StatusBadge";

interface StudentTableProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

function getBalanceDisplay(student: Student) {
  if (student.balance < 0) {
    return {
      amount: formatCurrency(student.balance),
      label: "Credit",
      className: "text-[#4ADE80]",
    };
  }

  if (student.balance === 0) {
    return {
      amount: "₹0",
      label: "Cleared",
      className: "text-[#4ADE80]",
    };
  }

  return {
    amount: formatCurrency(student.balance),
    label: "Outstanding",
    className: "text-[#FBBF24]",
  };
}

function StudentTable({
  students,
  onStudentSelect,
}: StudentTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#334155] bg-[#1E293B]">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[#334155] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#F1F5F9]">
            Student Accounts
          </h2>

          <p className="mt-1 text-sm text-[#94A3B8]">
            {students.length}{" "}
            {students.length === 1 ? "student" : "students"} shown
          </p>
        </div>
      </div>

      {/* Empty state */}
      {students.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#334155] text-xl text-[#94A3B8]">
            ⌕
          </div>

          <h3 className="mt-4 text-sm font-semibold text-[#F1F5F9]">
            No students found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-[#94A3B8]">
            Try changing your search or filter criteria.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#334155] bg-[#0F172A]/40">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Student
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Class
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Billed
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Paid
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Balance
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => {
                  const balance = getBalanceDisplay(student);

                  return (
                    <tr
                      key={student.id}
                      onClick={() => onStudentSelect(student)}
                      className="cursor-pointer border-b border-[#334155]/70 transition hover:bg-[#334155]/40"
                    >
                      {/* Student */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#334155] text-xs font-semibold text-[#818CF8]">
                            {student.name
                              .split(" ")
                              .slice(0, 2)
                              .map((name) => name[0])
                              .join("")
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[#F1F5F9]">
                              {student.name}
                            </p>

                            <p className="mt-0.5 text-xs text-[#94A3B8]">
                              {student.admissionNo}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-[#F1F5F9]">
                          {student.class}-{student.section}
                        </p>

                        <p className="mt-0.5 text-xs text-[#94A3B8]">
                          Roll {student.rollNo}
                        </p>
                      </td>

                      {/* Billed */}
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm text-[#F1F5F9]">
                          {formatCurrency(student.totalBilled)}
                        </span>
                      </td>

                      {/* Paid */}
                      <td className="px-5 py-4 text-right">
                        <span className="text-sm text-[#4ADE80]">
                          {formatCurrency(student.totalPaid)}
                        </span>
                      </td>

                      {/* Balance */}
                      <td className="px-5 py-4 text-right">
                        <p className={`text-sm font-semibold ${balance.className}`}>
                          {balance.amount}
                        </p>

                        <p className="mt-0.5 text-xs text-[#94A3B8]">
                          {balance.label}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={student.status} />
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onStudentSelect(student);
                          }}
                          className="rounded-lg px-3 py-2 text-xs font-medium text-[#818CF8] transition hover:bg-[#818CF8]/10 hover:text-[#A5B4FC]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet cards */}
          <div className="divide-y divide-[#334155] lg:hidden">
            {students.map((student) => {
              const balance = getBalanceDisplay(student);

              return (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => onStudentSelect(student)}
                  className="w-full p-4 text-left transition hover:bg-[#334155]/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#334155] text-xs font-semibold text-[#818CF8]">
                        {student.name
                          .split(" ")
                          .slice(0, 2)
                          .map((name) => name[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#F1F5F9]">
                          {student.name}
                        </p>

                        <p className="mt-1 text-xs text-[#94A3B8]">
                          Class {student.class}-{student.section} · Roll{" "}
                          {student.rollNo}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={student.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-[#94A3B8]">Billed</p>
                      <p className="mt-1 text-sm font-medium text-[#F1F5F9]">
                        {formatCurrency(student.totalBilled)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#94A3B8]">Paid</p>
                      <p className="mt-1 text-sm font-medium text-[#4ADE80]">
                        {formatCurrency(student.totalPaid)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#94A3B8]">Balance</p>
                      <p className={`mt-1 text-sm font-semibold ${balance.className}`}>
                        {balance.amount}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default StudentTable;