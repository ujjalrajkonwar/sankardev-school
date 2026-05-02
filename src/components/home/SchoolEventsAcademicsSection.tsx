"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";

export default function SchoolEventsAcademicsSection() {
  const placeholders = Array.from({ length: 8 }).map((_, i) => i + 1);

  return (
    <section id="events-academics" className="py-12 sm:py-16 bg-white border-t border-[--color-border]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">School Events and Academics</h2>

            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {placeholders.map((id) => (
                  <div
                    key={id}
                    className="w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    {/* Empty placeholder - add image/title later */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
