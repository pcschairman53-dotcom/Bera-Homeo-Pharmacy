import React from 'react';
import { ShieldCheck, UserCheck, FlameKindling, Truck, Zap, Sparkles } from 'lucide-react';
import { USPItem } from '../types';

export default function USPSlice() {
  const usps: USPItem[] = [
    {
      id: 'genuine',
      title: '100% Authentic Curations',
      description: 'Authorized dispensary storing pure original distillations and dilutions directly imported from trusted laboratories like Dr. Reckeweg (Germany), Schwabe (Germany), SBL, Lord’s, and Bach Flower Removers.',
      icon: 'ShieldCheck'
    },
    {
      id: 'expert',
      title: 'Expert Practitioner Profiling',
      description: 'We don’t just hand over medicines. Our certified specialists take thorough constitutional case histories for complex conditions (asthma, eczema, gastro-disorders, joint pain, migraine, hair fall) to treat the root.',
      icon: 'UserCheck'
    },
    {
      id: 'safe',
      title: 'Gentle & Side-Effect Free',
      description: 'Extremely soft, natural, and non-alcoholic homoeopathic remedies processed under pristine clinical standards. Completely safe for infants, children, pregnant mothers, and senior citizens alike.',
      icon: 'FlameKindling'
    },
    {
      id: 'delivery',
      title: 'Regional Delivery & Global Post',
      description: 'Are you located away from Nepali Para Road? We offer fast doorstep courier drop-offs across Midnapore district, West Bengal, alongside safe speed-post shipping across India.',
      icon: 'Truck'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-emerald-600" />;
      case 'FlameKindling': return <FlameKindling className="w-6 h-6 text-emerald-600 animate-pulse" />;
      case 'Truck': return <Truck className="w-6 h-6 text-emerald-600" />;
      default: return <Zap className="w-6 h-6 text-emerald-600" />;
    }
  };

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

  const handleDraftSymptomsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 1. Smoothly scroll the user to the existing "Priority Patient Registration" form section
    const targetSection = document.getElementById('leads');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 2. Focus and placeholder trigger
    window.dispatchEvent(new CustomEvent('DraftSymptomsTriggered'));

    // 4. Send background tracking event telemetry 
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
          type: "draft_symptoms_cta",
          timestamp: timestamp,
          interactionType: "Draft Symptoms CTA",
          sessionId: sessionId,
          device: device,
          section: "Quick Diagnostic Consultation Hint"
        })
      });
    } catch (err) {
      console.warn("Analytics capture pipeline completed in background Mode.", err);
    }

    // 5. Trigger lightweight WhatsApp funnel intent alert
    const textParam = "New User Started Symptom Draft Funnel";
    const waUrl = `https://wa.me/918250813875?text=${encodeURIComponent(textParam)}`;
    
    // Open WhatsApp in a new tab without interrupting current UI
    window.open(waUrl, '_blank');
  };

  return (
    <section id="usps" className="py-20 bg-slate-50 border-b border-slate-100 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full inline-block mb-3">
            Pure Homoeopathic Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Bera Homeo Pharmacy Redefines Healthcare
          </h2>
          <p className="text-base text-slate-600">
            Homeopathy is an advanced molecular science that matches and stimulates your body’s innate immune blueprint. Explore our core service pillars engineered to ensure your wellness.
          </p>
        </div>

        {/* USP Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, idx) => (
            <div 
              key={usp.id} 
              className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm float-up hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between group h-full relative overflow-hidden"
              id={`usp-card-${usp.id}`}
            >
              {/* Highlight ribbon representing item alignment */}
              <div className="lg:w-1 w-full lg:h-12 h-1 bg-emerald-500 absolute top-0 left-0 transition-all duration-300 group-hover:h-full lg:group-hover:w-1.5" />
              
              <div className="relative z-10">
                <div className="w-13 h-13 bg-emerald-50 flex items-center justify-center rounded-2xl mb-6 border border-emerald-100 group-hover:scale-110 transition-transform">
                  {getIcon(usp.icon)}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {usp.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed font-sans mb-4">
                  {usp.description}
                </p>
              </div>
              
              <div className="text-xs font-semibold text-slate-400 mt-4 pt-4 border-t border-slate-50 flex justify-between items-center relative z-10 font-mono">
                <span>PILLAR_0{idx + 1}</span>
                <span className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">TRUSTED</span>
              </div>
            </div>
          ))}
        </div>

        {/* Homeopathy Advisory banner */}
        <div className="mt-16 p-6 md:p-8 bg-gradient-to-r from-emerald-800 to-[#0c4a60] text-white rounded-3xl shadow-lg shadow-emerald-900/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-2xl">
            <h4 className="text-lg font-bold text-emerald-300 mb-2 font-display uppercase tracking-wider">★ Quick Diagnostic Consultation Hint</h4>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Did you know? Homeopathy works best when we treat the <em>concomitant symptoms</em> and state of mind, rather than just isolated physical signs. Let us formulate a total custom constitutional profile for you.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2.5 shrink-0">
            <button
              onClick={handleDraftSymptomsClick}
              className="relative overflow-hidden shrink-0 bg-white hover:bg-slate-50 text-emerald-950 hover:text-emerald-900 font-bold px-7 py-3.5 rounded-2xl text-sm transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:-translate-y-0.5 border border-[#14B8A6]/40 active:scale-95 flex items-center gap-2 group cursor-pointer"
              id="draft-symptoms-cta"
            >
              {/* Sliding glass shimmer */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <Sparkles className="w-4 h-4 text-[#14B8A6]/80 group-hover:text-[#14B8A6] transition-colors" />
              <span>Draft Symptoms Now</span>
            </button>
            <span className="text-[10px] text-emerald-200/80 font-mono tracking-wide flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-full border border-white/5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              AI-assisted symptom drafting available
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
