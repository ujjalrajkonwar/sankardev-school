"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

const EVENT_TYPES = { holiday: "bg-red-100 text-red-700", exam: "bg-yellow-100 text-yellow-700", event: "bg-blue-100 text-blue-700", vacation: "bg-green-100 text-green-700" };

const DEMO_EVENTS = [
  { id: 1, title: "Republic Day", date: "2026-04-30", type: "holiday" as const },
  { id: 2, title: "Mid-Term Exams", date: "2026-05-07", type: "exam" as const },
  { id: 3, title: "Sports Day", date: "2026-05-20", type: "event" as const },
  { id: 4, title: "Summer Vacation", date: "2026-06-01", type: "vacation" as const },
];

export default function AdminCalendarPage() {
  const [events, setEvents] = useState(DEMO_EVENTS);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "event" });
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    setEvents(prev => [...prev, { ...newEvent, id: Date.now(), type: newEvent.type as "holiday"|"exam"|"event"|"vacation" }]);
    setNewEvent({ title: "", date: "", type: "event" }); setShowForm(false);
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Calendar</h1>
          <p className="text-sm text-[--color-muted-foreground]">Manage holidays, exams, and events.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm"><Plus className="w-4 h-4" />Add Event</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-[--radius-xl] border border-[--color-border] p-6 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="label-text block mb-2">Event Title</label>
            <input type="text" value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary" placeholder="Event name"/>
          </div>
          <div>
            <label className="label-text block mb-2">Date</label>
            <input type="date" value={newEvent.date} onChange={e => setNewEvent(p => ({ ...p, date: e.target.value }))}
              className="px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary"/>
          </div>
          <div>
            <label className="label-text block mb-2">Type</label>
            <select value={newEvent.type} onChange={e => setNewEvent(p => ({ ...p, type: e.target.value }))}
              className="px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm bg-white">
              <option value="event">Event</option><option value="holiday">Holiday</option><option value="exam">Exam</option><option value="vacation">Vacation</option>
            </select>
          </div>
          <button onClick={addEvent} className="btn-primary text-sm">Save</button>
        </div>
      )}

      <div className="bg-white rounded-[--radius-xl] border border-[--color-border] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[--color-border]">
          <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }}
            className="p-2 rounded-lg hover:bg-[--color-muted] transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <h2 className="font-semibold text-primary">{monthName} {year}</h2>
          <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }}
            className="p-2 rounded-lg hover:bg-[--color-muted] transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-7 border-b border-[--color-border]">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} className="px-2 py-3 text-center text-xs font-semibold text-[--color-muted-foreground] uppercase tracking-wider">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="h-24 border-b border-r border-[--color-border]/50" />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(day);
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            return (
              <div key={day} className={`h-24 p-1.5 border-b border-r border-[--color-border]/50 ${isToday ? "bg-primary/5" : "hover:bg-[--color-muted]/50"} transition-colors`}>
                <span className={`text-xs font-medium ${isToday ? "w-6 h-6 rounded-full bg-primary text-white inline-flex items-center justify-center" : "text-[--color-muted-foreground]"}`}>{day}</span>
                <div className="mt-1 space-y-0.5">
                  {dayEvents.map(e => (
                    <div key={e.id} className={`text-[9px] font-medium px-1.5 py-0.5 rounded truncate ${EVENT_TYPES[e.type]}`}>{e.title}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
