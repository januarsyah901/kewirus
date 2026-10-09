import React from 'react';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function LaundryCard({ outlet, onSelect, onOrder }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col group">
      {/* Cover image & badges */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={outlet.image}
          alt={outlet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Distance Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 flex items-center gap-1 shadow-xs">
          <MapPin className="w-3 h-3 text-sky-600" />
          <span>{outlet.distanceKm < 1 ? `${Math.round(outlet.distanceKm * 1000)} m` : `${outlet.distanceKm} km`}</span>
        </div>

        {/* Operational status */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 backdrop-blur ${
            outlet.isOpen ? 'bg-emerald-500/90 text-white' : 'bg-slate-700/90 text-white'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${outlet.isOpen ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></span>
            {outlet.isOpen ? 'Buka' : 'Tutup'}
          </span>
        </div>

        {/* Bottom overlay in image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1 bg-slate-900/70 backdrop-blur px-2 py-0.5 rounded-md text-xs font-semibold">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{outlet.rating}</span>
            <span className="text-slate-300 text-[10px]">({outlet.reviewsCount})</span>
          </div>
          <span className="text-[11px] font-medium text-slate-200 flex items-center gap-1 bg-slate-900/70 backdrop-blur px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3" />
            {outlet.openHours}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
              {outlet.name}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{outlet.tagline}</p>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{outlet.address}</span>
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {outlet.badges.map((badge, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & CTA footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Mulai dari</span>
            <span className="text-sm font-black text-slate-900">
              Rp{outlet.pricePerKgStart.toLocaleString('id-ID')}
              <span className="text-[10px] text-slate-500 font-normal"> /kg</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelect(outlet)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Detail
            </button>
            <button
              type="button"
              onClick={() => onOrder(outlet)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              <span>Pesan</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
