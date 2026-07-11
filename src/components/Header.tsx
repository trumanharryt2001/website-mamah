import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const WhatsAppIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'Beranda', id: 'home' },
    { name: 'Properti', id: 'properti' },
    { name: 'Layanan', id: 'layanan' },
    { name: 'Tentang', id: 'tentang' },
    { name: 'Titip Properti', id: 'titip' },
    { name: 'Artikel', id: 'artikel' },
    { name: 'Kontak', id: 'kontak' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  const wsLink = `https://wa.me/62${CONTACT_INFO.whatsappPrimary}?text=Halo%20Ibu%20Triyatmi%2C%20saya%20mendapatkan%20informasi%20dari%20website%20personal%20Ibu.%20Saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20properti.`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/92 backdrop-blur-xl border-b border-slate-200/70 shadow-sm'
            : 'bg-white/82 backdrop-blur-md border-b border-white/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[68px] sm:h-[72px] flex items-center justify-between">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2.5 text-left min-w-0 focus:outline-none focus:ring-2 focus:ring-[#00B4D8] rounded-xl"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#03045E] text-white font-serif font-black text-lg sm:text-xl flex items-center justify-center shadow-md shrink-0">
                TY
              </div>

              <div className="min-w-0">
                <span className="block font-serif font-extrabold text-[15px] sm:text-xl tracking-wide text-[#03045E] leading-tight truncate">
                  Triyatmi
                </span>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#0077B6] font-black leading-tight truncate">
                  Konsultan Properti
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-bold transition-colors ${
                    activeSection === item.id
                      ? 'text-[#03045E]'
                      : 'text-slate-600 hover:text-[#0077B6]'
                  }`}
                >
                  {item.name}

                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeBubble"
                      className="absolute inset-0 bg-[#CAF0F8] rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden sm:block">
              <a
                href={wsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#03045E] hover:bg-[#0077B6] text-white px-4.5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6]"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span className="hidden md:inline">Konsultasi</span>
                <span className="md:hidden">WA</span>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={wsLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="sm:hidden w-10 h-10 rounded-xl bg-[#0077B6] text-white hover:bg-[#03045E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B4D8] flex items-center justify-center shadow-sm"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 rounded-xl text-[#03045E] hover:bg-[#CAF0F8] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] flex items-center justify-center"
                aria-expanded={isOpen}
                aria-label="Buka menu navigasi"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9999] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-slate-950"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative mx-3 mt-3 rounded-[1.75rem] overflow-hidden bg-white shadow-2xl border border-white/70"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-4 py-4 bg-gradient-to-r from-[#03045E] to-[#0077B6] text-white">
                <button
                  type="button"
                  onClick={() => handleLinkClick('home')}
                  className="flex items-center gap-2 text-left min-w-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/14 border border-white/15 text-white font-serif font-black text-base flex items-center justify-center shrink-0">
                    FL
                  </div>

                  <div className="min-w-0">
                    <span className="block font-serif font-bold text-base tracking-wide truncate">
                      Triyatmi
                    </span>
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-[#CAF0F8] font-semibold truncate">
                      Konsultan Properti
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 flex items-center justify-center"
                  aria-label="Tutup menu navigasi"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="p-4 bg-white">
                <div className="grid gap-1.5">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.035 }}
                      onClick={() => handleLinkClick(item.id)}
                      className={`w-full flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] font-bold transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#CAF0F8] text-[#03045E]'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#0077B6]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ArrowRight
                        className={`w-4 h-4 ${
                          activeSection === item.id ? 'text-[#0077B6]' : 'text-slate-300'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>

                <a
                  href={wsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#03045E] hover:bg-[#0077B6] text-white py-3.5 rounded-2xl font-bold shadow-md transition-all duration-300"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Hubungi Ibu Tri</span>
                  <ArrowRight className="w-4 h-4 text-[#CAF0F8]" />
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



