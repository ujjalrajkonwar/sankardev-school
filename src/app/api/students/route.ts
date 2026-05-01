import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";

type StoredStudent = {
  id?: string;
  roll?: string;
  roll_number?: string;
  name?: string;
  full_name?: string;
  class?: string;
  class_id?: number | null;
  phone?: string;
  is_fee_cleared?: boolean;
  created_at?: string;
};

type CreateStudentBody = {
  name?: string;
  roll?: string;
  className?: string;
  phone?: string;
};

function hasRealSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  return Boolean(url) && Boolean(anonKey) && !url.includes("your-project.supabase.co");
}

const DATA_FILE = path.join(process.cwd(), "data", "students.json");

async function readFallback() {
  try {
    await fs.promises.mkdir(path.dirname(DATA_FILE), { recursive: true });
    const raw = await fs.promises.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw || "[]") as unknown;
    return Array.isArray(parsed) ? (parsed as StoredStudent[]) : [];
  } catch {
    return [];
  }
}

async function writeFallback(items: StoredStudent[]) {
  await fs.promises.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.promises.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const className = url.searchParams.get("className") || undefined;

  if (hasRealSupabaseConfig()) {
    try {
      const supabase = await createServerClient();
      // Try to resolve class id
      if (className) {
        const { data: cls } = await supabase.from("classes").select("id").eq("name", className).limit(1).maybeSingle();
        if (!cls) return NextResponse.json([]);
        const { data } = await supabase
          .from("students")
          .select("id, roll_number, class_id, is_fee_cleared, created_at")
          .eq("class_id", cls.id)
          .order("created_at", { ascending: false });
        return NextResponse.json(data ?? []);
      }

      const { data } = await supabase
        .from("students")
        .select("id, roll_number, class_id, is_fee_cleared, created_at")
        .order("created_at", { ascending: false });
      return NextResponse.json(data ?? []);
    } catch (err) {
      return NextResponse.json({ error: "supabase_error", details: String(err) }, { status: 500 });
    }
  }

  // Fallback to file storage
  const items = await readFallback();
  const filtered = className ? items.filter((item) => item.class === className) : items;
  return NextResponse.json(filtered);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateStudentBody;
    const { name, roll, className, phone } = body;

    if (hasRealSupabaseConfig()) {
      try {
        const supabase = await createServerClient();
        // resolve or create class
        let classId: number | null = null;
        const { data: cls } = await supabase.from("classes").select("id").eq("name", className).limit(1).maybeSingle();
        if (cls && cls.id) classId = cls.id;
        else {
          const { data: inserted } = await supabase.from("classes").insert({ name: className }).select("id").single();
          classId = inserted?.id ?? null;
        }

        const toInsert: Pick<StoredStudent, "roll_number" | "class_id" | "is_fee_cleared"> = {
          roll_number: roll,
          class_id: classId,
          is_fee_cleared: false,
        };

        const { data: student, error } = await supabase.from("students").insert(toInsert).select("id,roll_number,class_id,created_at").single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        // return a richer object including name & phone so the UI can show a profile even if the DB doesn't store the name directly
        return NextResponse.json({ ...student, name, phone });
      } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
      }
    }

    // Fallback file-based storage
    const items = await readFallback();
    const id = crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString();
    const newStudent: StoredStudent = { id, roll, name, class: className, phone, is_fee_cleared: false, created_at: new Date().toISOString() };
    items.unshift(newStudent);
    await writeFallback(items);
    return NextResponse.json(newStudent);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}
