import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Home } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface CTASectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function CTASection({ onNavigate }: CTASectionProps) {
  const wsMainLink = `https://wa.me/62${CONTACT_INFO.whatsappPrimary}?text=Halo%20Ibu%20Tri%20Yatmi%2C%20saya%20mendapatkan%20informasi%20dari%20website%20personal%20Ibu.%20Saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20properti.`;

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-[#CAF0F8]/30 via-white to-white relative overflow-hidden select-none border-t border-slate-100/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-light-blue/10 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#03045E] to-[#0077B6] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-blue/15 rounded-full filter blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-light-blue/10 rounded-full filter blur-xl" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="inline-block bg-white/10 border border-white/20 text-[#CAF0F8] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-2">
              KONSULTASI GRATIS
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Mulai Perjalanan Properti Anda Bersama Tri Yatmi
            </h2>
            
            <p className="text-blue-100 sm:text-lg leading-relaxed">
              Diskusikan kebutuhan jual, beli, sewa, atau investasi properti melalui konsultasi yang personal, aman, dan tanpa biaya tambahan apa pun.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {/* TOMBOL UTAMA WA DI CTA SECTION */}
              <a
                href={wsMainLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer text-sm"
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

              <button
                onClick={() => onNavigate('properti')}
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/20 hover:border-white/50 transition-all duration-300 text-sm"
              >
                <Home className="w-4 h-4 text-[#CAF0F8]" />
                <span>Lihat Katalog Properti</span>
              </button>
            </div>

            {/* Subtext info */}
            <div className="text-xs text-blue-200/80 pt-4 flex items-center justify-center space-x-2">
              <span>● Pendampingan Penuh rill dari Awal Survei hingga AJB Notaris</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


