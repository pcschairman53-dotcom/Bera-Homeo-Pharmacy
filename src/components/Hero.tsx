import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';
import ShopLogo from './ShopLogo';

interface HeroProps {
  onScrollToForm: () => void;
  onScrollToUSPs: () => void;
}

export default function Hero({ onScrollToForm, onScrollToUSPs }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0c4a60]/5 via-white to-emerald-500/5 pt-12 pb-20 md:py-28 px-4 border-b border-slate-100">
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 translate-x-1/3 w-[450px] h-[450px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copious marketing copy representing trust */}
        <div className="lg:col-span-7 text-center lg:text-left">
          {/* Highlight Badge */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-emerald-100/50 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Over 25 Continuous Years of Clinical Healing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Gentle Healing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-700">
              Permanent Solutions.
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-sans font-light">
            Welcome to <strong className="font-semibold text-slate-900">Bera Homeo Pharmacy</strong>. 
            We provide precision-formulated, authentic homoeopathic treatments tailored to address chronic diseases at their absolute root. Feel healthier, safely—without any side effects.
          </p>

          {/* Value Prop Checkmarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-lg mx-auto lg:mx-0 mb-9 text-slate-700">
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
              <span className="text-sm font-medium">100% Genuine Imported Brands</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
              <span className="text-sm font-medium">Certified Homoeopathic Consultants</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
              <span className="text-sm font-medium">Side-Effect Free Family Medicine</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
              <span className="text-sm font-medium">Prompt Doorstep Courier Delivery</span>
            </div>
          </div>

          {/* Interactive CTA Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onScrollToForm}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-emerald-600/30 transition hover:shadow-emerald-600/40 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              id="hero-book-cta"
            >
              <span>Submit Consultation Request</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={`https://wa.me/918250813875?text=${encodeURIComponent("Hello Bera Homeo Pharmacy, I'd like to consult regarding my symptoms.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-[#25d366]/20 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              id="hero-whatsapp-cta"
            >
              <span className="font-mono">WhatsApp: 8250813875</span>
            </a>
          </div>
        </div>

        {/* Right Side: Visual trust-building component featuring high typography & clinical stats */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/80 border border-slate-100 relative">
            <div className="absolute top-4 right-4 bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-1 rounded border border-amber-200 uppercase">
              ★ West Bengal Govt. Approved
            </div>

            <div className="space-y-6">
              {/* Premium Floating Brand Badge with glassmorphic container and ambient light */}
              <div className="flex items-center gap-4 bg-slate-900 text-white rounded-2xl p-4 border border-cyan-500/30 shadow-[0_8px_30px_rgba(6,182,212,0.15)] relative overflow-hidden group">
                {/* Ambient glow effect inside badge */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8A6]/10 rounded-full filter blur-xl -mr-10 -mt-10 pointer-events-none animate-pulse" />
                <div className="shrink-0 relative z-10 p-1.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                  <ShopLogo size="sm" glow={true} animated={true} />
                </div>
                <div className="space-y-1 relative z-10">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase leading-none block">AI-Assisted Patient Support</span>
                  <div className="text-[13px] font-semibold text-slate-100 flex items-center gap-1.5 leading-none">
                    <span>Trusted Homeopathic Care</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/35">ESTD 2017</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans leading-tight">
                    Precision clinical dosage selection with active compliance.
                  </p>
                </div>
              </div>

              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">Store Highlights</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100/30">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 block">25+</span>
                  <span className="text-xs font-medium text-slate-500 mt-1 block leading-tight">Years in Midnapore</span>
                </div>
                <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100/30">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0c4a60] block">15k+</span>
                  <span className="text-xs font-medium text-slate-500 mt-1 block leading-tight">Patients Treated</span>
                </div>
                <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100/30">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 block">100%</span>
                  <span className="text-xs font-medium text-slate-500 mt-1 block leading-tight">Genuine Molecules</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 block">5.0 ★</span>
                  <span className="text-xs font-medium text-slate-500 mt-1 block leading-tight">Customer Trust</span>
                </div>
              </div>

              {/* Patient Trust Callout */}
              <div className="pt-4 border-t border-slate-100 flex gap-3.5 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 fill-emerald-800/15" />
                </div>
                <div>
                  <blockquote className="text-xs italic text-slate-500 leading-normal">
                    "My whole family relies on Bera Homeo Pharmacy for stomach issues and acute skin concerns. Their dilution selections are incredibly balanced, precise, and fast acting."
                  </blockquote>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider block mt-1 uppercase">— Swati K., Local Patient</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onScrollToUSPs}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition inline-flex items-center gap-1"
            >
              Learn about our homeopathic principles & USPs ↓
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
