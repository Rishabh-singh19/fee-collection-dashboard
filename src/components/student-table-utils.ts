import type { Student } from "../types/fee";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

export function getBalanceDisplay(student: Student) {
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
