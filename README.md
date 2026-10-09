# KEWIRUS: Londriin

Repositori tugas dan proyek mata kuliah **Kewirausahaan (KEWIRUS)** Kelompok 3. Proyek ini mengangkat ide bisnis **Londriin**, marketplace laundry berbasis geolokasi yang dirancang untuk membantu mahasiswa menemukan, membandingkan, dan memantau pesanan laundry di sekitar kampus.

## Anggota Kelompok 3
* **Januarsyah Akbar** (24/535846/SV/24134)
* **Matthew Hayunaji Priantara** (24/536179/SV/24400)
* **Akmal Manggala Putra** (24/536182/SV/24402)

---

## Struktur Repositori

```text
.
├── 01-brainstorming.md       # Problem statement, HMW, dan brainstorming ide
├── 02-customer-discovery.md  # Wawancara calon pengguna, persona, dan validasi problem
├── 03-vpc-bmc.md             # Value Proposition Canvas & Business Model Canvas
├── 04-mvp.md                 # Perancangan dan spesifikasi Minimum Viable Product
└── londriin-app/             # Prototipe web MVP interaktif (Vite + Tailwind CSS + Leaflet)
```

---

## Ringkasan Dokumen Bisnis

1. **[01-brainstorming.md](file:///Users/mrfrog/Documents/Kuliah/KEWIRUS/01-brainstorming.md)**  
   Analisis masalah seputar laundry bagi anak kos dan ide awal solusi digital berbasis lokasi.

2. **[02-customer-discovery.md](file:///Users/mrfrog/Documents/Kuliah/KEWIRUS/02-customer-discovery.md)**  
   Hasil wawancara mendalam dengan mahasiswa, validasi rasa sakit utama (baju tertukar, waktu molor, minim transparansi), serta profil persona target.

3. **[03-vpc-bmc.md](file:///Users/mrfrog/Documents/Kuliah/KEWIRUS/03-vpc-bmc.md)**  
   Pemetaan Customer Profile & Value Map (VPC) dan 9 blok kanvas model bisnis (BMC) Londriin.

4. **[04-mvp.md](file:///Users/mrfrog/Documents/Kuliah/KEWIRUS/04-mvp.md)**  
   Spesifikasi ruang lingkup fitur esensial yang dibangun untuk tahap pengujian awal.

---

## Menjalankan Prototipe Web (`londriin-app`)

Aplikasi prototipe dibuat dengan **Vite**, **Tailwind CSS**, dan peta interaktif **Leaflet** (OpenStreetMap).

### Langkah Instalasi & Menjalankan

```bash
# 1. Masuk ke direktori web app
cd londriin-app

# 2. Pasang dependensi
npm install

# 3. Jalankan server lokal
npm run dev
```

Buka URL lokal yang muncul pada terminal (biasanya `http://localhost:5173`) di browser.
