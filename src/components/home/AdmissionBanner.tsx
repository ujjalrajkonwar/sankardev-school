"use client";

import Image from "next/image";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function AdmissionBanner() {
  return (
    <section className="pt-16 pb-8 sm:pt-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-[--color-border] group hover-lift">
            <Image
              src="/images/WhatsApp Image 2026-05-01 at 2.40.37 PM (2).jpeg"
              alt="Admission Information"
              fill
              className="object-contain bg-white transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
