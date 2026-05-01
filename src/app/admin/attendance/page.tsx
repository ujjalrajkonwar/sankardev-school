"use client";

import { useEffect, useState } from "react";
import { Upload, Check, X as XIcon, Clock, Search } from "lucide-react";
import { FALLBACK_CLASS_OPTIONS, fetchClassOptions, type ClassOption } from "@/lib/class-options";
import StudentProfileModal, { type ProfileStudent } from "@/components/shared/StudentProfileModal";

type AttendanceStudent = ProfileStudent & {
  roll: string;
  name: string;
  class?: string;
};

const STUDENTS_BY_CLASS: Record<string, AttendanceStudent[]> = {
  Ankur: [
    { roll: "S001", name: "Aarav Sharma" },
    { roll: "S007", name: "Vikash Pal" },
    { roll: "S008", name: "Tanvi Ghosh" },
  ],
  Mukul: [
    { roll: "S002", name: "Priya Das" },
    { roll: "S005", name: "Amit Kumar" },
    { roll: "S011", name: "Suman Roy" },
  ],
  "1": [
    { roll: "S014", name: "Anaya Das" },
    { roll: "S015", name: "Rohan Paul" },
  ],
  "2": [
    { roll: "S016", name: "Meera Sen" },
    { roll: "S017", name: "Kabir Roy" },
  ],
  "3": [
    { roll: "S018", name: "Ishita Borah" },
    { roll: "S019", name: "Nikhil Das" },
  ],
  "4": [
    { roll: "S020", name: "Aritra Dutta" },
    { roll: "S021", name: "Riya Hazarika" },
  ],
  "5": [
    { roll: "S022", name: "Soham Sarkar" },
    { roll: "S023", name: "Anushka Baruah" },
  ],
  "6": [
    { roll: "S024", name: "Debojit Gogoi" },
    { roll: "S025", name: "Pallabi Deka" },
  ],
  "7": [
    { roll: "S026", name: "Arjun Sharma" },
    { roll: "S027", name: "Madhurima Das" },
  ],
  "8": [
    { roll: "S028", name: "Rahul Singh" },
    { roll: "S029", name: "Sneha Roy" },
  ],
  "9": [
    { roll: "S030", name: "Amit Kumar" },
    { roll: "S031", name: "Neha Gupta" },
  ],
  "10": [
    { roll: "S032", name: "Tanmay Bora" },
    { roll: "S033", name: "Rupali Das" },
  ],
};

export default function AdminAttendancePage() {
  const [classOptions, setClassOptions] = useState<ClassOption[]>(
    FALLBACK_CLASS_OPTIONS.map((name, index) => ({ id: index + 1, name }))
  );
  const [selectedClass, setSelectedClass] = useState("Ankur");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStudent, setActiveStudent] = useState<AttendanceStudent | null>(null);
  const [attendance, setAttendance] = useState<Record<string, "present"|"absent"|"late">>({});
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetchClassOptions().then(setClassOptions);
  }, []);

  const students = STUDENTS_BY_CLASS[selectedClass] || [];

  const markAttendance = (roll: string, status: "present"|"absent"|"late") => {
    setAttendance(prev => ({ ...prev, [roll]: status }));
  };

  const markAll = (status: "present"|"absent"|"late") => {
    const all: Record<string, "present"|"absent"|"late"> = {};
    students.forEach(s => { all[s.roll] = status; });
    setAttendance(all);
  };

  const statusIcon = (status?: string) => {
    if (status === "present") return <Check className="w-4 h-4 text-[--color-success]" />;
    if (status === "absent") return <XIcon className="w-4 h-4 text-[--color-danger]" />;
    if (status === "late") return <Clock className="w-4 h-4 text-[--color-warning]" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Attendance</h1>
          <p className="text-sm text-[--color-muted-foreground]">Mark daily attendance or upload via CSV.</p>
        </div>
        <button onClick={() => setShowUpload(!showUpload)} className="btn-outline text-sm"><Upload className="w-4 h-4" />Upload CSV</button>
      </div>

      {showUpload && (
        <div className="bg-white rounded-[--radius-xl] border-2 border-dashed border-[--color-border] p-8 text-center">
          <Upload className="w-10 h-10 text-[--color-muted-foreground] mx-auto mb-3" />
          <p className="font-medium text-primary text-sm mb-1">Upload Attendance CSV</p>
          <p className="text-xs text-[--color-muted-foreground]">Required: Roll Number, Date, Status (present/absent/late)</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <select value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setAttendance({}); }}
            className="px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm bg-white">
            {classOptions.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <div className="flex items-center gap-2 px-3 py-2 rounded-[--radius-md] bg-[--color-muted]">
            <Search className="w-4 h-4 text-[--color-muted-foreground]" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search student..." className="text-sm bg-transparent outline-none" />
          </div>
        </div>
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
          className="px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm"/>
        <button onClick={() => markAll("present")} className="px-3 py-2 rounded-lg bg-[--color-success]/10 text-[--color-success] text-xs font-medium hover:bg-[--color-success]/20 transition-colors">Mark All Present</button>
      </div>

      <div className="bg-white rounded-[--radius-xl] border border-[--color-border] overflow-hidden">
        {students.length === 0 ? (
          <p className="p-8 text-center text-sm text-[--color-muted-foreground]">Select a class to view students.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[--color-muted]/50 border-b border-[--color-border]">
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Roll</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Name</th>
                <th className="text-center px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((student) =>
                  student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  student.roll.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(s => (
                <tr key={s.roll} className="border-b border-[--color-border]/50 hover:bg-[--color-muted]/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{s.roll}</td>
                  <td onClick={() => setActiveStudent({ ...s, class: selectedClass })} className="px-4 py-3 font-medium text-primary cursor-pointer">{s.name}</td>
                  <td className="px-4 py-3 text-center">{statusIcon(attendance[s.roll])}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {(["present","absent","late"] as const).map(status => (
                        <button key={status} onClick={() => markAttendance(s.roll, status)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            attendance[s.roll] === status
                              ? status === "present" ? "bg-[--color-success] text-white" : status === "absent" ? "bg-[--color-danger] text-white" : "bg-[--color-warning] text-white"
                              : "bg-[--color-muted] text-[--color-muted-foreground] hover:bg-[--color-border]"
                          }`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {students.length > 0 && Object.keys(attendance).length > 0 && (
        <div className="flex justify-end">
          <button className="btn-primary text-sm">Save Attendance</button>
        </div>
      )}
      <StudentProfileModal open={Boolean(activeStudent)} onClose={() => setActiveStudent(null)} student={activeStudent} />
    </div>
  );
}
