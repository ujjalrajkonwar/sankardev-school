"use client";

import NumberTicker from "./NumberTicker";
import ScrollReveal from "@/components/shared/ScrollReveal";

const STATS = [
  { value: 1500, suffix: "+", label: "STUDENTS" },
  { value: 20, suffix: "+", label: "TEACHERS" },
  { value: 100, suffix: "%", label: "RESULTS" },
];

export default function StatsBar() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="surface-card hover-lift p-6 sm:p-7 space-y-1">
                <p className="text-3xl sm:text-4xl font-bold text-primary">
                  <NumberTicker
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2 + i * 0.3}
                  />
                </p>
                <p className="label-text !text-primary/75">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
