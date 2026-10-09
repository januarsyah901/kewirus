# Londriin - Web Prototype MVP
### Marketplace Laundry Berbasis Geolokasi untuk Mahasiswa

Prototipe web interaktif Minimum Viable Product (MVP) untuk tugas mata kuliah Kewirausahaan (KEWIRUS) Kelompok 3:
- **Januarsyah Akbar (24/535846/SV/24134)**
- **Matthew Hayunaji Priantara (24/536179/SV/24400)**
- **Akmal Manggala Putra (24/536182/SV24402)**

---

## Fitur Utama yang Siap Didemokan

1. **Peta Interaktif Geolokasi (OpenStreetMap & Leaflet)**
   - Menampilkan titik posisi kos mahasiswa (area Pogung Kidul UGM).
   - Pin lokasi gerai laundry sekitar kampus dengan badge harga awal dan rating.
   - Klik marker untuk melihat info cepat, profil lengkap, atau pemesanan langsung.

2. **Daftar & Filter Multi-Kategori**
   - Switch instan antara **Tampilan Daftar (List View)** dan **Tampilan Peta (Map View)**.
   - Filter kategori: Kiloan & Cuci Lipat, Kilat Express (6 jam / 1 hari), Cuci Sepatu & Tas, serta Laundry Koin Self-Service.
   - Slider radius jangkauan (0.5 km hingga 3 km) dan filter status toko buka.
   - Urutkan berdasarkan jarak terdekat, harga termurah, atau rating tertinggi.

3. **Detail Gerai & Ulasan Persona Nyata**
   - Transparansi daftar harga lengkap per kg atau per satuan.
   - Jam operasional, alamat lengkap, dan standar mutu higienis (1 mesin 1 pelanggan, setrika uap).
   - Testimoni dummy dari 6 persona hasil validasi Customer Discovery (Sabra, Hafidz, Gardhita, Eliana, Fauzi, Ghaniy).

4. **Simulasi Pemesanan (Checkout Flow)**
   - Pilihan paket cuci, penyesuaian perkiraan berat (kg), dan opsi logistik (Drop-off vs Antar Jemput).
   - Diskon kode promo mahasiswa (`MHSUGM`).
   - Kalkulasi otomatis estimasi total biaya dan durasi pengerjaan.

5. **Pelacakan Status Cucian Interaktif (Live Order Tracker)**
   - Resi digital pesanan aktif.
   - Stepper 5 tahap pengerjaan (Diterima -> Penjemputan -> Dicuci -> Setrika -> Siap Diambil -> Selesai).
   - **Tombol Simulasi Status**: Dosen atau penguji dapat menekan tombol untuk memajukan status pesanan secara langsung.
   - Tombol Chat WhatsApp otomatis ke nomor mitra laundry dengan template teks pesanan.

---

## Cara Menjalankan Aplikasi Secara Lokal

Pastikan sudah berada di dalam folder `londriin-app`:

```bash
cd londriin-app
npm install
npm run dev
```

Buka browser di alamat yang muncul di terminal (biasanya `http://localhost:5173`).
