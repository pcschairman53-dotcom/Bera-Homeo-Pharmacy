import React, { useState } from 'react';
import { Phone, Clock, MapPin, Menu, X, ShieldAlert, Heart, Calendar } from 'lucide-react';
import ShopLogo from './ShopLogo';

interface NavbarProps {
  onScrollToForm: () => void;
  onScrollToContact: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ onScrollToForm, onScrollToContact, onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* Upper Operating Ribbon */}
      <div className="bg-[#0f1c2c] text-white text-[11px] md:text-xs py-2 px-4 border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon - Sat: 9:00 AM - 9:00 PM | Sun: 10:00 AM - 2:00 PM</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Ashoknagar, Midnapore, WB</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-medium">Licensed Pharmacy DL No: WB/PSA/1443/HL-S</span>
            <button
              onClick={onOpenAdmin}
              className="text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded transition duration-200"
              id="nav-admin-link"
            >
              System Controls
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5 px-4 sticky top-0 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="relative group p-1 bg-white/40 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-[0_4px_15px_rgba(20,184,166,0.05)] hover:border-[#14B8A6]/30 hover:shadow-[0_4px_20px_rgba(20,184,166,0.12)] transition-all duration-300">
              <ShopLogo size="sm" glow={true} animated={true} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-[#0f1c2c] tracking-tight block leading-none">Bera Homeo</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-[#0c4a60] border border-slate-200/50">ESTD • 2017</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#14B8A6] block mt-1">Pharmacy & Clinic</span>
            </div>
          </div>

          {/* Desktop Navigation Linkages */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-emerald-600 py-1 transition-colors">About Us</a>
            <a href="#usps" className="hover:text-emerald-600 py-1 transition-colors">Why Homeopathy</a>
            <a href="#leads" className="hover:text-emerald-600 py-1 transition-colors">Request Consult</a>
            <a href="#faq" className="hover:text-emerald-600 py-1 transition-colors">FAQs</a>
            <a href="#contact" className="hover:text-emerald-600 py-1 transition-colors text-slate-800">Address & Store</a>
          </div>

          {/* Interactive Action Hub */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+918250813875"
              className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 font-semibold text-sm px-4 py-2 rounded-xl border border-slate-200/85 transition"
              id="cta-nav-phone"
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>+91 82508 13875</span>
            </a>
            
            <button
              onClick={onScrollToForm}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-md shadow-emerald-600/10 transition active:scale-95"
              id="cta-nav-consult"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Priority Consultation</span>
            </button>
          </div>

          {/* Mobile responsive toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-700 p-2 hover:bg-slate-50 rounded-xl transition-colors"
            aria-label="Toggle navigation menu"
            id="nav-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-6 px-5 flex flex-col gap-4 animate-fade-in z-50">
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-50"
            >
              About Us
            </a>
            <a
              href="#usps"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-50"
            >
              Why Choose Bera Homeo
            </a>
            <a
              href="#leads"
              onClick={() => {
                setIsOpen(false);
                onScrollToForm();
              }}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-50"
            >
              Request Consult / Order
            </a>
            <a
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-50"
            >
              Frequently Asked Questions
            </a>
            <a
              href="#contact"
              onClick={() => {
                setIsOpen(false);
                onScrollToContact();
              }}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-50"
            >
              Contact info & Directions
            </a>

            <div className="flex flex-col gap-3 mt-4">
              <a
                href="tel:+918250813875"
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 rounded-xl border border-slate-200 text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Store: +91 82508 13875</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onScrollToForm();
                }}
                className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/10 text-center text-sm"
              >
                Book Priority Consultation
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
