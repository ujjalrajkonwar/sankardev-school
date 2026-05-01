"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTeachersStore } from "@/lib/teachers-store";

export default function TeachersPage() {
  const { categories, teachers, isLoaded } = useTeachersStore();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTeachers = activeCategory === "all" 
    ? teachers 
    : teachers.filter(t => t.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Teachers</h1>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Dedicated professionals committed to inspiring and guiding every student.
          </p>

          {/* Category Bar */}
          {isLoaded && categories.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-16 max-w-4xl mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize border ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Teachers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 text-left">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-xl p-2 sm:p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center">
                
                {/* Passport Size Photo Area */}
                <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-2 sm:mb-3 flex items-center justify-center overflow-hidden border border-gray-200 relative">
                   {teacher.photoUrl ? (
                      <img src={teacher.photoUrl} alt={teacher.name} className="w-full h-full object-cover" />
                   ) : (
                      <span className="text-[10px] sm:text-xs text-gray-400 font-medium">Photo</span>
                   )}
                   <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
                </div>
                
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 text-center line-clamp-1">{teacher.name}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 text-center line-clamp-2">{teacher.subject}</p>

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
