import React from 'react';
import { X, Users, BookOpen, Award } from 'lucide-react';

export default function KelompokModal({ onClose }) {
  const members = [
    { name: 'Januarsyah Akbar', nim: '24/535846/SV/24134', role: 'Hustler & Fullstack Lead' },
    { name: 'Matthew Hayunaji Priantara', nim: '24/536179/SV/24400', role: 'Hacker & Product Architect' },
    { name: 'Akmal Manggala Putra', nim: '24/536182/SV24402', role: 'Hipster & UI/UX Research' },
  ];

  const docs = [
    { file: '01-brainstorming.md', title: '01 - Ideasi & Seleksi Masalah', desc: 'Perumusan masalah laundry online, HMW, dan eksplorasi alternatif solusi.' },
    { file: '02-customer-discovery.md', title: '02 - Customer Discovery', desc: 'Validasi lapangan terhadap 6 persona mahasiswa kos sekitar kampus.' },
    { file: '03-vpc-bmc.md', title: '03 - VPC & BMC', desc: 'Value Proposition Canvas, pemetaan TAM/SAM/SOM, dan 9 blok kanvas bisnis.' },
    { file: '04-mvp.md', title: '04 - Spesifikasi MVP', desc: 'Prioritas fitur MoSCoW, skenario pengujian lapangan, dan metrik keberhasilan.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Kelompok 3 - Kewirausahaan</h3>
              <p className="text-xs text-slate-500">Proyek Londriin (Marketplace Laundry Geolokasi)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Anggota Kelompok */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>Anggota Tim Pengembang</span>
            </h4>
            <div className="space-y-2.5">
              {members.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{m.name}</span>
                    <span className="text-[11px] font-mono text-slate-500">{m.nim}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dokumen Tugas Terintegrasi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>Dokumentasi Berkas Tugas (Tahap 1 - 4)</span>
            </h4>
            <div className="space-y-2">
              {docs.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{doc.title}</span>
                    <span className="text-[10px] font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                      {doc.file}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{doc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Tutup Informasi
          </button>
        </div>
      </div>
    </div>
  );
}
