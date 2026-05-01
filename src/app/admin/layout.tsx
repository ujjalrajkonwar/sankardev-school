"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, ClipboardList,
  Bell, Calendar, Settings, ChevronLeft, ChevronRight,
  LogOut, FileSpreadsheet, Menu, ShieldCheck, BookOpen,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Teachers", href: "/admin/teachers", icon: BookOpen },
  { label: "Results", href: "/admin/results", icon: GraduationCap },
  { label: "Attendance", href: "/admin/attendance", icon: ClipboardList },
  { label: "Admissions", href: "/admin/admissions", icon: FileSpreadsheet },
  { label: "Notices", href: "/admin/notices", icon: Bell },
  { label: "Calendar", href: "/admin/calendar", icon: Calendar },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[--color-muted]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-[--color-border] flex flex-col transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-[--color-border] shrink-0">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          {!collapsed && <p className="text-sm font-semibold text-primary truncate">Admin Panel</p>}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-[--radius-md] text-sm font-medium transition-all ${
                  isActive ? "bg-primary text-white" : "text-[--color-muted-foreground] hover:bg-[--color-muted] hover:text-primary"
                }`}>
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle + Logout */}
        <div className="border-t border-[--color-border] p-3 space-y-1">
          <button onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-[--radius-md] text-sm text-[--color-muted-foreground] hover:bg-[--color-muted] transition-colors">
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <><ChevronLeft className="w-5 h-5" /><span>Collapse</span></>}
          </button>
          <Link href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-[--radius-md] text-sm text-[--color-danger] hover:bg-[--color-danger]/5 transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[--color-border] flex items-center justify-between px-4 lg:px-8 shrink-0 gap-3">
          <button className="lg:hidden p-2 rounded-lg hover:bg-[--color-muted]" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">P</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-primary">Principal</p>
              <p className="text-[10px] text-[--color-muted-foreground]">principal@sankardev.edu</p>
            </div>
          </div>
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-white px-4 py-2 text-sm font-medium text-primary hover:bg-[--color-muted] transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            Staff Login
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
