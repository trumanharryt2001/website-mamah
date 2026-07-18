import { PropertyArea, LayananItem, ArticleItem } from './types';

type LegacyProperty = {
  id: string;
  name: string;
  location: string;
  priceVal: number;
  priceText: string;
  status: 'Dijual' | 'Disewakan';
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  landArea: string;
  buildingArea?: string;
  badge: string;
  description: string;
  image: string;
  additionalHighlights?: string[];
};

// Informasi Kontak Utama
export const CONTACT_INFO = {
  name: 'Triyatmi',
  title: 'Konsultan Properti Profesional (Affiliated with Valtis Property)',
  whatsappPrimary: '81911092009', // Link format: 6281911092009
  whatsappSecondary: '81911092009', // Link format: 6281911092009
  whatsappPrimaryFormatted: '+62 819-1109-2009',
  whatsappSecondaryFormatted: '+62 819-1109-2009',
  email: 'tri.yatmi@valtisproperty.com',
  address: 'Ruko Alicante Blok A. No 10 , Gading Serpong, Pagedangan, Tangerang Regency, Banten 15334',
  social: {
    instagram: 'https://instagram.com/valtis.property',
    tiktok: 'https://tiktok.com/@valtis.property',
    facebook: 'https://facebook.com/valtisproperty',
    linkedin: 'https://linkedin.com/in/triyatmi',
  }
};

// URL Hasil Generate Gambar AI Sesuai Kebutuhan User
export const IMAGES = {
  triYatmiPortrait: '/images/tri-yatmi-professional.png',
  heroModernHouse: '/src/assets/images/modern_luxury_property_1782021754035.jpg',
};

