import React from 'react';
import { X, Star, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function OutletDetailModal({ outlet, onClose, onOrder }) {
  if (!outlet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 bg-slate-900">
          <img
            src={outlet.image}
            alt={outlet.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title info */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500 text-white">
                Mitra Terverifikasi
              </span>
              <span className="text-xs bg-black/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {outlet.rating} ({outlet.reviewsCount} ulasan)
              </span>
            </div>
            <h2 className="text-2xl font-black">{outlet.name}</h2>
            <p className="text-xs text-slate-300 mt-0.5">{outlet.tagline}</p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick info row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-medium">Jarak dari Kos</span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                {outlet.distanceKm} km
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-medium">Jam Buka</span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {outlet.openHours}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-400 block font-medium">Tarif Mulai</span>
              <span className="text-sm font-black text-sky-600 mt-0.5 block">
                Rp{outlet.pricePerKgStart.toLocaleString('id-ID')} /kg
              </span>
            </div>
          </div>

          {/* Location details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Alamat Lengkap</h4>
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{outlet.address}</span>
            </p>
          </div>

          {/* Features list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Standar Kualitas & Layanan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {outlet.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price list catalog */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Daftar Paket & Layanan</h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {outlet.services.map((svc) => (
                <div key={svc.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{svc.name}</span>
                    <span className="text-[11px] text-slate-500">Estimasi pengerjaan: {svc.durationHours} jam</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-sky-600">
                      Rp{svc.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[11px] text-slate-400"> /{svc.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews from Student Personas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Ulasan Mahasiswa Terverifikasi</h4>
            <div className="space-y-2">
              {outlet.reviews.map((rev, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center">
                        {rev.user[0]}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{rev.user}</span>
                      <span className="text-[10px] text-slate-400">({rev.role})</span>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky CTA Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[11px] text-slate-500 block">Mulai memesan dari</span>
            <span className="text-lg font-black text-slate-900">
              Rp{outlet.pricePerKgStart.toLocaleString('id-ID')}
              <span className="text-xs font-normal text-slate-500"> /kg</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOrder(outlet);
              }}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20"
            >
              <span>Pesan Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
