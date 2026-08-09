import { useEffect, useMemo, useState } from "react";

import feeData from "./data/fee-data.json";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import FeeToolbar from "./components/FeeToolbar";
import StudentTable from "./components/StudentTable";
import StudentDetailsPanel from "./components/StudentDetailsPanel";

import type { FeeData, FeeStatus, Student } from "./types/fee";

const data = feeData as FeeData;

type SortOption = "name" | "balance" | "status";

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FeeStatus | "ALL">("ALL");
  const [classFilter, setClassFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const pageSize = 15;

  const filteredStudents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = data.students.filter((student) => {
      const matchesSearch =
        normalizedSearch === "" ||
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.admissionNo.toLowerCase().includes(normalizedSearch) ||
        student.guardian.name.toLowerCase().includes(normalizedSearch) ||
        student.guardian.phone.includes(normalizedSearch);

      const matchesStatus = status === "ALL" || student.status === status;

      const matchesClass =
        classFilter === "ALL" || student.class === classFilter;

      return matchesSearch && matchesStatus && matchesClass;
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "balance":
          return b.balance - a.balance;

        case "status":
          return a.status.localeCompare(b.status);

        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [search, status, classFilter, sortBy]);

  const filteredSelectedCount = filteredStudents.filter((student) =>
    selectedStudentIds.includes(student.id),
  ).length;

  const allFilteredSelected =
    filteredStudents.length > 0 &&
    filteredSelectedCount === filteredStudents.length;

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredStudents.slice(startIndex, startIndex + pageSize);
  }, [filteredStudents, currentPage]);

  function toggleStudentSelection(studentId: string) {
    setSelectedStudentIds((current) =>
      current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId],
    );
  }

  function toggleSelectAll() {
    setSelectedStudentIds((current) =>
      allFilteredSelected ? [] : filteredStudents.map((student) => student.id),
    );
  }

  function sendRemainderToSelected() {
    if (selectedStudentIds.length === 0) {
      return;
    }

    const recipients = data.students.filter((student) =>
      selectedStudentIds.includes(student.id),
    );

    window.alert(
      `Remainder sent to ${recipients.length} student${
        recipients.length === 1 ? "" : "s"
      }.`,
    );
    console.log("Send remainder to selected:", recipients);
  }

  function sendRemainderToAllFiltered() {
    if (filteredStudents.length === 0) {
      return;
    }

    const recipients = filteredStudents;

    window.alert(
      `Remainder sent to ${recipients.length} student${
        recipients.length === 1 ? "" : "s"
      }.`,
    );
    console.log("Send remainder to all filtered:", recipients);
  }

  function resetFilters() {
    setSearch("");
    setStatus("ALL");
    setClassFilter("ALL");
    setSortBy("name");
    setCurrentPage(1);
    setSelectedStudentIds([]);
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9]">
      <Header data={data} />

      <main className="relative mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-64 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.08),transparent_65%)]" />

        <div className="relative z-10 space-y-8">
          {/* Page introduction */}
          <section>
            <p className="text-sm font-medium text-[#818CF8]">Fee Management</p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#F1F5F9] sm:text-3xl">
              Fee Collection Dashboard
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">
              Monitor student fee accounts, identify outstanding balances, and
              follow up on payments that need attention.
            </p>
          </section>

          <SummaryCards students={data.students} />

          <FeeToolbar
            search={search}
            status={status}
            classFilter={classFilter}
            sortBy={sortBy}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onClassChange={setClassFilter}
            onSortChange={setSortBy}
            onReset={resetFilters}
          />

          <StudentTable
            students={paginatedStudents}
            totalStudents={filteredStudents.length}
            currentPage={currentPage}
            totalPages={totalPages}
            selectedStudentIds={selectedStudentIds}
            selectedCount={filteredSelectedCount}
            allSelected={allFilteredSelected}
            onToggleStudentSelection={toggleStudentSelection}
            onToggleSelectAll={toggleSelectAll}
            onSendRemainder={sendRemainderToSelected}
            onSendRemainderToAllFiltered={sendRemainderToAllFiltered}
            onPageChange={setCurrentPage}
            onStudentSelect={setSelectedStudent}
          />
        </div>
      </main>

      <StudentDetailsPanel
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}

export default App;
