"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, GraduationCap, UserRound, X } from "lucide-react";

export type ProfileStudent = {
  id?: string;
  student_id?: string;
  roll?: string;
  roll_number?: string;
  name?: string;
  full_name?: string;
  class?: string;
  class_name?: string;
  class_id?: number | string;
  phone?: string;
  parent?: string;
  status?: string;
  application_id?: string;
  feeCleared?: boolean;
  is_fee_cleared?: boolean;
  created_at?: string;
  date?: string;
};

type SubjectResult = {
  name?: string;
  subject?: string;
  marks?: number | string;
  total?: number | string;
  grade?: string;
};

type RecentResult = {
  id: string;
  exam_type: string;
  academic_year?: string;
  subjects?: SubjectResult[];
  total_marks?: number | null;
  percentage?: number | string | null;
  rank?: number | null;
  published?: boolean | null;
  created_at?: string;
};

type RecentAttendance = {
  id?: string;
  date: string;
  status: "present" | "absent" | "late" | "holiday" | string;
};

type ProfileDetails = {
  student?: ProfileStudent;
  recentResults: RecentResult[];
  recentAttendance: RecentAttendance[];
  attendanceSummary: Record<string, number>;
};

type Props = {
  open: boolean;
  onClose: () => void;
  student: ProfileStudent | null;
};

const emptyProfile: ProfileDetails = {
  recentResults: [],
  recentAttendance: [],
  attendanceSummary: {},
};

function displayName(student: ProfileStudent) {
  return student.name ?? student.full_name ?? student.roll ?? student.roll_number ?? "Student";
}

function displayRoll(student: ProfileStudent) {
  return student.roll ?? student.roll_number ?? "-";
}

function displayClass(student: ProfileStudent) {
  return student.class ?? student.class_name ?? student.class_id ?? "-";
}

function displayFeeStatus(student: ProfileStudent) {
  const cleared = student.is_fee_cleared ?? student.feeCleared;
  if (typeof cleared !== "boolean") return "-";
  return cleared ? "Cleared" : "Pending";
}