// DATA LISTING PROPERTI (Placeholder Data yang dapat diedit dan diintegrasikan ke CMS/Database)
export const PROPERTIES_DATA: LegacyProperty[] = [
  {
    id: 'prop-1',
    name: 'Rumah Modern Minimalis BSD',
    location: 'BSD City, Tangerang Selatan',
    priceVal: 1850000000,
    priceText: 'Rp1,85 Miliar',
    status: 'Dijual',
    type: 'Rumah',
    bedrooms: 3,
    bathrooms: 2,
    landArea: '120 m²',
    buildingArea: '100 m²',
    badge: 'Siap Huni',
    description: 'Rumah modern minimalis di kawasan paling berkembang BSD City. Desain fasad fungsional dengan memaksimalkan pencahayaan alami, sirkulasi udara baik, dan struktur bangunan premium. Sangat cocok untuk keluarga muda yang menginginkan hunian praktis dan prestisius.',
    image: IMAGES.heroModernHouse, // Menggunakan foto hasil generate AI yang sangat artistik
    additionalHighlights: ['Keamanan 24 Jam', 'Selangkah ke Toll BSD', 'Desain Smart Home', 'Bebas Banjir']
  },
  {
    id: 'prop-2',
    name: 'Rumah Keluarga Dua Lantai Eksklusif',
    location: 'Bintaro, Tangerang Selatan',
    priceVal: 2400000000,
    priceText: 'Rp2,4 Miliar',
    status: 'Dijual',
    type: 'Rumah',
    bedrooms: 4,
    bathrooms: 3,
    landArea: '150 m²',
    buildingArea: '180 m²',
    badge: 'Lokasi Strategis',
    description: 'Hunian mewah 2 lantai berdesain modern tropis di area Bintaro. Dilengkapi dengan carport lebar untuk 2 mobil, ruang keluarga yang luas, dan halaman belakang asri. Berada di dalam klaster dengan one-gate system yang aman serta tenang.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    additionalHighlights: ['Dekat Stasiun KRL', 'Cluster Eksklusif', 'Kitchen Set Mewah', 'Halaman Belakang']
  },
  {
    id: 'prop-3',
    name: 'Apartemen Cozy Full Furnished',
    location: 'Jakarta Selatan',
    priceVal: 8500000, // Harga sewa per bulan
    priceText: 'Rp8,5 Juta / bln',
    status: 'Disewakan',
    type: 'Apartemen',
    bedrooms: 2,
    bathrooms: 1,
    landArea: '65 m²',
    buildingArea: '65 m²',
    badge: 'Full Furnished',
    description: 'Disewakan apartemen mewah siap huni di jantung kota Jakarta Selatan. Interior dirancang secara profesional menggunakan furnitur berkualitas tinggi, dilengkapi dengan AC, kulkas, kompor, TV pintar, dan pemanas air. Menawarkan pemandangan kota (city view) yang menawan.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    additionalHighlights: ['Akses Kartu Lift', 'Gym & Kolam Renang', 'Koneksi Internet Cepat', 'Parkir Basemen']
  },
  {
    id: 'prop-4',
    name: 'Tanah Strategis Potensial Investasi',
    location: 'Serpong, Tangerang Selatan',
    priceVal: 2750000000, // 500 m2 x 5.5 jt = 2.75 Miliar
    priceText: 'Rp5,5 Juta / m²',
    status: 'Dijual',
    type: 'Tanah',
    landArea: '500 m²',
    badge: 'Cocok untuk Investasi',
    description: 'Tanah kavling matang berbentuk kotak dengan lebar depan ideal di kawasan berkembang Serpong. Sangat cocok dibangun untuk kost eksklusif, rumah tinggal luas, atau sekadar disimpan sebagai instrumen investasi dengan capital gain yang sangat tinggi tiap tahunnya.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    additionalHighlights: ['Sertifikat SHM', 'Hadap Timur', 'Jalan Depan Lebar', 'Tanah Siap Bangun']
  },
  {
    id: 'prop-5',
    name: 'Ruko Komersial 3 Lantai Ramai',
    location: 'Alam Sutera, Tangerang',
    priceVal: 4750000000,
    priceText: 'Rp4,75 Miliar',
    status: 'Dijual',
    type: 'Ruko',
    bathrooms: 3,
    landArea: '90 m²',
    buildingArea: '240 m²',
    badge: 'Area Komersial',
    description: 'Ruko modern 3 lantai siap pakai yang berlokasi di distrik bisnis utama Alam Sutera. Dikelilingi perkantoran, perumahan padat, dan pusat kuliner premium yang ramai pembeli. Parkir bersama yang sangat luas dan aksesibilitas luar biasa.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    additionalHighlights: ['Parkir Luas', 'Daya Listrik Besar', 'STRATEGIS Samping Boulevard', 'Dekat Kampus Binus']
  },
  {
    id: 'prop-6',
    name: 'Rumah Ringkas Nyaman dalam Cluster',
    location: 'Tangerang',
    priceVal: 1350000000,
    priceText: 'Rp1,35 Miliar',
    status: 'Dijual',
    type: 'Rumah',
    bedrooms: 3,
    bathrooms: 2,
    landArea: '90 m²',
    buildingArea: '80 m²',
    badge: 'Harga Terbaik',
    description: 'Rumah modern dua tingkat yang asri dan aman di dalam klaster dengan taman bermain anak. Menawarkan konsep area terbuka (open space plan) antara ruang tamu dan ruang makan, memberikan kesan lapang dan lega.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    additionalHighlights: ['One Gate System', 'Taman Bermain Anak', 'Bebas Banjir', 'Air Bersih Pam']
  }
];

// AREA LAYANAN PROPERTI (Dapat ditambah atau dikurangi bertahap)
export const PROPERTY_AREAS: PropertyArea[] = [
  { id: 'area-1', name: 'Jakarta', image: '/images/areas/area-jakarta.jpg', propertyCount: 15 },
  { id: 'area-2', name: 'Tangerang', image: '/images/areas/area-tangerang.jpg', propertyCount: 22 },
  { id: 'area-3', name: 'Tangerang Selatan', image: '/images/areas/area-tangerang-selatan-HD.png', propertyCount: 37 },
  { id: 'area-4', name: 'BSD City', image: '/images/areas/area-bsd.png', propertyCount: 18 },
  { id: 'area-5', name: 'Alam Sutera', image: '/images/areas/area-alam-sutera-HD.png', propertyCount: 12 },
  { id: 'area-6', name: 'Bintaro', image: '/images/areas/area-bintaro.png', propertyCount: 14 },
  { id: 'area-7', name: 'Serpong', image: '/images/areas/area-serpong.png', propertyCount: 19 },
  { id: 'area-8', name: 'Depok', image: '/images/areas/area-depok.png', propertyCount: 9 },
  { id: 'area-9', name: 'Bekasi', image: '/images/areas/area-bekasi.png', propertyCount: 11 },
];

