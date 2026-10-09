import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import Navbar from './components/Navbar';
import InteractiveMap from './components/InteractiveMap';
import LaundryCard from './components/LaundryCard';
import OutletDetailModal from './components/OutletDetailModal';
import OrderModal from './components/OrderModal';
import OrderTracker from './components/OrderTracker';
import KelompokModal from './components/KelompokModal';
import { LAUNDRY_OUTLETS, INITIAL_USER_LOCATION, INITIAL_ORDERS } from './data/laundries';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'orders'
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [userLocation] = useState(INITIAL_USER_LOCATION);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('nearest'); // 'nearest' | 'cheapest' | 'rating'
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [maxDistanceKm, setMaxDistanceKm] = useState(3.0);

  const [selectedOutletForDetail, setSelectedOutletForDetail] = useState(null);
  const [selectedOutletForOrder, setSelectedOutletForOrder] = useState(null);
  const [isKelompokModalOpen, setIsKelompokModalOpen] = useState(false);

  // Orders state with LocalStorage persistence
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('londriin_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('londriin_orders', JSON.stringify(orders));
  }, [orders]);

  // Filter & Sort outlets
  const filteredOutlets = useMemo(() => {
    return LAUNDRY_OUTLETS.filter(outlet => {
      // Filter distance
      if (outlet.distanceKm > maxDistanceKm) return false;

      // Filter category
      if (selectedCategory !== 'all' && outlet.category !== selectedCategory) return false;

      // Filter only open
      if (onlyOpen && !outlet.isOpen) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = outlet.name.toLowerCase().includes(q);
        const matchTagline = outlet.tagline.toLowerCase().includes(q);
        const matchAddress = outlet.address.toLowerCase().includes(q);
        const matchService = outlet.services.some(s => s.name.toLowerCase().includes(q));
        if (!matchName && !matchTagline && !matchAddress && !matchService) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.pricePerKgStart - b.pricePerKgStart;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.distanceKm - b.distanceKm; // Default: nearest
    });
  }, [selectedCategory, sortBy, onlyOpen, maxDistanceKm, searchQuery]);

  // Order Handlers
  const handleCreateOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setSelectedOutletForOrder(null);
    setActiveTab('orders');
  };

  const handleNextOrderStatus = (orderId) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const nextIndex = Math.min(ord.statusIndex + 1, 5);
          return { ...ord, statusIndex: nextIndex };
        }
        return ord;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        ordersCount={orders.length}
        onOpenKelompokModal={() => setIsKelompokModalOpen(true)}
        currentLocation={userLocation}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'orders' ? (
          <OrderTracker
            orders={orders}
            onNextStatus={handleNextOrderStatus}
            onBackToExplore={() => setActiveTab('explore')}
          />
        ) : (
          <div className="space-y-6">
            {/* Hero / Filter Bar */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama laundry, layanan (setrika, express, sepatu), atau area..."
                    className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400 font-medium">Urutkan:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-bold py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="nearest">Jarak Terdekat</option>
                    <option value="cheapest">Harga Termurah</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                </div>
              </div>

              {/* Filter Chips & Radius Slider */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                {/* Categories */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'Semua Layanan' },
                    { id: 'kiloan', label: 'Kiloan & Cuci Lipat' },
                    { id: 'express', label: 'Kilat Express' },
                    { id: 'sepatu', label: 'Cuci Sepatu & Tas' },
                    { id: 'koin', label: 'Laundry Koin' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Distance & Open Filter */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyOpen}
                      onChange={(e) => setOnlyOpen(e.target.checked)}
                      className="rounded-sm text-sky-600 focus:ring-sky-500"
                    />
                    <span>Buka Sekarang</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span>Radius: <b>{maxDistanceKm} km</b></span>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.5"
                      value={maxDistanceKm}
                      onChange={(e) => setMaxDistanceKm(parseFloat(e.target.value))}
                      className="w-20 accent-sky-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results count & view summary */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-500">
                Ditemukan <b className="text-slate-900">{filteredOutlets.length} gerai</b> laundry di sekitar radius {maxDistanceKm} km
              </span>
              <span className="text-xs text-slate-400">
                Titik referensi: {userLocation.name}
              </span>
            </div>

            {/* View Mode: Map View vs List View */}
            {viewMode === 'map' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left side list on desktop map view */}
                <div className="hidden lg:block lg:col-span-5 space-y-4 max-h-[650px] overflow-y-auto pr-1">
                  {filteredOutlets.map(outlet => (
                    <LaundryCard
                      key={outlet.id}
                      outlet={outlet}
                      onSelect={(o) => setSelectedOutletForDetail(o)}
                      onOrder={(o) => setSelectedOutletForOrder(o)}
                    />
                  ))}
                  {filteredOutlets.length === 0 && (
                    <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                      Tidak ada gerai yang cocok dengan filter.
                    </div>
                  )}
                </div>

                {/* Right side interactive Leaflet Map */}
                <div className="lg:col-span-7">
                  <InteractiveMap
                    outlets={filteredOutlets}
                    userLocation={userLocation}
                    selectedOutlet={selectedOutletForDetail}
                    onSelectOutlet={(o) => setSelectedOutletForDetail(o)}
                    onOrderQuick={(o) => setSelectedOutletForOrder(o)}
                  />
                </div>
              </div>
            ) : (
              /* Grid List View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOutlets.map(outlet => (
                  <LaundryCard
                    key={outlet.id}
                    outlet={outlet}
                    onSelect={(o) => setSelectedOutletForDetail(o)}
                    onOrder={(o) => setSelectedOutletForOrder(o)}
                  />
                ))}
                {filteredOutlets.length === 0 && (
                  <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-2">
                    <p className="text-sm font-bold text-slate-800">Tidak ada gerai laundry yang sesuai</p>
                    <p className="text-xs">Coba perlebar radius pencarian atau ubah kata kunci filter Anda.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Londriin</span>
            <span>&copy; 2026 Kelompok 3 Kewirausahaan SV UGM</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsKelompokModalOpen(true)}
              className="hover:text-sky-600 underline font-medium cursor-pointer"
            >
              Tentang Tim & Dokumen MVP
            </button>
            <span>&bull;</span>
            <span>Prototipe Siap Validasi Lapangan</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedOutletForDetail && (
        <OutletDetailModal
          outlet={selectedOutletForDetail}
          onClose={() => setSelectedOutletForDetail(null)}
          onOrder={(o) => setSelectedOutletForOrder(o)}
        />
      )}

      {selectedOutletForOrder && (
        <OrderModal
          outlet={selectedOutletForOrder}
          userLocation={userLocation}
          onClose={() => setSelectedOutletForOrder(null)}
          onSubmitOrder={handleCreateOrder}
        />
      )}

      {isKelompokModalOpen && (
        <KelompokModal onClose={() => setIsKelompokModalOpen(false)} />
      )}
    </div>
  );
}
