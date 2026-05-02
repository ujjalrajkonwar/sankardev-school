"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, MapPin, Phone, GraduationCap } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Admissions", href: "/admissions", icon: "📋" },
  { label: "Student Portal", href: "/portal", icon: "🎓" },
];

const QUICK_INFO = [
  { label: "Phone: 9365526549", icon: Phone },
  { label: "Mathurapur, Charaideo, Assam", icon: MapPin },
  { label: "SEBA Affiliated", icon: GraduationCap },
];

const NOTICES = [
  { label: "Mid-Term Results Published", href: "/portal" },
  { label: "Admissions 2026-27 Now Open", href: "/admissions" },
  { label: "Summer Vacation: June 1 - July 15", href: "/" },
];

export default function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) {
          closeSearch();
        } else {
          setOpen(true);
        }
      }
      if (e.key === "Escape") {
        closeSearch();
      }
    },
    [closeSearch, open]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navigate = (href: string) => {
    closeSearch();
    router.push(href);
  };

  const filteredNav = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredNotices = NOTICES.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredInfo = QUICK_INFO.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults = filteredNav.length > 0 || filteredNotices.length > 0 || filteredInfo.length > 0;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeSearch}
      />

      {/* Dialog */}
      <div className="relative flex items-start justify-center pt-[15vh]">
        <div className="w-full max-w-lg bg-white rounded-[--radius-xl] shadow-[--shadow-elevated] overflow-hidden animate-fade-in-up">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[--color-border]">
            <Search className="w-5 h-5 text-[--color-muted-foreground]" />
            <input
              type="text"
              placeholder="Search notices, students, events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="flex-1 text-base outline-none bg-transparent placeholder:text-[--color-muted-foreground]"
            />
            <button
              onClick={closeSearch}
              className="p-1 rounded-md hover:bg-[--color-muted] transition-colors"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {!hasResults && query && (
              <p className="text-center text-[--color-muted-foreground] py-8 text-sm">
                No results found for &ldquo;{query}&rdquo;
              </p>
            )}

            {!query && !hasResults && (
              <p className="text-center text-[--color-muted-foreground] py-8 text-sm">
                Type to search...
              </p>
            )}

            {filteredNav.length > 0 && (
              <div className="mb-2">
                <p className="label-text px-3 py-2">Navigation</p>
                {filteredNav.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[--color-muted] transition-colors flex items-center gap-3 text-sm"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {filteredNotices.length > 0 && (
              <div className="mb-2">
                <p className="label-text px-3 py-2">Notices</p>
                {filteredNotices.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.href)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[--color-muted] transition-colors flex items-center gap-3 text-sm"
                  >
                    <FileText className="w-4 h-4 text-[--color-muted-foreground]" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {filteredInfo.length > 0 && (
              <div className="mb-2">
                <p className="label-text px-3 py-2">Quick Info</p>
                {filteredInfo.map((item) => (
                  <div
                    key={item.label}
                    className="px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm text-[--color-muted-foreground]"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