// LAYANAN PROPERTI
export const SERVICES_DATA: LayananItem[] = [
  {
    id: 'service-1',
    title: 'Pembelian Properti',
    description: 'Membantu menemukan properti yang sesuai dengan kebutuhan, anggaran, lokasi, dan rencana jangka panjang Anda.',
    iconName: 'Home'
  },
  {
    id: 'service-2',
    title: 'Penjualan Properti',
    description: 'Membantu menyusun strategi pemasaran, menentukan harga yang kompetitif, dan menjangkau calon pembeli yang tepat.',
    iconName: 'DollarSign'
  },
  {
    id: 'service-3',
    title: 'Penyewaan Properti',
    description: 'Membantu mempertemukan pemilik properti dan penyewa dengan proses komunikasi, negosiasi, dan administrasi yang lebih aman.',
    iconName: 'Key'
  },
  {
    id: 'service-4',
    title: 'Konsultasi Properti',
    description: 'Membantu Anda memahami pilihan properti yang sesuai dengan kebutuhan, anggaran, lokasi, legalitas, dan rencana penggunaan jangka panjang.',
    iconName: 'FileText'
  },
  {
    id: 'service-5',
    title: 'Pemasaran Properti',
    description: 'Membantu pemilik properti memasarkan aset dengan penyajian informasi yang jelas, foto yang representatif, dan komunikasi yang terarah kepada calon pembeli atau penyewa.',
    iconName: 'Megaphone'
  },
  {
    id: 'service-6',
    title: 'Pendampingan Transaksi',
    description: 'Mendampingi proses negosiasi, pengecekan dokumen, koordinasi dengan pihak terkait, hingga transaksi berjalan lebih tertib, aman, dan nyaman.',
    iconName: 'Award'
  }
];

// MENGAPA MEMILIH Triyatmi
export const WHY_CHOOSE_REASONS = [
  'Konsultasi tulus berdasarkan kebutuhan rill Anda, bukan sekadar memaksakan target penjualan properti.',
  'Informasi mengenai spesifikasi, legalitas sertifikat, dan kondisi lingkungan disampaikan secara jelas dan 100% transparan.',
  'Respons komunikasi yang cepat dan solutif direct lewat WhatsApp Ibu Tri pribadi.',
  'Pendampingan penuh dedikasi luar biasa semenjak proses awal konsultasi rill, survei lokasi, hingga legal transaksi di notaris.',
  'Rekomendasi pilihan properti yang dipilah ketat agar cocok dengan anggaran dan profil tujuan finansial Anda.',
  'Strategi pemasaran personal, adaptif, dan ekstensif untuk memaksimalkan daya sebar unit properti yang dititipkan.'
];

// PROSES KERJA
export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Konsultasi Kebutuhan',
    description: 'Ceritakan detail kebutuhan Anda, mulai dari fungsi ruang, lokasi incaran, budget maksimal, hingga preferensi khusus hunian.'
  },
  {
    step: '02',
    title: 'Rekomendasi Terkurasi',
    description: 'Ibu Tri akan menyeleksi beberapa opsi listing properti terbaik dari Valtis Property yang paling selaras dengan indikator Anda.'
  },
  {
    step: '03',
    title: 'Survei Lapangan & Negosiasi',
    description: 'Mari jadwalkan kunjungan langsung ke lokasi terpilih. Ibu Tri akan memandu proses survei dan mendampingi negosiasi harga.'
  },
  {
    step: '04',
    title: 'Transaksi & Penandatanganan',
    description: 'Penyelesaian administrasi dokumen kepemilikan, akta jual beli bersama Pejabat Pembuat Akta Tanah (PPAT) hingga kunci resmi di tangan Anda.'
  }
];

