import React, { useState } from 'react';
import { X, Sparkles, Truck, Package, Check } from 'lucide-react';

export default function OrderModal({ outlet, userLocation, onClose, onSubmitOrder }) {
  const defaultService = outlet?.services?.[0] || { id: 'default', name: 'Layanan', price: 0, unit: 'kg', durationHours: 24 };
  const [selectedServiceId, setSelectedServiceId] = useState(defaultService.id);
  const [quantity, setQuantity] = useState(3.0);
  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' atau 'dropoff'
  const [address, setAddress] = useState(userLocation?.address || 'Kos Pogung Kidul, Sleman');
  const [notes, setNotes] = useState('');
  const [promoCode, setPromoCode] = useState('MHSUGM');
  const [isPromoApplied, setIsPromoApplied] = useState(true);

  if (!outlet) return null;

  const selectedService = outlet.services.find(s => s.id === selectedServiceId) || defaultService;

  // Kalkulasi harga
  const subtotal = Math.round(selectedService.price * quantity);
  const isFreePickup = outlet.badges.some(b => b.toLowerCase().includes('free pickup'));
  const deliveryFee = deliveryType === 'dropoff' ? 0 : (isFreePickup ? 0 : 3000);
  const discount = isPromoApplied ? 3000 : 0;
  const totalPrice = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'MHSUGM') {
      setIsPromoApplied(true);
    } else {
      alert('Kode promo tidak valid. Gunakan MHSUGM untuk diskon mahasiswa.');
      setIsPromoApplied(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const estDate = new Date(now.getTime() + selectedService.durationHours * 60 * 60 * 1000);
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      outletId: outlet.id,
      outletName: outlet.name,
      serviceName: selectedService.name,
      unitPrice: selectedService.price,
      quantity: quantity,
      unit: selectedService.unit,
      deliveryType: deliveryType,
      deliveryFee: deliveryFee,
      totalPrice: totalPrice,
      createdAt: now.toLocaleDateString('id-ID', options) + ' WIB',
      estimatedFinish: estDate.toLocaleDateString('id-ID', options) + ' WIB',
      statusIndex: 0,
      notes: notes || 'Pewangi standar, tolong pakaian dirapikan',
      userAddress: address,
      phone: outlet.phone
    };

    onSubmitOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-600">Simulasi Pemesanan</span>
            <h3 className="text-lg font-bold text-slate-900">{outlet.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5">
          {/* Step 1: Layanan */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              1. Pilih Paket Layanan
            </label>
            <div className="space-y-2">
              {outlet.services.map(svc => (
                <label
                  key={svc.id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedServiceId === svc.id
                      ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="service"
                      value={svc.id}
                      checked={selectedServiceId === svc.id}
                      onChange={() => setSelectedServiceId(svc.id)}
                      className="text-sky-600 focus:ring-sky-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{svc.name}</span>
                      <span className="text-[11px] text-slate-500">Durasi: ~{svc.durationHours} jam</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-700">
                    Rp{svc.price.toLocaleString('id-ID')} /{svc.unit}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Kuantitas / Berat */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                2. Perkiraan Berat ({selectedService.unit})
              </label>
              <span className="text-[11px] text-slate-400">Ditimbang ulang saat tiba</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, +(quantity - 0.5).toFixed(1)))}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors"
              >
                -
              </button>
              <div className="flex-1 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl py-2 px-3">
                <span className="text-lg font-black text-slate-900">{quantity}</span>
                <span className="text-xs font-medium text-slate-500 ml-1.5">{selectedService.unit}</span>
              </div>
              <button
                type="button"
                onClick={() => setQuantity(+(quantity + 0.5).toFixed(1))}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Step 3: Pengambilan & Antar */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              3. Opsi Pengiriman & Penjemputan
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  deliveryType === 'pickup'
                    ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryType === 'pickup'}
                    onChange={() => setDeliveryType('pickup')}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Truck className="w-3.5 h-3.5 text-sky-600" />
                    <span>Antar Jemput</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 mt-2 block">
                  {isFreePickup ? 'Gratis (Promo Pogung)' : 'Kurir Mitra (+Rp3.000)'}
                </span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  deliveryType === 'dropoff'
                    ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-200'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="dropoff"
                    checked={deliveryType === 'dropoff'}
                    onChange={() => setDeliveryType('dropoff')}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Package className="w-3.5 h-3.5 text-sky-600" />
                    <span>Drop-Off Mandiri</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 mt-2 block">Antar ke gerai (Rp0)</span>
              </label>
            </div>
          </div>

          {/* Alamat Penjemputan jika Pickup */}
          {deliveryType === 'pickup' && (
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Alamat / Titik Kos
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nama kos, nomor kamar, patokan jalan"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          )}

          {/* Catatan Khusus */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
              Catatan untuk Laundry (Opsional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Pisahkan kemeja putih, pewangi aroma apel segar"
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Promo Mahasiswa */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Voucher Diskon Mahasiswa
              </span>
              {isPromoApplied && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Hemat Rp3.000
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 text-xs px-3 py-1.5 uppercase font-bold tracking-wider rounded-lg border border-slate-200 bg-white"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-3 py-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 rounded-lg border border-sky-200 bg-white"
              >
                Terapkan
              </button>
            </div>
          </div>

          {/* Rincian Biaya */}
          <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>{selectedService.name} ({quantity} {selectedService.unit})</span>
              <span>Rp{subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Biaya Penjemputan / Antar</span>
              <span>{deliveryFee === 0 ? 'Gratis' : `Rp${deliveryFee.toLocaleString('id-ID')}`}</span>
            </div>
            {isPromoApplied && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Diskon Promo Mahasiswa</span>
                <span>-Rp{discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
              <span>Total Estimasi</span>
              <span className="text-sky-600">Rp{totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* CTA Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Konfirmasi & Kirim Pesanan</span>
          </button>
        </form>
      </div>
    </div>
  );
}
