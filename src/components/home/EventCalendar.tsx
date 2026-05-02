"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import { EVENT_TYPE_STYLES, useAnnouncementsStore } from "@/lib/announcements-store";

export default function EventCalendar() {
  const { publishedEvents } = useAnnouncementsStore();

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
          {publishedEvents.map((event) => {
            const date = new Date(`${event.date}T00:00:00`);
            const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
            const day = date.getDate();

            return (
            <div
              key={event.id}
              className="surface-card hover-lift flex items-center gap-5 px-4 py-4 rounded-[--radius-md] group cursor-default"
            >
              {/* Date Badge */}
              <div className="w-14 h-14 rounded-[--radius-md] border border-[--color-border] bg-[--color-muted] flex flex-col items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                <span className="text-[9px] font-bold tracking-wider text-[--color-danger] uppercase">
                  {month}
                </span>
                <span className="text-xl font-bold text-primary leading-none">
                  {day}
                </span>
              </div>

              {/* Event Info */}
              <div className="min-w-0 space-y-1">
                <p className="font-semibold text-primary text-sm leading-tight">
                  {event.title}
                </p>
                <p className="text-sm font-semibold text-primary/80 leading-tight font-sans">
                  {event.assameseTitle}
                </p>
                <p className={`text-xs ${EVENT_TYPE_STYLES[event.type]}`}>{event.typeLabel}</p>
                <p className={`text-xs font-sans ${EVENT_TYPE_STYLES[event.type]}`}>{event.assameseTypeLabel}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}
