import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, Mail, Heart, ArrowUp } from 'lucide-react';
import ShopLogo from './ShopLogo';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0f1c2c] text-slate-300 pt-16 pb-8 border-t border-slate-800 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Core directory grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Column 1: Store Intro */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white/5 border border-white/10 shadow-lg shadow-cyan-500/5">
                <ShopLogo size="sm" glow={false} animated={true} />
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight block leading-none">Bera Homeo</span>
                <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#14B8A6] mt-1 block">Pharmacy & Clinic</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
              West Bengal Government licensed homeopathic distribution point. Providing absolute authenticity, expert case evaluations, and gentle healthcare remedies directly of German standard for over 25 continuous years.
            </p>

            <div className="flex gap-1.5 items-center bg-white/5 border border-white/10 rounded-xl p-3.5 max-w-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-[10px] text-slate-300 font-medium font-mono">Licensed Drug Retail Unit: DL No - WB/PSA/1443/HL-S</span>
            </div>
          </div>

          {/* Column 2: Physical Address directory */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#06d6a0] font-bold block">
              Physical Store Address
            </span>

            <div className="space-y-3.5 text-xs">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#ffd166] shrink-0" />
                <div className="space-y-1">
                  <strong className="text-slate-100 block font-semibold">Store Location:</strong>
                  <span className="text-slate-300 leading-relaxed font-sans block">
                    Nepali Para Road, Ashoknagar, Midnapore, West Bengal - 721101, India
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">Landmark: Near Ashoknagar Club, Midnapore Town</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Clock className="w-5 h-5 text-[#ffd166] shrink-0" />
                <div className="space-y-1">
                  <strong className="text-slate-100 block font-semibold font-mono">Pharmacy Hours:</strong>
                  <span className="text-slate-300 block">Mon - Sat: 9:00 AM - 9:00 PM</span>
                  <span className="text-emerald-400 block">Sunday: 10:00 AM - 2:00 PM (Emergency only)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Communication hotline */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#06d6a0] font-bold block">
              Direct Contact
            </span>

            <ul className="space-y-3 text-xs font-sans">
              <li>
                <a
                  href="tel:+918250813875"
                  className="flex items-center gap-2.5 hover:text-white transition group"
                  id="footer-call"
                >
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-500 block leading-none">Primary Hotline:</span>
                    <strong className="text-sm font-mono text-slate-200 group-hover:text-emerald-400">+91 82508 13875</strong>
                  </div>
                </a>
              </li>

              <li>
                <div className="flex items-center gap-2.5 text-[#06d6a0]">
                  <span className="w-8 h-8 rounded-lg bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] flex items-center justify-center">
                    💬
                  </span>
                  <div className="text-slate-300 text-xs">
                    <span className="text-[10px] text-slate-500 block leading-none font-sans">WhatsApp Business:</span>
                    <span className="font-mono font-bold">8250813875</span>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-450 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-500 block leading-none">Email Address:</span>
                    <span className="text-slate-300 font-mono">bearghanilbera@gmail.com</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Health safety disclaimer & rules (required for reputable medical sites) */}
        <div className="py-7 text-[11px] text-slate-500 space-y-2 leading-relaxed font-sans border-b border-white/5">
          <p>
            <strong>Disclaimer for Patients:</strong> All medical summaries, treatment advice lists, and homoeopathic articles hosted on this landing page target general educational guidelines and cataloging purposes only. It is not an alternative to an individual constitutional prescription crafted under person-to-person patient interrogation.
          </p>
          <p>
            Homoeopathy does not claim to chemically suppress virus loads within moments; rather, it aims to naturally enhance physiological immunity levels. Do not attempt self-medicating high-potency dilutions (like 1M, 10M, or CM) without direct instruction by a registered clinic.
          </p>
        </div>

        {/* Brand trademark, copyright, and Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <div>
            <span>&copy; {new Date().getFullYear()} Bera Homeo Pharmacy. All rights reserved.</span>
            <span className="mx-2">|</span>
            <span className="text-slate-500 font-mono">Nepali Para Road, Ashoknagar, Midnapore, WB</span>
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white font-mono font-semibold px-3 py-1.5 rounded-lg border border-white/10 transition cursor-pointer"
            id="footer-scroll-top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
