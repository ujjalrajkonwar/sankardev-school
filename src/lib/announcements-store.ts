"use client";

import { useEffect, useMemo, useState } from "react";

export type NoticeItem = {
  id: number;
  category: string;
  title: string;
  assameseTitle: string;
  description: string;
  assameseDescription: string;
  published: boolean;
  date: string;
};

export type EventKind = "holiday" | "exam" | "event" | "vacation";

export type EventItem = {
  id: number;
  title: string;
  assameseTitle: string;
  date: string;
  type: EventKind;
  typeLabel: string;
  assameseTypeLabel: string;
  published: boolean;
};

const NOTICES_KEY = "sankardev_notices";
const EVENTS_KEY = "sankardev_events";

export const EVENT_TYPE_LABELS: Record<EventKind, string> = {
  holiday: "Holiday · School Closed",
  exam: "Exam",
  event: "Event",
  vacation: "Vacation · School Closed for 30 Days",
};

export const EVENT_TYPE_STYLES: Record<EventKind, string> = {
  holiday: "text-[--color-danger]",
  exam: "text-[--color-warning]",
  event: "text-[--color-accent]",
  vacation: "text-[--color-success]",
};

export const EVENT_TYPE_BADGES: Record<EventKind, string> = {
  holiday: "bg-red-100 text-red-700",
  exam: "bg-yellow-100 text-yellow-700",
  event: "bg-blue-100 text-blue-700",
  vacation: "bg-green-100 text-green-700",
};

const WHOLE_TEXT_TRANSLATIONS: Record<string, string> = {
  "Mid-Term Results Published": "অৰ্ধবাৰ্ষিক পৰীক্ষাৰ ফলাফল ঘোষণা",
  "Class V-VIII mid-term results are now available on the parent portal. Please log in to view.":
    "পঞ্চম শ্ৰেণীৰ পৰা অষ্টম শ্ৰেণীলৈ অৰ্ধবাৰ্ষিক পৰীক্ষাৰ ফলাফল অভিভাৱক পৰ্টেলত উপলব্ধ। অনুগ্ৰহ কৰি লগ ইন কৰি চাওক।",
  "Annual Sports Day 2026": "বাৰ্ষিক ক্ৰীড়া দিৱস ২০২৬",
  "Annual Sports Day will be held on May 20. All parents are cordially invited to attend.":
    "অহা ২০ মে'ত বাৰ্ষিক ক্ৰীড়া দিৱস অনুষ্ঠিত হ'ব। সকলো অভিভাৱকক আন্তৰিকতাৰে আমন্ত্ৰণ জনোৱা হৈছে।",
  "Admissions Open for 2026-27": "২০২৬-২৭ বৰ্ষৰ নামভৰ্তি চলি আছে",
  "Limited seats available for Nursery to Class VIII. Apply now through our online portal.":
    "নাৰ্ছাৰীৰ পৰা অষ্টম শ্ৰেণীলৈ সীমিত আসন উপলব্ধ। আমাৰ অনলাইন পৰ্টেলৰ জৰিয়তে এতিয়াই আবেদন কৰক।",
  "Summer Vacation Schedule": "গ্ৰীষ্মকালীন বন্ধৰ সূচী",
  "School will remain closed from June 1 to July 15 for summer vacation. Classes resume July 16.":
    "গ্ৰীষ্মকালৰ বন্ধৰ বাবে ১ জুনৰ পৰা ১৫ জুলাইলৈ বিদ্যালয় বন্ধ থাকিব। ১৬ জুলাইৰ পৰা পুনৰ পাঠদান আৰম্ভ হ'ব।",
  "Republic Day": "গণতন্ত্ৰ দিৱস",
  "Mid-Term Exams Begin": "অৰ্ধবাৰ্ষিক পৰীক্ষা আৰম্ভ",
  "Mid-Term Exams": "অৰ্ধবাৰ্ষিক পৰীক্ষা",
  "Sports Day": "ক্ৰীড়া দিৱস",
  "Summer Vacation": "গ্ৰীষ্মকালীন বন্ধ",
  "Holiday · School Closed": "বন্ধ · বিদ্যালয় বন্ধ",
  Exam: "পৰীক্ষা",
  Event: "অনুষ্ঠান",
  "Vacation · School Closed for 30 Days": "বন্ধ · ৩০ দিনৰ বাবে বিদ্যালয় বন্ধ",
  General: "সাধাৰণ",
  Results: "ফলাফল",
  Admission: "নামভৰ্তি",
  Notice: "জাননী",
};

