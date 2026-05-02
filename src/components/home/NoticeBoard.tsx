"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import { useAnnouncementsStore } from "@/lib/announcements-store";

export default function NoticeBoard() {
  const { publishedNotices } = useAnnouncementsStore();

  return (
    <ScrollReveal>
      <div id="notice" className="scroll-mt-24">
        <p className="label-text mb-3">Latest</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
          Notice Board
        </h2>

        <div className="space-y-4">
          {publishedNotices.map((notice) => (
            <article
              key={notice.id}
              className="surface-card hover-lift p-6 sm:p-7"
            >
              <span className="label-text !text-primary mb-3 block">
                {notice.category}
              </span>
              
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1">
                  {notice.title}
                </h3>
                <h4 className="text-lg font-bold text-primary/80 font-sans">
                  {notice.assameseTitle}
                </h4>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
                  {notice.description}
                </p>
                <div className="w-full h-px bg-[--color-border]/60"></div>
                <p className="text-sm text-[--color-muted-foreground] leading-relaxed font-sans">
                  {notice.assameseDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
