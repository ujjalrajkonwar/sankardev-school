"use client";

import ScrollReveal from "@/components/shared/ScrollReveal";
import Link from "next/link";
import { useAnnouncementsStore } from "@/lib/announcements-store";

const TICKER_STYLES = [
  { text: "text-orange-600", dot: "bg-orange-600" },
  { text: "text-blue-600", dot: "bg-blue-600" },
  { text: "text-green-600", dot: "bg-green-600" },
  { text: "text-purple-600", dot: "bg-purple-600" },
];

export default function AboutSchoolSection() {
  const { publishedEvents, publishedNotices } = useAnnouncementsStore();
  const tickerItems = [
    ...publishedNotices.slice(0, 2).map((notice) => notice.title),
    ...publishedEvents.slice(0, 2).map((event) => event.title),
  ];

  return (
    <section id="about" className="pt-28 pb-16 sm:pt-32 sm:pb-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-8 lg:gap-12">
            
            {/* Top Image Placeholder */}
            <div className="w-full aspect-[21/9] bg-gray-100 rounded-3xl overflow-hidden shadow-sm relative border border-gray-200 flex items-center justify-center">
               <span className="text-gray-400 font-medium">About School Image Placeholder</span>
            </div>

            {/* Bottom Content */}
            <div className="w-full space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                About Our School
              </h2>
              <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Welcome to Sankardev Shishu Vidya Niketan, Mathurapur, a premier center of learning located in the heart of the Charaideo district, Assam
                </p>
                <p>
                  Affiliated with the Shishu Shiksha Samiti, Assam, our institution is deeply rooted in the cultural and spiritual heritage of Mahapurush Srimanta Sankardev. We believe in a holistic approach to education that balances modern academic rigor with the "Pancha Pradipta" philosophy, focusing on physical, mental, and spiritual growth.
                </p>
                <div className="mt-2 text-sm text-[--color-muted-foreground] space-y-1">
                  <p><strong>Affiliation:</strong> Shishu Shiksha Samiti, Assam (Vidya Bharati)</p>
                  <p><strong>Medium:</strong> Assamese</p>
                  <p><strong>Established:</strong> 2000</p>
                  <p><strong>Location:</strong> Mathurapur, Charaideo, Assam - 785689</p>
                </div>
              </div>
              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Apply for Admission
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Result
                </Link>
              </div>

              {/* Moving Notices Bar */}
              <div className="mt-8 pt-6 border-t border-gray-100 overflow-hidden relative">
                <div className="flex animate-marquee whitespace-nowrap">
                  {[...Array(2)].map((_, idx) => (
                    <div key={idx} className="flex shrink-0 items-center gap-8 px-4">
                      {tickerItems.map((item, itemIndex) => {
                        const style = TICKER_STYLES[itemIndex % TICKER_STYLES.length];

                        return (
                          <span key={`${idx}-${item}`} className={`flex items-center gap-2 text-sm font-medium ${style.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`}></span>
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
