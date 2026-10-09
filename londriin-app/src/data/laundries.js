// Mock data gerai laundry realistis di sekitar area kampus UGM (Pogung, Karangmalang, Pandega, dsb)

export const INITIAL_USER_LOCATION = {
  name: "Kos Sekitar Kampus (Pogung Kidul, UGM)",
  address: "Pogung Kidul, Sinduadi, Mlati, Kabupaten Sleman, D.I. Yogyakarta",
  lat: -7.7615,
  lng: 110.3752,
};

export const LAUNDRY_OUTLETS = [
  {
    id: "lnd-01",
    name: "FreshCare Laundry Pogung",
    tagline: "Wangi tahan lama, cucian 1 mesin 1 pelanggan",
    category: "kiloan",
    address: "Jl. Pogung Kidul No. 12, Mlati, Sleman",
    distanceKm: 0.35,
    lat: -7.7602,
    lng: 110.3745,
    rating: 4.8,
    reviewsCount: 142,
    isOpen: true,
    openHours: "07.00 - 21.00 WIB",
    phone: "6281234567801",
    pricePerKgStart: 6000,
    minOrderKg: 2,
    badges: ["Terlaris", "Free Pickup Pogung"],
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=80",
    features: [
      "1 Mesin 1 Pelanggan (Higienis)",
      "Pewangi Grade A (3 Varian)",
      "Timbangan Digital Terbuka",
      "Free Antar Jemput radius 1 km"
    ],
    services: [
      { id: "reg", name: "Cuci + Setrika Reguler (2 Hari)", price: 6000, unit: "kg", durationHours: 48 },
      { id: "lipat", name: "Cuci + Lipat Rapi (2 Hari)", price: 4500, unit: "kg", durationHours: 48 },
      { id: "exp24", name: "Express Kilat (1 Hari Selesai)", price: 9000, unit: "kg", durationHours: 24 },
      { id: "exp6", name: "Super Kilat (6 Jam Jadi)", price: 14000, unit: "kg", durationHours: 6 },
    ],
    reviews: [
      { user: "Sabra", role: "Mahasiswa Kos", rating: 5, comment: "Penyelamat waktu organisasi padat. Pakaian selalu rapi dan wanginya awet berhari-hari." },
      { user: "Ghaniy", role: "Mahasiswa", rating: 4, comment: "Bagus, info harga transparan tidak ada biaya tersembunyi. Timbangan pas." }
    ]
  },
  {
    id: "lnd-02",
    name: "Kilat Express Pogung Baru",
    tagline: "Spesialis express cepat selesai tanpa kompromi",
    category: "express",
    address: "Jl. Pogung Baru Blok D No. 8, Sinduadi, Sleman",
    distanceKm: 0.6,
    lat: -7.7578,
    lng: 110.3725,
    rating: 4.9,
    reviewsCount: 218,
    isOpen: true,
    openHours: "06.30 - 22.00 WIB",
    phone: "6281234567802",
    pricePerKgStart: 8000,
    minOrderKg: 2,
    badges: ["Paling Cepat", "Rating Tertinggi"],
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&auto=format&fit=crop&q=80",
    features: [
      "Garansi Tepat Waktu atau Diskon 50%",
      "Drying Machine Heat Control Anti-Kusut",
      "Tracking Otomatis Status Cuci",
      "Buka Pagi mulai 06.30"
    ],
    services: [
      { id: "exp24", name: "Express 1 Hari (Cuci + Setrika)", price: 8000, unit: "kg", durationHours: 24 },
      { id: "exp6", name: "Kilat Turbo 6 Jam", price: 15000, unit: "kg", durationHours: 6 },
      { id: "reg", name: "Reguler 2 Hari Hemat", price: 6500, unit: "kg", durationHours: 48 }
    ],
    reviews: [
      { user: "Eliana", role: "Mahasiswa Magang", rating: 5, comment: "Beneran 6 jam beres pas butuh kemeja buat presentasi magang. Kurirnya tepat waktu jemput di kos." },
      { user: "Hafidz", role: "Mahasiswa Freelance", rating: 5, comment: "Kualitas kain tetap terjaga, gak bau apek sama sekali walau musim hujan." }
    ]
  },
  {
    id: "lnd-03",
    name: "Kucek Premium Karangmalang",
    tagline: "Setrika uap profesional dan perawatan kain premium",
    category: "kiloan",
    address: "Jl. Karangmalang Blok E No. 4, Caturtunggal, Depok, Sleman",
    distanceKm: 0.85,
    lat: -7.7712,
    lng: 110.3815,
    rating: 4.7,
    reviewsCount: 95,
    isOpen: true,
    openHours: "08.00 - 20.30 WIB",
    phone: "6281234567803",
    pricePerKgStart: 7000,
    minOrderKg: 3,
    badges: ["Setrika Uap", "Perawatan Khusus"],
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&auto=format&fit=crop&q=80",
    features: [
      "Setrika Uap Boiler Standar Butik",
      "Pemisahan Pakaian Putih & Berwarna",
      "Packing Klip Kedap Udara",
      "Detergen Hypoallergenic Ramah Kulit Sensitif"
    ],
    services: [
      { id: "reg_steam", name: "Cuci + Setrika Uap Boiler (2 Hari)", price: 7000, unit: "kg", durationHours: 48 },
      { id: "satuan_kemeja", name: "Setrika Kemeja / Jas Satuan", price: 12000, unit: "pcs", durationHours: 24 },
      { id: "bedcover", name: "Cuci Bedcover Sedang/Besar", price: 25000, unit: "pcs", durationHours: 48 }
    ],
    reviews: [
      { user: "Hafidz", role: "Mahasiswa", rating: 5, comment: "Pakaian rapi licin banget, gak ada bekas gosong setrika biasa. Cocok buat baju formal." },
      { user: "Gardhita", role: "Mahasiswa", rating: 4, comment: "Hasil cucian wangi lembut dan aman untuk bahan rajut." }
    ]
  },
  {
    id: "lnd-04",
    name: "Melati Bersih Pandega",
    tagline: "Pilihan paling hemat untuk mahasiswa akhir bulan",
    category: "kiloan",
    address: "Jl. Pandega Marta No. 27, Sinduadi, Mlati, Sleman",
    distanceKm: 1.1,
    lat: -7.7535,
    lng: 110.3782,
    rating: 4.6,
    reviewsCount: 165,
    isOpen: true,
    openHours: "07.30 - 21.00 WIB",
    phone: "6281234567804",
    pricePerKgStart: 5000,
    minOrderKg: 3,
    badges: ["Termurah", "Budget Friendly"],
    image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&auto=format&fit=crop&q=80",
    features: [
      "Tarif Mahasiswa Termurah Mulai 5rb/kg",
      "Bonus Cuci Gratis tiap 10 Kali",
      "Timbangan Terkalibrasi",
      "Bisa Bayar Tunai atau QRIS"
    ],
    services: [
      { id: "reg_murah", name: "Cuci + Setrika Hemat (3 Hari)", price: 5000, unit: "kg", durationHours: 72 },
      { id: "reg_2hari", name: "Cuci + Setrika Standar (2 Hari)", price: 6000, unit: "kg", durationHours: 48 },
      { id: "cuci_lipat", name: "Cuci Lipat Kiloan", price: 4000, unit: "kg", durationHours: 48 }
    ],
    reviews: [
      { user: "Gardhita", role: "Mahasiswa", rating: 5, comment: "Paling hemat di kantong mahasiswa kos. Bersih dan tetap wangi walaupun harganya murah meriah." },
      { user: "Fauzi", role: "Mahasiswa", rating: 4, comment: "Cocok buat cucian harian numpuk sehabis ujian. Recommended buat penghematan." }
    ]
  },
  {
    id: "lnd-05",
    name: "GlowClean Shoes & Care Kaliurang",
    tagline: "Spesialis cuci sepatu, tas, topi, dan helm mahasiswa",
    category: "sepatu",
    address: "Jl. Kaliurang KM 5 No. 18, Caturtunggal, Depok, Sleman",
    distanceKm: 1.4,
    lat: -7.7685,
    lng: 110.3842,
    rating: 4.9,
    reviewsCount: 180,
    isOpen: true,
    openHours: "09.00 - 20.00 WIB",
    phone: "6281234567805",
    pricePerKgStart: 25000,
    minOrderKg: 1,
    badges: ["Spesialis Sepatu", "Garansi Bersih"],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    features: [
      "Cleaner Khusus Sneakers, Canvas, & Suede",
      "Sinar UV Anti-Bakteri & Bau Kaki",
      "Unyellowing Sol Sepatu Kuning",
      "Pengeringan Khusus Tanpa Merusak Lem"
    ],
    services: [
      { id: "deep_clean", name: "Deep Clean Sneakers (2 Hari)", price: 25000, unit: "pasang", durationHours: 48 },
      { id: "fast_clean", name: "Fast Clean Upper (1 Hari)", price: 18000, unit: "pasang", durationHours: 24 },
      { id: "unyellowing", name: "Treatment Unyellowing Sol", price: 35000, unit: "pasang", durationHours: 72 },
      { id: "cuci_tas", name: "Cuci Ransel Kuliah", price: 20000, unit: "pcs", durationHours: 48 }
    ],
    reviews: [
      { user: "Fauzi", role: "Mahasiswa", rating: 5, comment: "Sepatu sneakers dekil sehabis praktikum lapangan balik putih mulus kayak baru beli." },
      { user: "Sabra", role: "Mahasiswa", rating: 5, comment: "Ransel kuliah bersih wangi, gak ada residu sabun di sela resleting." }
    ]
  },
  {
    id: "lnd-06",
    name: "CoinWash Kampus Sagan",
    tagline: "Laundry koin mandiri modern, cuci kering cuma 60 menit",
    category: "koin",
    address: "Jl. Sagan Timur No. 5, Terban, Gondokusuman, Yogyakarta",
    distanceKm: 1.8,
    lat: -7.7785,
    lng: 110.3795,
    rating: 4.5,
    reviewsCount: 88,
    isOpen: true,
    openHours: "06.00 - 23.00 WIB",
    phone: "6281234567806",
    pricePerKgStart: 10000,
    minOrderKg: 1,
    badges: ["Self Service", "Free Wi-Fi & AC"],
    image: "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=600&auto=format&fit=crop&q=80",
    features: [
      "Mesin SpeedQueen Kapasitas Besar 7kg",
      "Ruang Tunggu Ber-AC & Wi-Fi Kencang",
      "Colokan Listrik Lengkap untuk Nugas",
      "Selesai Cuci & Kering dalam 60 Menit"
    ],
    services: [
      { id: "self_wash", name: "Paket Mandiri Cuci + Kering (7 kg)", price: 20000, unit: "koin", durationHours: 1 },
      { id: "full_service", name: "Drop-Off Mandiri (Ditunggui Staf + Lipat)", price: 28000, unit: "paket", durationHours: 4 }
    ],
    reviews: [
      { user: "Eliana", role: "Mahasiswa", rating: 4, comment: "Enak banget bisa nugas sambil nunggu cucian selesai. 1 jam udah kering total bisa langsung pakai." },
      { user: "Ghaniy", role: "Mahasiswa", rating: 5, comment: "Tempat bersih, mesin gampang dioperasikan, koin bisa beli via QRIS." }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-2026-0921-01",
    outletId: "lnd-01",
    outletName: "FreshCare Laundry Pogung",
    serviceName: "Cuci + Setrika Reguler (2 Hari)",
    unitPrice: 6000,
    quantity: 3.5,
    unit: "kg",
    deliveryType: "pickup",
    deliveryFee: 0,
    totalPrice: 21000,
    createdAt: "21 Sep 2026, 11:30 WIB",
    estimatedFinish: "23 Sep 2026, 12:00 WIB",
    statusIndex: 2, // 0: Diterima, 1: Dijemput, 2: Sedang Dicuci, 3: Disetrika, 4: Siap Diantar/Diambil, 5: Selesai
    notes: "Pewangi lavender, tolong kemeja hitam disetrika uap",
    userAddress: "Kos Putri Melati, Jl. Pogung Kidul No. 5B",
    phone: "6281234567801"
  }
];

export const ORDER_STATUS_STEPS = [
  { key: "received", label: "Pesanan Diterima", desc: "Outlet telah menerima pesanan Anda" },
  { key: "pickup", label: "Penjemputan / Drop-Off", desc: "Pakaian diterima oleh staf laundry" },
  { key: "washing", label: "Sedang Dicuci", desc: "Pakaian dicuci dengan mesin khusus" },
  { key: "ironing", label: "Pengeringan & Setrika", desc: "Proses pengeringan dan perapian uap" },
  { key: "ready", label: "Siap Diambil / Diantar", desc: "Pakaian sudah rapi dan wangi" },
  { key: "completed", label: "Pesanan Selesai", desc: "Transaksi selesai, terima kasih" }
];
