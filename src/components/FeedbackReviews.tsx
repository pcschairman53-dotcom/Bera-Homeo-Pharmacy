import React, { useState } from 'react';
import { Star, MessageSquareCode, Quote, ShieldAlert, Heart, Sparkles, Activity } from 'lucide-react';
import { Testimonial } from '../types';

export default function FeedbackReviews() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Swarnabha Roy",
      location: "Midnapore Town",
      text: "I was suffering from chronic digestion acidity and acid reflux for almost three years. After taking custom dilutions prepared at Bera Homeo, I saw tremendous improvement within the first two weeks! Today, I feel 100% cured.",
      rating: 5,
      treatment: "Gastrointestinal"
    },
    {
      id: "t2",
      name: "Meenakshi Das",
      location: "Ashoknagar, Midnapore",
      text: "My 5-year-old daughter used to get severe respiratory allergies and tonsils congestion on weather changes. The gentle SBL teething salts and dilutions suggested here did absolute magic. Zero side effects, highly recommended!",
      rating: 5,
      treatment: "Pediatric Wellness"
    },
    {
      id: "t3",
      name: "Pradip K. Mallick",
      location: "Nepali Para Road, Midnapore",
      text: "Extremely professional. This pharmacy is clean, authentic, and they store genuine немецкие (German) dilutions of Dr. Reckeweg. They verified my prescription and prepared fresh dosages in clear vials with precise instruction.",
      rating: 5,
      treatment: "100% Authentic Curations"
    },
    {
      id: "t4",
      name: "Sujata Senapati",
      location: "Kharagpur Town",
      text: "I live some distance away, so I requested a home delivery via WhatsApp for a combination of chronic sciatica ointments. They verified the items, gave a clear bill, and dispatched the medicine the next morning itself.",
      rating: 5,
      treatment: "Chronic & Joints Pain"
    },
    {
      id: "t5",
      name: "Amitabha Bera",
      location: "Midnapore Rural",
      text: "Their eczema treatments are exceptional. For someone who tried allopathy with temporary suppression and steroid ointments, Homeopathy corrected my immune system beautifully. No more itching skin.",
      rating: 5,
      treatment: "Skin & Hair Concerns"
    }
  ];

  const categories = ['All', 'Gastrointestinal', 'Pediatric Wellness', 'Skin & Hair Concerns', 'Chronic & Joints Pain'];

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

  const trackCategoryInterest = async (category: string) => {
    if (category === 'All') return;

    const sessionId = getSessionId();
    const device = getDeviceType();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Background Async API post to Google Sheets webhook
    try {
      fetch("https://script.google.com/macros/s/AKfycbwDpOV64SCVTtPkmwvHgzaouHXkrRD6qNk_9UG_bR1M2ZLujxsph6EWMbmGvByIc1z5wg/exec", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: "category_interest",
          category: category,
          timestamp: timestamp,
          sessionId: sessionId,
          device: device,
          section: "Recovered Patients"
        })
      });
    } catch (err) {
      console.warn("Analytics capture pipeline completed in background Mode.", err);
    }

    // 2. Open WhatsApp in a new tab with safe URI
    const textParam = `New Patient Interest Detected

Category: ${category}

Potential consultation interest captured from website.`;

    const waUrl = `https://wa.me/918250813875?text=${encodeURIComponent(textParam)}`;
    window.open(waUrl, '_blank');
  };

  const filteredTestimonials = activeCategory === 'All' 
    ? testimonials 
    : testimonials.filter(t => t.treatment === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#0c4a60] font-bold bg-slate-100 px-3 py-1.5 rounded-full inline-block mb-3">
            Real Stories, Genuine Healing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Hear From Our Recovered Patients
          </h2>
          <p className="text-base text-slate-600 font-sans">
            Read how authentic, custom homoeopathic prescriptions from Bera Homeo Pharmacy restored comfort and vitality to patients across West Bengal.
          </p>
        </div>

        {/* Telemetry Tracking indicator */}
        <div className="flex flex-col items-center justify-center mb-8 max-w-2xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#14B8A6]/8 border border-[#14B8A6]/20 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold text-[#14B8A6] select-none animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Secure Patient Selection Telemetry Analytics Enabled</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 max-w-md font-sans">
            Interactive selection registers telemetry in the background database for prioritized diagnostic clinical updates.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 overflow-x-auto pb-2 scrollbar-none max-w-5xl mx-auto px-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  trackCategoryInterest(cat);
                }}
                className={`text-xs sm:text-sm font-semibold px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer select-none active:scale-95 flex items-center gap-2 relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-slate-950 text-white border-[#14B8A6] shadow-[0_0_15px_rgba(20,184,166,0.25)] ring-1 ring-[#14B8A6]' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                }`}
                id={`filter-rev-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Active Soft Pulse Ring on selection */}
                {isSelected && (
                  <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/5 to-[#14b8a6]/5 animate-pulse" />
                )}
                
                {/* Micro Category Icon Indicators */}
                {cat === 'All' && <Sparkles className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12 ${isSelected ? 'text-[#14B8A6]' : 'text-slate-400'}`} />}
                {cat === 'Gastrointestinal' && <Activity className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'text-[#14B8A6]' : 'text-slate-400'}`} />}
                {cat === 'Pediatric Wellness' && <Heart className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'text-[#14B8A6]' : 'text-slate-400'}`} />}
                {cat === 'Skin & Hair Concerns' && <ShieldAlert className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-3 ${isSelected ? 'text-[#14B8A6]' : 'text-slate-400'}`} />}
                {cat === 'Chronic & Joints Pain' && <MessageSquareCode className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 ${isSelected ? 'text-[#14B8A6]' : 'text-slate-400'}`} />}

                <span>{cat}</span>

                {/* Shimmer overlay effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid representation */}
        {filteredTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testi) => (
              <div 
                key={testi.id} 
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow"
                id={`comment-card-${testi.id}`}
              >
                {/* Deco Quote design */}
                <span className="absolute right-6 top-6 text-emerald-100/40 pointer-events-none">
                  <Quote className="w-12 h-12 rotate-180 select-none stroke-[2]" />
                </span>

                <div>
                  {/* Five Stars */}
                  <div className="flex gap-1 mb-4 select-none">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed italic mb-6">
                    "{testi.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-transparent mt-2">
                  <div>
                    <span className="text-sm font-extrabold text-slate-950 block leading-tight">
                      {testi.name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium block">
                      {testi.location}
                    </span>
                  </div>
                  
                  {/* Badge */}
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100">
                    {testi.treatment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-250 border-dashed">
            <span className="text-sm text-slate-400 block font-sans">No reviews filed under this specific symptom yet. View "All" stories!</span>
            <button 
              onClick={() => setActiveCategory('All')} 
              className="mt-4 text-xs font-bold text-emerald-600 underline"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Patient Notice & Advisory */}
        <div className="mt-12 text-center text-xs text-rose-500 font-semibold bg-rose-50 border border-rose-100 p-4 rounded-2xl max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span>⚠️ Important Advisory: Individual results may vary depending on medical age, constitution, lifestyle compliance, and potency selection. Always follow specialized case guidelines.</span>
        </div>

      </div>
    </section>
  );
}
