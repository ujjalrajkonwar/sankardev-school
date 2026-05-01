"use client";

import { useState } from "react";

type ToggleSwitchProps = {
  enabled: boolean;
  onChange: () => void;
  label: string;
  description: string;
};

function ToggleSwitch({ enabled, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between p-5 rounded-[--radius-xl] border border-[--color-border] bg-white hover:shadow-[--shadow-card] transition-shadow">
      <div>
        <p className="font-semibold text-primary text-sm">{label}</p>
        <p className="text-xs text-[--color-muted-foreground] mt-1">{description}</p>
      </div>
      <button onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ml-4 ${enabled ? "bg-[--color-success]" : "bg-[--color-border]"}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? "left-6" : "left-0.5"}`} />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [admissionsOpen, setAdmissionsOpen] = useState(true);
  const [resultsVisible, setResultsVisible] = useState(true);
  const [currentSession, setCurrentSession] = useState("2026-27");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-[--color-muted-foreground]">Global school settings and configuration.</p>
      </div>

      <div className="space-y-4">
        <ToggleSwitch enabled={admissionsOpen} onChange={() => setAdmissionsOpen((value) => !value)}
          label="Admissions Open" description="When enabled, the public admissions form is visible and accepts new applications." />
        <ToggleSwitch enabled={resultsVisible} onChange={() => setResultsVisible((value) => !value)}
          label="Results Visible" description="When enabled, students and parents can view examination results on the portal." />
      </div>

      <div className="p-5 rounded-[--radius-xl] border border-[--color-border] bg-white">
        <label className="label-text block mb-2">Current Academic Session</label>
        <select value={currentSession} onChange={e => setCurrentSession(e.target.value)}
          className="w-full max-w-xs px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors bg-white">
          <option value="2026-27">2026-27</option>
          <option value="2025-26">2025-26</option>
          <option value="2024-25">2024-25</option>
        </select>
      </div>

      <div className="p-5 rounded-[--radius-xl] border border-[--color-border] bg-white">
        <h3 className="font-semibold text-primary text-sm mb-3">Invite Staff via Magic Link</h3>
        <p className="text-xs text-[--color-muted-foreground] mb-4">Send a login link to a teacher or staff member. They&apos;ll be able to sign in without a password.</p>
        <div className="flex gap-3">
          <input type="email" placeholder="teacher@sankardev.edu" className="flex-1 px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors" />
          <select className="px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm bg-white">
            <option value="teacher">Teacher</option>
            <option value="principal">Principal</option>
          </select>
          <button className="btn-primary text-sm shrink-0">Send Invite</button>
        </div>
      </div>
    </div>
  );
}
