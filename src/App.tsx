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

  function resetFilters() {
    setSearch("");
    setStatus("ALL");
    setClassFilter("ALL");
    setSortBy("name");
    setCurrentPage(1);
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
