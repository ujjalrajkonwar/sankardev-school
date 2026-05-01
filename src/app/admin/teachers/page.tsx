"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useTeachersStore } from "@/lib/teachers-store";

export default function AdminTeachersPage() {
  const { categories, teachers, addCategory, removeCategory, addTeacher, removeTeacher, isLoaded } = useTeachersStore();
  const [newCategory, setNewCategory] = useState("");
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [addName, setAddName] = useState("");
  const [addSubject, setAddSubject] = useState("");
  const [addCat, setAddCat] = useState("science");

  if (!isLoaded) return <div className="p-8">Loading...</div>;

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory);
      setNewCategory("");
    }
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (addName.trim() && addSubject.trim()) {
      addTeacher({
        name: addName.trim(),
        subject: addSubject.trim(),
        category: addCat,
        photoUrl: "",
      });
      setAddName("");
      setAddSubject("");
      setShowAddTeacher(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Teachers & Staff</h1>
        <p className="text-sm text-[--color-muted-foreground]">Manage teacher profiles and categories for the public page.</p>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-[--radius-xl] border border-[--color-border] p-6">
        <h2 className="text-lg font-bold text-primary mb-4">Categories</h2>
        <form onSubmit={handleAddCategory} className="flex gap-3 mb-4 max-w-sm">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            className="flex-1 px-4 py-2 rounded-[--radius-md] border border-[--color-border] text-sm"
          />
          <button type="submit" className="btn-primary text-sm px-4">
            Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <div key={cat} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[--color-muted] text-sm capitalize border border-[--color-border]">
              {cat}
              {cat !== "all" && (
                <button onClick={() => removeCategory(cat)} className="text-[--color-danger] hover:text-red-700">
                  <XIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Teachers Section */}
      <div className="bg-white rounded-[--radius-xl] border border-[--color-border] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-primary">Teachers List</h2>
          <button onClick={() => setShowAddTeacher(!showAddTeacher)} className="btn-primary text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Teacher
          </button>
        </div>

        {showAddTeacher && (
          <form onSubmit={handleAddTeacher} className="grid gap-3 rounded-[--radius-lg] border border-[--color-border] bg-[--color-muted]/30 p-4 mb-6 sm:grid-cols-[1fr_1fr_1fr_auto]">
            <input
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              placeholder="Teacher Name"
              className="px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm"
            />
            <input
              value={addSubject}
              onChange={(e) => setAddSubject(e.target.value)}
              placeholder="Subject (e.g., Mathematics Teacher)"
              className="px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm"
            />
            <select
              value={addCat}
              onChange={(e) => setAddCat(e.target.value)}
              className="px-4 py-2.5 rounded-[--radius-md] border border-[--color-border] text-sm bg-white capitalize"
            >
              {categories.filter(c => c !== "all").map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button type="submit" className="btn-primary text-sm justify-center">
              Save Teacher
            </button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[--color-muted]/50 border-b border-[--color-border]">
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Photo</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Subject</th>
                <th className="text-left px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Category</th>
                <th className="text-right px-4 py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-[--color-border]/50 hover:bg-[--color-muted]/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border border-[--color-border] flex items-center justify-center overflow-hidden">
                      <span className="text-[10px] text-gray-500">Photo</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-primary">{teacher.name}</td>
                  <td className="px-4 py-3 text-[--color-muted-foreground]">{teacher.subject}</td>
                  <td className="px-4 py-3 text-[--color-muted-foreground] capitalize">{teacher.category}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => removeTeacher(teacher.id)} className="text-[--color-danger] hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {teachers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-[--color-muted-foreground]">No teachers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
