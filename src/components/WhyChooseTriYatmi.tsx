import React from 'react';
import { motion } from 'motion/react';
import { Compass, Shield, Zap, Sparkles, Target, BarChart2 } from 'lucide-react';

export default function WhyChooseTriYatmi() {
  const reasons = [
    {
      title: 'Konsultasi yang Sesuai Kebutuhan',
      description:
        'Setiap klien dibantu memahami pilihan properti berdasarkan kebutuhan, tujuan, anggaran, lokasi, dan rencana jangka panjang.',
      icon: Compass,
    },
    {
      title: 'Informasi Jelas dan Transparan',
      description:
        'Menyampaikan informasi properti secara terbuka, mulai dari kondisi aset, legalitas, harga, lingkungan, hingga hal penting yang perlu dipertimbangkan.',
      icon: Shield,
    },
    {
      title: 'Respons Cepat dan Mudah Dihubungi',
      description:
        'Komunikasi dilakukan secara responsif melalui WhatsApp agar proses konsultasi, survei, negosiasi, dan tindak lanjut berjalan lebih lancar.',
      icon: Zap,
    },
    {
      title: 'Pendampingan dari Awal hingga Transaksi',
      description:
        'Mendampingi klien mulai dari konsultasi awal, pencarian atau pemasaran properti, survei lokasi, negosiasi, hingga koordinasi dokumen.',
      icon: Sparkles,
    },
    {
      title: 'Rekomendasi Sesuai Budget dan Prioritas',
      description:
        'Membantu menyeleksi properti yang paling relevan dengan kebutuhan, kemampuan anggaran, gaya hidup, dan potensi nilai di masa depan.',
      icon: Target,
    },
    {
      title: 'Strategi Pemasaran yang Terarah',
      description:
        'Membantu pemilik properti menampilkan aset secara lebih menarik melalui informasi yang rapi, foto yang representatif, dan jangkauan calon pembeli atau penyewa yang tepat.',
      icon: BarChart2,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sisi Kiri: List Poin Alasan */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="inline-block bg-very-light-blue text-[#0077B6] font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                ALASAN MEMILIH
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                Mengapa Berkonsultasi dengan Tri Yatmi?
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Tri Yatmi membantu proses jual, beli, sewa, dan pemasaran properti dengan pendekatan yang personal, informatif, dan terarah agar setiap keputusan lebih nyaman untuk diambil.
              </p>
            </div>

            {/* Grid Reasons */}
            <div className="space-y-4">
              {reasons.map((reason, index) => {
                const IconComponent = reason.icon;

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={reason.title}
                    className="flex items-start space-x-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50/50 hover:border-light-blue/30 transition-all duration-300"
                  >
                    <div className="bg-[#CAF0F8] text-[#0077B6] p-2 rounded-lg mt-0.5 flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-[#0077B6]" />
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-navy text-md">
                        {reason.title}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sisi Kanan: Foto Pendukung Diskusi / Ilustrasi */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute w-[90%] aspect-square bg-[#CAF0F8]/50 rounded-full filter blur-xl -z-10" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] w-full"
            >
              <img
                src="/images/tri-yatmi/tria-consultation.png"
                alt="Tri Yatmi sedang berdiskusi dengan klien properti"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent p-6 flex flex-col justify-end text-white select-none">
                <span className="inline-block bg-cyan-blue text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-2 self-start shadow-sm">
                  KONSULTASI PERSONAL
                </span>

                <p className="font-serif font-bold text-lg leading-snug">
                  Mendengarkan kebutuhan Anda sebelum memberikan arahan properti yang tepat.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}