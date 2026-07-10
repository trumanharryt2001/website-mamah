import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_INFO } from '../data';
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, ArrowUp, X, Scale, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0  , behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Beranda', id: 'home' },
    { name: 'Properti', id: 'properti' },
    { name: 'Layanan', id: 'layanan' },
    { name: 'Tentang Farida', id: 'tentang' },
    { name: 'Titip Properti', id: 'titip' },
    { name: 'Artikel', id: 'artikel' },
  ];

  return (
    <footer id="kontak" className="bg-[#03045E] text-[#CAF0F8] pt-16 pb-8 border-t border-white/5 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Branding Logo & Deskripsi */}
          <div className="col-span-1 md:col-span-4 space-y-4 text-left">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-left focus:outline-none focus:ring-2 focus:ring-cyan-blue rounded-md p-1"
            >
              <div className="bg-white text-navy font-serif font-black text-xl px-2.5 py-1 rounded">
                FL
              </div>
              <div>
                <span className="block font-serif font-extrabold text-lg sm:text-xl tracking-wider text-white">
                  TRI YATMI
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#CAF0F8] font-bold -mt-1">
                  KONSULTAN PROPERTI
                </span>
              </div>
            </button>

{/* Identitas Valtis Property */}
<div className="ml-1 inline-flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white px-3 py-2 shadow-sm">
  <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-widest text-[#03045E]">
    Bagian dari
  </span>

  <span className="h-7 w-px bg-[#90E0EF]" />

  <img
    src="/images/valtis-property-logo-clean.png"
    alt="Valtis Property"
    className="h-8 w-auto object-contain sm:h-9"
  />
</div>

<p className="max-w-sm text-xs leading-relaxed text-slate-300">
  Pendampingan personal untuk kebutuhan jual, beli, dan sewa
  properti berdasarkan pengalaman lebih dari 20 tahun di bidang
  properti.
</p>
            {/* Social Icons mapping */}
            {/* <div className="flex items-center space-x-3 pt-2">
              <a
                href={CONTACT_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Valtis Property"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Valtis Property"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors border border-white/10 text-xs font-bold font-mono"
              >
                🎵
              </a>
              <a
                href={CONTACT_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Valtis Property"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Tri Yatmi"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            */}

          </div> 
          

          {/* Column 2: Quick Links */}
          <div className="col-span-1 md:col-span-3 text-left space-y-4">
            <h4 className="font-serif font-black text-white text-md tracking-wide">
              Navigasi Cepat
            </h4>
            <nav className="flex flex-col space-y-2 text-xs">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="text-left py-1 hover:text-white hover:translate-x-0.5 transition-all text-slate-300 focus:outline-none"
                >
                  {item.name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="text-left py-1 hover:text-white hover:translate-x-0.5 transition-all text-slate-300 focus:outline-none"
              >
                Kebijakan Privasi
              </button>
            </nav>
          </div>

          {/* Column 3: Contact details Farida */}
          <div className="col-span-1 md:col-span-5 text-left space-y-4">
            <h4 className="font-serif font-black text-white text-md tracking-wide">
              Kontak Konsultan
            </h4>
            <div className="space-y-3.5 text-xs text-slate-300">
              <div>
                <p className="font-serif font-bold text-white text-sm">{CONTACT_INFO.name}</p>
                <p className="text-[10px] text-light-blue uppercase font-bold tracking-wider">{CONTACT_INFO.title}</p>
              </div>

              {/* Whatsapp */}
              <div className="space-y-1.5 pt-1.5">
                <div className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-cyan-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">WhatsApp Utama :</p>
                    <a href={`https://wa.me/62${CONTACT_INFO.whatsappPrimary}`} target="_blank" rel="noopener noreferrer" className="font-mono hover:text-cyan-blue">
                      {CONTACT_INFO.whatsappPrimaryFormatted}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-cyan-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">WhatsApp Alternatif :</p>
                    <a href={`https://wa.me/62${CONTACT_INFO.whatsappSecondary}`} target="_blank" rel="noopener noreferrer" className="font-mono hover:text-cyan-blue">
                      {CONTACT_INFO.whatsappSecondaryFormatted}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-cyan-blue flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-cyan-blue">
                  {CONTACT_INFO.email}
                </a>
              </div>

              {/* Office Address */}
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-cyan-blue flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {CONTACT_INFO.address}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Meta & Copy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center sm:justify-between text-[11px] text-slate-400">
          <div className="text-center sm:text-left">
            <span>© 2026 Tri Yatmi. Seluruh hak dilindungi. All rights reserved. Partner of Valtis Property.</span>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span>Powering Personal branding &amp; Real Estate Solutions</span>
            {/* Scroll back to top button */}
            <button
              onClick={handleScrollToTop}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-blue hover:text-white transition-colors"
              aria-label="Scroll ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Dialog Slide-over */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80"
              onClick={() => setShowPrivacy(false)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-navy p-6 sm:p-8 rounded-3xl max-w-lg w-full relative z-10 border border-slate-200 text-left"
            >
              <button
                onClick={() => setShowPrivacy(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#03045E] border-b border-slate-100 pb-3">
                  <Scale className="w-5 h-5 text-[#0077B6]" />
                  <h3 className="font-serif text-xl font-bold">Kebijakan Privasi</h3>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed space-y-3">
                  <p>
                    Ibu Tri Yatmi (sebagai konsultan properti profesional terafiliasi dengan Valtis Property) menghargai penuh keamanan dan kedaulatan data privasi dari setiap pengunjung situs kami. Seluruh data identitas, kontak WhatsApp, email, sertifikat properti, ataupun lampiran foto foto properti yang Anda kirimkan melalui formulir titip jual/sewa diletakkan semata-mata untuk memverifikasi kesahihan fisik aset dan memproses strategi pemasaran.
                  </p>
                  <p>
                    Kami menjamin data Anda tidak akan dijual, dipertukarkan, ataupun disalahgunakan oleh pihak ketiga di luar entitas agen Tri Yatmi &amp; Valtis Property tanpa izin eksplisit tertulis dari Anda.
                  </p>
                  <p>
                    Jika di kemudian hari Anda memutuskan untuk menarik kembali penayangan/pendataan properti Anda atau ingin menghapus data kontak Anda dari database kami, silakan hubungi langsung Ibu Tri Yatmi via WhatsApp.
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowPrivacy(false)}
                    className="inline-flex items-center space-x-1.5 bg-navy text-white px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Saya Mengerti</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}

