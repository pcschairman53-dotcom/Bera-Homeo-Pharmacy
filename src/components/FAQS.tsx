import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileCode2, FlaskConical, Activity, Sparkles } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQS() {
  const [openId, setOpenId] = useState<string | null>("q1");

  const faqs: FAQItem[] = [
    {
      id: "q1",
      question: "Are Bera Homeo medicines safe for newborn babies and pregnant women?",
      answer: "Yes, 100%. Homoeopathic remedies are highly diluted micro-doses that act on energy levels rather than chemical toxicities, avoiding any physical strain on organs. We can formulate non-sweetened, lactose-free and non-alcoholic pure water-distilled dilutions safe for tiny infants, pregnant women, and fragile elderly patients."
    },
    {
      id: "q2",
      question: "Do you keep authentic German homeopathic brands like Dr. Reckeweg & Schwabe?",
      answer: "Yes. Our pharmacy prides itself on being an authorized carrier. We stock genuine imported German mother tinctures, biocombinations, and specialized dilutions from premier labs like Dr. Reckeweg (Bensheim, Germany) and Willmar Schwabe (Karlsruhe, Germany), alongside premium Indian brands like SBL and Lord’s."
    },
    {
      id: "q3",
      question: "Can I take allopathic BP/Diabetes medicines concurrently with homeopathy?",
      answer: "Absolutely. Homeopathic remedies do not chemically interfere with standard modern allopathy drugs. We strongly advise patients never to stop critical constitutional drugs (like high blood pressure pills or insulin) abruptly. Instead, let our gentle homeopathy run as a supportive therapy to heal secondary symptoms, slowly improving systemic strength."
    },
    {
      id: "q4",
      question: "What are the rules of consuming homeopathic medicinal pellets?",
      answer: "For maximum molecular absorption, always take homoeopathic medicine on an empty tongue. Ensure that you do not consume anything, including tea, coffee, garlic, onion, or tobacco, for 15-20 minutes before and after taking the medicine. Avoid touching the round globules or dilutions directly with your fingers; use the specialized bottle cap to drop them into your mouth."
    },
    {
      id: "q5",
      question: "How do I order delivery if I reside outside Midnapore or in another state?",
      answer: "For delivery requests, fill out our Priority Patient Form above listing required medicines or symptoms, then tap the instant 'WhatsApp Alert' button. Our manager will calculate the precise weight-based cost and dispatch the parcel via Bluedart, Indian speed post, or local village courier within 24 hours of digital payment confirmation."
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

  const handleSpecialistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const sessionId = getSessionId();
    const device = getDeviceType();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Send lightweight Google Sheets funnel tracking POST to Apps Script Webhook
    try {
      fetch("https://script.google.com/macros/s/AKfycbwDpOV64SCVTtPkmwvHgzaouHXkrRD6qNk_9UG_bR1M2ZLujxsph6EWMbmGvByIc1z5wg/exec", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: "specialist_cta_click",
          interactionType: "Specialist CTA Click",
          timestamp: timestamp,
          sessionId: sessionId,
          device: device,
          section: "FAQ CTA"
        })
      });
    } catch (err) {
      console.warn("Analytics funnel telemetry registration completed in background.", err);
    }

    // 2. Smart Hybrid Interaction Flow
    const isMobile = device === "Mobile" || device === "Tablet";
    if (isMobile) {
      window.location.href = "tel:+918250813875";
    } else {
      const textParam = "Hi Bera Homeography, I would like to consult with your medical/constitutional specialist immediately regarding complex symptoms.";
      const waUrl = `https://wa.me/918250813875?text=${encodeURIComponent(textParam)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-100 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#14B8A6] font-bold bg-slate-100 px-3 py-1.5 rounded-full inline-block mb-3">
            Informed Healing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Consultation Guidelines & FAQs
          </h2>
          <p className="text-base text-slate-500 font-sans">
            Homeopathy represents precision science. Read typical queries addressed by Bera Homeo specialists to guide your therapeutic recovery.
          </p>
        </div>

        {/* FAQs Collapsible Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`border rounded-2.5xl transition-all duration-300 overflow-hidden relative group ${
                  isOpen 
                    ? 'bg-[#14B8A6]/[0.02] border-[#14B8A6]/40 shadow-[0_4px_25px_rgba(20,184,166,0.08)]' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80'
                }`}
                id={`faq-item-${faq.id}`}
              >
                {/* Header question button */}
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5.5 sm:p-6 flex justify-between items-center gap-4 cursor-pointer relative z-10"
                >
                  <span className="text-base font-extrabold text-slate-950 flex items-center gap-3">
                    <FlaskConical className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isOpen ? 'text-[#14B8A6] rotate-6' : 'text-slate-400'}`} />
                    <span className="group-hover:text-black transition-colors">{faq.question}</span>
                  </span>
                  <span className="text-slate-400 shrink-0 transition-transform duration-300">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#14B8A6]" /> : <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5" />}
                  </span>
                </button>

                {/* Collapsible Answer with smooth transition */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5.5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100/80 pt-4 bg-white/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call store recommendation highlight - Premium AI-powered healthcare SaaS panel */}
        <div className="mt-14 relative overflow-hidden bg-slate-950 text-white border border-[#14B8A6]/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_10px_40px_rgba(20,184,166,0.15)]">
          {/* Ambient Glow effect inside */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#14B8A6]/5 rounded-full filter blur-[80px] -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#06B6D4]/5 rounded-full filter blur-[60px] -ml-20 -mb-20 pointer-events-none" />

          <div className="text-left relative z-10 space-y-3 max-w-2xl">
            {/* Specialist Availability Badge & AI Routing Active Indicator */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-emerald-400 select-none animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>Specialist Online</span>
              </span>

              <span className="inline-flex items-center gap-1.5 bg-[#14B8A6]/10 border border-[#14B8A6]/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#14B8A6]">
                <Activity className="w-3 h-3 text-[#14B8A6] animate-pulse" />
                <span>AI Specialist Routing Active</span>
              </span>
            </div>

            <div>
              <h5 className="text-lg font-bold text-slate-100 tracking-tight">Have a custom complex medical/constitutional inquiry?</h5>
              <p className="text-sm text-slate-400 mt-1 font-sans leading-relaxed">
                Our primary specialist is always available to guide your dosage selection. Connect with us instantly via our prioritized channels.
              </p>
            </div>

            <p className="text-xs text-slate-500 font-mono italic">
              * Instant guidance for complex consultation queries
            </p>
          </div>

          <div className="shrink-0 relative z-10 w-full md:w-auto text-center flex flex-col items-center gap-2.5">
            <button
              onClick={handleSpecialistClick}
              className="w-full md:w-auto relative group overflow-hidden bg-gradient-to-r from-[#06B6D4] to-[#14B8A6] hover:from-[#0891B2] hover:to-[#0D9488] text-white font-extrabold text-xs px-6.5 py-4 rounded-xl shadow-[0_4px_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2.5 cursor-pointer border border-[#14B8A6]/30"
              id="btn-call-specialist"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform duration-300" />
              <span>Call Specialist Now</span>

              {/* Shimmer element overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </button>
            <span className="text-[10px] text-slate-500 font-mono tracking-wide">
              Secure digital clinic integration
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

