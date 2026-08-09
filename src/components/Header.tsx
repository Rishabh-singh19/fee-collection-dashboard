import type { FeeData } from "../types/fee";

interface HeaderProps {
  data: FeeData;
}

function Header({ data }: HeaderProps) {
  const { school, academicYear, term, dueDate } = data.meta;

  const formattedDueDate = new Date(dueDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="border-b border-[#334155] bg-[#0F172A]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#818CF8] text-lg font-bold text-[#0F172A] shadow-lg shadow-[#818CF8]/10">
            VV
          </div>

          {/* School information */}
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-[#F1F5F9]">
              {school}
            </h1>

            <div className="mt-1 flex items-center gap-2 text-sm text-[#94A3B8]">
              <span>{academicYear}</span>

              <span className="text-[#334155]">•</span>

              <span>{term}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hidden items-center gap-6 sm:flex">
          {/* Due date */}
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Fee Due Date
            </p>

            <p className="mt-1 text-sm font-semibold text-[#F1F5F9]">
              {formattedDueDate}
            </p>
          </div>

          {/* Divider */}
          <div className="h-9 w-px bg-[#334155]" />

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#334155] bg-[#1E293B] text-sm font-semibold text-[#818CF8]">
              LA
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium text-[#F1F5F9]">
                Lakshmi
              </p>

              <p className="text-xs text-[#94A3B8]">
                Accounts Officer
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;