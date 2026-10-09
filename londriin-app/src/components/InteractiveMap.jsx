import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function InteractiveMap({
  outlets,
  userLocation,
  selectedOutlet,
  onSelectOutlet,
  onOrderQuick
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Inisialisasi peta jika belum dibuat
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Bersihkan marker lama
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    // Marker Lokasi Pengguna (Pulsing Pin)
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute w-7 h-7 rounded-full bg-sky-500/30 animate-ping"></span>
          <span class="relative w-4 h-4 rounded-full bg-sky-600 border-2 border-white shadow-md"></span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <div style="font-size: 11px; font-weight: 700; color: #0284c7; text-transform: uppercase;">Lokasi Anda</div>
          <div style="font-size: 13px; font-weight: 600; color: #0f172a;">${userLocation.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${userLocation.address}</div>
        </div>
      `);
    markersRef.current.push(userMarker);

    // Marker Gerai Laundry
    outlets.forEach(outlet => {
      const isSelected = selectedOutlet && selectedOutlet.id === outlet.id;
      const markerIcon = L.divIcon({
        className: 'custom-laundry-marker',
        html: `
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg border cursor-pointer transition-all transform hover:scale-105 ${
            isSelected
              ? 'bg-sky-600 text-white border-sky-400 ring-4 ring-sky-300'
              : 'bg-white text-slate-800 border-slate-300'
          }">
            <span class="text-[12px]">🧺</span>
            <span class="whitespace-nowrap">Rp${(outlet.pricePerKgStart / 1000).toFixed(0)}k</span>
            <span class="text-[10px] text-amber-500 flex items-center">★${outlet.rating}</span>
          </div>
        `,
        iconSize: [110, 32],
        iconAnchor: [55, 16],
      });

      const marker = L.marker([outlet.lat, outlet.lng], { icon: markerIcon }).addTo(map);

      // Popup isi info singkat
      const popupHtml = `
        <div style="font-family: sans-serif; max-width: 220px; padding: 4px;">
          <div style="font-weight: 700; font-size: 14px; color: #0f172a;">${outlet.name}</div>
          <div style="font-size: 11px; color: #0284c7; font-weight: 600; margin: 2px 0;">
            📍 ${outlet.distanceKm} km dari kos &bull; ★ ${outlet.rating} (${outlet.reviewsCount})
          </div>
          <p style="font-size: 11px; color: #64748b; margin: 4px 0 8px;">${outlet.tagline}</p>
          <div style="display: flex; gap: 6px;">
            <button id="btn-detail-${outlet.id}" style="flex: 1; padding: 6px 10px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer;">
              Detail
            </button>
            <button id="btn-order-${outlet.id}" style="flex: 1; padding: 6px 10px; background: #0284c7; color: #ffffff; border: none; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer;">
              Pesan
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btnDetail = document.getElementById(`btn-detail-${outlet.id}`);
        const btnOrder = document.getElementById(`btn-order-${outlet.id}`);
        if (btnDetail) {
          btnDetail.onclick = () => onSelectOutlet(outlet);
        }
        if (btnOrder) {
          btnOrder.onclick = () => onOrderQuick(outlet);
        }
      });

      marker.on('click', () => {
        onSelectOutlet(outlet);
      });

      markersRef.current.push(marker);
    });

    // Sesuaikan view jika ada selected outlet
    if (selectedOutlet) {
      map.setView([selectedOutlet.lat, selectedOutlet.lng], 15, { animate: true });
    }
    return () => {
      // Tidak menghancurkan map saat re-render kecil, cukup di unmount
    };
  }, [outlets, userLocation, selectedOutlet, onSelectOutlet, onOrderQuick]);

  return (
    <div className="relative w-full h-[550px] lg:h-[650px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Floating map hint */}
      <div className="absolute top-3 right-3 z-[400] bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs text-[11px] font-medium text-slate-700 pointer-events-none">
        Peta Area UGM & Sekitarnya
      </div>

      {/* Floating user legend */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur px-3 py-2 rounded-xl border border-slate-200 shadow-md text-xs space-y-1.5 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-sky-600 border border-white"></span>
          <span className="font-semibold text-slate-800">Lokasi Kos (Pogung)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">🧺</span>
          <span className="text-slate-600">Pin Gerai Mitra Laundry</span>
        </div>
      </div>
    </div>
  );
}
