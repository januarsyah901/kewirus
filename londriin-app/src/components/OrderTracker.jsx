import React from 'react';
import { Package, Clock, CheckCircle2, MessageCircle, Play, ArrowLeft } from 'lucide-react';
import { ORDER_STATUS_STEPS } from '../data/laundries';

export default function OrderTracker({
  orders,
  onNextStatus,
  onBackToExplore
}) {
  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-3xl mx-auto flex items-center justify-center mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Belum Ada Pesanan Aktif</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Pilih salah satu gerai laundry di peta atau daftar untuk memulai simulasi pemesanan pakaian Anda.
        </p>
        <button
          type="button"
          onClick={onBackToExplore}
          className="mt-6 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Eksplorasi Gerai Laundry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-600">Pelacakan Pesanan</span>
          <h2 className="text-xl font-black text-slate-900">Pesanan Aktif ({orders.length})</h2>
        </div>
        <button
          type="button"
          onClick={onBackToExplore}
          className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tambah Pesanan Baru</span>
        </button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const currentStep = order.statusIndex;
          const isCompleted = currentStep >= ORDER_STATUS_STEPS.length - 1;

          // Buat URL pesan WhatsApp otomatis
          const waMessage = encodeURIComponent(
            `Halo ${order.outletName}, saya ingin mengonfirmasi pesanan laundry dari platform Londriin.\n\nNo Resi: ${order.id}\nLayanan: ${order.serviceName} (${order.quantity} ${order.unit})\nTotal: Rp${order.totalPrice.toLocaleString('id-ID')}`
          );
          const waLink = `https://wa.me/${order.phone}?text=${waMessage}`;

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Order Card Header */}
              <div className="p-5 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                      {order.id}
                    </span>
                    <span className="text-xs text-slate-400">&bull; {order.createdAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{order.outletName}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Mitra</span>
                  </a>
                </div>
              </div>

              {/* Order Status Stepper */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Status Pengerjaan Cucian
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-sky-100 text-sky-700'
                  }`}>
                    {ORDER_STATUS_STEPS[currentStep].label}
                  </span>
                </div>

                {/* Progress bar line and nodes */}
                <div className="relative mb-6">
                  {/* Background line */}
                  <div className="absolute top-4 left-4 right-4 h-1 bg-slate-100 -z-0" />
                  <div
                    className="absolute top-4 left-4 h-1 bg-sky-500 transition-all duration-500 -z-0"
                    style={{
                      width: `${(currentStep / (ORDER_STATUS_STEPS.length - 1)) * 95}%`
                    }}
                  />

                  {/* Step icons */}
                  <div className="relative z-10 flex justify-between">
                    {ORDER_STATUS_STEPS.map((step, idx) => {
                      const isActive = idx === currentStep;
                      const isPassed = idx < currentStep;

                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isPassed
                                ? 'bg-sky-600 text-white shadow-xs'
                                : isActive
                                ? 'bg-sky-500 text-white ring-4 ring-sky-100 scale-110'
                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                            }`}
                          >
                            {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span className={`text-[10px] text-center mt-2 max-w-[70px] leading-tight font-medium hidden sm:block ${
                            isActive ? 'text-sky-700 font-bold' : isPassed ? 'text-slate-700' : 'text-slate-400'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status description box */}
                <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">
                      {ORDER_STATUS_STEPS[currentStep].label}
                    </p>
                    <p className="text-slate-600 mt-0.5">
                      {ORDER_STATUS_STEPS[currentStep].desc}. Estimasi selesai: <span className="font-semibold text-slate-900">{order.estimatedFinish}</span>.
                    </p>
                  </div>
                </div>

                {/* Simulasi tombol untuk evaluasi dosen/penguji */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Fitur Demo Pengujian Dosen</span>
                  </div>

                  {!isCompleted ? (
                    <button
                      type="button"
                      onClick={() => onNextStatus(order.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-sky-400 fill-sky-400" />
                      <span>Simulasikan Status Selanjutnya</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Pesanan telah selesai penuh
                    </span>
                  )}
                </div>
              </div>

              {/* Order Detail Summary Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                    Detail Cucian
                  </span>
                  <p className="font-bold text-slate-800">{order.serviceName}</p>
                  <p className="text-slate-500 mt-0.5">Berat: {order.quantity} {order.unit}</p>
                  <p className="text-slate-500 mt-0.5 italic">Catatan: "{order.notes}"</p>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                    Pengambilan & Total
                  </span>
                  <p className="font-medium text-slate-700 capitalize">
                    Metode: {order.deliveryType === 'pickup' ? 'Antar Jemput (Pickup)' : 'Drop-Off Mandiri'}
                  </p>
                  <p className="text-slate-500 truncate mt-0.5">Alamat: {order.userAddress}</p>
                  <p className="text-base font-black text-sky-600 mt-1">
                    Total: Rp{order.totalPrice.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
