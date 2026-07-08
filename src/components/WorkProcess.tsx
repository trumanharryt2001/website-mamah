import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareReply, Layers3, Compass, CheckSquare } from 'lucide-react';
import { WORK_PROCESS_STEPS, CONTACT_INFO } from '../data';

export default function WorkProcess() {
  const icons = [MessageSquareReply, Layers3, Compass, CheckSquare];

  return (
    <section className="py-20 sm:py-24 bg-[#CAF0F8]/10 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#CAF0F8] text-[#0077B6] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
          >
            SISTEMATIKA KERJA
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            Bagaimana Farida Membantu Anda?
          </h2>
          <p className="text-gray-600 sm:text-lg leading-relaxed">
            Alur kerja profesional yang terstruktur untuk memastikan kenyamanan keputusan dan keabsahan dokumen hukum di tiap transaksi.
          </p>
        </div>

        {/* Timeline Visual Container */}
        <div className="relative mt-12">
          
          {/* Connector Line - Desktop Only */}
          <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary-blue/20 via-cyan-blue/40 to-primary-blue/20 -z-10" />

          {/* Stepper Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-6 relative">
            {WORK_PROCESS_STEPS.map((stepData, idx) => {
              const IconComponent = icons[idx % icons.length];
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={stepData.step}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-150/50 shadow-sm relative text-center group hover:shadow-lg transition-all duration-300"
                >
                  {/* 🌟 PERUBAHAN DI SINI: Kontras angka dinaikkan agar terbaca jelas */}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-5xl font-black font-sans text-slate-300/70 group-hover:text-[#0077B6]/20 transition-colors select-none tracking-wider">
                    {stepData.step}
                  </span>

                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#03045E] to-[#0077B6] mx-auto flex items-center justify-center text-white shadow-lg shadow-primary-blue/20 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif font-black text-lg text-navy tracking-tight mt-6 group-hover:text-[#0077B6] transition-colors">
                    {stepData.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed text-center">
                    {stepData.description}
                  </p>
                  
                  {/* Step Connector Label */}
                  <div className="absolute right-[-14px] top-[46px] hidden lg:group-hover:block transition-all select-none">
                    {idx < 3 && <span className="text-[#0077B6] font-bold text-lg">➔</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        <div className="mt-16 text-center">
          <a
            href={`https://wa.me/62${CONTACT_INFO.whatsappPrimary}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0077B6] hover:text-navy uppercase tracking-widest border-b-2 border-cyan-blue/55 pb-1 focus:outline-none"
          >
            <span>Mulailah Konsultasi Langkah Pertama Sekarang</span>
          </a>
        </div>

      </div>
    </section>
  );
}