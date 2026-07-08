import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Eye, FileText, Clock, X, Heart, MessageCircle } from 'lucide-react';
import { ArticleItem } from '../types';
import { ARTICLES_DATA, CONTACT_INFO } from '../data';

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const handleShareArticle = (art: ArticleItem) => {
    const text = `Halo Ibu Farida,%20saya%20membaca%20artikel%20berjudul%20"${encodeURIComponent(art.title)}"%20di%20website%20personal%20Ibu.%20Saya%20tertarik%20berkonsultasi%20mengenai%20topik%20ini.`;
    return `https://wa.me/62${CONTACT_INFO.whatsappPrimary}?text=${text}`;
  };

  return (
    <section id="artikel" className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Visual background rings */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-light-blue/20 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#CAF0F8] text-[#0077B6] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
          >
            WAWASAN PROPERTI
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            Artikel &amp; Edukasi Real Estat
          </h2>
          <p className="text-gray-600 sm:text-lg leading-relaxed">
            Temukan panduan, kalkulasi finansial rill, serta analisis pasar properti Jabodetabek yang dirangkum langsung oleh Farida Listiana.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES_DATA.map((art, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={art.id}
              className="bg-white rounded-2xl border border-slate-100/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full group"
            >
              {/* Thumbnail image and Categories label */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-4 bg-[#03045E] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-md">
                  {art.category}
                </span>
              </div>

              {/* Text context inside article */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  {/* Date and time read */}
                  <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {art.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {art.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-black text-lg text-navy tracking-tight line-clamp-2 leading-snug group-hover:text-[#0077B6] transition-colors">
                    {art.title}
                  </h3>

                  {/* Excerpt Ringkasan */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                {/* Baca Artikel button triggers reading dialog */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between select-none">
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="text-xs font-bold text-[#0077B6] hover:text-navy uppercase tracking-wider flex items-center space-x-1 transition-colors outline-none"
                  >
                    <span>Baca Artikel</span>
                    <span className="group-hover:translate-x-1.5 transition-transform">➔</span>
                  </button>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase font-mono">
                    Oleh Farida L.
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>

      {/* Reading Article Modal Dialog */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Backdrop screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
              onClick={() => setSelectedArticle(null)}
            />

            {/* Reading Container Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[85vh] shadow-2xl relative z-10 flex flex-col border border-slate-200"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-black/60 text-white hover:bg-black/80 p-2 rounded-full z-20 transition-colors focus:ring-2 focus:ring-cyan-blue"
                aria-label="Tutup Artikel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Article Body layout */}
              <div className="overflow-y-auto">
                {/* Banner Thumbnail */}
                <div className="relative aspect-[21/9] bg-slate-100">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-6 flex flex-col justify-end text-white">
                    <span className="self-start text-[10px] font-black tracking-widest bg-cyan-blue uppercase text-white px-3 py-1.5 rounded-lg mb-2">
                      {selectedArticle.category}
                    </span>
                    <h3 className="font-serif font-black text-xl sm:text-2xl leading-tight">
                      {selectedArticle.title}
                    </h3>
                  </div>
                </div>

                {/* Article Prose content */}
                <div className="p-6 sm:p-10 space-y-6 text-left">
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-400 border-b border-slate-100 pb-4">
                    <span>Diterbitkan: <strong>{selectedArticle.date}</strong></span>
                    <span>Waktu: <strong>{selectedArticle.readTime}</strong></span>
                    <span>Penulis: <strong>Farida Listiana</strong></span>
                  </div>

                  {/* Prose */}
                  <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 text-justify">
                    <p className="font-semibold text-navy italic">
                      "{selectedArticle.excerpt}"
                    </p>
                    <p>
                      {selectedArticle.content}
                    </p>
                    <p>
                      Di industri properti modern saat ini, memiliki wawasan mendalam mengenai perkembangan legalitas legal rill sertifikat serta kemampuan pendanaan finansial yang terukur sangat meminimalkan risiko pembelian yang merugikan. Sebagai Konsultan Properti Profesional (terafiliasi dengan Valtis Property), saya berkomitmen melayani Anda dengan wawasan yang menyeluruh dan tepercaya.
                    </p>
                    <p>
                      Jika Anda ingin mendiskusikan topik ini secara privat, atau merancang konsultasi pembelian unit properti idaman Anda bersama saya, silakan klik tombol konsultasi di bawah untuk mengirim pesan langsung ke WhatsApp pribadi saya.
                    </p>
                  </div>

                  {/* Social share actions */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-xs text-slate-400 font-semibold select-none">
                      Bagikan Artikel atau Tanya Mengenai Topik Ini?
                    </div>
                    
                    <a
                      href={handleShareArticle(selectedArticle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 bg-[#0077B6] hover:bg-[#03045E] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all duration-300 transform active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-[#0077B6]" />
                      <span>Diskusi Topik via WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
