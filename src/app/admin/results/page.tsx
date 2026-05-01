"use client";

import { useEffect, useState } from "react";
import { Upload, FileSpreadsheet, Eye, EyeOff, Search, Download } from "lucide-react";
import { FALLBACK_CLASS_OPTIONS, fetchClassOptions, type ClassOption } from "@/lib/class-options";
import StudentProfileModal, { type ProfileStudent } from "@/components/shared/StudentProfileModal";

type ResultRow = ProfileStudent & {
  roll: string;
  name: string;
  class: string;
  math: number;
  science: number;
  english: number;
  percentage: number;
};

const DEMO_RESULTS: ResultRow[] = [
  { roll: "S001", name: "Aarav Sharma", class: "Ankur", math: 95, science: 88, english: 92, percentage: 91.7 },
  { roll: "S002", name: "Priya Das", class: "Mukul", math: 78, science: 82, english: 75, percentage: 78.3 },
  { roll: "S003", name: "Rahul Singh", class: "1", math: 88, science: 90, english: 85, percentage: 87.7 },
  { roll: "S004", name: "Sneha Roy", class: "2", math: 92, science: 95, english: 88, percentage: 91.7 },
  { roll: "S005", name: "Amit Kumar", class: "3", math: 70, science: 75, english: 72, percentage: 72.3 },
];

export default function AdminResultsPage() {
  const [resultsVisible, setResultsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStudent, setActiveStudent] = useState<ResultRow | null>(null);
  const [topSearchQuery, setTopSearchQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [classOptions, setClassOptions] = useState<ClassOption[]>(
    FALLBACK_CLASS_OPTIONS.map((name, index) => ({ id: index + 1, name }))
  );
  const [selectedClass, setSelectedClass] = useState("Ankur");

  useEffect(() => {
    fetchClassOptions().then(setClassOptions);
  }, []);

  const filtered = DEMO_RESULTS.filter(
    (r) =>
      r.class === selectedClass &&
      (r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.roll.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (r.name.toLowerCase().includes(topSearchQuery.toLowerCase()) || r.roll.toLowerCase().includes(topSearchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Results</h1>
          <p className="text-sm text-[--color-muted-foreground]">Manage examination results and CSV uploads.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Global Toggle */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[--color-border] bg-white">
            {resultsVisible ? <Eye className="w-4 h-4 text-[--color-success]" /> : <EyeOff className="w-4 h-4 text-[--color-muted-foreground]" />}
            <span className="text-xs font-medium">{resultsVisible ? "Visible" : "Hidden"}</span>
            <button
              onClick={() => setResultsVisible(!resultsVisible)}
              className={`relative w-10 h-5 rounded-full transition-colors ${resultsVisible ? "bg-[--color-success]" : "bg-[--color-border]"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${resultsVisible ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
          <button onClick={() => setShowUpload(!showUpload)} className="btn-primary text-sm">
            <Upload className="w-4 h-4" />Upload CSV
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full sm:w-56">
          <label className="label-text mb-2 block">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
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
            <div className="flex items-center gap-2 px-3 py-2 rounded-[--radius-md] bg-[--color-muted]">
              <Search className="w-4 h-4 text-[--color-muted-foreground]" />
              <input value={topSearchQuery} onChange={e => setTopSearchQuery(e.target.value)} placeholder="Search student..." className="text-sm bg-transparent outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* CSV Upload Zone */}
      {showUpload && (
        <div className="bg-white rounded-[--radius-xl] border-2 border-dashed border-[--color-border] p-10 text-center">
          <FileSpreadsheet className="w-12 h-12 text-[--color-muted-foreground] mx-auto mb-4" />
          <h3 className="font-semibold text-primary mb-2">Upload Results CSV</h3>
          <p className="text-sm text-[--color-muted-foreground] mb-4">
            Drag and drop your Excel/CSV file here, or click to browse.
          </p>
          <p className="text-xs text-[--color-muted-foreground] mb-6">
            Required columns: Roll Number, Student Name, Subject, Marks, Total
          </p>
          <button className="btn-outline text-sm mx-auto">
            <Upload className="w-4 h-4" />Choose File
          </button>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white rounded-[--radius-xl] border border-[--color-border] overflow-hidden">
          <div className="p-4 border-b border-[--color-border] flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-[--radius-md] bg-[--color-muted]">
            <Search className="w-4 h-4 text-[--color-muted-foreground]" />
            <input type="text" placeholder="Search by name or roll..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm bg-transparent outline-none" />
          </div>
          <button className="btn-outline text-sm"><Download className="w-4 h-4" />Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[--color-muted]/50 border-b border-[--color-border]">
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Roll</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Class</th>
                <th className="text-center px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Math</th>
                <th className="text-center px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Science</th>
                <th className="text-center px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">English</th>
                <th className="text-center px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">%</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.roll} className="border-b border-[--color-border]/50 hover:bg-[--color-muted]/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{r.roll}</td>
                  <td onClick={() => setActiveStudent(r)} className="px-4 py-3 font-medium text-primary cursor-pointer">{r.name}</td>
                  <td className="px-4 py-3 text-[--color-muted-foreground]">{r.class}</td>
                  <td className="text-center px-4 py-3">{r.math}</td>
                  <td className="text-center px-4 py-3">{r.science}</td>
                  <td className="text-center px-4 py-3">{r.english}</td>
                  <td className="text-center px-4 py-3 font-bold text-primary">{r.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <StudentProfileModal open={Boolean(activeStudent)} onClose={() => setActiveStudent(null)} student={activeStudent} />
    </div>
  );
}
