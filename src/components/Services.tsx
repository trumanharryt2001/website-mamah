import React from 'react';
import { motion } from 'motion/react';
import { Home, DollarSign, Key, FileText, Megaphone, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA, CONTACT_INFO } from '../data';

export default function Services() {
  // Mapping Icon Names to Lucide Icon Components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6 text-[#0077B6]" />;
      case 'DollarSign':
        return <DollarSign className="w-6 h-6 text-[#0077B6]" />;
      case 'Key':
        return <Key className="w-6 h-6 text-[#0077B6]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#0077B6]" />;
      case 'Megaphone':
        return <Megaphone className="w-6 h-6 text-[#0077B6]" />;
      case 'Award':
        return <ShieldCheck className="w-6 h-6 text-[#0077B6]" />;
      default:
        return <Home className="w-6 h-6 text-[#0077B6]" />;
    }
  };

  const getWhatsAppServiceLink = (serviceTitle: string) => {
    const text = `Halo Ibu Tri,%20saya%20ingin%20berkonsultasi%20mengenai%20Layanan%20"${encodeURIComponent(serviceTitle)}"%20yang%20saya%20baca%20di%20website%20personal%20Ibu.`;
    return `https://wa.me/62${CONTACT_INFO.whatsappPrimary}?text=${text}`;
  };

  return (
    <section id="layanan" className="py-20 sm:py-24 bg-[#CAF0F8]/30 relative overflow-hidden">
      {/* Decorative Blur BG Elements */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-light-blue/20 rounded-full filter blur-3xl -z-10" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#00B4D8]/5 rounded-full filter blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#CAF0F8] text-[#0077B6] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
          >
            LAYANAN UTAMA
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            Layanan Properti Profesional &amp; Tepercaya
          </h2>
          <p className="text-gray-600 sm:text-lg leading-relaxed">
            Pendampingan menyeluruh yang adaptif untuk segala kebutuhan jual, beli, sewa, serta instrumen investasi aset properti Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((srv, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              key={srv.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                {/* Icon Circle Frame */}
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-[#CAF0F8]/50 transition-colors duration-300 shadow-inner">
                  {getIcon(srv.iconName)}
                </div>

                {/* Service Title */}
                <h3 className="font-serif font-bold text-xl text-navy tracking-tight group-hover:text-[#0077B6] transition-colors">
                  {srv.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-slate-500 leading-relaxed text-left">
                  {srv.description}
                </p>
              </div>

              {/* Card Footer Action */}
              <div className="pt-6 mt-6 border-t border-slate-100/80 flex items-center justify-between select-none">
                <a
                  href={getWhatsAppServiceLink(srv.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-extrabold text-[#0077B6] group-hover:text-navy uppercase tracking-wider flex items-center space-x-1.5 transition-colors focus:underline outline-none"
                >
                  <span>Minta Konsultasi</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <span className="text-xs text-slate-300 font-bold tracking-widest font-mono">
                  {`0${idx + 1}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

