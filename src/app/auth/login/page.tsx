"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import { Mail, ArrowRight, Info } from "lucide-react";

const DEMO_ACCOUNTS = [
  { role: "PRINCIPAL", email: "principal@sankardev.edu" },
  { role: "TEACHER", email: "teacher@sankardev.edu" },
  { role: "PARENT", email: "parent@sankardev.edu" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - Info */}
            <ScrollReveal>
              <div>
                <p className="label-text mb-2">Staff &amp; Parent Access</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
                  Sign in with a magic link.
                </h1>
                <p className="text-[--color-muted-foreground] leading-relaxed mb-8">
                  No passwords to forget. We send a one-time secure link to your registered email.
                </p>

                {/* Demo accounts */}
                <div className="rounded-[--radius-xl] border border-[--color-border] p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-4 h-4 text-[--color-muted-foreground]" />
                    <p className="label-text !text-xs">Demo Accounts</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {DEMO_ACCOUNTS.map((acc) => (
                      <button
                        key={acc.role}
                        onClick={() => { setEmail(acc.email); setSent(false); }}
                        className="p-3 rounded-[--radius-md] border border-[--color-border] hover:border-primary/30 hover:bg-[--color-muted] transition-all text-left"
                      >
                        <p className="text-[9px] font-bold tracking-wider text-[--color-muted-foreground] mb-1">
                          {acc.role}
                        </p>
                        <p className="text-xs font-medium text-primary truncate">
                          {acc.email}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right - Form */}
            <ScrollReveal delay={0.15}>
              <div className="rounded-[--radius-xl] border border-[--color-border] p-8">
                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 label-text mb-3">
                        <Mail className="w-3.5 h-3.5" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@sankardev.edu"
                        required
                        className="w-full px-4 py-3.5 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <MagneticButton className="w-full">
                      <button type="submit" className="btn-primary w-full justify-center">
                        Send Magic Link
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </MagneticButton>
                    <p className="text-xs text-[--color-muted-foreground] text-center">
                      In demo mode, the link is shown directly here. In production it will be emailed.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-[--color-success]/10 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-[--color-success]" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">Check your inbox</h3>
                    <p className="text-sm text-[--color-muted-foreground] mb-6">
                      We&apos;ve sent a magic link to <span className="font-medium text-primary">{email}</span>
                    </p>
                    <button onClick={() => setSent(false)} className="text-sm text-primary hover:underline">
                      Use a different email
                    </button>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
