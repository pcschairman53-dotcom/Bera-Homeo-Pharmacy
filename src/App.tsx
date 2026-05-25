import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import USPSlice from './components/USPSlice';
import AboutExpertise from './components/AboutExpertise';
import FeedbackReviews from './components/FeedbackReviews';
import LeadForm from './components/LeadForm';
import AdminPanel from './components/AdminPanel';
import FAQS from './components/FAQS';
import Footer from './components/Footer';
import { Lead } from './types';
import { MessageSquare, Heart, ShieldAlert, BadgeInfo, Bell } from 'lucide-react';
import ShopLogo from './components/ShopLogo';

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Initialize leads from localStorage or default mock entries
  useEffect(() => {
    const cached = localStorage.getItem('bera_leads');
    if (cached) {
      try {
        setLeads(JSON.parse(cached));
      } catch (err) {
        console.error("Failed to parse cached leads.");
      }
    } else {
      // Warm mock files to let the user test out the admin center immediately!
      const defaultLeads: Lead[] = [
        {
          id: 'BERA_7519',
          name: 'Debolina Sen',
          phone: '9432857102',
          requestType: 'chronic',
          description: 'Sufferer of severe Migraine and allergic sinusitis since 4 years. Fits of headache worsen on exposure to damp weather. SBL dilutions do not help, need guidance on Dr. Reckeweg Germany remedies list.',
          submittedAt: '5/24/2026, 3:12:45 PM',
          status: 'contacted'
        },
        {
          id: 'BERA_3980',
          name: 'Joydeep Pal',
          phone: '8250813875',
          requestType: 'medicines',
          description: 'Require urgent dispatch of: SBL Alfalfa Tonic (with Ginseng) 500ml - 1 bottle and Willmar Schwabe Germany Bio-Combination No. 20 (Skin) - 2 units. Deliver to Midnapore Address.',
          submittedAt: '5/25/2026, 10:04:12 AM',
          status: 'new'
        }
      ];
      setLeads(defaultLeads);
      localStorage.setItem('bera_leads', JSON.stringify(defaultLeads));
    }
  }, []);

  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('bera_leads', JSON.stringify(updatedLeads));
  };

  const handleLeadAdded = (newLead: Lead) => {
    const updated = [newLead, ...leads];
    saveLeadsToStorage(updated);
    
    // Trigger live simulation notification
    triggerGlobalAlert(`Lead registered! Ticket ${newLead.id} logged locally into Admin Controls.`);
  };

  const handleUpdateStatus = (id: string, status: 'new' | 'contacted' | 'completed') => {
    const updated = leads.map(lead => 
      lead.id === id ? { ...lead, status } : lead
    );
    saveLeadsToStorage(updated);
    triggerGlobalAlert(`Lead ${id} state updated to: ${status.toUpperCase()}`);
  };

  const handleDeleteSingleLead = (id: string) => {
    const updated = leads.filter(lead => lead.id !== id);
    saveLeadsToStorage(updated);
    triggerGlobalAlert(`Lead ticket ${id} has been removed.`);
  };

  const handleClearLeads = () => {
    if (window.confirm("Are you sure you want to completely clear the local simulation database?")) {
      saveLeadsToStorage([]);
      triggerGlobalAlert("Simulation database cleared successfully.");
    }
  };

  const triggerGlobalAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => {
      setAlertMessage(null);
    }, 4500);
  };

  // Navigation viewport scroll utilities
  const scrollToForm = () => {
    document.getElementById('leads')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUSPs = () => {
    document.getElementById('usps')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      
      {/* Operating Alerts HUD */}
      {alertMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0f1c2c] border border-emerald-500 text-slate-100 px-5 py-4 rounded-2xl shadow-xl shadow-slate-900/40 text-xs sm:text-sm font-sans flex items-center gap-3 animate-fade-in max-w-sm">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping shrink-0" />
          <div className="leading-relaxed">
            <span className="text-emerald-400 block font-bold uppercase tracking-wider text-[9px] mb-0.5">System Notification</span>
            {alertMessage}
          </div>
        </div>
      )}

      {/* Corporate sticky header */}
      <Navbar 
        onScrollToForm={scrollToForm} 
        onScrollToContact={scrollToContact}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections flow */}
      <main className="grow">
        
        {/* Core Hero and USP panels */}
        <Hero onScrollToForm={scrollToForm} onScrollToUSPs={scrollToUSPs} />
        <USPSlice />
        
        {/* Deep heritage and address map directions */}
        <AboutExpertise />
        
        {/* Patient Reviews Slider and Filters */}
        <FeedbackReviews />
        
        {/* Lead Capture and Apps Script instructions */}
        <LeadForm onLeadAdded={handleLeadAdded} />

        {/* Dynamic Admin workspace */}
        {isAdminOpen && (
          <section className="py-16 bg-white border-b border-slate-200 px-4" id="controls-panel">
            <div className="max-w-4xl mx-auto">
              <AdminPanel 
                leads={leads}
                onUpdateStatus={handleUpdateStatus}
                onDeleteSingleLead={handleDeleteSingleLead}
                onClearLeads={handleClearLeads}
                onClose={() => setIsAdminOpen(false)}
              />
            </div>
          </section>
        )}

        {/* Frequently asked answers and advisory */}
        <FAQS />

      </main>

      {/* Footer copyright, Hours and phone connections */}
      <Footer />

      {/* Optional Floating Glassmorphism Identity Badge - Desktop Only */}
      <div className="fixed top-24 right-5 z-40 hidden xl:flex items-center gap-3.5 bg-white/70 backdrop-blur-md border border-slate-200/50 p-3 rounded-2xl shadow-[0_10px_35px_rgba(20,184,166,0.08)] group hover:border-[#14B8A6]/40 hover:bg-white/90 transition-all duration-300 animate-smooth-float max-w-sm select-none">
        <div className="p-1 rounded-xl bg-[#0f1c2c] shadow-md shadow-slate-900/10 shrink-0">
          <ShopLogo size="sm" glow={true} animated={false} />
        </div>
        <div className="text-left font-sans">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#14B8A6] block leading-none">Licensed Clinic</span>
          <span className="text-[11px] font-extrabold text-slate-900 block leading-none mt-1">Bera Homeo Hub</span>
          <span className="text-[9px] text-[#0c4a60] font-semibold mt-0.5 block leading-none">Authorized Retail Unit</span>
        </div>
      </div>

      {/* Floating Sticky Quick Action: WhatsApp Help Line */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 max-w-[calc(100vw-2rem)] select-none">
        
        {/* Interactive small advisory popup - Hidden below sm screens to maximize viewport space */}
        <div className="hidden sm:block bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xl shadow-slate-900/5 max-w-xs text-xs text-slate-600 font-sans border-r-4 border-r-emerald-500 animate-bounce">
          <span className="font-bold text-[#0c4a60] flex items-center gap-1.5 mb-1 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Bera Homeo Store Support
          </span>
          Need custom advice in Bengali/Hindi? Tap to chat with us instantly!
        </div>

        <a
          href={`https://wa.me/918250813875?text=${encodeURIComponent("Hello Bera Homeo Pharmacy, I have an inquiry regarding my symptoms.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25d366] hover:bg-[#20ba5a] text-white p-3.5 sm:p-4 rounded-full shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
          title="Direct WhatsApp: 8250813875"
          id="btn-whatsapp-floating"
        >
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        </a>
      </div>

    </div>
  );
}
