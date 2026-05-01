"use client";

import { ClipboardList, FileSpreadsheet, TrendingUp, Bell } from "lucide-react";

const STATS = [
  { label: "Pending Admissions", value: "23", icon: FileSpreadsheet, change: "8 new today", color: "text-[--color-warning]" },
  { label: "Today's Attendance", value: "94.2%", icon: ClipboardList, change: "↑ 1.3% vs yesterday", color: "text-[--color-success]" },
  { label: "Active Notices", value: "5", icon: Bell, change: "2 published today", color: "text-primary" },
];

const RECENT = [
  { action: "Result uploaded for Class VIII", time: "2 min ago", user: "Principal" },
  { action: "Admission request from Amit Kumar", time: "15 min ago", user: "System" },
  { action: "Attendance marked for Class V-A", time: "1 hour ago", user: "Mrs. Sharma" },
  { action: "Notice published: Mid-Term Results", time: "2 hours ago", user: "Principal" },
  { action: "Fee status updated for 12 students", time: "3 hours ago", user: "Principal" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-[--radius-xl] border border-[--color-border] p-6 hover:shadow-[--shadow-card-hover] transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-[--color-muted] flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-[--color-success]" />
            </div>
            <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
            <p className="text-xs text-[--color-muted-foreground]">{stat.label}</p>
            <p className="text-[10px] text-[--color-success] mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[--radius-xl] border border-[--color-border] p-6">
        <h2 className="font-semibold text-primary mb-4">Recent Activity</h2>
        <div className="space-y-1">
          {RECENT.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-3 rounded-[--radius-md] hover:bg-[--color-muted] transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-primary/30 shrink-0" />
                <p className="text-sm text-primary truncate">{item.action}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0 ml-4">
                <span className="text-xs text-[--color-muted-foreground] hidden sm:inline">{item.user}</span>
                <span className="text-xs text-[--color-muted-foreground]">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
