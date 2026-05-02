"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Download, ShieldCheck } from "lucide-react";
import { findPaymentStudentMock, type PaymentDueItem, type PaymentStudentProfile, type PaymentTransaction } from "@/lib/mock-data/fees";

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
      <div className="p-6 sm:p-8">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-sky-700 mb-3">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-5">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export default function PaymentPortal() {
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [lookupState, setLookupState] = useState<"idle" | "loaded" | "not-found">("idle");
  const [studentProfile, setStudentProfile] = useState<PaymentStudentProfile | null>(null);

  const unpaidDues: PaymentDueItem[] = studentProfile?.dues.filter((item) => !item.paid) ?? [];
  const totalAmount = useMemo(() => unpaidDues.reduce((sum, item) => sum + item.amount, 0), [unpaidDues]);
  const recentTransactions: PaymentTransaction[] = studentProfile?.transactions ?? [];

  const handleFetchDues = () => {
    const foundStudent = findPaymentStudentMock({
      studentName,
      studentClass,
      rollNo,
      dob,
    });

    if (foundStudent) {
      setStudentProfile(foundStudent);
      setLookupState("loaded");
    } else {
      setStudentProfile(null);
      setLookupState("not-found");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_34%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-sky-700 mb-3">
            Fee Payment Portal
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Fee Payment Portal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Look up pending dues, review the fee breakdown, and continue to a payment-ready flow designed for a future Indian gateway integration.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionCard eyebrow="Student Lookup" title="Fetch Dues">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Student Name</label>
                <input
                  value={studentName}
                  onChange={(event) => setStudentName(event.target.value)}
                  placeholder="Enter student name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Class</label>
                <input
                  value={studentClass}
                  onChange={(event) => setStudentClass(event.target.value)}
                  placeholder="Enter class"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Roll No</label>
                <input
                  value={rollNo}
                  onChange={(event) => setRollNo(event.target.value)}
                  placeholder="Enter roll no"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(event) => setDob(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleFetchDues}
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/30"
              >
                Fetch Dues
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <span className="text-xs text-slate-500">
                {lookupState === "loaded"
                  ? "Student record loaded."
                  : lookupState === "not-found"
                    ? "No matching student record found."
                    : "Enter details to load the fee summary."}
              </span>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Payment Ready" title="Fee Breakdown">
            <div className="space-y-4">
              {studentProfile ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <p><span className="font-semibold text-slate-900">Name:</span> {studentProfile.studentName}</p>
                    <p><span className="font-semibold text-slate-900">Class:</span> {studentProfile.studentClass}</p>
                    <p><span className="font-semibold text-slate-900">Roll No:</span> {studentProfile.rollNo}</p>
                    <p><span className="font-semibold text-slate-900">DOB:</span> {studentProfile.dob}</p>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{studentProfile.note}</p>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  Search a student to load unpaid monthly dues.
                </div>
              )}

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="space-y-3">
                  {unpaidDues.length > 0 ? (
                    unpaidDues.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{item.label}</span>
                        <span className="font-semibold text-slate-900">₹{item.amount.toLocaleString("en-IN")}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No unpaid dues found yet.</p>
                  )}
                </div>

                <div className="my-5 h-px bg-slate-200" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Total Payable Amount</span>
                  <span className="text-2xl font-black tracking-tight text-slate-950">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  Gateway ready
                </div>
                <p className="mt-2 text-emerald-800">
                  This layout is structured so Razorpay or another Indian payment gateway can be attached later without changing the page structure.
                </p>
              </div>

              <button
                type="button"
                className="group inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition duration-200 hover:-translate-y-1 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400/30"
              >
                Proceed to Pay
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </SectionCard>
        </div>

        <section className="mt-8 rounded-[28px] border border-slate-200 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-sky-700 mb-2">
                  History
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Recent Transactions
                </h2>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
                  <tr>
                    <th className="px-4 py-4 sm:px-6">Date</th>
                    <th className="px-4 py-4 sm:px-6">Amount</th>
                    <th className="px-4 py-4 sm:px-6">Status</th>
                    <th className="px-4 py-4 sm:px-6 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {recentTransactions.map((transaction) => (
                    <tr key={`${transaction.date}-${transaction.amount}`} className="transition hover:bg-slate-50/70">
                      <td className="px-4 py-4 sm:px-6 font-medium text-slate-900">{transaction.date}</td>
                      <td className="px-4 py-4 sm:px-6 text-slate-700">{transaction.amount}</td>
                      <td className="px-4 py-4 sm:px-6">
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 sm:px-6 text-right">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-500/20"
                          aria-label={`Download receipt for ${transaction.date}`}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}