function formatExamType(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusClass(status: string) {
  if (status === "present") return "bg-[--color-success]/10 text-[--color-success]";
  if (status === "absent") return "bg-[--color-danger]/10 text-[--color-danger]";
  if (status === "late") return "bg-[--color-warning]/10 text-[--color-warning]";
  return "bg-[--color-muted] text-[--color-muted-foreground]";
}

function topSubjects(subjects?: SubjectResult[]) {
  if (!subjects?.length) return "No subject rows";
  return subjects
    .slice(0, 3)
    .map((subject) => {
      const label = subject.name ?? subject.subject ?? "Subject";
      const marks = subject.marks ?? "-";
      const total = subject.total ? `/${subject.total}` : "";
      return `${label}: ${marks}${total}`;
    })
    .join(", ");
}

function buildProfileQuery(student: ProfileStudent) {
  const params = new URLSearchParams();
  const id = student.student_id ?? student.id;
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (id && uuidPattern.test(id)) {
    params.set("studentId", id);
  }

  const roll = student.roll ?? student.roll_number;
  if (roll) params.set("roll", roll);

  const className = student.class ?? student.class_name;
  if (className) params.set("className", String(className));

  return params;
}

function definedStudentFields(student?: ProfileStudent) {
  if (!student) return {};

  return Object.fromEntries(
    Object.entries(student).filter(([, value]) => value !== undefined && value !== null && value !== "")
  ) as ProfileStudent;
}

export default function StudentProfileModal({ open, onClose, student }: Props) {
  const [details, setDetails] = useState<ProfileDetails>(emptyProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryString = useMemo(() => {
    if (!student) return "";
    return buildProfileQuery(student).toString();
  }, [student]);

  const mergedStudent = student
    ? ({
        ...student,
        ...definedStudentFields(details.student),
      } satisfies ProfileStudent)
    : null;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (!open || !student) return;

    const controller = new AbortController();

    async function loadProfile() {
      if (!queryString) {
        setDetails(emptyProfile);
        setLoading(false);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/students/profile?${queryString}`, {
          signal: controller.signal,
        });
        const payload = (await response.json()) as ProfileDetails & { error?: string };

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to load profile details.");
        }

        setDetails({
          student: payload.student,
          recentResults: payload.recentResults ?? [],
          recentAttendance: payload.recentAttendance ?? [],
          attendanceSummary: payload.attendanceSummary ?? {},
        });
      } catch (fetchError) {
        if (controller.signal.aborted) return;
        setDetails(emptyProfile);
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load profile details.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadProfile();

    return () => controller.abort();
  }, [open, queryString, student]);

  if (!open || !student || !mergedStudent) return null;

  const summary = details.attendanceSummary;
  const totalAttendance = Object.values(summary).reduce((total, count) => total + count, 0);
  const presentCount = summary.present ?? 0;
  const attendancePercent = totalAttendance
    ? Math.round((presentCount / totalAttendance) * 100)
    : null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close student profile"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-6">
        <section
          aria-labelledby="student-profile-title"
          aria-modal="true"
          className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[--radius-xl] bg-white shadow-[--shadow-elevated]"
          role="dialog"
        >
          <header className="flex items-start justify-between gap-4 border-b border-[--color-border] p-5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <UserRound className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 id="student-profile-title" className="truncate text-lg font-semibold text-primary">
                  {displayName(mergedStudent)}
                </h2>
                <p className="text-xs text-[--color-muted-foreground]">
                  Roll {displayRoll(mergedStudent)} &middot; Class {displayClass(mergedStudent)}
                </p>
              </div>
            </div>
            <button
              aria-label="Close"
              className="rounded-full p-2 text-[--color-muted-foreground] transition-colors hover:bg-[--color-muted] hover:text-primary"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="space-y-5 p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[--radius-lg] border border-[--color-border] p-4">
                <p className="label-text mb-1">Fee Status</p>
                <p className="text-sm font-semibold text-primary">{displayFeeStatus(mergedStudent)}</p>
              </div>
              <div className="rounded-[--radius-lg] border border-[--color-border] p-4">
                <p className="label-text mb-1">Phone</p>
                <p className="text-sm font-semibold text-primary">{mergedStudent.phone ?? "-"}</p>
              </div>
              <div className="rounded-[--radius-lg] border border-[--color-border] p-4">
                <p className="label-text mb-1">Attendance</p>
                <p className="text-sm font-semibold text-primary">
                  {attendancePercent === null ? "-" : `${attendancePercent}% present`}
                </p>
              </div>
              <div className="rounded-[--radius-lg] border border-[--color-border] p-4">
                <p className="label-text mb-1">Added</p>
                <p className="text-sm font-semibold text-primary">{formatDate(mergedStudent.created_at ?? mergedStudent.date)}</p>
              </div>
            </div>

            {error && (
              <div className="rounded-[--radius-md] border border-[--color-danger]/20 bg-[--color-danger]/5 p-3 text-sm text-[--color-danger]">
                {error}
              </div>
            )}

            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-[--radius-lg] border border-[--color-border]">
                <div className="flex items-center gap-2 border-b border-[--color-border] px-4 py-3">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-primary">Recent Results</h3>
                </div>
                <div className="divide-y divide-[--color-border]">
                  {loading ? (
                    <p className="p-4 text-sm text-[--color-muted-foreground]">Loading results...</p>
                  ) : details.recentResults.length ? (
                    details.recentResults.map((result) => (
                      <div key={result.id} className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-primary">{formatExamType(result.exam_type)}</p>
                            <p className="mt-1 text-xs text-[--color-muted-foreground]">
                              {topSubjects(result.subjects)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-primary">
                              {result.percentage == null ? "-" : `${Number(result.percentage).toFixed(1)}%`}
                            </p>
                            {result.rank ? (
                              <p className="text-xs text-[--color-muted-foreground]">Rank #{result.rank}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-[--color-muted-foreground]">No recent result records found.</p>
                  )}
                </div>
              </section>

              <section className="rounded-[--radius-lg] border border-[--color-border]">
                <div className="flex items-center gap-2 border-b border-[--color-border] px-4 py-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-primary">Recent Attendance</h3>
                </div>
                <div className="divide-y divide-[--color-border]">
                  {loading ? (
                    <p className="p-4 text-sm text-[--color-muted-foreground]">Loading attendance...</p>
                  ) : details.recentAttendance.length ? (
                    details.recentAttendance.map((entry) => (
                      <div key={`${entry.date}-${entry.status}`} className="flex items-center justify-between gap-3 p-4">
                        <p className="text-sm font-medium text-primary">{formatDate(entry.date)}</p>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClass(entry.status)}`}>
                          {entry.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-[--color-muted-foreground]">No recent attendance records found.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
