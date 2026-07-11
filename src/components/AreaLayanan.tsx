import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { PROPERTY_AREAS } from '../data';

interface AreaLayananProps {
  onSelectArea: (areaName: string) => void;
}

export default function AreaLayanan({ onSelectArea }: AreaLayananProps) {
  
  // Fungsi penangan klik kartu area wilayah
  const handleAreaClick = (areaName: string) => {
    // 1. Jalankan fungsi filter bawaan dari parent component
    onSelectArea(areaName);
    
    // 2. Otomatis gulir halaman ke element id="properti" secara smooth
    const propertySection = document.getElementById('properti');
    if (propertySection) {
      propertySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-very-light-blue text-[#0077B6] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
          >
            CAKUPAN WILAYAH
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            Area Layanan Properti Kunci
          </h2>
          <p className="text-gray-600 sm:text-lg leading-relaxed">
            Menyediakan ragam listing perumahan dan komersial premium yang terfokus pada episentrum ekonomi Jabodetabek yang bernilai tinggi.
          </p>
        </div>

        {/* Areas Carousel/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROPERTY_AREAS.map((area, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={area.id}
              onClick={() => handleAreaClick(area.name)} // Klik di seluruh area kartu juga akan memicu filter
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Photo */}
              <img
                src={area.image}
                alt={`Kawasan Properti ${area.name}`}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Biru Transparan sesuai mandat */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-[#0077B6]/70 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Card Content & Text */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-light-blue flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>LOKAL AGEN</span>
                  </div>
                  <span className="text-xs text-light-blue/80 font-mono font-semibold">
                    {area.propertyCount}+ Units
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-black text-xl sm:text-2xl tracking-wide text-white leading-tight">
                    {area.name}
                  </h3>
                  
                  {/* Action Link directly updates the query, scrolling to properties list */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Mencegah double trigger karena div parent sudah memiliki onClick
                      handleAreaClick(area.name);
                    }}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-blue hover:text-white uppercase tracking-wider transition-colors focus:outline-none"
                  >
                    <span>Lihat Properti</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}



