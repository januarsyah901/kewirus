## **Kelompok 3:**

- **Januarsyah Akbar (24/535846/SV/24134)**
- **Matthew Hayunaji Priantara (24/536179/SV/24400)**
- **Akmal Manggala Putra (24/536182/SV24402)**

# **MINIMUM VIABLE PRODUCT (MVP) - LONDRIIN**
### Platform Marketplace Laundry Berbasis Geolokasi

---

## **1. Latar Belakang dan Tujuan MVP**

Berdasarkan tahap Customer Discovery dan analisis VPC sebelumnya, masalah utama mahasiswa kos adalah kesulitan mencari laundry yang sesuai dengan kebutuhan jarak, harga, kualitas, dan waktu pengerjaan. Informasi laundry saat ini masih tercecer tanpa standar transparansi yang memadai.

Tujuan utama pembuatan MVP Londriin adalah:
1. Memvalidasi apakah mahasiswa merasa terbantu ketika informasi harga, jarak, rating, dan layanan laundry disatukan dalam satu antarmuka peta interaktif.
2. Menguji alur pemesanan laundry dari perspektif mahasiswa, mulai dari eksplorasi outlet terdekat hingga simulasi pembuatan pesanan dan tracking.
3. Mendapatkan masukan langsung dari pengguna mengenai fitur yang paling krusial sebelum masuk ke tahap pengembangan aplikasi skala penuh.

---

## **2. Ruang Lingkup Fitur MVP (Metode MoSCoW)**

Agar pengembangan prototipe tepat sasaran dan fokus pada solusi utama, fitur dikelompokkan dengan kerangka MoSCoW:

### **A. Must Have (Wajib ada di MVP)**
- **Peta Interaktif Geolokasi**: Menampilkan posisi pengguna dan pin gerai laundry di area kampus (UGM, Sleman, Pogung, Karangmalang).
- **Katalog & Filter Outlet**: Daftar laundry yang dapat difilter berdasarkan radius jarak, harga termurah, durasi kilat, dan rating tertinggi.
- **Profil Detail Outlet**: Menampilkan rincian tarif per kg atau per satuan, perkiraan durasi pengerjaan, jam operasional, dan ulasan pelanggan.
- **Kalkulator & Form Pemesanan**: Menghitung estimasi biaya berdasarkan berat cucian atau jenis paket, serta memilih opsi pickup (antar jemput) atau antar sendiri (drop-off).
- **Simulasi Tracking Status Pesanan**: Menampilkan tahapan pengerjaan cucian (Diterima, Dicuci, Dikeringkan, Siap Diambil/Diantar) secara visual.

### **B. Should Have (Disiapkan sebagai simulasi di prototipe)**
- Switch tampilan antara mode peta interaktif (Map View) dan mode kartu daftar (List View).
- Rincian estimasi ongkos kirim berdasarkan jarak geolokasi.
- Ringkasan nota transaksi digital dan integrasi tombol chat WhatsApp langsung ke gerai laundry.

### **C. Could Have (Tahap Lanjutan Pasca-MVP)**
- Integrasi payment gateway otomatis (QRIS, e-wallet).
- Akun khusus mitra laundry untuk input kasir dan update status laundry secara live.
- Sistem langganan paket bulanan mahasiswa.

### **D. Won't Have (Tidak dimasukkan dalam iterasi awal)**
- Sistem dispatch driver internal independen (pada tahap awal memanfaatkan armada gerai sendiri).

---

## **3. Alur Pengguna Utama (Core User Journey)**

1. **Discovery & Pencarian**
   Pengguna membuka aplikasi Londriin, melihat lokasi terkini di sekitar kampus, lalu menjelajahi pin outlet laundry terdekat atau menggulir daftar outlet rekomendasi.
2. **Komparasi & Evaluasi**
   Pengguna memfilter berdasarkan budget atau kecepatan selesai, lalu membuka halaman rincian outlet untuk melihat daftar harga, jam buka, dan testimoni.
3. **Pemesanan (Checkout Simulation)**
   Pengguna menentukan jenis layanan (kiloan reguler, kilat, atau satuan), memasukkan perkiraan berat, memilih metode logistik (antar sendiri atau dijemput kurir mitra), lalu menekan tombol pesan.
4. **Pemantauan (Order Tracking)**
   Pengguna mendapatkan nomor resi pemesanan dan dapat melihat status cucian secara berkala pada halaman tracking sampai pakaian siap diambil atau diantar.

---

## **4. Spesifikasi Teknis Prototipe Web**

- **Framework**: React 19 + Vite (lingkungan pengembangan cepat dan modular)
- **Styling**: Tailwind CSS (desain antarmuka mobile-first responsif, modern, dan bersih)
- **Peta Interaktif**: OpenStreetMap + Leaflet (tanpa dependensi API key berbayar, akurat untuk radius lokal)
- **Komponen Ikon**: Lucide React
- **Data Layer**: Mock data komprehensif gerai laundry nyata di sekitar area kampus UGM (Pogung Kidul, Karangmalang, Pandega Marta, Kaliurang) yang mencakup jam operasional, variasi harga, serta ulasan realistis.

---

## **5. Metrik Validasi Keberhasilan MVP**

Untuk mengukur efektivitas prototipe saat diuji ke mahasiswa kos:

| Aspek | Metrik Pengukuran | Target Keberhasilan |
| ----- | ----------------- | ------------------- |
| **Kemudahan Akses** | Task Completion Rate (mencari laundry hingga selesai order) | > 85% responden berhasil tanpa asistensi |
| **Kejelasan Informasi** | Nilai kemudahan membaca harga dan jarak (Skala 1-5) | Skor rata-rata minimal 4.2 |
| **Nilai Manfaat** | Persentase responden yang berniat menggunakan Londriin jika rilis | Minimal 70% dari responden uji coba |
| **Fitur Paling Dibutuhkan** | Ranking preferensi pengguna terhadap fitur | Menemukan 2 fitur paling berpengaruh (estimasi jarak dan transparansi harga) |

---

## **6. Rencana Pengujian & Pengumpulan Umpan Balik**

1. **Metode Pengujian**: Uji coba pengguna secara langsung (Usability Testing) kepada 5-10 mahasiswa kos di lingkungan sekitar.
2. **Skenario Tugas (Task Scenario)**:
   - "Cari laundry terdekat dengan rating minimal 4.5 yang memiliki layanan kilat 1 hari."
   - "Lakukan simulasi pemesanan laundry kiloan 4 kg dengan opsi antar jemput (pickup)."
   - "Buka halaman pelacakan untuk memantau status pakaian."
3. **Instrumen Evaluasi**: Kuesioner singkat System Usability Scale (SUS) dan wawancara kualitatif mengenai bagian antarmuka yang membingungkan.
