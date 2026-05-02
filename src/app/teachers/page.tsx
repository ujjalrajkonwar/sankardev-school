"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTeachersStore } from "@/lib/teachers-store";

export default function TeachersPage() {
  const { categories, teachers, isLoaded } = useTeachersStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!categoryMenuRef.current) return;
      if (!categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const categoryOptions = useMemo(
    () => ["all", ...(categories ?? []).filter((cat) => cat !== "all")],
    [categories]
  );

  const filteredTeachers = activeCategory === "all"
    ? teachers
    : teachers.filter((teacher) => teacher.category === activeCategory);

  const premiumTeachers = useMemo(() => {
    return [
      { id: "principal", name: "Principal", displayRole: "Principal", photoUrl: "", subject: "", category: "" },
      { id: "vice-principal", name: "Vice Principal", displayRole: "Vice Principal", photoUrl: "", subject: "", category: "" },
    ];
  }, []);

  const gridTeachers = filteredTeachers.filter(
    (teacher) => !premiumTeachers.some((premiumTeacher) => premiumTeacher.id === teacher.id)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Teachers</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to inspiring and guiding every student.
            </p>
          </div>

          {isLoaded && categoryOptions.length > 0 && (
            <div ref={categoryMenuRef} className="relative max-w-4xl mx-auto mb-10">
              <button
                type="button"
                onClick={() => setIsCategoryOpen((open) => !open)}
                className="w-full flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow text-left"
                aria-expanded={isCategoryOpen}
                aria-haspopup="listbox"
              >
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">Category</p>
                  <p className="truncate text-sm font-semibold text-gray-900 capitalize">
                    {activeCategory === "all" ? "All" : activeCategory}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                  <svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.293l3.71-4.06a.75.75 0 1 1 1.12 1l-4.25 4.75a.75.75 0 0 1-1.12 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

              {isCategoryOpen && (
                <div className="absolute z-20 mt-3 w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryOptions.map((category) => {
                      const isActive = activeCategory === category;

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            setActiveCategory(category);
                            setIsCategoryOpen(false);
                          }}
                          className={`rounded-xl px-3 py-2 text-left text-sm capitalize transition-colors ${isActive ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {premiumTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white flex items-center gap-4 border border-gray-200 shadow-sm rounded-2xl overflow-hidden transition-all hover:shadow-md p-4 sm:p-5"
                >
                  <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 shrink-0">
                    {teacher.photoUrl ? (
                      <img src={teacher.photoUrl} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Photo</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-sm font-semibold text-blue-700">
                      {teacher.displayRole}
                    </p>
                    <h3 className="text-sm sm:text-lg font-bold text-[#004e59] truncate">
                      {teacher.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 text-left">
            {gridTeachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-xl p-2 sm:p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-lg mb-2 sm:mb-3 flex items-center justify-center overflow-hidden border border-gray-200 relative px-2 py-2">
                  {teacher.photoUrl ? (
                    <img src={teacher.photoUrl} alt={teacher.name} className="w-auto h-auto max-w-full max-h-48 object-contain" />
                  ) : (
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Photo</span>
                  )}
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 text-center line-clamp-1">{teacher.name}</h3>
                <p className="text-[9px] sm:text-xs text-gray-500 text-center line-clamp-2">{teacher.subject}</p>
              </div>
            ))}

            {filteredTeachers.length === 0 && isLoaded && (
              <div className="col-span-full py-16 text-center text-gray-500 text-sm">
                No teachers found in this category.
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
