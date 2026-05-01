"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, Search, ToggleLeft, ToggleRight } from "lucide-react";
import { FALLBACK_CLASS_OPTIONS, fetchClassOptions, type ClassOption } from "@/lib/class-options";
import StudentProfileModal, { type ProfileStudent } from "@/components/shared/StudentProfileModal";

type StudentRow = ProfileStudent & {
  roll: string;
  name: string;
  class: string;
  phone: string;
  feeCleared: boolean;
};

type ApiStudentRow = {
  id?: string;
  roll?: string;
  roll_number?: string;
  name?: string;
  full_name?: string;
  class?: string;
  class_name?: string;
  class_id?: number;
  phone?: string;
  is_fee_cleared?: boolean;
  feeCleared?: boolean;
  created_at?: string;
};

const DEMO_STUDENTS: StudentRow[] = [
  { roll: "S001", name: "Aarav Sharma", class: "Ankur", phone: "+91 98765 43210", feeCleared: true },
  { roll: "S002", name: "Priya Das", class: "Mukul", phone: "+91 98765 43211", feeCleared: false },
  { roll: "S003", name: "Rahul Singh", class: "1", phone: "+91 98765 43212", feeCleared: true },
  { roll: "S004", name: "Sneha Roy", class: "2", phone: "+91 98765 43213", feeCleared: true },
  { roll: "S005", name: "Amit Kumar", class: "3", phone: "+91 98765 43214", feeCleared: false },
  { roll: "S006", name: "Neha Gupta", class: "4", phone: "+91 98765 43215", feeCleared: true },
];

function normalizeStudent(row: ApiStudentRow, fallbackClass: string): StudentRow {
  const roll = row.roll ?? row.roll_number ?? "";
  const feeCleared = row.is_fee_cleared ?? row.feeCleared ?? false;

  return {
    id: row.id,
    roll,
    roll_number: row.roll_number ?? roll,
    name: row.name ?? row.full_name ?? "-",
    class: row.class ?? row.class_name ?? fallbackClass,
    class_id: row.class_id,
    phone: row.phone ?? "",
    feeCleared,
    is_fee_cleared: feeCleared,
    created_at: row.created_at,
  };
}

function isApiStudentRow(value: unknown): value is ApiStudentRow {
  return Boolean(value) && typeof value === "object";
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRow[]>(DEMO_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState("");
  const [addRoll, setAddRoll] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [activeStudent, setActiveStudent] = useState<StudentRow | null>(null);
  const [classOptions, setClassOptions] = useState<ClassOption[]>(
    FALLBACK_CLASS_OPTIONS.map((name, index) => ({ id: index + 1, name }))
  );
  const [selectedClass, setSelectedClass] = useState("Ankur");

  useEffect(() => {
    fetchClassOptions().then(setClassOptions);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/students?className=${encodeURIComponent(selectedClass)}`);
        if (!res.ok) return;

        const data = (await res.json()) as unknown;
        if (Array.isArray(data)) {
          setStudents(data.filter(isApiStudentRow).map((row) => normalizeStudent(row, selectedClass)));
        }
      } catch {
        setStudents(DEMO_STUDENTS);
      }
    }

    void load();
  }, [selectedClass]);

  const toggleFee = (roll: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.roll === roll
          ? { ...student, feeCleared: !student.feeCleared, is_fee_cleared: !student.feeCleared }
          : student
      )
    );
  };

  const handleAddStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newStudent: StudentRow = {
      roll: addRoll.trim(),
      roll_number: addRoll.trim(),
      name: addName.trim(),
      class: selectedClass,
      phone: addPhone.trim(),
      feeCleared: false,
      is_fee_cleared: false,
    };

    if (!newStudent.roll || !newStudent.name) return;

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStudent.name,
          roll: newStudent.roll,
          className: selectedClass,
          phone: newStudent.phone,
        }),
      });
      const payload = (await response.json()) as unknown;

      if (response.ok && isApiStudentRow(payload)) {
        setStudents((prev) => [normalizeStudent(payload, selectedClass), ...prev]);
      } else {
        setStudents((prev) => [newStudent, ...prev]);
      }
    } catch {
      setStudents((prev) => [newStudent, ...prev]);
    } finally {
      setAddName("");
      setAddRoll("");
      setAddPhone("");
      setShowAdd(false);
    }
  };

  const filtered = students.filter(
    (student) =>
      student.class === selectedClass &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.roll.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Students</h1>
        <p className="text-sm text-[--color-muted-foreground]">Manage student records and fee status.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full sm:w-56">
          <label className="label-text mb-2 block">Class</label>
          <select
            value={selectedClass}
            onChange={(event) => setSelectedClass(event.target.value)}
            className="w-full px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm bg-white"
          >
            {classOptions.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex items-center gap-3">
          <div className="text-sm text-[--color-muted-foreground] pt-6 sm:pt-0">
            Showing class: <span className="font-medium text-primary">{selectedClass}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setShowAdd((value) => !value)} className="btn-primary text-sm inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Student
            </button>
          </div>
        </div>
      </div>

      {showAdd && (
        <form onSubmit={handleAddStudent} className="grid gap-3 rounded-[--radius-xl] border border-[--color-border] bg-white p-4 sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input
            value={addName}
            onChange={(event) => setAddName(event.target.value)}
            placeholder="Student name"
            className="px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm"
          />
          <input
            value={addRoll}
            onChange={(event) => setAddRoll(event.target.value)}
            placeholder="Roll number"
            className="px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm"
          />
          <input
            value={addPhone}
            onChange={(event) => setAddPhone(event.target.value)}
            placeholder="Phone"
            className="px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm"
          />
          <button type="submit" className="btn-outline text-sm justify-center">
            Save
          </button>
        </form>
      )}

      <div className="bg-white rounded-[--radius-xl] border border-[--color-border] overflow-hidden">
        <div className="p-4 border-b border-[--color-border]">
          <div className="flex items-center gap-2 px-3 py-2 rounded-[--radius-md] bg-[--color-muted] max-w-sm">
            <Search className="w-4 h-4 text-[--color-muted-foreground]" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="flex-1 text-sm bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[--color-muted]/50 border-b border-[--color-border]">
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Roll</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Class</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Phone</th>
                <th className="text-center px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Fee Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id ?? student.roll} className="border-b border-[--color-border]/50 hover:bg-[--color-muted]/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{student.roll}</td>
                  <td
                    onClick={() => setActiveStudent(student)}
                    className="px-4 py-3 font-medium text-primary cursor-pointer"
                  >
                    {student.name}
                  </td>
                  <td className="px-4 py-3 text-[--color-muted-foreground]">{student.class}</td>
                  <td className="px-4 py-3 text-[--color-muted-foreground]">{student.phone}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleFee(student.roll)} className="inline-flex items-center gap-2">
                      {student.feeCleared ? (
                        <>
                          <ToggleRight className="w-6 h-6 text-[--color-success]" />
                          <span className="text-xs text-[--color-success] font-medium">Cleared</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-6 h-6 text-[--color-danger]" />
                          <span className="text-xs text-[--color-danger] font-medium">Pending</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StudentProfileModal
        open={Boolean(activeStudent)}
        onClose={() => setActiveStudent(null)}
        student={activeStudent}
      />
    </div>
  );
}