const PHRASE_TRANSLATIONS: Record<string, string> = {
  "annual sports day": "বাৰ্ষিক ক্ৰীড়া দিৱস",
  "sports day": "ক্ৰীড়া দিৱস",
  "mid-term results": "অৰ্ধবাৰ্ষিক পৰীক্ষাৰ ফলাফল",
  "mid-term exams": "অৰ্ধবাৰ্ষিক পৰীক্ষা",
  "half yearly results": "অৰ্ধবাৰ্ষিক ফলাফল",
  "summer vacation": "গ্ৰীষ্মকালীন বন্ধ",
  "school closed": "বিদ্যালয় বন্ধ",
  "admissions open": "নামভৰ্তি চলি আছে",
  "admission open": "নামভৰ্তি চলি আছে",
  "parent portal": "অভিভাৱক পৰ্টেল",
  "online portal": "অনলাইন পৰ্টেল",
  "class viii": "অষ্টম শ্ৰেণী",
  "class vii": "সপ্তম শ্ৰেণী",
  "class vi": "ষষ্ঠ শ্ৰেণী",
  "class v": "পঞ্চম শ্ৰেণী",
  "class ix": "নৱম শ্ৰেণী",
  "class x": "দশম শ্ৰেণী",
  "class": "শ্ৰেণী",
  "results": "ফলাফল",
  "result": "ফলাফল",
  "published": "প্ৰকাশিত",
  "declared": "ঘোষণা কৰা হৈছে",
  "available": "উপলব্ধ",
  "limited seats": "সীমিত আসন",
  "apply now": "এতিয়াই আবেদন কৰক",
  "exam": "পৰীক্ষা",
  "event": "অনুষ্ঠান",
  "notice": "জাননী",
  "holiday": "বন্ধ",
  "vacation": "বন্ধ",
  "school": "বিদ্যালয়",
  "parents": "অভিভাৱক",
  "students": "ছাত্ৰ-ছাত্ৰী",
  "teacher": "শিক্ষক",
  "teachers": "শিক্ষকসকল",
  "nursery": "নাৰ্ছাৰী",
  "from": "পৰা",
  "to": "লৈ",
  "for": "বাবে",
  "will": "হ'ব",
  "begin": "আৰম্ভ",
  "begins": "আৰম্ভ",
  "open": "চলি আছে",
  "new": "নতুন",
  "important": "গুরুত্বপূৰ্ণ",
  "latest": "শেহতীয়া",
  "general": "সাধাৰণ",
  "admission": "নামভৰ্তি",
};

const TRANSLITERATION_MAP: Record<string, string> = {
  kh: "খ",
  gh: "ঘ",
  ch: "চ",
  jh: "ঝ",
  th: "থ",
  dh: "ধ",
  ph: "ফ",
  bh: "ভ",
  sh: "শ",
  aa: "আ",
  ee: "ঈ",
  oo: "ঊ",
  ai: "ঐ",
  au: "ঔ",
  a: "অ",
  b: "ব",
  c: "ক",
  d: "দ",
  e: "এ",
  f: "ফ",
  g: "গ",
  h: "হ",
  i: "ই",
  j: "জ",
  k: "ক",
  l: "ল",
  m: "ম",
  n: "ন",
  o: "ও",
  p: "প",
  q: "ক",
  r: "ৰ",
  s: "স",
  t: "ত",
  u: "উ",
  v: "ভ",
  w: "ৱ",
  x: "ক্স",
  y: "য়",
  z: "জ",
};

