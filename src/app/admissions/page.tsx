"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/shared/ScrollReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import { ArrowRight, ArrowLeft, Upload, CheckCircle2 } from "lucide-react";

const CLASSES = ["Nursery","LKG","UKG","Class I","Class II","Class III","Class IV","Class V","Class VI","Class VII","Class VIII"];
const STEPS = [{num:1,label:"Child Details"},{num:2,label:"Parent Info"},{num:3,label:"Documents"},{num:4,label:"Review"}];

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState<"apply"|"track">("apply");
  const [step, setStep] = useState(1);
  const [trackingId, setTrackingId] = useState("");
  const [form, setForm] = useState({
    childName:"",dob:"",applyingClass:"",previousSchool:"",
    parentName:"",parentEmail:"",parentPhone:"",address:"",
  });

  const updateForm = (field: string, value: string) => setForm(prev => ({...prev,[field]:value}));

  const inputCls = "w-full px-4 py-3 rounded-[--radius-md] border border-[--color-border] text-sm focus:outline-none focus:border-primary transition-colors bg-white";

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8">
              <p className="label-text mb-2">Session 2026-27</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Admissions</h1>
              <p className="text-[--color-muted-foreground] leading-relaxed max-w-lg">
                A streamlined four-step process. Once submitted, track your status in real-time using your application ID.
              </p>
            </div>
            <div className="flex items-center gap-2 mb-10">
              {(["apply","track"] as const).map(t=>(
                <button key={t} onClick={()=>setActiveTab(t)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab===t?"bg-primary text-white":"border border-[--color-border] text-[--color-muted-foreground] hover:border-primary/30"}`}>
                  {t==="apply"?"Apply":"Track Status"}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {activeTab === "track" ? (
            <ScrollReveal>
              <div className="rounded-[--radius-xl] border border-[--color-border] p-8">
                <h3 className="font-semibold text-primary mb-4">Track Your Application</h3>
                <div className="flex gap-3">
                  <input type="text" placeholder="Enter Application ID (e.g., APP-2026-001)" value={trackingId} onChange={e=>setTrackingId(e.target.value)} className={inputCls}/>
                  <button className="btn-primary text-sm shrink-0">Track</button>
                </div>
                {trackingId && (
                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-6">
                      {["Applied","Test Scheduled","Selected","Enrolled"].map((s,i)=>(
                        <div key={s} className="flex items-center gap-2 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i===0?"bg-[--color-success] text-white":"bg-[--color-muted] text-[--color-muted-foreground]"}`}>
                            {i===0?<CheckCircle2 className="w-4 h-4"/>:i+1}
                          </div>
                          <span className="text-xs font-medium text-[--color-muted-foreground] hidden sm:inline">{s}</span>
                          {i<3&&<div className="flex-1 h-px bg-[--color-border] hidden sm:block"/>}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-[--color-muted-foreground]">Your application has been received. We will contact you shortly.</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="rounded-[--radius-xl] border border-[--color-border] p-8">
                {/* Stepper */}
                <div className="flex items-center justify-between mb-10">
                  {STEPS.map((s,i)=>(
                    <div key={s.num} className="flex items-center gap-2 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${step>s.num?"bg-[--color-success] text-white":step===s.num?"bg-primary text-white":"bg-[--color-muted] text-[--color-muted-foreground]"}`}>
                        {step>s.num?<CheckCircle2 className="w-4 h-4"/>:s.num}
                      </div>
                      <span className={`text-xs font-medium hidden sm:inline ${step>=s.num?"text-primary":"text-[--color-muted-foreground]"}`}>{s.label}</span>
                      {i<3&&<div className={`flex-1 h-px mx-2 hidden sm:block ${step>s.num?"bg-[--color-success]":"bg-[--color-border]"}`}/>}
                    </div>
                  ))}
                </div>

                {step===1&&(
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div><label className="label-text block mb-2">Child&apos;s Full Name</label><input type="text" value={form.childName} onChange={e=>updateForm("childName",e.target.value)} className={inputCls} placeholder="Enter full name"/></div>
                    <div><label className="label-text block mb-2">Date of Birth</label><input type="date" value={form.dob} onChange={e=>updateForm("dob",e.target.value)} className={inputCls}/></div>
                    <div><label className="label-text block mb-2">Applying for Class</label><select value={form.applyingClass} onChange={e=>updateForm("applyingClass",e.target.value)} className={inputCls}><option value="">Select a class</option>{CLASSES.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
                    <div><label className="label-text block mb-2">Previous School (Optional)</label><input type="text" value={form.previousSchool} onChange={e=>updateForm("previousSchool",e.target.value)} className={inputCls} placeholder="School name"/></div>
                  </div>
                )}
                {step===2&&(
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div><label className="label-text block mb-2">Parent / Guardian Name</label><input type="text" value={form.parentName} onChange={e=>updateForm("parentName",e.target.value)} className={inputCls} placeholder="Full name"/></div>
                      <div><label className="label-text block mb-2">Phone Number</label><input type="tel" value={form.parentPhone} onChange={e=>updateForm("parentPhone",e.target.value)} className={inputCls} placeholder="+91 XXXXX XXXXX"/></div>
                    </div>
                    <div><label className="label-text block mb-2">Email Address</label><input type="email" value={form.parentEmail} onChange={e=>updateForm("parentEmail",e.target.value)} className={inputCls} placeholder="parent@email.com"/></div>
                    <div><label className="label-text block mb-2">Address</label><textarea value={form.address} onChange={e=>updateForm("address",e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="Full address"/></div>
                  </div>
                )}
                {step===3&&(
                  <div className="space-y-4">
                    <p className="text-sm text-[--color-muted-foreground] mb-2">Upload required documents. Accepted: PDF, JPG, PNG (max 5MB).</p>
                    {["Birth Certificate","Previous Report Card","Passport Photo","Aadhar Card (Parent)"].map(doc=>(
                      <div key={doc} className="flex items-center justify-between p-4 rounded-[--radius-md] border border-dashed border-[--color-border] hover:border-primary/30 transition-colors">
                        <span className="text-sm text-primary font-medium">{doc}</span>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[--color-muted] text-sm text-[--color-muted-foreground] hover:bg-primary hover:text-white transition-colors"><Upload className="w-4 h-4"/>Upload</button>
                      </div>
                    ))}
                  </div>
                )}
                {step===4&&(
                  <div className="rounded-[--radius-md] bg-[--color-muted] p-6">
                    <h4 className="font-semibold text-primary mb-4">Application Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[["Student Name",form.childName],["Date of Birth",form.dob],["Applying For",form.applyingClass],["Parent Name",form.parentName],["Phone",form.parentPhone],["Email",form.parentEmail]].map(([l,v])=>(
                        <div key={l}><p className="text-[--color-muted-foreground]">{l}</p><p className="font-medium text-primary">{v||"—"}</p></div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-10 pt-6 border-t border-[--color-border]">
                  {step>1?<button onClick={()=>setStep(step-1)} className="flex items-center gap-2 text-sm text-[--color-muted-foreground] hover:text-primary transition-colors"><ArrowLeft className="w-4 h-4"/>Back</button>:<div/>}
                  <MagneticButton>
                    <button onClick={()=>step<4&&setStep(step+1)} className="btn-primary text-sm">
                      {step<4?"Continue":"Submit Application"}<ArrowRight className="w-4 h-4"/>
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer/>
    </>
  );
}
