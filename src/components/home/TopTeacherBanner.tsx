"use client";

import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function TopTeacherBanner() {
  return (
    <section id="teachers" className="w-full bg-[--color-primary]/5 py-8 sm:py-12 border-b border-[--color-border]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Our Esteemed Faculty</h2>
            <p className="text-[--color-muted-foreground]">Guiding the leaders of tomorrow</p>
          </div>
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-[--color-border]">
            <Image
              src="/images/WhatsApp Image 2026-05-01 at 2.40.37 PM (1).jpeg"
              alt="Teachers and Faculty"
              fill
              className="object-contain bg-white"
              priority
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
