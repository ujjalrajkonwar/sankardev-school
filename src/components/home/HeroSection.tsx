"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-16 sm:py-24 animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Typography */}
          <ScrollReveal>
            <div className="space-y-6 flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--color-primary]/5 border border-[--color-primary]/25">
                <span className="text-sm">✨</span>
                <span className="label-text !text-primary !text-[11px]">
                  Admissions 2026-27 Now Open
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.2] tracking-tight text-balance">
                Welcome To <span className="text-blue-500">Our Campus</span>
                <br />
                Group Of School
              </h1>

              {/* Subtext */}
              <p className="text-lg text-[--color-muted-foreground] leading-relaxed max-w-2xl mx-auto">
                A premier SEBA-affiliated institution in Mathurapur, Charaideo, Assam.
                Established at 2000.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <MagneticButton>
                  <Link href="/admissions" className="btn-primary">
                    Apply for Admission
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/portal" className="btn-outline">
                    Student / Parent Portal
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
