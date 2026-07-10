import React from 'react';
import { motion } from 'motion/react';
import { Check, Compass, Shield, Zap, Sparkles, Target, BarChart2 } from 'lucide-react';
import { WHY_CHOOSE_REASONS } from '../data';

export default function WhyChooseFarida() {
  const icons = [Compass, Shield, Zap, Sparkles, Target, BarChart2];

  return (
    <section className="py-20 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sisi Kiri: List Poin Alasan */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="inline-block bg-very-light-blue text-[#0077B6] font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                UNGGUL &amp; TERPERCAYA
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
                Mengapa Memilih Tri Yatmi?
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                Menghadirkan pelayanan konsultasi properti berstandar tinggi dengan mengedepankan keamanan transaksi dan kenyamanan relasi jangka panjang.
              </p>
            </div>

            {/* Grid Reasons with custom outline style */}
            <div className="space-y-4">
              {WHY_CHOOSE_REASONS.map((reason, index) => {
                const IconComponent = icons[index % icons.length];
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50/50 hover:border-light-blue/30 transition-all duration-300"
                  >
                    <div className="bg-[#CAF0F8] text-[#0077B6] p-2 rounded-lg mt-0.5 flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-[#0077B6]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-navy text-md">
                        {index === 0 && "Konsultasi Berorientasi Solusi"}
                        {index === 1 && "Keterbukaan & Akurasi Informasi"}
                        {index === 2 && "Respon Cepat & Tanggap via WA"}
                        {index === 3 && "Pendampingan Transaksi A-Z"}
                        {index === 4 && "Kurasi Sesuai Anggota & Budget"}
                        {index === 5 && "Strategi Pemasaran Khusus & Inovatif"}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {reason}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sisi Kanan: Foto Pendukung Diskusi / Ilustrasi */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Background elements */}
            <div className="absolute w-[90%] aspect-square bg-[#CAF0F8]/50 rounded-full filter blur-xl -z-10" />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] w-full"
            >
              <img
                src="/images/farida/farida-consultation(2).png"
                alt="Ibu Tri sedang berdiskusi secara profesional dan transparan dengan klien"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent p-6 flex flex-col justify-end text-white select-none">
                <span className="inline-block bg-cyan-blue text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-2 self-start shadow-sm">
                  KONSULTASI TRANSPARAN
                </span>
                <p className="font-serif font-bold text-lg leading-snug">
                  Mendengarkan &amp; Mengakomodasi Kebutuhan Anda dengan Tulus
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

