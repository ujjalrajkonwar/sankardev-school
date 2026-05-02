"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandSearch from "@/components/shared/CommandSearch";

const ALL_LINKS = [
  { label: "Notice", href: "/#notice", mobileLabel: "Notice" },
  { label: "Events", href: "/#events", mobileLabel: "Events" },
  { label: "Teachers", href: "/teachers", mobileLabel: "Teachers" },
  { label: "Result", href: "/portal", mobileLabel: "Result" },
  { label: "Admission", href: "/admissions", mobileLabel: "Admission" },
  { label: "Contact Us", href: "/#contact", mobileLabel: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const NavLink = ({ link }: { link: { label: string; href: string; mobileLabel?: string } }) => {
    const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split('#')[0]) && link.href.split('#')[0] !== '/';
    const isHash = link.href.includes('#');
    const displayLabel = link.mobileLabel || link.label;

    if (isHash) {
      return (
        <a
          href={link.href}
          className={`px-1.5 md:px-3 py-1.5 text-[10px] sm:text-xs md:text-sm font-medium transition-colors whitespace-nowrap rounded-md ${isActive ? "text-primary font-bold bg-primary/5" : "text-gray-600 hover:text-primary hover:bg-gray-50"}`}
        >
          <span className="md:hidden">{displayLabel}</span>
          <span className="hidden md:inline">{link.label}</span>
        </a>
      );
    }

    return (
      <Link
        href={link.href}
        className={`px-1.5 md:px-3 py-1.5 text-[10px] sm:text-xs md:text-sm font-medium transition-colors whitespace-nowrap rounded-md ${isActive ? "text-primary font-bold bg-primary/5" : "text-gray-600 hover:text-primary hover:bg-gray-50"}`}
      >
        <span className="md:hidden">{displayLabel}</span>
        <span className="hidden md:inline">{link.label}</span>
      </Link>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[--color-border] shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 md:h-20 w-full">
            
            {/* Left Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 mr-auto pr-2 md:pr-4">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-sm border-2 border-blue-400 shrink-0">
                <span className="text-white text-xs md:text-lg font-bold">S</span>
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-sm font-bold text-primary leading-tight">
                  Sankardev Sishu Vidya Niketan
                </span>
              </div>
            </Link>

            {/* Links Container */}
            <nav className="flex items-center justify-end gap-0 md:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap w-full">
              {ALL_LINKS.map((link) => (
                <NavLink key={link.href} link={link} />
              ))}
            </nav>

          </div>
        </div>
      </header>

      {/* Command+K Search */}
      <CommandSearch />
    </>
  );
}
