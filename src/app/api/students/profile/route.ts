import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";

type StudentRow = {
  id: string;
  profile_id: string | null;
  parent_id: string | null;
  class_id: number | null;
  roll_number: string;
  admission_number: string | null;
  date_of_birth: string | null;
  is_fee_cleared: boolean | null;
  created_at: string | null;
};

type ClassRow = {
  id: number;
  name: string;
  section: string | null;
};

type ProfileRow = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
};

type SubjectResult = {
  name?: string;
  subject?: string;
  marks?: number | string;
  total?: number | string;
  grade?: string;
};

type ResultRow = {
  id: string;
  exam_type: string;
  academic_year: string | null;
  subjects: SubjectResult[] | null;
  total_marks: number | null;
  percentage: number | string | null;
  rank: number | null;
  published: boolean | null;
  created_at: string | null;
};

type AttendanceRow = {
  id: string;
  date: string;
  status: string;
};

function hasRealSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return (
    Boolean(url) &&
    Boolean(anonKey) &&
    !url.includes("your-project.supabase.co")
  );
}

function normalizeSubjects(subjects: unknown): SubjectResult[] {
  if (!Array.isArray(subjects)) return [];

  return subjects
    .filter((subject): subject is Record<string, unknown> => Boolean(subject) && typeof subject === "object")
    .map((subject) => ({
      name: typeof subject.name === "string" ? subject.name : undefined,
      subject: typeof subject.subject === "string" ? subject.subject : undefined,
      marks:
        typeof subject.marks === "number" || typeof subject.marks === "string"
          ? subject.marks
          : undefined,
      total:
        typeof subject.total === "number" || typeof subject.total === "string"
          ? subject.total
          : undefined,
      grade: typeof subject.grade === "string" ? subject.grade : undefined,
    }));
}

function fallbackResponse(roll: string | null, className: string | null) {
  return NextResponse.json({
    student: roll
      ? {
          roll,
          class: className ?? undefined,
        }
      : undefined,
    recentResults: [],
    recentAttendance: [],
    attendanceSummary: {},
  });
}

async function resolveStudent({
  className,
  roll,
  studentId,
}: {
  className: string | null;
  roll: string | null;
  studentId: string | null;
}) {
  const supabase = await createServerClient();

  if (studentId) {
    const { data, error } = await supabase
      .from("students")
      .select(
        "id, profile_id, parent_id, class_id, roll_number, admission_number, date_of_birth, is_fee_cleared, created_at"
      )
      .eq("id", studentId)
      .maybeSingle<StudentRow>();

    if (error) throw error;
    if (data) return { supabase, student: data };
  }

  if (!roll) {
    return { supabase, student: null };
  }

  let classId: number | null = null;

  if (className) {
    const { data: classRow, error: classError } = await supabase
      .from("classes")
      .select("id")
      .eq("name", className)
      .limit(1)
      .maybeSingle<{ id: number }>();

    if (classError) throw classError;
    classId = classRow?.id ?? null;
  }

  let query = supabase
    .from("students")
    .select(
      "id, profile_id, parent_id, class_id, roll_number, admission_number, date_of_birth, is_fee_cleared, created_at"
    )
    .eq("roll_number", roll)
    .order("created_at", { ascending: false })
    .limit(1);

  if (classId) query = query.eq("class_id", classId);

  const { data, error } = await query.maybeSingle<StudentRow>();
  if (error) throw error;

  return { supabase, student: data };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const studentId = url.searchParams.get("studentId");
  const roll = url.searchParams.get("roll");
  const className = url.searchParams.get("className");

  if (!hasRealSupabaseConfig()) {
    return fallbackResponse(roll, className);
  }

  try {
    const { supabase, student } = await resolveStudent({
      className,
      roll,
      studentId,
    });

    if (!student) {
      return NextResponse.json({
        student: roll ? { roll, class: className ?? undefined } : undefined,
        recentResults: [],
        recentAttendance: [],
        attendanceSummary: {},
      });
    }

    const [classResult, profileResult, resultsResult, attendanceResult] = await Promise.all([
      student.class_id
        ? supabase
            .from("classes")
            .select("id, name, section")
            .eq("id", student.class_id)
            .maybeSingle<ClassRow>()
        : Promise.resolve({ data: null, error: null }),
      student.profile_id
        ? supabase
            .from("profiles")
            .select("id, full_name, phone, email")
            .eq("id", student.profile_id)
            .maybeSingle<ProfileRow>()
        : Promise.resolve({ data: null, error: null }),
      supabase
        .from("results")
        .select("id, exam_type, academic_year, subjects, total_marks, percentage, rank, published, created_at")
        .eq("student_id", student.id)
        .order("created_at", { ascending: false })
        .limit(3),
      supabase
        .from("attendance")
        .select("id, date, status")
        .eq("student_id", student.id)
        .order("date", { ascending: false })
        .limit(10),
    ]);

    if (classResult.error) throw classResult.error;
    if (profileResult.error) throw profileResult.error;
    if (resultsResult.error) throw resultsResult.error;
    if (attendanceResult.error) throw attendanceResult.error;

    const recentAttendance = (attendanceResult.data ?? []) as AttendanceRow[];
    const attendanceSummary = recentAttendance.reduce<Record<string, number>>((summary, entry) => {
      summary[entry.status] = (summary[entry.status] ?? 0) + 1;
      return summary;
    }, {});

    const recentResults = ((resultsResult.data ?? []) as ResultRow[]).map((result) => ({
      ...result,
      subjects: normalizeSubjects(result.subjects),
    }));

    return NextResponse.json({
      student: {
        id: student.id,
        roll_number: student.roll_number,
        class_id: student.class_id,
        class_name: classResult.data?.name ?? className ?? undefined,
        name: profileResult.data?.full_name ?? undefined,
        phone: profileResult.data?.phone ?? undefined,
        is_fee_cleared: student.is_fee_cleared ?? false,
        created_at: student.created_at,
      },
      recentResults,
      recentAttendance,
      attendanceSummary,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to load student profile.",
      },
      { status: 500 }
    );
  }
}
