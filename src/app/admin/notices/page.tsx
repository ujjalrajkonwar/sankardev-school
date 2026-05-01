"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

const DEMO_NOTICES = [
  { id: 1, title: "Mid-Term Results Published", category: "Results", published: true, date: "2026-04-30" },
  { id: 2, title: "Annual Sports Day 2026", category: "Event", published: true, date: "2026-04-28" },
  { id: 3, title: "Admissions Open for 2026-27", category: "Admission", published: true, date: "2026-04-25" },
  { id: 4, title: "Summer Vacation Schedule", category: "General", published: false, date: "2026-04-20" },
];

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState(DEMO_NOTICES);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("General");

  const togglePublish = (id: number) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, published: !n.published } : n));
  };

  const addNotice = () => {
    if (!newTitle) return;
    setNotices(prev => [{ id: Date.now(), title: newTitle, category: newCategory, published: true, date: new Date().toISOString().split("T")[0] }, ...prev]);
    setNewTitle(""); setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Notices</h1>
          <p className="text-sm text-[--color-muted-foreground]">Create and manage school announcements.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm"><Plus className="w-4 h-4" />New Notice</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-[--radius-xl] border border-[--color-border] p-6 space-y-4">
          <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Notice title..."
            className="w-full px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors"/>
          <div className="flex gap-3">
            <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
              className="px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm bg-white">
              <option>General</option><option>Results</option><option>Admission</option><option>Event</option>
            </select>
            <button onClick={addNotice} className="btn-primary text-sm">Publish</button>
            <button onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {notices.map(n => (
          <div key={n.id} className="bg-white rounded-[--radius-xl] border border-[--color-border] p-5 flex items-center justify-between hover:shadow-[--shadow-card] transition-shadow">
            <div className="flex items-center gap-4 min-w-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${n.published ? "bg-[--color-success]" : "bg-[--color-border]"}`} />
              <div className="min-w-0">
                <p className="font-medium text-primary text-sm truncate">{n.title}</p>
                <p className="text-xs text-[--color-muted-foreground]">{n.category} · {n.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button onClick={() => togglePublish(n.id)} className="p-2 rounded-lg hover:bg-[--color-muted] transition-colors"
                title={n.published ? "Unpublish" : "Publish"}>
                {n.published ? <Eye className="w-4 h-4 text-[--color-success]" /> : <EyeOff className="w-4 h-4 text-[--color-muted-foreground]" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-[--color-muted] transition-colors"><Edit2 className="w-4 h-4 text-[--color-muted-foreground]" /></button>
              <button className="p-2 rounded-lg hover:bg-[--color-danger]/5 transition-colors"><Trash2 className="w-4 h-4 text-[--color-danger]" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
