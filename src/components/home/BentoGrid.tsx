"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import { BookOpen, Trophy, Users, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BentoGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-12">
            <p className="label-text mb-3">Why Sankardev</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary leading-tight tracking-tight-custom text-balance">
              A complete ecosystem for
              <br />
              tomorrow&apos;s leaders.
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1 — Academics */}
          <ScrollReveal delay={0.1} className="md:col-span-1 lg:col-span-2">
            <div className="relative surface-card hover-lift p-8 sm:p-10 h-full min-h-[280px] flex flex-col justify-between overflow-hidden group">
              <div className="relative z-10">
                <p className="label-text !text-primary/70 mb-3">
                  Academics
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary leading-tight mb-3">
                  Curriculum that goes
                  <br />
                  beyond textbooks.
                </h3>
                <p className="text-sm text-[--color-muted-foreground] max-w-md leading-relaxed">
                  SEBA-aligned, project-based learning across STEM, humanities
                  &amp; creative arts — taught by 20+ specialists.
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-medium transition-colors group/link"
                >
                  Explore curriculum
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
              {/* Decorative Icon */}
              <div className="absolute top-8 right-8 opacity-10 pointer-events-none">
                <BookOpen className="w-24 h-24 text-primary" strokeWidth={1} />
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 — Results */}
          <ScrollReveal delay={0.2}>
            <div className="surface-card hover-lift p-8 h-full min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <p className="text-5xl font-bold text-primary mb-1">100%</p>
                <p className="label-text mb-4">Board Pass Rate</p>
              </div>
              <div className="border-t border-[--color-border] pt-4">
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                  Five years running. Our students consistently rank in the top
                  percentile of SEBA board examinations.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 — Faculty */}
          <ScrollReveal delay={0.3}>
            <div className="surface-card hover-lift p-8 h-full min-h-[220px] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Mentors, not just teachers.
                </h3>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                  Each child is paired with a faculty mentor who tracks academic
                  and personal growth quarterly.
                </p>
              </div>
            </div>
          </ScrollReveal>



          {/* Card 5 — Parent Portal */}
          <ScrollReveal delay={0.5}>
            <div className="surface-card hover-lift p-8 h-full min-h-[220px] flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  Secure parent portal.
                </h3>
                <p className="text-sm text-[--color-muted-foreground] mb-4 leading-relaxed">
                  Live results, fee status, attendance and admission tracking —
                  all in one place.
                </p>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
                >
                  Open Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
