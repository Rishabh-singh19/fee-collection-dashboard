import type { FeeStatus } from "../types/fee";

interface StatusBadgeProps {
  status: FeeStatus;
}

const statusConfig: Record<
  FeeStatus,
  {
    label: string;
    className: string;
  }
> = {
  PAID: {
    label: "Paid",
    className: "bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20",
  },

  OVERDUE: {
    label: "Overdue",
    className: "bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/20",
  },

  PARTIALLY_PAID: {
    label: "Partially paid",
    className: "bg-[#818CF8]/10 text-[#818CF8] border-[#818CF8]/20",
  },

  CREDIT_BALANCE: {
    label: "Credit balance",
    className: "bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20",
  },

  PAYMENT_FAILED: {
    label: "Payment failed",
    className: "bg-[#FBBF24]/10 text-[#FBBF24] border-[#FBBF24]/20",
  },

  INSTALMENT_PLAN: {
    label: "Instalment plan",
    className: "bg-[#818CF8]/10 text-[#818CF8] border-[#818CF8]/20",
  },

  WITHDRAWN: {
    label: "Withdrawn",
    className: "bg-[#94A3B8]/10 text-[#94A3B8] border-[#94A3B8]/20",
  },
};

function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}

export default StatusBadge;