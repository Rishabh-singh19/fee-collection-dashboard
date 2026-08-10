import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import FeeToolbar from "./components/FeeToolbar";
import StudentTable from "./components/StudentTable";
import StudentDetailsPanel from "./components/StudentDetailsPanel";

import type { FeeData, FeeStatus, Student } from "./types/fee";

type SortOption = "name" | "balance" | "daysOverdue";

type ReminderFilter = "ALL" | "CONTACTED" | "NEVER_CONTACTED";

type StatusFilter = FeeStatus | "ALL" | "OTHER";

function App() {
  const [data, setData] = useState<FeeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [classFilter, setClassFilter] = useState("ALL");
  const [reminderFilter, setReminderFilter] = useState<ReminderFilter>("ALL");
  const [minDue, setMinDue] = useState<number | "">("");
  const [maxDue, setMaxDue] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<SortOption>("name");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const actionTimeoutRef = useRef<number | null>(null);
  const pageSize = 15;

  const loadFeeData = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await fetch(
        new URL("./data/fee-data.json", import.meta.url),
      );
      if (!response.ok) {
        throw new Error(`Failed to load fee data (${response.status})`);
      }

      const json = (await response.json()) as FeeData;
      setData(json);
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Unable to load fee data.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeeData();
  }, [loadFeeData]);

  const filteredStudents = useMemo(() => {
    if (!data) {
      return [];
    }

    const normalizedSearch = search.trim().toLowerCase();

    const result = data.students.filter((student) => {
      const matchesSearch =
        normalizedSearch === "" ||
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.admissionNo.toLowerCase().includes(normalizedSearch) ||
        student.guardian.name.toLowerCase().includes(normalizedSearch) ||
        student.guardian.phone.includes(normalizedSearch);

      const matchesStatus =
        status === "ALL" ||
        (status === "OTHER"
          ? !["OVERDUE", "PARTIALLY_PAID", "PAID"].includes(student.status)
          : student.status === status);

      const matchesClass =
        classFilter === "ALL" || student.class === classFilter;

      const matchesReminder =
        reminderFilter === "ALL" ||
        (reminderFilter === "CONTACTED"
          ? student.remindersSent > 0 || Boolean(student.lastReminderAt)
          : student.remindersSent === 0 && !student.lastReminderAt);

      const dueAmount = Math.max(student.balance, 0);
      const matchesAmount =
        (minDue === "" || dueAmount >= minDue) &&
        (maxDue === "" || dueAmount <= maxDue);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesClass &&
        matchesReminder &&
        matchesAmount
      );
    });

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case "balance":
          return b.balance - a.balance;

        case "daysOverdue":
          return b.daysOverdue - a.daysOverdue;

        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [
    data,
    search,
    status,
    classFilter,
    reminderFilter,
    minDue,
    maxDue,
    sortBy,
  ]);

  const selectedCount = selectedStudentIds.length;

  const filteredSelectedCount = filteredStudents.filter((student) =>
    selectedStudentIds.includes(student.id),
  ).length;

  const selectedHouseholdCount = useMemo(
    () =>
      new Set(
        data?.students
          .filter((student) => selectedStudentIds.includes(student.id))
          .map((student) => student.familyId),
      ).size,
    [data, selectedStudentIds],
  );

  const filteredHouseholdCount = useMemo(
    () => new Set(filteredStudents.map((student) => student.familyId)).size,
    [filteredStudents],
  );

  const activeFilterCount = [
    search.trim() !== "",
    status !== "ALL",
    reminderFilter !== "ALL",
    classFilter !== "ALL",
    minDue !== "",
    maxDue !== "",
  ].filter(Boolean).length;

  const allFilteredSelected =
    filteredStudents.length > 0 &&
    filteredSelectedCount === filteredStudents.length;

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));

  const emptyStateMessage = useMemo(() => {
    if (filteredStudents.length > 0) {
      return "";
    }

    if (search.trim() !== "") {
      return "No students match your search.";
    }

    if (status === "OVERDUE") {
      return "Great — no overdue students found.";
    }

    if (activeFilterCount > 0) {
      return "No students match your filter criteria.";
    }

    return "No students found.";
  }, [filteredStudents.length, search, status, activeFilterCount]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, classFilter, reminderFilter, minDue, maxDue]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        const active = document.activeElement;
        if (
          active instanceof HTMLElement &&
          (active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            active.tagName === "SELECT" ||
            active.isContentEditable)
        ) {
          return;
        }

        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === "Escape") {
        if (selectedStudent) {
          setSelectedStudent(null);
          return;
        }

        if (isFilterPanelOpen) {
          setIsFilterPanelOpen(false);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStudent, isFilterPanelOpen]);

  function clearActionTimeout() {
    if (actionTimeoutRef.current !== null) {
      window.clearTimeout(actionTimeoutRef.current);
      actionTimeoutRef.current = null;
    }
  }

  function showActionFeedback(message: string) {
    clearActionTimeout();
    setActionMessage(message);
    actionTimeoutRef.current = window.setTimeout(() => {
      setActionMessage(null);
      actionTimeoutRef.current = null;
    }, 3200);
  }

  function getHouseholdCount(students: Student[]) {
    return new Set(students.map((student) => student.familyId)).size;
  }

  function sendReminderToSelected() {
    if (selectedStudentIds.length === 0 || !data) {
      return;
    }

    const recipients = data.students.filter((student) =>
      selectedStudentIds.includes(student.id),
    );
    const householdCount = getHouseholdCount(recipients);

    setActionMessage("Sending reminders…");
    clearActionTimeout();
    actionTimeoutRef.current = window.setTimeout(() => {
      showActionFeedback(
        `✓ Reminder sent to ${recipients.length} students across ${householdCount} household${
          householdCount === 1 ? "" : "s"
        }.`,
      );
      console.log("Send reminder to selected:", recipients);
    }, 700);
  }

  function sendReminderToAllFiltered() {
    if (filteredStudents.length === 0 || !data) {
      return;
    }

    const householdCount = getHouseholdCount(filteredStudents);

    setActionMessage("Sending reminders…");
    clearActionTimeout();
    actionTimeoutRef.current = window.setTimeout(() => {
      showActionFeedback(
        `✓ Reminder sent to ${filteredStudents.length} students across ${householdCount} household${
          householdCount === 1 ? "" : "s"
        }.`,
      );
      console.log("Send reminder to all filtered:", filteredStudents);
    }, 700);
  }

  function resetFilters() {
    setSearch("");
    setStatus("ALL");
    setReminderFilter("ALL");
    setClassFilter("ALL");
    setMinDue("");
    setMaxDue("");
    setSortBy("name");
    setCurrentPage(1);
    setSelectedStudentIds([]);
  }

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
    setSelectedStudentIds(() =>
      allFilteredSelected ? [] : filteredStudents.map((student) => student.id),
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9]">
        <main className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#334155] bg-[#1E293B] p-8">
            <div className="mb-8 space-y-4">
              <div className="h-8 w-64 animate-pulse rounded-2xl bg-[#334155]" />
              <div className="h-6 w-80 animate-pulse rounded-lg bg-[#334155]" />
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-3xl bg-[#0F172A]"
                />
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-[#334155] bg-[#0F172A] p-8">
              <div className="h-12 w-56 animate-pulse rounded-2xl bg-[#334155]" />
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-20 animate-pulse rounded-3xl bg-[#334155]"
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (loadError || !data) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9]">
        <main className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 lg:px-8">
          <section className="rounded-3xl border border-[#334155] bg-[#1E293B] p-10 text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#334155] text-2xl">
              !
            </div>
            <h1 className="text-2xl font-semibold text-[#F1F5F9]">
              Unable to load fee data
            </h1>
            <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
              {loadError ?? "Something went wrong while loading the dashboard."}
            </p>
            <button
              type="button"
              onClick={loadFeeData}
              className="mt-8 rounded-2xl bg-[#818CF8] px-6 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#A5B4FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#818CF8] focus-visible:outline-offset-2"
            >
              Try again
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9]">
      <Header data={data} />

      <main className="relative mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-64 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.08),transparent_65%)]" />

        <div className="relative z-10 space-y-8">
          <SummaryCards students={data.students} />

          <FeeToolbar
            search={search}
            status={status}
            reminderFilter={reminderFilter}
            classFilter={classFilter}
            minDue={minDue}
            maxDue={maxDue}
            sortBy={sortBy}
            activeFilterCount={activeFilterCount}
            isFilterPanelOpen={isFilterPanelOpen}
            searchInputRef={searchInputRef}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onReminderFilterChange={setReminderFilter}
            onClassChange={setClassFilter}
            onMinDueChange={setMinDue}
            onMaxDueChange={setMaxDue}
            onSortChange={setSortBy}
            onReset={resetFilters}
            onToggleFilters={() => setIsFilterPanelOpen((current) => !current)}
          />

          {actionMessage ? (
            <div className="rounded-2xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-[#A5F3FC] shadow-sm sm:px-5">
              {actionMessage}
            </div>
          ) : null}

          <StudentTable
            students={paginatedStudents}
            totalStudents={filteredStudents.length}
            currentPage={currentPage}
            totalPages={totalPages}
            selectedStudentIds={selectedStudentIds}
            selectedCount={selectedCount}
            selectedVisibleCount={filteredSelectedCount}
            selectedHouseholdCount={selectedHouseholdCount}
            filteredHouseholdCount={filteredHouseholdCount}
            allSelected={allFilteredSelected}
            emptyStateMessage={emptyStateMessage}
            onToggleStudentSelection={toggleStudentSelection}
            onToggleSelectAll={toggleSelectAll}
            onSendReminder={sendReminderToSelected}
            onSendReminderToAllFiltered={sendReminderToAllFiltered}
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
