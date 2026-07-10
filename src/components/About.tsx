import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_INFO, IMAGES } from '../data';
import { FileUser, X, Building, Users, Award, CheckCircle } from 'lucide-react';

interface AboutProps {
  onNavigate: (sectionId: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [showFullCV, setShowFullCV] = useState(false);

  const stats = [
    {
      value: '20+',
      label: 'Tahun Pengalaman',
      description: 'Lebih dari dua dekade di bidang properti',
      icon: Award,
    },
    {
      value: '3',
      label: 'Layanan Utama',
      description: 'Jual, beli, dan sewa properti',
      icon: Building,
    },
    {
      value: 'A–Z',
      label: 'Pendampingan',
      description: 'Dari konsultasi hingga transaksi',
      icon: CheckCircle,
    },
    {
      value: '1-on-1',
      label: 'Konsultasi Personal',
      description: 'Pendekatan sesuai kebutuhan klien',
      icon: Users,
    },
  ];

  const wsLink = `https://wa.me/62${CONTACT_INFO.whatsappPrimary}?text=Halo%20Ibu%20Farida%20Listiana%2C%20saya%20membaca%20biodata%20Anda%20di%20website%20personal%20Ibu.%20Saya%20tertarik%20untuk%20berkenalan%20dan%20berkonsultasi.`;

  return (
    <section id="tentang" className="py-20 sm:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sisi Kiri: Foto Farida Dengan Hiasan Geometris */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Bentuk dekoratif di belakang foto */}
            <div className="absolute w-[95%] aspect-square bg-[#90E0EF]/40 rounded-3xl -top-6 -left-6 -z-10 filter blur-sm" />
            <div className="absolute w-[85%] aspect-square bg-[#00B4D8]/10 rounded-[40px] -bottom-6 -right-6 -z-10" />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[360px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]"
            >
              <img
                src={IMAGES.faridaPortrait}
                alt="Tri Yatmi, Konsultan Properti Profesional"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent p-6 flex flex-col justify-end text-white">
                <blockquote className="text-xs italic text-[#CAF0F8] mb-2 leading-relaxed opacity-90">
                  "Lebih dari 20 tahun mendampingi klien memilih dan memasarkan properti melalui pengalaman, komunikasi, dan pertimbangan yang matang."
                </blockquote>
                <p className="font-serif font-extrabold text-lg text-white">Tri Yatmi</p>
                <p className="text-[10px] uppercase font-bold text-[#90E0EF] tracking-widest mt-0.5">
                  Konsultan Properti Profesional
                </p>
                <p className="text-[9px] uppercase tracking-wider text-slate-300 font-medium">
                  Bagian dari Valtis Property
                </p>
              </div>
            </motion.div>

            {/* FLOATING CARD KECIL DI FOTO (MENGGUNAKAN SVG PILIHANMU) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
              className="absolute -left-2 top-10 bg-white border border-gray-100 p-4 rounded-2xl shadow-xl flex items-center space-x-3 max-w-[190px]"
            >
              <div className="bg-[#25D366] text-white p-3 rounded-xl flex-shrink-0">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Konsultasi</p>
                <p className="text-xs font-semibold text-navy">Gratis Via WA</p>
              </div>
            </motion.div>
          </div>

          {/* Sisi Kanan: Bio & Deskripsi & Tombol */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <span className="inline-block bg-very-light-blue text-[#0077B6] font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                Tentang Farida
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                Pendamping Properti yang Mengutamakan Kebutuhan Klien
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 sm:text-lg leading-relaxed text-justify">
              <p>
                <strong>Tri Yatmi</strong> adalah konsultan properti profesional dengan pengalaman lebih dari 20 tahun dalam mendampingi kebutuhan jual, beli, dan sewa properti. Pengalaman panjang tersebut membentuk pemahaman yang kuat terhadap perkembangan pasar, karakter lokasi, penentuan harga, kebutuhan klien, serta proses transaksi properti.
              </p>
              <p>
                Berbekal wawasan pasar dan jaringan profesional yang dibangun selama lebih dari dua dekade, Farida memberikan rekomendasi yang terukur dan relevan. Setiap klien mendapatkan pendampingan personal sejak konsultasi awal, pencarian atau pemasaran properti, proses survei, negosiasi, hingga koordinasi transaksi bersama pihak terkait.
              </p>
            </div>

            {/* Statistik 4 Kartu */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((st) => (
                <div
                  key={st.label}
                  className="bg-white rounded-xl border border-dotted border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-cyan-blue/50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-2 mb-1.5">
                    <st.icon className="w-5 h-5 text-cyan-blue group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-2xl font-black text-navy font-mono tracking-tight">{st.value}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{st.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{st.description}</p>
                </div>
              ))}
            </div>

            {/* Tombol Action Utama */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowFullCV(true)}
                className="inline-flex items-center justify-center space-x-2 bg-[#03045E] hover:bg-navy text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all duration-300"
              >
                <FileUser className="w-4 h-4 text-light-blue" />
                <span>Kenal Lebih Dekat</span>
              </button>
              
              {/* TOMBOL WHATSAPP UTAMA (MENGGUNAKAN PILIHANMU) */}
              <a
                href={wsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Diskusi Personal Melalui WA</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal Dialog for "Kenal Lebih Dekat" */}
      <AnimatePresence>
        {showFullCV && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
              onClick={() => setShowFullCV(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col relative z-10 border border-slate-200 text-left shadow-2xl"
            >
              {/* Tombol Tutup */}
              <button
                onClick={() => setShowFullCV(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-50 hover:bg-slate-100 z-20 transition-colors"
                aria-label="Tutup Profile"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Area Konten */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-200">
                
                {/* Header Profile */}
                <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-slate-150 flex-shrink-0">
                    <img src={IMAGES.faridaPortrait} alt="Portrait Tri Yatmi" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-navy leading-tight">Tri Yatmi</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Konsultan Properti Profesional</p>
                    <p className="text-[10px] text-slate-400">Bagian dari Valtis Property</p>
                  </div>
                </div>

                {/* CV / Bio Details */}
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed text-justify">
                  <p>
                    Sebagai seorang <strong>kolega dan konsultan real estate utama</strong> yang bermitra dengan kantor agen properti tepercaya <strong>Valtis Property</strong>, Tri Yatmi telah mendedikasikan bertahun-tahun masa baktinya untuk mempelajari denyut pasar real estat utama Indonesia, khususnya kawasan residensial serta komersial premium Jabodetabek seperti BSD City, Gading Serpong, Alam Sutera, Bintaro, dan Jakarta Raya.
                  </p>
                  <p>
                    Visi utama beliau adalah <strong>merombak cara transaksi properti konvensional menjadi transparan dan tulus</strong>. Oleh karena itu, Farida bersama Valtis Property mendedikasikan pilar-pilar integritas tepercaya, pemetaan kebutuhan yang kritis, respons pelayanan yang cepat, dan pendampingan dokumen legal yang aman dari sengketa hukum.
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#0077B6] pt-2">Nilai-Nilai Kerja Farida :</h4>
                  <ul className="space-y-3 text-xs font-semibold text-slate-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyan-blue flex-shrink-0 mt-0.5" />
                      <span><strong>Kredibilitas Hukum Tangguh</strong>: Meneliti status sertifikat (SHM/HGB) bebas dari agunan atau sengketa sebelum dipasarkan.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyan-blue flex-shrink-0 mt-0.5" />
                      <span><strong>Asesmen Appraisal Independen</strong>: Memberikan taksiran harga properti jujur berdasarkan realitas transaksi sekeliling wilayah.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyan-blue flex-shrink-0 mt-0.5" />
                      <span><strong>Koneksi Jaringan Luas</strong>: Bekerja sama harmonis dengan institusi KPR terkemuka dan notaris senior mitra tepercaya.</span>
                    </li>
                  </ul>
                </div>

                {/* TOMBOL WHATSAPP DI DALAM BOX MODAL (MENGGUNAKAN PILIHANMU w-4 h-4) */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <a
                    href={wsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba56] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Konsul Privat via WA</span>
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
