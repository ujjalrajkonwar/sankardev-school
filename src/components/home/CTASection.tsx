"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="surface-card rounded-[--radius-xl] p-10 sm:p-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[--color-primary]/6 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[--color-primary]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary leading-tight mb-4">
                Ready to give your child the best start?
              </h2>
              <p className="text-[--color-muted-foreground] text-base sm:text-lg mb-8 leading-relaxed">
                Limited seats available for the 2026-27 academic session. Apply
                now and secure your child&apos;s future.
              </p>
              <MagneticButton>
                <Link
                  href="/admissions"
                  className="btn-primary"
                >
                  Begin Application
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