const ASSAMESE_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const DEFAULT_NOTICES: NoticeItem[] = [
  createNotice({
    id: 1,
    category: "LATEST",
    title: "Mid-Term Results Published",
    description: "Class V-VIII mid-term results are now available on the parent portal. Please log in to view.",
    date: "2026-04-30",
  }),
  createNotice({
    id: 2,
    category: "IMPORTANT",
    title: "Annual Sports Day 2026",
    description: "Annual Sports Day will be held on May 20. All parents are cordially invited to attend.",
    date: "2026-04-28",
  }),
  createNotice({
    id: 3,
    category: "ADMISSION",
    title: "Admissions Open for 2026-27",
    description: "Limited seats available for Nursery to Class VIII. Apply now through our online portal.",
    date: "2026-04-25",
  }),
  createNotice({
    id: 4,
    category: "NOTICE",
    title: "Summer Vacation Schedule",
    description: "School will remain closed from June 1 to July 15 for summer vacation. Classes resume July 16.",
    date: "2026-04-20",
  }),
];

const DEFAULT_EVENTS: EventItem[] = [
  createEvent({ id: 1, title: "Republic Day", date: "2026-04-30", type: "holiday" }),
  createEvent({ id: 2, title: "Mid-Term Exams Begin", date: "2026-05-07", type: "exam" }),
  createEvent({ id: 3, title: "Sports Day", date: "2026-05-20", type: "event" }),
  createEvent({ id: 4, title: "Summer Vacation", date: "2026-06-29", type: "vacation" }),
];

type NoticeInput = {
  id?: number;
  category: string;
  title: string;
  description?: string;
  date?: string;
  published?: boolean;
};

type EventInput = {
  id?: number;
  title: string;
  date: string;
  type: EventKind;
  published?: boolean;
};

