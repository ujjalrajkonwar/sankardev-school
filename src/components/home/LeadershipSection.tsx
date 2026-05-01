"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function LeadershipSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 border-t border-[--color-border]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8">
            
            {/* Principal Card */}
            <div className="bg-white flex flex-col items-center border border-gray-200 shadow-sm rounded-lg overflow-hidden transition-all hover:shadow-md p-4 sm:p-6 text-center">
              <div className="w-24 h-32 sm:w-32 sm:h-40 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200 mb-4 shrink-0 relative overflow-hidden">
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium px-2 text-center">Photo</span>
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-[#004e59] mb-1">
                Principal Name
              </h3>
              <p className="text-[10px] sm:text-sm font-semibold text-blue-700">
                Principal
              </p>
            </div>

            {/* Vice Principal Card */}
            <div className="bg-white flex flex-col items-center border border-gray-200 shadow-sm rounded-lg overflow-hidden transition-all hover:shadow-md p-4 sm:p-6 text-center">
              <div className="w-24 h-32 sm:w-32 sm:h-40 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200 mb-4 shrink-0 relative overflow-hidden">
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium px-2 text-center">Photo</span>
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-[#004e59] mb-1">
                Vice Principal Name
              </h3>
              <p className="text-[10px] sm:text-sm font-semibold text-blue-700">
                Vice-Principal
              </p>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
