import { useState } from "react";
import type { Student } from "../types/fee";

interface StudentActionsProps {
  student: Student;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

function StudentActions({ student }: StudentActionsProps) {
  const [message, setMessage] = useState<string | null>(null);

  const outstanding = Math.max(student.balance, 0);

  const canSendReminder =
    outstanding > 0 &&
    student.status !== "WITHDRAWN";

  const canRecordPayment =
    outstanding > 0 &&
    student.status !== "WITHDRAWN";

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  function handleReminder() {
    if (!canSendReminder) return;

    showMessage(`Reminder prepared for ${student.guardian.name}.`);
  }

  function handlePayment() {
    if (!canRecordPayment) return;

    showMessage(
      `Payment entry started for ${formatCurrency(outstanding)}.`
    );
  }

  return (
    <div className="relative">
      {/* Actions */}
      <div className="rounded-2xl border border-[#334155] bg-[#1E293B] p-5">
        <div>
          <h3 className="text-sm font-semibold text-[#F1F5F9]">
            Collection Actions
          </h3>

          <p className="mt-1 text-xs leading-5 text-[#94A3B8]">
            Take action on this student's outstanding account.
          </p>
        </div>

        {/* Outstanding amount */}
        <div className="mt-4 rounded-xl border border-[#334155] bg-[#0F172A] p-4">
          <p className="text-xs text-[#94A3B8]">
            Outstanding balance
          </p>

          <p className="mt-1 text-xl font-bold text-[#FBBF24]">
            {formatCurrency(outstanding)}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={!canSendReminder}
            onClick={handleReminder}
            className="rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm font-medium text-[#F1F5F9] transition hover:border-[#818CF8] hover:bg-[#818CF8]/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="mr-2">↗</span>
            Send Reminder
          </button>

          <button
            type="button"
            disabled={!canRecordPayment}
            onClick={handlePayment}
            className="rounded-xl bg-[#818CF8] px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#A5B4FC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="mr-2">+</span>
            Record Payment
          </button>
        </div>

        {/* Context */}
        {student.remindersSent > 0 && (
          <p className="mt-3 text-xs text-[#64748B]">
            {student.remindersSent} reminder
            {student.remindersSent === 1 ? "" : "s"} already sent
          </p>
        )}
      </div>

      {/* Toast */}
      {message && (
        <div className="fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-3 text-sm font-medium text-[#F1F5F9] shadow-2xl">
          <span className="mr-2 text-[#4ADE80]">✓</span>
          {message}
        </div>
      )}
    </div>
  );
}

export default StudentActions;