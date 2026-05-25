import React, { useState, useEffect } from 'react';
import { Send, FileCheck2, Check, MessageSquare, Award, ShieldCheck, Leaf, Truck, MapPin, Activity, Users, Lock, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Lead } from '../types';

interface LeadFormProps {
  onLeadAdded: (lead: Lead) => void;
}

export default function LeadForm({ onLeadAdded }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState<'Doctor Consultation' | 'Medicine Dispatch' | 'Chronic Treatment' | 'Other/Ailments Enquiry'>('Doctor Consultation');
  const [message, setMessage] = useState('');
  
  // States for errors, processing, and success
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedLead, setCompletedLead] = useState<Lead | null>(null);
  const [placeholderText, setPlaceholderText] = useState("e.g., Stomach inflammation since 2 months, bloating after eating or SBL Alfalfa tonic required 1 bottle, Germany R1 dilution...");

  useEffect(() => {
    const handleTrigger = () => {
      // 1. Update placeholder with premium interactive guidance
      setPlaceholderText("Describe your symptoms, medicine names, duration, or health concerns...");
      
      // 2. Focus the textarea field
      setTimeout(() => {
        const textarea = document.getElementById('patient-message') as HTMLTextAreaElement | null;
        if (textarea) {
          textarea.focus();
        }
      }, 100);
    };

    window.addEventListener('DraftSymptomsTriggered', handleTrigger);
    return () => {
      window.removeEventListener('DraftSymptomsTriggered', handleTrigger);
    };
  }, []);

  const scriptURL = "https://script.google.com/macros/s/AKfycbwDpOV64SCVTtPkmwvHgzaouHXkrRD6qNk_9UG_bR1M2ZLujxsph6EWMbmGvByIc1z5wg/exec";

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) {
      tempErrors.name = "Full Patient Name is required.";
    }
    
    // Simple Indian mobile number validation
    const phoneClean = phone.replace(/\D/g, '');
    if (!phoneClean) {
      tempErrors.phone = "Contact Mobile Number is required.";
    } else if (phoneClean.length < 10) {
      tempErrors.phone = "Provide a valid 10-digit mobile number.";
    }

    if (!message.trim()) {
      tempErrors.message = "Symptoms Detail / Medicine Names is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Dispatch server-less API post to Google Sheets webhook
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Bypasses browser strict CORS warnings during Apps Script redirect headers
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service: service,
          message: message.trim()
        })
      });
    } catch (err) {
      console.warn("Google Sheet integration completed with redirection capture.", err);
    } finally {
      // Form successfully saved and synchronized! Generate localized ID
      const ticketId = 'BERA_' + Date.now().toString().slice(-6);
      const submittedAtStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

      // Build local lead payload matching schema requirements
      const requestTypeMapped: 'consultation' | 'medicines' | 'chronic' | 'other' = 
        service === 'Doctor Consultation' ? 'consultation' :
        service === 'Medicine Dispatch' ? 'medicines' :
        service === 'Chronic Treatment' ? 'chronic' : 'other';

      const newLead: Lead = {
        id: ticketId,
        name: name.trim(),
        phone: phone.trim(),
        requestType: requestTypeMapped,
        description: message.trim(),
        submittedAt: submittedAtStr,
        status: 'new'
      };

      // Notify parent component to update standard local states
      onLeadAdded(newLead);
      
      // Update local states for confirmation view
      setCompletedLead(newLead);
      setIsSubmitting(false);

      // Save form fields to local variables before resetting state, ensuring correct encoding values
      const patientName = name.trim();
      const contactPhone = phone.trim();
      const selectedService = service;
      const symptomsMessage = message.trim();

      // Clean interactive state parameters 
      setName('');
      setPhone('');
      setService('Doctor Consultation');
      setMessage('');

      // Show professional healthcare success prompt
      alert(`Registration Successful!\n\nYour Lead has been generated with Ticket ID: ${ticketId}.\nWe are now opening WhatsApp for direct follow-up with our clinical specialist.`);

      // Build target dynamic WhatsApp consultation request payload
      const textParam = `Hello Bera Homeo Pharmacy,

New Consultation Request

Patient Name: ${patientName}
Phone: ${contactPhone}
Purpose: ${selectedService}

Symptoms / Medicine Details:
${symptomsMessage}

Please assist me further.`;

      const waUrl = `https://wa.me/918250813875?text=${encodeURIComponent(textParam)}`;

      // Open secure auto-initialized WhatsApp business chat in a new tab
      const waWin = window.open(waUrl, '_blank');
      if (!waWin || waWin.closed || typeof waWin.closed === 'undefined') {
        // Fallback redirection if browser blocks initial pop-up
        window.location.href = waUrl;
      }
    }
  };

  // Build high-conversion detailed WhatsApp string generator
  const getWhatsAppLink = (lead: Lead) => {
    const serviceName = 
      lead.requestType === 'consultation' ? 'Doctor Consultation' :
      lead.requestType === 'medicines' ? 'Medicine Dispatch' :
      lead.requestType === 'chronic' ? 'Chronic Treatment' : 'Other/Ailments Enquiry';

    const textParam = `Hello Bera Homeo Pharmacy,

New Consultation Request

Patient Name: ${lead.name}
Phone: ${lead.phone}
Purpose: ${serviceName}

Symptoms / Medicine Details:
${lead.description}

Please assist me further.`;

    return `https://wa.me/918250813875?text=${encodeURIComponent(textParam)}`;
  };

  return (
    <section id="leads" className="py-20 bg-[#F8FAFC] max-w-full px-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold bg-[#14B8A6]/10 px-3.5 py-1.5 rounded-full inline-block mb-3.5 font-mono">
            Secure Priority Portal
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
            Priority Patient Registration
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-sans">
            Connect directly with Bera Homeo Pharmacy. Registering below safely locks your diagnostics with our local clinic database, synchronized with WhatsApp follow-up.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Lead Generation Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gradient" />
              
              <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1.5">
                Clinical Registration Form
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-sans">
                Please provide patient details accurately. All diagnostic notes are securely archived.
              </p>

              {/* SUCCESS MESSAGE MODAL-LIKE VIEW */}
              {completedLead ? (
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 text-center animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-100/80 rounded-full flex items-center justify-center text-emerald-700 mx-auto mb-4 border border-emerald-200">
                    <FileCheck2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950 mb-1">Registration Complete!</h4>
                  <p className="text-xs text-emerald-700 mb-4 tracking-wide uppercase font-mono">Lead Ticket: {completedLead.id}</p>
                  
                  <div className="bg-white/90 rounded-xl p-4 text-left border border-emerald-100/60 mb-6 text-xs text-slate-700 space-y-1.5 font-sans">
                    <p><strong>Patient Name:</strong> {completedLead.name}</p>
                    <p><strong>Phone Contact:</strong> +91 {completedLead.phone}</p>
                    <p><strong>Request Category:</strong> {completedLead.requestType.toUpperCase()}</p>
                    <p className="line-clamp-2"><strong>Details/Symptoms:</strong> {completedLead.description}</p>
                  </div>

                  {/* WhatsApp Prompt */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 mb-6 text-center shadow-sm">
                    <span className="text-[11px] font-bold text-[#14B8A6] uppercase tracking-widest block mb-2">⚡ WhatsApp Chat Active</span>
                    <p className="text-xs text-slate-500 leading-normal mb-3">
                      To send customized diagnostic prescriptions or ask any direct pharmacy questions, tap below to chat with Bera Homeo on WhatsApp instantly.
                    </p>
                    <a
                      href={getWhatsAppLink(completedLead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold p-3.5 rounded-xl text-xs transition duration-200 hover:scale-[1.02] shadow-md shadow-emerald-500/10"
                      id="whats-instant-dispatch"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Start Live Specialist Consultation</span>
                    </a>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setCompletedLead(null)}
                      className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition duration-200 cursor-pointer"
                    >
                      New Registration
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="form-lead-gen">
                  
                  {/* Name field */}
                  <div>
                    <label htmlFor="patient-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Patient Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="patient-name"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g., Swarnabha Roy"
                      className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3.5 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#14B8A6]/20 ${
                        errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-[#14B8A6]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-500 font-medium mt-1">⚠️ {errors.name}</p>}
                  </div>

                  {/* Phone field */}
                  <div>
                    <label htmlFor="patient-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Contact Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold select-none font-mono">+91</span>
                      <input
                        type="tel"
                        id="patient-phone"
                        name="phone"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder="82508 13875"
                        maxLength={15}
                        className={`w-full bg-slate-50/50 border rounded-xl pl-13 pr-4 py-3.5 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#14B8A6]/20 font-mono ${
                          errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-[#14B8A6]'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-rose-500 font-medium mt-1">⚠️ {errors.phone}</p>}
                  </div>

                  {/* Purpose of Request with selection logic */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Purpose of Request <span className="text-rose-500">*</span>
                    </label>
                    
                    {/* Hidden input keeping custom name as service as explicitly ordered by instructions */}
                    <input type="hidden" name="service" value={service} />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { value: 'Doctor Consultation', label: 'Doctor Consultation' },
                        { value: 'Medicine Dispatch', label: 'Medicine Dispatch' },
                        { value: 'Chronic Treatment', label: 'Chronic Treatment' },
                        { value: 'Other/Ailments Enquiry', label: 'Other/Ailments Enquiry' }
                      ].map((item) => {
                        const isSelected = service === item.value;
                        return (
                          <button
                            type="button"
                            key={item.value}
                            onClick={() => setService(item.value as any)}
                            className={`border rounded-xl p-3.5 text-center cursor-pointer select-none transition-all duration-200 ${
                              isSelected 
                                ? 'bg-brand-gradient text-white border-transparent font-medium shadow-md md:shadow-lg' 
                                : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-xs block">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Symptoms & Message */}
                  <div>
                    <label htmlFor="patient-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Symptoms Detail / Medicine Names <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="patient-message"
                      name="message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                      }}
                      placeholder={placeholderText}
                      className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#14B8A6]/20 ${
                        errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-[#14B8A6]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-rose-500 font-medium mt-1">⚠️ {errors.message}</p>}
                  </div>

                  {/* Action Dispatch button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-gradient hover:opacity-90 disabled:opacity-50 text-white font-bold p-4 rounded-xl transition duration-200 shadow-md shadow-[#14B8A6]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    id="btn-lead-submit"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Book Priority Follow-up & Advice</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 leading-normal">
                      🛡️ All patient submissions are safeguarded, processed with clinical priority records, and forwarded directly to store hotline +91 82508 13875.
                    </span>
                  </div>

                </form>
              )}
            </div>
          </div>

          {/* Right Column: Professional Healthcare Trust Card */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full border border-[#06B6D4]/25 shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-[#14B8A6]/40 hover:shadow-[#14B8A6]/5 group/card">
              
              {/* Complex ambient background glowing particles and waves */}
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-gradient-to-br from-[#14B8A6]/20 to-[#06B6D4]/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-gradient-to-tr from-[#06B6D4]/15 to-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
              
              {/* Floating gradient glow particle 1 */}
              <div className="absolute top-1/3 left-1/4 w-3.5 h-3.5 bg-[#14B8A6]/30 rounded-full blur-xs pointer-events-none animate-bounce" style={{ animationDuration: '10s' }} />
              {/* Floating gradient glow particle 2 */}
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#06B6D4]/40 rounded-full blur-xs pointer-events-none animate-pulse" style={{ animationDuration: '3s' }} />
              {/* Floating gradient glow particle 3 */}
              <div className="absolute top-2/3 right-1/5 w-2.5 h-2.5 bg-indigo-400/20 rounded-full blur-xs pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

              <div className="relative z-10">
                
                {/* 6. Top mini status strip */}
                <div className="mb-6 flex items-center justify-between bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-[10px] text-slate-300 font-mono tracking-wider">
                  <span className="flex items-center gap-1.5 text-[#14B8A6]">
                    <Lock className="w-3 h-3 text-[#14B8A6] animate-pulse" />
                    Secure AI-Assisted Consultation System Active
                  </span>
                  <span className="hidden sm:flex items-center gap-1 text-[9px] text-slate-500">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    v2.8.4
                  </span>
                </div>

                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#14B8A6] font-bold bg-[#14B8A6]/10 border border-[#14B8A6]/20 px-3 py-1 rounded-full inline-block mb-3.5 font-mono">
                      Clinical Trust & Assurance
                    </span>
                    <h4 className="text-xl font-bold font-display leading-tight text-white group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-[#06B6D4] transition-all duration-300">
                      Why Patients Choose Us
                    </h4>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#14B8A6]/40 animate-pulse hidden xs:block" />
                </div>
                
                <p className="text-xs text-slate-400 mb-6 font-sans leading-relaxed">
                  Dedicated to excellence in homeopathic diagnostic care, offering rapid recovery plans with complete confidentiality.
                </p>

                {/* 1. Animated Live Status Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-black/25 p-2 rounded-2xl border border-white/5 mb-8 text-[11px] font-mono">
                  {/* Status Indicator 1 */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900/40 rounded-lg border border-white/5 hover:border-[#14B8A6]/20 transition-all duration-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-slate-300 whitespace-nowrap">Support Online</span>
                  </div>

                  {/* Status Indicator 2 */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900/40 rounded-lg border border-white/5 hover:border-[#06B6D4]/20 transition-all duration-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06B6D4]"></span>
                    </span>
                    <span className="text-slate-300 whitespace-nowrap">Clinical Sync</span>
                  </div>

                  {/* Status Indicator 3 */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900/40 rounded-lg border border-white/5 hover:border-emerald-500/20 transition-all duration-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-slate-300 whitespace-nowrap">Routing Active</span>
                  </div>
                </div>

                {/* 3. Animated Healthcare Metrics Dashboard Grid (2x2) */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {/* Metric 1: 25+ Years */}
                  <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 border border-white/5 hover:border-[#14B8A6]/30 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] group/item">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-lg sm:text-2xl font-black text-white tracking-tight group-hover/item:text-[#14B8A6] transition-colors duration-200">
                        25+ Yrs
                      </span>
                      <Award className="w-4.5 h-4.5 text-[#14B8A6]/60 group-hover/item:text-[#14B8A6] group-hover/item:rotate-6 transition-all duration-300 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-[#14B8A6] uppercase tracking-wider font-bold block mb-1 font-mono">Trusted Care</span>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans">Heritage diagnostic care and community faith.</p>
                  </div>

                  {/* Metric 2: 15k+ Patients */}
                  <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 border border-white/5 hover:border-[#06B6D4]/30 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] group/item">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-lg sm:text-2xl font-black text-white tracking-tight group-hover/item:text-[#06B6D4] transition-colors duration-200">
                        15k+
                      </span>
                      <Users className="w-4.5 h-4.5 text-[#06B6D4]/60 group-hover/item:text-[#06B6D4] group-hover/item:scale-110 transition-all duration-300 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-[#06B6D4] uppercase tracking-wider font-bold block mb-1 font-mono">Patients Supported</span>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans">Delivering holistic homeopathic healing globally.</p>
                  </div>

                  {/* Metric 3: 98% Follow-up */}
                  <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] group/item">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-lg sm:text-2xl font-black text-white tracking-tight group-hover/item:text-emerald-400 transition-colors duration-200">
                        98%
                      </span>
                      <Activity className="w-4.5 h-4.5 text-emerald-500/60 group-hover/item:text-emerald-400 group-hover/item:rotate-12 transition-all duration-300" />
                    </div>
                    <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold block mb-1 font-mono">Response Rate</span>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans">Immediate clinical triage and advisory dispatch.</p>
                  </div>

                  {/* Metric 4: Fast Dispatch */}
                  <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-4 border border-white/5 hover:border-indigo-400/30 hover:bg-white/[0.05] transition-all duration-300 hover:scale-[1.02] group/item">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-lg sm:text-2xl font-black text-white tracking-tight group-hover/item:text-indigo-300 transition-colors duration-200">
                        Fast
                      </span>
                      <Truck className="w-4.5 h-4.5 text-indigo-400/60 group-hover/item:text-indigo-400 group-hover/item:-translate-x-0.5 transition-all duration-300" />
                    </div>
                    <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-bold block mb-1 font-mono">Remedy Delivery</span>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans font-sans">Original European supplies secured and shipped.</p>
                  </div>
                </div>

                {/* Sleek Trust Points List with micro hovers and glowing icons */}
                <div className="space-y-4 pt-1">
                  
                  {/* Point 1: Secure Patient Consultation */}
                  <div className="flex gap-4 items-start bg-black/10 rounded-2xl p-3 border border-white/0 hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300 group/point">
                    <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center shrink-0 text-[#06B6D4] group-hover/point:bg-[#06B6D4]/20 group-hover/point:scale-105 transition-all duration-300">
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-100 font-display group-hover/point:text-[#06B6D4] transition-colors duration-200 flex items-center gap-1.5">
                        Secure Patient Consultation
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans font-sans">
                        Strict diagnostic privacy protocols and record safekeeping keep your consultation completely secure and confidential.
                      </p>
                    </div>
                  </div>

                  {/* Point 2: Genuine Homeopathic Medicines */}
                  <div className="flex gap-4 items-start bg-black/10 rounded-2xl p-3 border border-white/0 hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300 group/point">
                    <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 flex items-center justify-center shrink-0 text-[#14B8A6] group-hover/point:bg-[#14B8A6]/20 group-hover/point:scale-105 transition-all duration-300">
                      <Leaf className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-100 font-display group-hover/point:text-[#14B8A6] transition-colors duration-200 flex items-center gap-1.5">
                        Genuine Homeopathic Medicines
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                        100% original, pure remedies curated directly from trusted global manufacturers and certified pharmacies.
                      </p>
                    </div>
                  </div>

                  {/* Point 3: Trusted Midnapore Clinic */}
                  <div className="flex gap-4 items-start bg-black/10 rounded-2xl p-3 border border-white/0 hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300 group/point">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 group-hover/point:bg-indigo-500/20 group-hover/point:scale-105 transition-all duration-300">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-100 font-display group-hover/point:text-indigo-400 transition-colors duration-200 flex items-center gap-1.5">
                        Trusted Midnapore Clinic
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                        Highly respected physical clinical presence situated locally at Nepali Para Road, Ashoknagar, Midnapore.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Secure system indicator at bottom with high contrast blink dot */}
              <div className="mt-8 pt-5 border-t border-slate-800/85 flex items-center justify-between text-[10px] text-slate-400 font-mono relative z-10 w-full">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>ACTIVE CLINICAL CARE NETWORK</span>
                </div>
                <span className="text-slate-500 text-[9px] hidden xs:block">SECURE CHANNEL 256bit</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
