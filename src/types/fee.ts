export type FeeStatus =
  | "PAID"
  | "OVERDUE"
  | "PARTIALLY_PAID"
  | "CREDIT_BALANCE"
  | "PAYMENT_FAILED"
  | "INSTALMENT_PLAN"
  | "WITHDRAWN";

export type FeeComponentType =
  | "TUITION"
  | "TRANSPORT"
  | "LAB"
  | "EXAM";

export type PaymentMode =
  | "UPI"
  | "NETBANKING"
  | "CASH"
  | "CHEQUE"
  | "CARD"
  | "PAYROLL_DEDUCTION";

export interface FeeWaiver {
  type: string;
  percent: number;
  reason: string;
}

export interface FeeComponent {
  type: FeeComponentType;
  billed: number;
  paid: number;
  waiver?: FeeWaiver;
}

export interface Guardian {
  name: string;
  phone: string;
  email: string | null;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  mode: PaymentMode;
  reference: string;
  term: string;
  status: "SUCCESS" | "BOUNCED";
}

export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: number;
  admissionNo: string;
  familyId: string;

  guardian: Guardian;

  components: FeeComponent[];

  totalBilled: number;
  totalPaid: number;
  balance: number;

  status: FeeStatus;
  daysOverdue: number;

  lastPaymentDate: string | null;

  remindersSent: number;
  lastReminderAt: string | null;

  notes: string | null;

  payments: Payment[];

  nextInstalmentDate?: string;
  nextInstalmentAmount?: number;

  withdrawnOn?: string;
  refundDue?: number;

  reminderDeliveryStatus?: "FAILED";
}

export interface FeeData {
  meta: {
    school: string;
    academicYear: string;
    term: string;
    dueDate: string;
    asOf: string;
    currency: string;
  };

  students: Student[];
}