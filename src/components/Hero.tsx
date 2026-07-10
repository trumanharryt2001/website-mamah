import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';
import { CONTACT_INFO, IMAGES } from '../data';

interface HeroProps {
  onSearchClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onSearchClick, onNavigate }: HeroProps) {
  const wsMainLink = `https://wa.me/62${CONTACT_INFO.whatsappPrimary}?text=Halo%20Ibu%20Farida%2C%20saya%20mendapatkan%20informasi%20dari%20website%20Anda.%20Saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20properti.`;

  return (
    <section id="home" className="relative pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#f0f9ff]/70 to-[#CAF0F8]/40">
      {/* Decorative Blur Spheres background */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-light-blue/20 rounded-full filter blur-3xl -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-blue/10 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Teks Content (Left Side) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left z-10">
            {/* Tagline / Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-4 rounded-full border border-[#90E0EF] bg-white px-5 py-3 shadow-sm"
            >
              <span className="whitespace-nowrap text-sm font-semibold text-[#03045E]">
                Bagian dari
              </span>
              <span className="h-8 w-px bg-[#90E0EF]" />
              <div className="flex h-10 w-32 items-center justify-center sm:h-11 sm:w-36">
                <img
                  src="/images/valtis-property-logo-clean.png"
                  alt="Valtis Property"
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>

            {/* Heading Utama */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#03045E] leading-[1.15]"
            >
              Temukan Properti yang <br className="hidden sm:inline" />
              <span className="italic text-[#0077B6] font-normal">Tepat untuk Masa Depan</span> Anda
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed"
            >
              Tri Yatmi membantu Anda membeli, menjual, dan menyewakan properti dengan proses yang lebih terarah, transparan, dan profesional.
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 sm:items-center"
            >
              <button
                onClick={() => onNavigate('properti')}
                className="inline-flex items-center justify-center space-x-2 bg-[#03045E] hover:bg-navy text-white font-semibold px-8 py-4 rounded-xl shadow-xl shadow-navy/20 hover:shadow-navy/35 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Lihat Properti</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* TOMBOL UTAMA WA DI HERO */}
              <a
                href={wsMainLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-300"
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
            </motion.div>

            {/* Tiga Elemen Kepercayaan */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-200/60"
            >
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-5 h-5 text-cyan-blue flex-shrink-0" />
                <span className="text-sm font-medium text-navy">Pendampingan Personal</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-5 h-5 text-cyan-blue flex-shrink-0" />
                <span className="text-sm font-medium text-navy">Informasi Transparan</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-5 h-5 text-cyan-blue flex-shrink-0" />
                <span className="text-sm font-medium text-navy">Respons Cepat</span>
              </div>
            </motion.div>

            {/* Hubungi Farida Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/80 backdrop-blur border border-light-blue/30 rounded-2xl p-4 inline-block shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#0077B6] mb-2 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Hubungi Farida :</span>
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm">
                <div>
                  <span className="text-gray-500 mr-1.5">UTAMA:</span>
                  <a href={`tel:${CONTACT_INFO.whatsappPrimary}`} className="font-mono font-bold text-navy hover:text-[#0077B6] transition-colors">
                    {CONTACT_INFO.whatsappPrimaryFormatted}
                  </a>
                </div>
                <div className="sm:border-l sm:border-gray-200 sm:pl-6 mt-1 sm:mt-0">
                  <span className="text-gray-500 mr-1.5">ALTERNATIF:</span>
                  <a href={`tel:${CONTACT_INFO.whatsappSecondary}`} className="font-mono font-bold text-navy hover:text-[#0077B6] transition-colors">
                    {CONTACT_INFO.whatsappSecondaryFormatted}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Deskop Portrait Section (Right Side) */}
          <div className="lg:col-span-5 flex justify-center items-center relative min-h-[380px] sm:min-h-[480px]">
            {/* Background geometric shapes */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring' }}
              className="absolute w-[80%] aspect-square bg-[#CAF0F8] rounded-full -bottom-4 right-4 -z-10"
            />
            <motion.div
              initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
              animate={{ rotate: 12, scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, type: 'spring' }}
              className="absolute w-[75%] aspect-square border-4 border-cyan-blue/30 rounded-3xl bottom-10 right-10 -z-10"
            />

            {/* Main Portrait Frame with modern glass frame */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]"
            >
              <img
                src={IMAGES.faridaPortrait}
                alt="Ibu Tri Yatmi - Konsultan Properti Profesional"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 text-white">
                <p className="font-serif font-bold text-lg">
                  Tri Yatmi
                </p>
                <p className="text-[11px] text-[#CAF0F8] tracking-wider uppercase font-medium mt-0.5">
                  Konsultan Properti Profesional
                </p>
                <p className="text-[9px] text-[#90E0EF] uppercase tracking-widest font-bold">
                  20+ Tahun Pengalaman · Bagian dari Valtis Property
                </p>
              </div>
            </motion.div>

            {/* FLOATING BADGE KECIL PADA FOTO (SERASI DENGAN WARNA WA) */}
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

        </div>
      </div>
    </section>
  );
}
