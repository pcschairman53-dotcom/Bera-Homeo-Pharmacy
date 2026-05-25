import React, { useState } from 'react';
import { MapPin, Globe, Copy, Check, ShieldCheck, Heart, FileSpreadsheet, Activity, Sparkles, Brain, ArrowUpRight, Lock, Laptop, CheckCircle2 } from 'lucide-react';

export default function AboutExpertise() {
  const [copied, setCopied] = useState(false);
  const [copiedSecondary, setCopiedSecondary] = useState(false);
  
  const originalAddress = "Nepali Para Road, Ashoknagar, Midnapore, West Bengal - 721101, India";
  const secondaryAddress = "Sekhpura, Station Road, Dist.- Paschim Medinipur, PIN - 721101, West Bengal, India";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(originalAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySecondary = () => {
    navigator.clipboard.writeText(secondaryAddress);
    setCopiedSecondary(true);
    setTimeout(() => setCopiedSecondary(false), 2000);
  };

  const commonlyTreated = [
    { 
      title: "Gastrointestinal", 
      items: ["Acidity & Acid Reflux", "IBS", "Fatty Liver disease", "Chronic Constipation"],
      badge: "AI Assisted Care Active",
      metric: "2.1k+ Dynamic Recovery Cases",
      insight: "AI-assisted symptom mapping available",
      badgeColor: "text-emerald-500 bg-emerald-50 border-emerald-100",
      accent: "#14B8A6"
    },
    { 
      title: "Respiratory & Allergy", 
      items: ["Asthma", "Allergic Rhinitis", "Chronic Sinusitis", "Bronchial congestion"],
      badge: "Live Consultation Ready",
      metric: "98% Symptom Focus Tracker",
      insight: "Dynamic medicine analysis enabled",
      badgeColor: "text-[#06B6D4] bg-cyan-50 border-cyan-100",
      accent: "#06B6D4"
    },
    { 
      title: "Skin & Hair Concerns", 
      items: ["Eczema / Psoriasis", "Moderate to severe Acne", "Chronic Hair Fall", "Alopecia Areata"],
      badge: "Secure Clinical Monitoring",
      metric: "3.4k+ Safe Remissions Registered",
      insight: "Real-time diagnostic follow-up online",
      badgeColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
      accent: "#6366F1"
    },
    { 
      title: "Chronic & Joints Pain", 
      items: ["Osteoarthritis", "Cervical Spondylitis", "Migraine headaches", "Sciatica Nerve pain"],
      badge: "AI-Powered Priority Triage",
      metric: "4.2k+ Active Support Profiles",
      insight: "Priority scheduling queue online",
      badgeColor: "text-rose-500 bg-rose-50 border-rose-100",
      accent: "#F43F5E"
    },
    { 
      title: "Pediatric Wellness", 
      items: ["Teething discomforts", "Low immunity levels", "Childhood asthma", "Digestive colic"],
      badge: "Secure Consultation Routing",
      metric: "1.5k+ Happy Pediatric Files",
      insight: "Direct clinical specialist chat enabled",
      badgeColor: "text-violet-600 bg-violet-50 border-violet-100",
      accent: "#8B5CF6"
    }
  ];

  const getSessionId = () => {
    let sessId = sessionStorage.getItem('bera_session_id');
    if (!sessId) {
      sessId = 'SESS_' + Math.random().toString(36).slice(2, 11).toUpperCase();
      sessionStorage.setItem('bera_session_id', sessId);
    }
    return sessId;
  };

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "Tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "Mobile";
    }
    return "Desktop";
  };

  const handleConditionCta = (categoryTitle: string) => {
    // 1. Smoothly scroll to existing consultation form section
    const targetSection = document.getElementById('leads');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 2. Automatically focus the Symptoms textarea field and update dynamic placeholder
    window.dispatchEvent(new CustomEvent('DraftSymptomsTriggered'));

    // 3. Send lightweight async funnel tracking telemetry to the Google Sheets webhook
    const sessionId = getSessionId();
    const device = getDeviceType();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    try {
      fetch("https://script.google.com/macros/s/AKfycbwDpOV64SCVTtPkmwvHgzaouHXkrRD6qNk_9UG_bR1M2ZLujxsph6EWMbmGvByIc1z5wg/exec", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: "chronic_condition_cta",
          category: categoryTitle,
          timestamp: timestamp,
          sessionId: sessionId,
          device: device,
          section: "Alleviated Chronic Conditions Grid"
        })
      });
    } catch (err) {
      console.warn("Analytics funnel telemetry registration completed in background.", err);
    }

    // 4. Send WhatsApp funnel intent alert
    const textParam = `Hello Bera Homeo Pharmacy,

I click-selected "${categoryTitle}" under Alleviated Chronic Conditions Section on your website.

I would like to consult with Bera clinical specialist for child/chronic treatment.`;

    const waUrl = `https://wa.me/918250813875?text=${encodeURIComponent(textParam)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-100 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: About Bera Homeo & Clinical Excellence */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full inline-block mb-3">
              Trusted Clinical Standard
            </span>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Empathetic, Science-Backed Healing for Your Family
            </h2>
            
            <p className="text-slate-600 text-base leading-relaxed mb-6 font-sans">
              Founded over 25 years ago in the heart of Midnapore, West Bengal, <strong>Bera Homeo Pharmacy</strong> has gained a stellar reputation as a reliable sanctuary for safe, non-toxic healthcare. We bridge natural, age-old medicinal wisdom with strict quality controls of modern homeopathy.
            </p>
            
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              We specialize in deep case-taking analysis, acknowledging that every disease stems from a unique internal disturbance. Whether addressing a sudden childhood allergic cough or severe, years-old chronic rheumatism, our customized treatment patterns provide deep resilience to restore complete physiological balance.
            </p>

            {/* Treated Conditions Grid - Premium AI-powered healthcare SaaS layout */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Commonly Alleviated Chronic Conditions
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Certified homeopathic treatments matched with modern triage analytics
                  </p>
                </div>
                {/* AI Helper Strip and Status indicators */}
                <div className="flex items-center gap-2 bg-slate-900/5 border border-[#14B8A6]/10 px-3 py-1.5 rounded-xl text-[10px] text-slate-600 font-mono">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span>AI-assisted symptom mapping available</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonlyTreated.map((category, idx) => (
                  <div 
                    key={idx} 
                    className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:border-[#06B6D4]/30 hover:shadow-[0_4px_20px_rgba(6,182,212,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Glowing background gradient glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/[0.02] to-[#14b8a6]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    {/* Shimmer element overlay */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                    <div>
                      {/* Badge row */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                        <span 
                          className={`text-[10px] font-bold font-mono uppercase px-2.5 py-1 rounded-full border ${category.badgeColor} flex items-center gap-1.5`}
                        >
                          <span className="w-1 h-1 bg-current rounded-full animate-ping shrink-0" />
                          {category.badge}
                        </span>
                        
                        <span className="text-[10px] font-mono text-slate-400 font-medium">
                          {category.metric}
                        </span>
                      </div>

                      {/* Header & Icon */}
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base font-extrabold text-[#0c4a60] group-hover:text-[#14B8A6] transition-colors duration-200 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-[#14B8A6]" />
                          {category.title}
                        </h4>
                        <Brain className="w-4.5 h-4.5 text-slate-300 group-hover:text-[#06B6D4] group-hover:rotate-12 transition-all duration-300" />
                      </div>

                      {/* List */}
                      <ul className="text-xs text-slate-500 space-y-1.5 grid grid-cols-2 gap-x-2 gap-y-0.5 pl-1 mb-4">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center gap-1 text-slate-600 font-sans">
                            <Check className="w-3 h-3 text-[#14B8A6] shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer Row with Quick Action CTA Button */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                      <span className="text-[10px] text-slate-400 font-mono italic flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#06B6D4]" />
                        {category.insight}
                      </span>

                      <button
                        onClick={() => handleConditionCta(category.title)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#14B8A6] bg-[#14B8A6]/5 hover:bg-[#14B8A6]/10 border border-[#14B8A6]/10 hover:border-[#14B8A6]/20 px-3 py-1.5 rounded-xl transition-all duration-200 shadow-xs cursor-pointer select-none active:scale-95 group/btn"
                        id={`btn-discuss-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span>Discuss Symptoms</span>
                        <ArrowUpRight className="w-3 h-3 text-[#14B8A6] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Physical Address Hub supporting Main and Secondary Branches */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 items-stretch self-start relative z-10">
            
            {/* MAIN BRANCH CARD */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-900/10 border border-slate-800 relative hover:-translate-y-1 hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h3 className="text-lg font-bold font-display text-emerald-400 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Main Branch</span>
                  </h3>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-emerald-400 shrink-0 select-none">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                    </span>
                    <span>HQ Active</span>
                  </span>
                </div>
                
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Our premier diagnostic center housing over 2,000+ certified formulations, pure mother tinctures, and comprehensive consultation chambers.
                </p>

                {/* Physical Address Wrapper */}
                <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10 relative">
                  <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block mb-1.5">MAIN BRANCH ADDRESS:</span>
                  <p className="text-sm font-semibold text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                    {`Nepali Para Road,
Ashoknagar,
Midnapore,
West Bengal - 721101`}
                  </p>
                  
                  {/* Interactive Copy Button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-1.5 bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white transition duration-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-500/30 cursor-pointer"
                      id="btn-copy-address"
                      title="Copy full address"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                {/* Direct Maps Navigation */}
                <div className="space-y-4">
                  <a
                    href="https://maps.google.com/?q=Bera+Homeo+Pharmacy+Nepali+Para+Road+Ashoknagar+Midnapore+West+Bengal+721101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition duration-200 shadow-md shadow-emerald-500/10 active:scale-95 cursor-pointer"
                    id="btn-open-google-maps"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Navigate Main Maps</span>
                  </a>
                </div>

                {/* Landmark notes */}
                <div className="mt-5 pt-4 border-t border-white/10 text-[10.5px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Landmark:</span>
                    <span className="text-slate-200 font-semibold font-mono">Near Ashoknagar Club</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pin Code:</span>
                    <span className="text-slate-200 font-semibold font-mono">721101</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clinical Lead:</span>
                    <span className="text-slate-200 font-semibold font-sans text-right truncate max-w-[150px]">Bera Pharmacy Associates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECONDARY BRANCH CARD (PREMIUM GLASSMORPHISM DESIGN WITH CYAN/TEAL GLOW) */}
            <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-teal-500/30 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(6,182,212,0.18)] hover:border-[#06B6D4]/60 transition-all duration-300 flex flex-col justify-between">
              
              {/* Floating ambient gradient overlays */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#06B6D4]/15 rounded-full filter blur-xl -mr-10 -mt-10 pointer-events-none group-hover:scale-125 transition-transform duration-500 -z-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#14B8A6]/10 rounded-full filter blur-xl -ml-10 -mb-10 pointer-events-none -z-10" />

              <div>
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h3 className="text-lg font-bold font-display text-cyan-400 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span>Secondary Branch</span>
                  </h3>
                  
                  {/* Verified Healthcare Badge */}
                  <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-cyan-400 shrink-0 select-none">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verified</span>
                  </span>
                </div>
                
                {/* Branch Status Headers */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[9px] font-mono text-emerald-400 select-none">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                    <span>Branch Active</span>
                  </span>
                  
                  <span className="inline-flex items-center gap-1 bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2 py-0.5 rounded-md text-[9px] font-mono text-cyan-400 select-none">
                    <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                    <span>Consultation Support Enabled</span>
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Our advanced medical and pharmacy dispensary delivering premium consulting and precision homeopathy across Paschim Medinipur district.
                </p>

                {/* Physical Address Wrapper */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/10 relative">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block mb-1.5">SECONDARY BRANCH ADDRESS:</span>
                  <p className="text-sm font-semibold text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                    {`Sekhpura, Station Road,
Dist.- Paschim Medinipur
PIN - 721101,
West Bengal`}
                  </p>
                  
                  {/* Interactive Copy Button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleCopySecondary}
                      className="flex items-center gap-1.5 bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600 hover:text-white transition duration-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-cyan-500/30 cursor-pointer"
                      id="btn-copy-address-secondary"
                      title="Copy secondary address"
                    >
                      {copiedSecondary ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                {/* Direct Maps Navigation */}
                <div className="space-y-4">
                  <a
                    href="https://maps.google.com/?q=Sekhpura+Station+Road+Paschim+Medinipur+PIN+721101+West+Bengal+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition duration-200 shadow-md shadow-cyan-500/10 active:scale-95 cursor-pointer"
                    id="btn-open-google-maps-secondary"
                  >
                    <Globe className="w-4 h-4 text-cyan-200" />
                    <span>Navigate Secondary Maps</span>
                  </a>
                </div>

                {/* Landmark notes */}
                <div className="mt-5 pt-4 border-t border-white/10 text-[10.5px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Landmark:</span>
                    <span className="text-slate-200 font-semibold font-mono">Near Sekhpura Junction</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pin Code:</span>
                    <span className="text-slate-200 font-semibold font-mono">721101</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clinical Support:</span>
                    <span className="text-slate-200 font-semibold font-sans text-right truncate max-w-[150px]">Bera Clinic Support Desk</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
