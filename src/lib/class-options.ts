import { createClient } from "@/lib/supabase/client";

export const FALLBACK_CLASS_OPTIONS = [
  "Ankur",
  "Mukul",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

export type ClassOption = {
  id: number;
  name: string;
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

export async function fetchClassOptions(): Promise<ClassOption[]> {
  try {
    if (!hasRealSupabaseConfig()) {
      return FALLBACK_CLASS_OPTIONS.map((name, index) => ({
        id: index + 1,
        name,
      }));
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("classes")
      .select("id, name")
      .order("id", { ascending: true });

    if (error || !data?.length) {
      return FALLBACK_CLASS_OPTIONS.map((name, index) => ({
        id: index + 1,
        name,
      }));
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  } catch {
    return FALLBACK_CLASS_OPTIONS.map((name, index) => ({
      id: index + 1,
      name,
    }));
  }
}