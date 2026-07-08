import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function FloatingWA() {
  const [isOpen, setIsOpen] = useState(false);

  const greetingText = `Halo Ibu Farida, saya mendapatkan informasi dari website personal Anda. Saya ingin berkonsultasi mengenai kebutuhan properti.`;
  const encodedGreeting = encodeURIComponent(greetingText);

  const contacts = [
    {
      name: 'Ibu Farida Listiana',
      role: 'WhatsApp Utama (Farida)',
      number: CONTACT_INFO.whatsappPrimary,
      formatted: CONTACT_INFO.whatsappPrimaryFormatted,
      status: 'Online',
    },
    {
      name: 'Konsultan pendamping',
      role: 'WhatsApp Alternatif',
      number: CONTACT_INFO.whatsappSecondary,
      formatted: CONTACT_INFO.whatsappSecondaryFormatted,
      status: 'Online',
    },
  ];

  // SVG WhatsApp Kustom yang Bersih & Presisi
  const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Contact List Hub */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 w-72 mb-4 text-left overflow-hidden relative"
          >
            {/* Header branding inside WA Box */}
            <div className="bg-[#03045E] text-white -m-5 p-4 mb-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
                FL
              </div>
              <div>
                <h4 className="font-serif font-black text-xs sm:text-sm tracking-wide">Hubungi Ibu Farida</h4>
                <p className="text-[10px] text-[#CAF0F8] font-medium">Bicara langsung dengan kami</p>
              </div>
            </div>

            {/* List options */}
            <div className="space-y-3 pt-3">
              {contacts.map((c) => (
                <a
                  key={c.number}
                  href={`https://wa.me/62${c.number}?text=${encodedGreeting}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-dotted border-slate-200 hover:border-[#0077B6] hover:bg-slate-50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-[#0077B6] tracking-wider leading-none">
                      {c.role}
                    </p>
                    <p className="font-bold text-xs text-[#03045E] tracking-tight">{c.name}</p>
                    <p className="text-[10px] font-mono text-slate-400">{c.formatted}</p>
                  </div>
                  <div className="bg-[#25D366]/10 text-[#25D366] p-2.5 rounded-xl group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>

            {/* Quote details */}
            <p className="text-[9px] text-slate-400 leading-snug mt-4 text-center">
              "Kami siap merespon pertanyaan investasi Anda secara hangat &amp; transparan."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pulse Trigger button - Sesuai dengan spesifikasi image_c68955.png */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none ring-4 ring-[#25D366]/30 relative z-10"
        aria-label="WhatsApp Hub"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              <WhatsAppIcon className="w-7 h-7" />
              {/* Pulse notification element */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
}