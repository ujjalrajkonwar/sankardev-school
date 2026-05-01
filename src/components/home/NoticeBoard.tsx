"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";

const NOTICES = [
  {
    id: 1,
    category: "LATEST",
    title: "Mid-Term Results Published",
    assameseTitle: "অৰ্ধবাৰ্ষিক পৰীক্ষাৰ ফলাফল ঘোষণা",
    description: "Class V-VIII mid-term results are now available on the parent portal. Please log in to view.",
    assameseDescription: "পঞ্চম শ্ৰেণীৰ পৰা অষ্টম শ্ৰেণীলৈ অৰ্ধবাৰ্ষিক পৰীক্ষাৰ ফলাফল অভিভাৱক পৰ্টেলত উপলব্ধ। অনুগ্ৰহ কৰি লগ ইন কৰি চাওক।"
  },
  {
    id: 2,
    category: "IMPORTANT",
    title: "Annual Sports Day 2026",
    assameseTitle: "বাৰ্ষিক ক্ৰীড়া সমাৰোহ ২০২৬",
    description: "Annual Sports Day will be held on May 20. All parents are cordially invited to attend.",
    assameseDescription: "অহা ২০ মে'ত বাৰ্ষিক ক্ৰীড়া সমাৰোহ অনুষ্ঠিত হ'ব। সকলো অভিভাৱকক আন্তৰিকতাৰে আমন্ত্ৰণ জনোৱা হৈছে।"
  },
  {
    id: 3,
    category: "ADMISSION",
    title: "Admissions Open for 2026-27",
    assameseTitle: "২০২৬-২৭ বৰ্ষৰ নামভৰ্তি চলি আছে",
    description: "Limited seats available for Nursery to Class VIII. Apply now through our online portal.",
    assameseDescription: "নাৰ্ছাৰীৰ পৰা অষ্টম শ্ৰেণীলৈ সীমিত আসন উপলব্ধ। আমাৰ অনলাইন পৰ্টেলৰ জৰিয়তে এতিয়াই আবেদন কৰক।"
  },
  {
    id: 4,
    category: "NOTICE",
    title: "Summer Vacation Schedule",
    assameseTitle: "গ্ৰীষ্মকালীন বন্ধৰ সূচী",
    description: "School will remain closed from June 1 to July 15 for summer vacation. Classes resume July 16.",
    assameseDescription: "গ্ৰীষ্মকালৰ বন্ধৰ বাবে ১ জুনৰ পৰা ১৫ জুলাইলৈ বিদ্যালয় বন্ধ থাকিব। ১৬ জুলাইৰ পৰা পুনৰ পাঠদান আৰম্ভ হ'ব।"
  },
];

export default function NoticeBoard() {
  return (
    <ScrollReveal>
      <div id="notice" className="scroll-mt-24">
        <p className="label-text mb-3">Latest</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
          Notice Board
        </h2>

        <div className="space-y-4">
          {NOTICES.map((notice) => (
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
