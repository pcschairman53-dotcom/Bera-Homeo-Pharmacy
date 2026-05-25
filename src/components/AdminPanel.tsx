import React from 'react';
import { Trash2, PhoneCall, MessageCircle, RefreshCw, Layers, CheckCircle, Clock, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { Lead } from '../types';

interface AdminPanelProps {
  leads: Lead[];
  onUpdateStatus: (id: string, status: 'new' | 'contacted' | 'completed') => void;
  onClearLeads: () => void;
  onDeleteSingleLead: (id: string) => void;
  onClose: () => void;
}

export default function AdminPanel({ leads, onUpdateStatus, onClearLeads, onDeleteSingleLead, onClose }: AdminPanelProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
      {/* Header Bar */}
      <div className="bg-[#0f1c2c] text-white p-6 flex justify-between items-center relative">
        <div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 px-2 rounded uppercase font-mono tracking-wide">
            Internal Operations Studio
          </span>
          <h4 className="text-xl font-bold font-display mt-1.5 text-slate-100 flex items-center gap-2">
            <span>Bera Homeo Leads Inbox</span>
            <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full font-mono">
              {leads.length} Active
            </span>
          </h4>
        </div>
        
        <button
          onClick={onClose}
          className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl transition duration-200"
          title="Close Controls"
          id="btn-admin-close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Leads List Grid */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-sm font-semibold text-slate-800">Constitutional Submissions Database</span>
            <p className="text-xs text-slate-400 mt-0.5">Simulating real-time server updates & Google Sheets payload.</p>
          </div>
          
          {leads.length > 0 && (
            <button
              onClick={onClearLeads}
              className="text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200/80 hover:border-rose-600 px-3.5 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer"
              id="btn-clear-all-leads"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wipe Data Logs</span>
            </button>
          )}
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200/65 border-dashed">
            <span className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4 border border-slate-200">
              <RefreshCw className="w-6 h-6 animate-spin duration-3000" />
            </span>
            <h5 className="text-sm font-bold text-slate-800 mb-1">Simulated database is empty</h5>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Return to the patient form slightly above, send a mock submission, and witness it logged instantly into this operational center!
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {leads.map((lead) => (
              <div 
                key={lead.id}
                className="bg-slate-50 hover:bg-slate-100/70 rounded-2xl p-5 border border-slate-200/80 transition relative flex flex-col justify-between"
                id={`admin-lead-${lead.id}`}
              >
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded">
                      {lead.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium font-mono">
                      {lead.submittedAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {/* Status badges selector */}
                    <button
                      onClick={() => onUpdateStatus(lead.id, 'new')}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                        lead.status === 'new' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                          : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      New
                    </button>
                    <button
                      onClick={() => onUpdateStatus(lead.id, 'contacted')}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                        lead.status === 'contacted' 
                          ? 'bg-sky-100 text-sky-800 border border-sky-200' 
                          : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Contacted
                    </button>
                    <button
                      onClick={() => onUpdateStatus(lead.id, 'completed')}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                        lead.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Resolved
                    </button>
                  </div>
                </div>

                {/* Patient Profile info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-2">
                  <div className="md:col-span-4">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Patient Identity:</span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5 leading-none">{lead.name}</p>
                    
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase mt-3">Contact Handle:</span>
                    <a 
                      href={`tel:+91${lead.phone.replace(/\s+/g, '')}`} 
                      className="text-xs font-mono text-emerald-600 hover:underline font-bold mt-0.5 block"
                    >
                      +91 {lead.phone}
                    </a>
                  </div>

                  <div className="md:col-span-8">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Symptom Dossier / Request Type:</span>
                      <span className="text-[10px] uppercase font-mono font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-100">
                        {lead.requestType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal bg-white p-3 rounded-lg border border-slate-100 italic">
                      "{lead.description}"
                    </p>
                  </div>
                </div>

                {/* Operations footer */}
                <div className="mt-4 pt-3.5 border-t border-slate-200/60 flex flex-wrap justify-between items-center gap-3">
                  <div className="flex gap-2">
                    <a
                      href={`tel:+91${lead.phone}`}
                      className="bg-white hover:bg-slate-50 hover:border-slate-300 font-semibold text-xs px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-800 transition flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Direct Dial Call</span>
                    </a>
                    
                    <a
                      href={`https://wa.me/918250813875?text=${encodeURIComponent(`Hello ${lead.name}, this is Bera Homeo Pharmacy. We received your request regarding ${lead.requestType}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-50 hover:bg-emerald-100 font-semibold text-xs px-3.5 py-1.5 rounded-xl border border-emerald-200 text-emerald-800 transition flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25d366]" />
                      <span>Contact WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => onDeleteSingleLead(lead.id)}
                    className="p-2 text-rose-500 hover:text-white hover:bg-rose-500 bg-transparent rounded-lg transition"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Integration Credentials Footer disclaimer */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 bg-slate-50 p-4 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="leading-normal">
            <strong>System Operational Logic:</strong> Submitting leads triggers a structured JSON post request. In high-volume production, you can replace the simulation handler with your deployed Google Apps Script Hook url inside your `LeadForm.tsx` file to sync with live sheets without databases!
          </div>
        </div>
      </div>
    </div>
  );
}