export function translateToAssamese(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const exact = WHOLE_TEXT_TRANSLATIONS[trimmed];
  if (exact) return exact;

  let translated = trimmed.toLowerCase();
  const phrases = Object.entries(PHRASE_TRANSLATIONS).sort(([a], [b]) => b.length - a.length);

  for (const [english, assamese] of phrases) {
    translated = translated.replace(new RegExp(escapeRegExp(english), "gi"), assamese);
  }

  translated = translated.replace(/\d/g, (digit) => ASSAMESE_DIGITS[Number(digit)]);

  const hasAssamese = /[\u0980-\u09FF]/.test(translated);
  if (hasAssamese && !/[a-z]/i.test(translated)) {
    return cleanSpacing(translated);
  }

  return cleanSpacing(
    translated
      .split(/(\s+|[.,:;!?()[\]{}'"·/-]+)/)
      .map((part) => {
        if (!/[a-z]/i.test(part)) return part;
        return transliterateWord(part);
      })
      .join("")
  );
}

function createNotice(input: NoticeInput): NoticeItem {
  const title = input.title.trim();
  const description = input.description?.trim() || "New school notice published.";

  return {
    id: input.id ?? Date.now(),
    category: input.category.trim() || "General",
    title,
    assameseTitle: translateToAssamese(title),
    description,
    assameseDescription: translateToAssamese(description),
    published: input.published ?? true,
    date: input.date ?? new Date().toISOString().split("T")[0],
  };
}

function createEvent(input: EventInput): EventItem {
  const title = input.title.trim();
  const typeLabel = EVENT_TYPE_LABELS[input.type];

  return {
    id: input.id ?? Date.now(),
    title,
    assameseTitle: translateToAssamese(title),
    date: input.date,
    type: input.type,
    typeLabel,
    assameseTypeLabel: translateToAssamese(typeLabel),
    published: input.published ?? true,
  };
}

function normalizeNotice(notice: Partial<NoticeItem>): NoticeItem {
  return createNotice({
    id: notice.id,
    category: notice.category || "General",
    title: notice.title || "New Notice",
    description: notice.description || "",
    date: notice.date,
    published: notice.published ?? true,
  });
}

function normalizeEvent(event: Partial<EventItem>): EventItem {
  const type = isEventKind(event.type) ? event.type : "event";

  return createEvent({
    id: event.id,
    title: event.title || "New Event",
    date: event.date || new Date().toISOString().split("T")[0],
    type,
    published: event.published ?? true,
  });
}

function readStorage<T>(key: string, fallback: T[]) {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new Event("sankardev-announcements-updated"));
}

function isEventKind(type: unknown): type is EventKind {
  return type === "holiday" || type === "exam" || type === "event" || type === "vacation";
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanSpacing(value: string) {
  return value.replace(/\s+([.,:;!?])/g, "$1").replace(/\s{2,}/g, " ").trim();
}

function transliterateWord(word: string) {
  let output = "";
  let index = 0;
  const lower = word.toLowerCase();

  while (index < lower.length) {
    const two = lower.slice(index, index + 2);
    if (TRANSLITERATION_MAP[two]) {
      output += TRANSLITERATION_MAP[two];
      index += 2;
      continue;
    }

    const one = lower[index];
    output += TRANSLITERATION_MAP[one] || one;
    index += 1;
  }

  return output;
}

export function useAnnouncementsStore() {
  const [notices, setNotices] = useState<NoticeItem[]>(DEFAULT_NOTICES);
  const [events, setEvents] = useState<EventItem[]>(DEFAULT_EVENTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadAnnouncements = () => {
      const storedNotices = readStorage<Partial<NoticeItem>>(NOTICES_KEY, DEFAULT_NOTICES).map(normalizeNotice);
      const storedEvents = readStorage<Partial<EventItem>>(EVENTS_KEY, DEFAULT_EVENTS).map(normalizeEvent);

      setNotices(storedNotices);
      setEvents(storedEvents);
      localStorage.setItem(NOTICES_KEY, JSON.stringify(storedNotices));
      localStorage.setItem(EVENTS_KEY, JSON.stringify(storedEvents));
      setIsLoaded(true);
    };

    loadAnnouncements();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === NOTICES_KEY || event.key === EVENTS_KEY) {
        loadAnnouncements();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("sankardev-announcements-updated", loadAnnouncements);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("sankardev-announcements-updated", loadAnnouncements);
    };
  }, []);

  const sortedPublishedNotices = useMemo(
    () =>
      notices
        .filter((notice) => notice.published)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [notices]
  );

  const sortedPublishedEvents = useMemo(
    () =>
      events
        .filter((event) => event.published)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events]
  );

  const addNotice = (input: Omit<NoticeInput, "id" | "published">) => {
    const notice = createNotice(input);
    const nextNotices = [notice, ...notices];

    setNotices(nextNotices);
    saveStorage(NOTICES_KEY, nextNotices);
  };

  const toggleNoticePublish = (id: number) => {
    const nextNotices = notices.map((notice) =>
      notice.id === id ? { ...notice, published: !notice.published } : notice
    );

    setNotices(nextNotices);
    saveStorage(NOTICES_KEY, nextNotices);
  };

  const removeNotice = (id: number) => {
    const nextNotices = notices.filter((notice) => notice.id !== id);

    setNotices(nextNotices);
    saveStorage(NOTICES_KEY, nextNotices);
  };

  const addEvent = (input: Omit<EventInput, "id" | "published">) => {
    const event = createEvent(input);
    const nextEvents = [...events, event];

    setEvents(nextEvents);
    saveStorage(EVENTS_KEY, nextEvents);
  };

  return {
    notices,
    events,
    publishedNotices: sortedPublishedNotices,
    publishedEvents: sortedPublishedEvents,
    addNotice,
    addEvent,
    removeNotice,
    toggleNoticePublish,
    isLoaded,
  };
}