// TESTIMONI (Catatan Developer: Ini data rill kepuasan klien yang diproyeksikan dan siap diganti oleh testimoni asli tambahan)
// export const TESTIMONIALS_DATA: TestimonialItem[] = [
//   {
//     id: 'test-1',
//     name: 'Bapak Hartono & Keluarga',
//     role: 'Pembeli Hunian di BSD',
//     content: '“Ibu Tri sangat membantu dalam mewujudkan mimpi keluarga kami untuk memiliki rumah di BSD City. Penjelasannya mendetail, tidak terburu-buru, sangat sabar menjawab ragam kegelisahan kami mengenai proses KPR, dan benar-benar mengawal kelancaran hingga serah terima kunci.”',
//     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
//   },
//   {
//     id: 'test-2',
//     name: 'Ibu Shanti Puspita',
//     role: 'Investor Properti ruko Alam Sutera',
//     content: '“Komunikasi rill yang berjalan sangat cepat dan keterbukaan informasi yang luar biasa transparan menjadi nilai utama Ibu Tri. Segala seluk-beluk daerah komersial ruko diletakkan sejujurnya, membuat keputusan investasi saya jauh lebih terukur dan percaya diri.”',
//     avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
//   },
//   {
//     id: 'test-3',
//     name: 'Bapak Dr. Ronald',
//     role: 'Klien Penitipan Sewa Rumah',
//     content: '“Saya mempercayakan penitipan pemasaran rumah sewa saya di Bintaro kepada Ibu Triyatmi. Hanya butuh waktu kurang dari 3 minggu hingga beliau berhasil memilah penyewa yang andal dan berkualitas untuk menyewa aset berharga kami.”',
//     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
//   }
// ];

// ARTIKEL / WAWASAN PROPERTI
export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Panduan Praktis Membeli Rumah Pertama untuk Keluarga Muda',
    category: 'Panduan Pembeli',
    excerpt: 'Membeli rumah pertama kalinya bisa terasa sangat membingungkan. Pelajari langkah fundamental apa saja yang perlu dipersiapkan matang mulai dari kalkulasi finansial rill hingga pengecekan lokasi.',
    content: 'Membeli rumah pertama kalinya memang merupakan impian bagi setiap keluarga baru. Langkah awal yang paling penting adalah menentukan kemampuan finansial, menyiapkan dana darurat prapembelian, serta mencari lingkungan yang mendukung pertumbuhan anak-anak.',
    date: '15 Juni 2026',
    image: '/images/articles/article-rumah-pertama.png',
    readTime: '5 menit baca'
  },
  {
    id: 'art-2',
    title: 'Mengenal Perbedaan Esensial SHM dan HGB Pada Legalitas Properti',
    category: 'Legalitas',
    excerpt: 'Jangan sampai menyesal di kemudian hari karena mengabaikan status kepemilikan tanah. Mari kenali perbedaan krusial antara Sertifikat Hak Milik (SHM) dan Hak Guna Bangunan (HGB).',
    content: 'Aspek hukum dan legalitas sertifikat adalah kedaulatan utama dari keamanan aset properti Anda. SHM memberikan hak mutlak tanpa limitasi waktu atas sebidang tanah, sedangkan HGB memiliki masa berlaku tertentu yang harus dipantau perpanjangannya.',
    date: '10 Mei 2026',
    image: '/images/articles/article-shm-hgb.png',
    readTime: '4 menit baca'
  },
  {
    id: 'art-3',
    title: 'Rincian Biaya Terselubung yang Wajib Disiapkan Saat Membeli Properti',
    category: 'Tips Keuangan',
    excerpt: 'Harga jual properti ternyata bukanlah satu-satunya biaya yang harus dikeluarkan. Cari tahu rincian pajak pembeli BPHTB, biaya notaris, biaya balik nama, dan administrasi lainnya.',
    content: 'Banyak dari pembeli properti pemula terkejut dengan munculnya tagihan tambahan di akhir proses transaksi. Biaya AJB, Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB), biaya PNBP, asuransi, serta fee notaris perlulah dimasukkan dalam rincian dana prapembelian.',
    date: '28 April 2026',
    image: '/images/articles/article-biaya-properti.png',
    readTime: '6 menit baca'
  }
];





