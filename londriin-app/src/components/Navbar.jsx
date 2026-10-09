import React from 'react';
import { Waves, MapPin, ListFilter, Map, ShoppingBag, Users, Sparkles } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  ordersCount,
  onOpenKelompokModal,
  currentLocation
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top micro banner for MVP info */}
      <div className="bg-sky-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span>Prototipe MVP Kewirausahaan Kelompok 3 (Londriin)</span>
        <button
          onClick={onOpenKelompokModal}
          className="underline hover:text-sky-200 ml-2 font-semibold cursor-pointer"
        >
          Lihat Tim & Dokumen
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">Londriin</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700">MVP</span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Laundry Beres Tanpa Ribet</p>
            </div>
          </div>

          {/* Current Location Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs border border-slate-200 max-w-sm truncate">
            <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="truncate font-medium">{currentLocation.name}</span>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-2">
            {activeTab === 'explore' && (
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Daftar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    viewMode === 'map'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Peta</span>
                </button>
              </div>
            )}

            {/* Pesanan Tab Button */}
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'explore' ? 'orders' : 'explore')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeTab === 'orders'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{activeTab === 'orders' ? 'Kembali ke Katalog' : 'Pesanan Saya'}</span>
              {ordersCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'orders' ? 'bg-white text-sky-700' : 'bg-sky-600 text-white'
                }`}>
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Kelompok Button */}
            <button
              type="button"
              onClick={onOpenKelompokModal}
              title="Informasi Kelompok"
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 border border-slate-200"
            >
              <Users className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
