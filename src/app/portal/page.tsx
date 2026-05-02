"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import { Search, Lock, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchClassOptions, FALLBACK_CLASS_OPTIONS, type ClassOption } from "@/lib/class-options";
import { DEMO_STUDENTS } from "@/lib/mock-data/results";

export default function PortalPage() {
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("Ankur");
  const [student, setStudent] = useState<typeof DEMO_STUDENTS[string] | null>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [classOptions, setClassOptions] = useState<ClassOption[]>(
    FALLBACK_CLASS_OPTIONS.map((item, index) => ({ id: index + 1, name: item }))
  );

  useEffect(() => {
    fetchClassOptions().then(setClassOptions);
  }, []);

  const handleSearch = () => {
    setError("");
    setSearched(true);
    const s = DEMO_STUDENTS[roll.toUpperCase()];
    if (
      s &&
      s.name.toLowerCase() === name.trim().toLowerCase() &&
      s.class === className
    ) {
      setStudent(s);
    } else if (s) {
      setError("Name or class does not match our records.");
      setStudent(null);
    } else {
      setError("No student found with this roll number.");
      setStudent(null);
    }
  };

  const totalMarks = student?.results.reduce((a, b) => a + b.marks, 0) || 0;
  const totalPossible = student?.results.reduce((a, b) => a + b.total, 0) || 0;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <p className="label-text mb-2">Student &amp; Parent</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Result Portal</h1>
              <p className="text-[--color-muted-foreground] leading-relaxed">
                Look up examination results using your roll number, name, and class.
              </p>
            </div>

            {/* Search Form */}
            <div className="rounded-[--radius-xl] border border-[--color-border] p-6 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex-1">
                  <label className="label-text block mb-2">Roll Number</label>
                  <input type="text" value={roll} onChange={e => setRoll(e.target.value)}
                    placeholder="e.g. S001"
                    className="w-full px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors"/>
                </div>
                <div className="flex-1">
                  <label className="label-text block mb-2">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors"/>
                </div>
                <div className="flex-1">
                  <label className="label-text block mb-2">Class</label>
                  <select value={className} onChange={e => setClassName(e.target.value)}
                    className="w-full px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors bg-white">
                    {classOptions.map((option) => (
                      <option key={option.id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-3 flex items-end">
                  <MagneticButton>
                    <button onClick={handleSearch} className="btn-primary text-sm w-full sm:w-auto">
                      <Search className="w-4 h-4"/>View Result
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <AnimatePresence mode="wait">
            {error && searched && (
              <motion.div key="error" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="rounded-[--radius-xl] border border-[--color-danger]/20 bg-[--color-danger]/5 p-6 text-center">
                <p className="text-sm text-[--color-danger]">{error}</p>
              </motion.div>
            )}

            {student && !student.feeCleared && (
              <motion.div key="locked" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                <div className="relative rounded-[--radius-xl] border border-[--color-border] overflow-hidden">
                  {/* Blurred result preview */}
                  <div className="blur-md pointer-events-none select-none p-8">
                    <div className="text-center mb-6">
                      <p className="font-bold text-xl text-primary">{student.name}</p>
                      <p className="text-sm text-[--color-muted-foreground]">{student.class}</p>
                    </div>
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-[--color-border]">
                        <th className="text-left py-2 font-medium">Subject</th>
                        <th className="text-center py-2 font-medium">Marks</th>
                        <th className="text-center py-2 font-medium">Grade</th>
                      </tr></thead>
                      <tbody>{student.results.map(r=>(
                        <tr key={r.subject} className="border-b border-[--color-border]/50">
                          <td className="py-2">{r.subject}</td>
                          <td className="text-center py-2">{r.marks}/{r.total}</td>
                          <td className="text-center py-2">{r.grade}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                  {/* Lock Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <motion.div animate={{scale:[1,1.1,1]}} transition={{repeat:Infinity,duration:2}} className="w-16 h-16 rounded-full bg-[--color-warning]/10 flex items-center justify-center mb-4">
                      <Lock className="w-8 h-8 text-[--color-warning]"/>
                    </motion.div>
                    <h3 className="text-lg font-bold text-primary mb-2">Payment Pending</h3>
                    <p className="text-sm text-[--color-muted-foreground] text-center max-w-xs">
                      Please clear your pending fees to view the complete result. Contact the school office for assistance.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {student && student.feeCleared && (
              <motion.div key="result" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                <div className="rounded-[--radius-xl] border border-[--color-border] overflow-hidden">
                  {/* Header */}
                  <div className="bg-primary p-6 text-center">
                    <p className="text-white/60 text-xs tracking-widest mb-1">SANKARDEV SISHU VIDYA NIKETAN</p>
                    <p className="text-white font-bold text-lg">Mid-Term Examination 2026</p>
                    <p className="text-white/60 text-sm mt-1">Class {student.class}</p>
                  </div>
                  {/* Student Info */}
                  <div className="flex items-center justify-between p-6 border-b border-[--color-border] bg-[--color-muted]/50">
                    <div>
                      <p className="font-bold text-primary">{student.name}</p>
                      <p className="text-xs text-[--color-muted-foreground]">Roll: {student.roll}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{student.percentage}%</p>
                      <p className="text-xs text-[--color-muted-foreground]">Rank #{student.rank}</p>
                    </div>
                  </div>
                  {/* Marks Table */}
                  <div className="p-6">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b-2 border-[--color-border]">
                        <th className="text-left py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Subject</th>
                        <th className="text-center py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Marks</th>
                        <th className="text-center py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Total</th>
                        <th className="text-center py-3 font-semibold text-[--color-muted-foreground] text-xs uppercase tracking-wider">Grade</th>
                      </tr></thead>
                      <tbody>{student.results.map(r=>(
                        <tr key={r.subject} className="border-b border-[--color-border]/50 hover:bg-[--color-muted]/30 transition-colors">
                          <td className="py-3 font-medium text-primary">{r.subject}</td>
                          <td className="text-center py-3">{r.marks}</td>
                          <td className="text-center py-3 text-[--color-muted-foreground]">{r.total}</td>
                          <td className="text-center py-3"><span className="px-2 py-0.5 rounded-full bg-[--color-success]/10 text-[--color-success] text-xs font-bold">{r.grade}</span></td>
                        </tr>
                      ))}</tbody>
                      <tfoot><tr className="border-t-2 border-[--color-border]">
                        <td className="py-3 font-bold text-primary">Total</td>
                        <td className="text-center py-3 font-bold text-primary">{totalMarks}</td>
                        <td className="text-center py-3 font-bold text-[--color-muted-foreground]">{totalPossible}</td>
                        <td/>
                      </tr></tfoot>
                    </table>
                  </div>
                  {/* Download */}
                  <div className="p-6 border-t border-[--color-border] flex justify-end">
                    <button onClick={()=>window.print()} className="btn-outline text-sm"><Download className="w-4 h-4"/>Download PDF</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer/>
    </>
  );
}
