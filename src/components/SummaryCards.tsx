import type { Student } from "../types/fee";

interface SummaryCardsProps {
  students: Student[];
}

interface SummaryCardProps {
  label: string;
  value: number;
  description: string;
  icon: string;
  valueClassName: string;
}

function SummaryCard({
  label,
  value,
  description,
  icon,
  valueClassName,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-[#334155] bg-[#1E293B] p-5 transition-all duration-200 hover:border-[#475569] hover:bg-[#253349]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#94A3B8]">{label}</p>

          <p className={`mt-2 text-2xl font-bold tracking-tight ${valueClassName}`}>
            ₹{value.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#334155] text-lg">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-[#94A3B8]">{description}</p>
    </div>
  );
}

function SummaryCards({ students }: SummaryCardsProps) {
  const totalBilled = students.reduce(
    (total, student) => total + student.totalBilled,
    0
  );

  const totalCollected = students.reduce(
    (total, student) => total + student.totalPaid,
    0
  );

  const totalOutstanding = students.reduce(
    (total, student) => total + Math.max(student.balance, 0),
    0
  );

  const overdueStudents = students.filter(
    (student) => student.status === "OVERDUE"
  );

  const overdueAmount = overdueStudents.reduce(
    (total, student) => total + Math.max(student.balance, 0),
    0
  );

  const collectionPercentage =
    totalBilled > 0
      ? Math.round((totalCollected / totalBilled) * 100)
      : 0;

  return (
    <section>
      {/* Section heading */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-[#F1F5F9]">
          Collection Overview
        </h2>

        <p className="mt-1 text-sm text-[#94A3B8]">
          Current fee collection status across all students
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total Billed"
          value={totalBilled}
          description={`${students.length} students in current term`}
          icon="₹"
          valueClassName="text-[#F1F5F9]"
        />

        <SummaryCard
          label="Collected"
          value={totalCollected}
          description={`${collectionPercentage}% of total billed`}
          icon="✓"
          valueClassName="text-[#4ADE80]"
        />

        <SummaryCard
          label="Outstanding"
          value={totalOutstanding}
          description="Amount still to be collected"
          icon="◷"
          valueClassName="text-[#FBBF24]"
        />

        <SummaryCard
          label="Overdue"
          value={overdueAmount}
          description={`${overdueStudents.length} students require attention`}
          icon="!"
          valueClassName="text-[#FBBF24]"
        />
      </div>
    </section>
  );
}

export default SummaryCards;