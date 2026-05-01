"use client";

import { useEffect, useState } from "react";
import { FALLBACK_CLASS_OPTIONS, fetchClassOptions, type ClassOption } from "@/lib/class-options";
import { Search } from "lucide-react";
import StudentProfileModal, { type ProfileStudent } from "@/components/shared/StudentProfileModal";

type AdmissionRequest = ProfileStudent & {
  id: string;
  name: string;
  class: string;
  parent: string;
  phone: string;
  status: string;
  date: string;
};

const DEMO_REQUESTS: AdmissionRequest[] = [
  { id: "APP-2026-001", name: "Arjun Patel", class: "Ankur", parent: "Vikram Patel", phone: "+91 98765 11111", status: "applied", date: "2026-04-28" },
  { id: "APP-2026-002", name: "Sanya Kapoor", class: "Mukul", parent: "Ritu Kapoor", phone: "+91 98765 22222", status: "test_scheduled", date: "2026-04-25" },
  { id: "APP-2026-003", name: "Rohan Dey", class: "1", parent: "Sunil Dey", phone: "+91 98765 33333", status: "selected", date: "2026-04-20" },
  { id: "APP-2026-004", name: "Meera Joshi", class: "2", parent: "Anita Joshi", phone: "+91 98765 44444", status: "enrolled", date: "2026-04-15" },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  applied: { label: "Applied", color: "bg-blue-100 text-blue-700" },
  test_scheduled: { label: "Test Scheduled", color: "bg-yellow-100 text-yellow-700" },
  selected: { label: "Selected", color: "bg-green-100 text-green-700" },
  enrolled: { label: "Enrolled", color: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
};

const STATUS_OPTIONS = ["applied", "test_scheduled", "selected", "enrolled", "rejected"];

export default function AdminAdmissionsPage() {
  const [admissionsOpen, setAdmissionsOpen] = useState(true);
  const [requests, setRequests] = useState(DEMO_REQUESTS);
  const [classOptions, setClassOptions] = useState<ClassOption[]>(
    FALLBACK_CLASS_OPTIONS.map((name, index) => ({ id: index + 1, name }))
  );
  const [selectedClass, setSelectedClass] = useState("Ankur");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStudent, setActiveStudent] = useState<AdmissionRequest | null>(null);

  useEffect(() => {
    fetchClassOptions().then(setClassOptions);
  }, []);

  const updateStatus = (id: string, status: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const filteredRequests = requests.filter((request) => request.class === selectedClass && (request.name.toLowerCase().includes(searchQuery.toLowerCase()) || request.id.toLowerCase().includes(searchQuery.toLowerCase())));

  return (
    <>
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Admissions</h1>
          <p className="text-sm text-[--color-muted-foreground]">Manage admission requests and pipeline.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[--color-border] bg-white">
          <span className="text-xs font-medium">{admissionsOpen ? "Admissions Open" : "Admissions Closed"}</span>
          <button onClick={() => setAdmissionsOpen(!admissionsOpen)}
            className={`relative w-10 h-5 rounded-full transition-colors ${admissionsOpen ? "bg-[--color-success]" : "bg-[--color-border]"}`}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${admissionsOpen ? "left-5" : "left-0.5"}`} />
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
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search applicant..." className="text-sm bg-transparent outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[--radius-xl] border border-[--color-border] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[--color-muted]/50 border-b border-[--color-border]">
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Application ID</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Student</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Class</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Parent</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(r => (
                <tr key={r.id} className="border-b border-[--color-border]/50 hover:bg-[--color-muted]/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                  <td onClick={() => setActiveStudent(r)} className="px-4 py-3 font-medium text-primary cursor-pointer">{r.name}</td>
                  <td className="px-4 py-3 text-[--color-muted-foreground]">{r.class}</td>
                  <td className="px-4 py-3 text-[--color-muted-foreground]">{r.parent}</td>
                  <td className="px-4 py-3 text-[--color-muted-foreground]">{r.date}</td>
                  <td className="px-4 py-3">
                    <select value={r.status} onChange={e => updateStatus(r.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-none cursor-pointer ${STATUS_LABELS[r.status]?.color || ""}`}>
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{STATUS_LABELS[opt].label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      <StudentProfileModal open={Boolean(activeStudent)} onClose={() => setActiveStudent(null)} student={activeStudent} />
    </>
  );
}
