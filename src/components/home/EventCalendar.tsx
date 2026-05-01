"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import { Calendar } from "lucide-react";

const EVENTS = [
  {
    month: "APR",
    day: "30",
    title: "Republic Day",
    type: "Holiday · School Closed",
    typeColor: "text-[--color-danger]",
  },
  {
    month: "MAY",
    day: "7",
    title: "Mid-Term Exams Begin",
    type: "Exam",
    typeColor: "text-[--color-warning]",
  },
  {
    month: "MAY",
    day: "20",
    title: "Sports Day",
    type: "Event",
    typeColor: "text-[--color-accent]",
  },
  {
    month: "JUN",
    day: "29",
    title: "Summer Vacation",
    type: "Vacation · School Closed for 30 Days",
    typeColor: "text-[--color-success]",
  },
];

export default function EventCalendar() {
  return (
    <ScrollReveal delay={0.1}>
      <div id="events" className="scroll-mt-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="label-text mb-3">Upcoming</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              Events
            </h2>
          </div>
        </div>

        {/* Event List */}
        <div className="space-y-3">
          {EVENTS.map((event, i) => (
            <div
              key={i}
              className="surface-card hover-lift flex items-center gap-5 px-4 py-4 rounded-[--radius-md] group cursor-default"
            >
              {/* Date Badge */}
              <div className="w-14 h-14 rounded-[--radius-md] border border-[--color-border] bg-[--color-muted] flex flex-col items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                <span className="text-[9px] font-bold tracking-wider text-[--color-danger] uppercase">
                  {event.month}
                </span>
                <span className="text-xl font-bold text-primary leading-none">
                  {event.day}
                </span>
              </div>

              {/* Event Info */}
              <div className="min-w-0">
                <p className="font-semibold text-primary text-sm truncate">
                  {event.title}
                </p>
                <p className={`text-xs ${event.typeColor}`}>{event.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
