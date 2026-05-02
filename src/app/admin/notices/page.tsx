"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { translateToAssamese, useAnnouncementsStore } from "@/lib/announcements-store";

export default function AdminNoticesPage() {
  const { notices, addNotice, removeNotice, toggleNoticePublish, isLoaded } = useAnnouncementsStore();
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("General");

  const handleAddNotice = () => {
    if (!newTitle.trim()) return;
    addNotice({ title: newTitle, description: newDescription, category: newCategory });
    setNewTitle("");
    setNewDescription("");
    setShowForm(false);
  };

  if (!isLoaded) return <div className="p-8">Loading...</div>;

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
          <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Notice details in English..."
            className="w-full min-h-24 px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors resize-none"/>
          {(newTitle || newDescription) && (
            <div className="rounded-[--radius-md] border border-[--color-border] bg-[--color-muted]/40 p-4 space-y-2">
              {newTitle && <p className="text-sm font-semibold text-primary font-sans">{translateToAssamese(newTitle)}</p>}
              {newDescription && <p className="text-xs text-[--color-muted-foreground] font-sans">{translateToAssamese(newDescription)}</p>}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
              className="px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm bg-white">
              <option>General</option><option>Results</option><option>Admission</option><option>Event</option>
            </select>
            <button onClick={handleAddNotice} className="btn-primary text-sm">Publish</button>
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
                <p className="text-xs text-primary/75 font-sans truncate">{n.assameseTitle}</p>
                <p className="text-xs text-[--color-muted-foreground]">{n.category} · {n.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button onClick={() => toggleNoticePublish(n.id)} className="p-2 rounded-lg hover:bg-[--color-muted] transition-colors"
                title={n.published ? "Unpublish" : "Publish"}>
                {n.published ? <Eye className="w-4 h-4 text-[--color-success]" /> : <EyeOff className="w-4 h-4 text-[--color-muted-foreground]" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-[--color-muted] transition-colors" title="Edit coming soon"><Edit2 className="w-4 h-4 text-[--color-muted-foreground]" /></button>
              <button onClick={() => removeNotice(n.id)} className="p-2 rounded-lg hover:bg-[--color-danger]/5 transition-colors" title="Delete notice"><Trash2 className="w-4 h-4 text-[--color-danger]" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
