import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  BedDouble,
  Bath,
  Square,
  Eye,
  CheckCircle2,
  X,
  House,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Star,
  ArrowRight,
} from 'lucide-react';
import { Property } from '../types';
import { propertyService } from '../services/propertyService';
import { CONTACT_INFO } from '../data';
import { FilterState } from './PropertySearch';

interface PropertySectionProps {
  filters: FilterState;
}

// Helper: Fungsi untuk mengecek apakah properti berupa tanah/kavling kosong
const isLandProperty = (type?: string) => {
  if (!type) return false;
  const lowerType = type.toLowerCase();
  return lowerType.includes('tanah') || lowerType.includes('kavling');
};

// Helper: Fungsi untuk mengecek properti komersial
const isCommercialProperty = (type?: string) => {
  if (!type) return false;

  const lowerType = type.toLowerCase();

  return (
    lowerType.includes('komersial') ||
    lowerType.includes('ruko') ||
    lowerType.includes('retail') ||
    lowerType.includes('kantor') ||
    lowerType.includes('office') ||
    lowerType.includes('loft')
  );
};

// Helper: Ekstraksi Gambar
const getPropertyImages = (prop: Property | null): string[] => {
  if (!prop) return [];

  const list: string[] = [];

  if (prop.cover_image_url) list.push(prop.cover_image_url);

  if (prop.images && Array.isArray(prop.images)) {
    prop.images.forEach((img) => {
      if (img && typeof img === 'string') list.push(img);
    });
  }

  return list.length > 0
    ? list
    : [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
      ];
};

export default function PropertySection({ filters }: PropertySectionProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // State untuk Slider Image di Modal
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);

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

  // Memoize propertyImages agar tidak render ulang berlebih
  const propertyImages = useMemo(() => {
    return getPropertyImages(selectedProperty);
  }, [selectedProperty]);

  // Reset Index & Loading State saat modal baru dibuka
  useEffect(() => {
    setCurrentImgIndex(0);
    setIsImgLoading(true);
  }, [selectedProperty]);

  // Set Loading State setiap kali gambar ganti
  useEffect(() => {
    setIsImgLoading(true);
  }, [currentImgIndex]);

  // Preload gambar selanjutnya
  useEffect(() => {
    if (propertyImages.length > 1) {
      const nextIndex = (currentImgIndex + 1) % propertyImages.length;
      const img = new Image();
      img.src = propertyImages[nextIndex];
    }
  }, [currentImgIndex, propertyImages]);

  // Fetch Properties
  useEffect(() => {
    let isMounted = true;

    async function loadProperties() {
      try {
        setLoading(true);
        const data = await propertyService.getPublishedProperties();

        if (isMounted) {
          setProperties(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error loading properties from Supabase:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProperties = properties.filter((prop) => {
    if (!prop) return false;

    if (filters.location) {
      const searchStr = filters.location.toLowerCase();
      const matchArea = prop.area?.toLowerCase().includes(searchStr);
      const matchCity = prop.city?.toLowerCase().includes(searchStr);
      const matchTitle = prop.title?.toLowerCase().includes(searchStr);

      if (!matchArea && !matchCity && !matchTitle) return false;
    }

    if (filters.type && prop.property_type !== filters.type) return false;
    if (filters.status && prop.status !== filters.status) return false;

    if (filters.priceRange) {
      const price = prop.price;

      switch (filters.priceRange) {
        case 'under-1.5B':
          return price < 1500000000;
        case '1.5B-2.5B':
          return price >= 1500000000 && price <= 2500000000;
        case '2.5B-5B':
          return price >= 2500000000 && price <= 5000000000;
        case 'above-5B':
          return price > 5000000000;
        case 'rent-under-10M':
          return prop.status === 'Disewakan' && price < 10000000;
        default:
          return true;
      }
    }

    return true;
  });

  const featuredProperties = filteredProperties.filter((prop) => Boolean(prop.featured));
  const regularProperties = filteredProperties.filter((prop) => !Boolean(prop.featured));

  const getWhatsAppPropertyLink = (prop: Property) => {
    const textMessage = `Halo Ibu Farida,%20saya%20tertarik%20dengan%20properti%20"${encodeURIComponent(
      prop.title || ''
    )}"%20yang%20berada%20di%20${encodeURIComponent(
      (prop.area || '') + ', ' + (prop.city || '')
    )}%20dengan%20harga%20${encodeURIComponent(
      prop.price_label || ''
    )}.%20Bisa%20tolong%20berikan%20informasi%20selengkapnya?`;

    return `https://wa.me/62${CONTACT_INFO.whatsappPrimary}?text=${textMessage}`;
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="text-center py-32 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077B6] mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">
          Menghubungkan ke server database cloud...
        </p>
      </div>
    );
  }

  return (
    <section id="properti" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-block bg-very-light-blue text-[#0077B6] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
          >
            PROPERTI PILIHAN
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
            Temukan Properti Pilihan Terbaik
          </h2>

          <p className="text-gray-600 sm:text-lg leading-relaxed">
            Pilihan properti yang telah dikurasi ketat berdasarkan kriteria ketepatan
            lokasi, nilai appraisal pasar yang unggul, dan prospek investasi masa depan.
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <>
            {/* PRIMARY PROJECT SECTION */}
            {featuredProperties.length > 0 && (
              <div className="mb-16">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
                      <Star className="w-4 h-4 fill-current" />
                      Primary Project
                    </div>

                    <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-black text-navy">
                      Project Developer Pilihan
                    </h3>

                    <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                      Listing khusus untuk produk primary, project developer, dan unit
                      komersial unggulan yang sedang dipasarkan.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-7">
                  {featuredProperties.map((prop, idx) => {
                    const isLand = isLandProperty(prop.property_type);
                    const isCommercial = isCommercialProperty(prop.property_type);

                    return (
                      <motion.div
                        key={prop.id}
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: idx * 0.08 }}
                        className="group overflow-hidden rounded-[2rem] bg-[#03045E] text-white shadow-2xl shadow-slate-900/20 border border-white/10"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
                          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[430px] overflow-hidden bg-slate-900">
                            <img
                              src={
                                prop.cover_image_url ||
                                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
                              }
                              alt={prop.title}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                            <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-slate-950 px-4 py-2 text-xs font-black uppercase tracking-wider shadow-lg">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                Primary
                              </span>

                              <span className="rounded-full bg-white/90 text-[#03045E] px-4 py-2 text-xs font-black uppercase tracking-wider shadow-lg">
                                {prop.status}
                              </span>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5">
                              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">
                                {prop.property_type}
                              </p>
                              <h3 className="mt-2 font-serif text-2xl sm:text-4xl font-black leading-tight">
                                {prop.title}
                              </h3>
                            </div>
                          </div>

                          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 bg-gradient-to-br from-[#03045E] via-[#023E8A] to-[#0077B6]">
                            <div>
                              <div className="flex items-center gap-2 text-sm text-cyan-100 font-semibold">
                                <MapPin className="w-4 h-4" />
                                <span>
                                  {prop.area}, {prop.city}
                                </span>
                              </div>

                              <p className="mt-5 text-3xl sm:text-4xl font-black text-white font-mono leading-tight">
                                {prop.price_label}
                              </p>

                              <p className="mt-5 text-sm sm:text-base text-cyan-50/90 leading-relaxed line-clamp-4">
                                {prop.description || 'Tidak ada deskripsi tambahan.'}
                              </p>

                              <div
                                className={`mt-7 grid ${
                                  isLand
                                    ? 'grid-cols-1'
                                    : isCommercial
                                    ? 'grid-cols-2'
                                    : 'grid-cols-3'
                                } gap-3`}
                              >
                                <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                                  <Square className="w-5 h-5 text-cyan-200 mb-2" />
                                  <p className="text-xs text-cyan-100">Luas Tanah</p>
                                  <p className="font-black text-white">
                                    {prop.land_area ? `${prop.land_area} m²` : '-'}
                                  </p>
                                </div>

                                {!isLand && (
                                  <>
                                    <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                                      <House className="w-5 h-5 text-cyan-200 mb-2" />
                                      <p className="text-xs text-cyan-100">
                                        Luas Bangunan
                                      </p>
                                      <p className="font-black text-white">
                                        {prop.building_area
                                          ? `${prop.building_area} m²`
                                          : '-'}
                                      </p>
                                    </div>

                                    {!isCommercial && (
                                      <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                                        <Bath className="w-5 h-5 text-cyan-200 mb-2" />
                                        <p className="text-xs text-cyan-100">K. Mandi</p>
                                        <p className="font-black text-white">
                                          {prop.bathrooms || '-'}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() => setSelectedProperty(prop)}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-[#03045E] px-5 py-3.5 text-sm font-black hover:bg-cyan-50 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                Lihat Detail
                              </button>

                              <a
                                href={getWhatsAppPropertyLink(prop)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] text-white px-5 py-3.5 text-sm font-black hover:bg-[#20ba56] transition-colors"
                              >
                                <WhatsAppIcon className="w-5 h-5" />
                                Tanya Unit
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* REGULAR LISTING SECTION */}
            {regularProperties.length > 0 && (
              <div>
                {featuredProperties.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl font-black text-navy">
                      Listing Properti Lainnya
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Pilihan listing reguler yang tersedia saat ini.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularProperties.map((prop, idx) => {
                    const isLand = isLandProperty(prop.property_type);
                    const isCommercial = isCommercialProperty(prop.property_type);

                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        key={prop.id}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-350 overflow-hidden flex flex-col h-full group"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                          <img
                            src={
                              prop.cover_image_url ||
                              'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
                            }
                            alt={prop.title}
                            loading="lazy"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />

                          <span
                            className={`absolute top-4 left-4 font-bold text-xs uppercase px-3 py-1.5 rounded-lg shadow ${
                              prop.status === 'Dijual'
                                ? 'bg-[#03045E] text-white'
                                : 'bg-[#0077B6] text-white'
                            }`}
                          >
                            {prop.status}
                          </span>

                          <span className="absolute top-4 right-4 bg-[#00B4D8] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                            {prop.certificate}
                          </span>
                        </div>

                        <div className="p-6 flex flex-col flex-grow space-y-4">
                          <div className="space-y-1.5 flex-grow">
                            <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-semibold uppercase">
                              <span className="bg-slate-100 text-[#0077B6] px-2 py-0.5 rounded">
                                {prop.property_type}
                              </span>

                              <span className="flex items-center text-slate-400">
                                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                                {prop.area}, {prop.city}
                              </span>
                            </div>

                            <h3 className="font-serif font-bold text-lg sm:text-xl text-navy tracking-tight line-clamp-1 group-hover:text-[#0077B6] transition-colors">
                              {prop.title}
                            </h3>

                            <p className="text-xl font-extrabold text-[#0077B6] font-mono">
                              {prop.price_label}
                            </p>

                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1 select-none">
                              {prop.description || 'Tidak ada deskripsi tambahan.'}
                            </p>
                          </div>

                          <div
                            className={`grid ${
                              isLand
                                ? 'grid-cols-1'
                                : isCommercial
                                ? 'grid-cols-2'
                                : 'grid-cols-3'
                            } gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 font-medium`}
                          >
                            <div className="flex items-center space-x-1 justify-center">
                              <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span>LT {prop.land_area ? `${prop.land_area}m²` : '-'}</span>
                            </div>

                            {!isLand && (
                              <>
                                <div className="flex items-center space-x-1 justify-center border-l border-slate-100">
                                  <House className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                  <span>
                                    LB {prop.building_area ? `${prop.building_area}m²` : '-'}
                                  </span>
                                </div>

                                {!isCommercial && (
                                  <div className="flex items-center space-x-1 justify-center border-l border-slate-100">
                                    <BedDouble className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                    <span>KT {prop.bedrooms || '-'}</span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-2 pt-1 select-none">
                            <button
                              onClick={() => setSelectedProperty(prop)}
                              className="flex-grow inline-flex items-center justify-center space-x-1 bg-slate-50 hover:bg-[#CAF0F8] text-navy border border-slate-200/60 hover:border-cyan-blue font-semibold py-2.5 rounded-xl text-sm transition-all duration-300"
                            >
                              <Eye className="w-4 h-4 text-[#0077B6]" />
                              <span>Lihat Detail</span>
                            </button>

                            <a
                              href={getWhatsAppPropertyLink(prop)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Tanya Ibu Farida via WhatsApp"
                              className="p-3 rounded-xl bg-slate-50 hover:bg-[#25D366]/10 text-slate-400 hover:text-[#25D366] border border-slate-200/60 hover:border-[#25D366] transition-all duration-300 flex items-center justify-center cursor-pointer"
                            >
                              <WhatsAppIcon className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto">
            <p className="text-slate-500 font-medium mb-4">
              Tidak ada properti yang cocok dengan filter pencarian Anda.
            </p>

            <button
              onClick={() => {
                window.location.reload();
              }}
              className="text-[#0077B6] underline font-bold"
            >
              Ulangi Semua filter
            </button>
          </div>
        )}
      </div>

      {/* Property Detail Modal Dialog */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProperty(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl relative z-10 flex flex-col md:flex-row border border-slate-200"
            >
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/80 p-2 rounded-full z-30 transition-colors focus:ring-2 focus:ring-cyan-blue"
                aria-label="Tutup Detail"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Slider Area */}
              <div className="w-full md:w-1/2 relative bg-slate-900 h-[280px] sm:h-[350px] md:h-auto md:min-h-full flex items-center justify-center overflow-hidden group flex-shrink-0">
                {/* Indikator Loading Gambar */}
                {isImgLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
                    <Loader2 className="w-8 h-8 text-[#00B4D8] animate-spin mb-2" />
                    <span className="text-xs text-white/80 font-medium animate-pulse">
                      Memuat gambar...
                    </span>
                  </div>
                )}

                <img
                  src={propertyImages[currentImgIndex]}
                  alt={`${selectedProperty.title || 'Properti'} - Foto ${
                    currentImgIndex + 1
                  }`}
                  loading="lazy"
                  onLoad={() => setIsImgLoading(false)}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 select-none ${
                    isImgLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Text Gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-5 pb-12 flex flex-col justify-end text-white pointer-events-none z-20">
                  <span className="inline-block self-start font-bold text-xs bg-[#00B4D8] tracking-wide text-white px-3 py-1.5 rounded-lg mb-2 shadow">
                    {selectedProperty.certificate}
                  </span>

                  <p className="text-sm font-semibold uppercase opacity-90">
                    {selectedProperty.property_type}
                  </p>

                  <h3 className="font-serif font-black text-xl sm:text-2xl tracking-tight leading-tight mt-1">
                    {selectedProperty.title}
                  </h3>
                </div>

                {propertyImages.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-white text-white hover:text-slate-900 p-2 sm:p-2.5 rounded-full transition-all shadow-md backdrop-blur-sm opacity-100 md:opacity-0 group-hover:opacity-100 flex items-center justify-center focus:outline-none z-20"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-white text-white hover:text-slate-900 p-2 sm:p-2.5 rounded-full transition-all shadow-md backdrop-blur-sm opacity-100 md:opacity-0 group-hover:opacity-100 flex items-center justify-center focus:outline-none z-20"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full z-20">
                      {propertyImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImgIndex(idx);
                          }}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentImgIndex
                              ? 'w-4 bg-white'
                              : 'w-1.5 bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Data Detail Panel */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[60vh] md:max-h-[600px] lg:max-h-[700px] bg-white">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">
                        Harga Penawaran
                      </p>
                      <p className="text-xl sm:text-2xl font-extrabold text-[#0077B6] font-mono leading-tight">
                        {selectedProperty.price_label}
                      </p>
                    </div>

                    <span className="font-bold text-xs uppercase px-4 py-2 bg-navy text-white rounded-lg whitespace-nowrap ml-2">
                      {selectedProperty.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                      Spesifikasi Unit
                    </h4>

                    <div
                      className={`grid ${
                        isLandProperty(selectedProperty.property_type)
                          ? 'grid-cols-1'
                          : 'grid-cols-2'
                      } gap-4 bg-slate-50 p-4 rounded-xl text-sm font-medium text-slate-700`}
                    >
                      <div className="flex items-center space-x-2">
                        <Square className="w-4 h-4 text-slate-400" />
                        <span>
                          Luas Tanah:{' '}
                          <strong className="text-navy">
                            {selectedProperty.land_area
                              ? `${selectedProperty.land_area} m²`
                              : '-'}
                          </strong>
                        </span>
                      </div>

                      {!isLandProperty(selectedProperty.property_type) && (
                        <>
                          {selectedProperty.building_area && (
                            <div className="flex items-center space-x-2">
                              <House className="w-4 h-4 text-slate-400" />
                              <span>
                                Luas Bgn:{' '}
                                <strong className="text-navy">
                                  {selectedProperty.building_area} m²
                                </strong>
                              </span>
                            </div>
                          )}

                          {!isCommercialProperty(selectedProperty.property_type) &&
                            selectedProperty.bedrooms && (
                              <div className="flex items-center space-x-2">
                                <BedDouble className="w-4 h-4 text-slate-400" />
                                <span>
                                  K. Tidur:{' '}
                                  <strong className="text-navy">
                                    {selectedProperty.bedrooms}
                                  </strong>
                                </span>
                              </div>
                            )}

                          {!isCommercialProperty(selectedProperty.property_type) &&
                            selectedProperty.bathrooms && (
                              <div className="flex items-center space-x-2">
                                <Bath className="w-4 h-4 text-slate-400" />
                                <span>
                                  K. Mandi:{' '}
                                  <strong className="text-navy">
                                    {selectedProperty.bathrooms}
                                  </strong>
                                </span>
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                      Lokasi
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedProperty.address} ({selectedProperty.area},{' '}
                      {selectedProperty.city})
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                      Informasi Tambahan
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                      {selectedProperty.description || 'Tidak ada deskripsi tambahan.'}
                    </p>
                  </div>

                  {selectedProperty.features && selectedProperty.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                        Keunggulan Utama
                      </h4>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-semibold">
                        {selectedProperty.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center gap-3 mt-6">
                  <a
                    href={getWhatsAppPropertyLink(selectedProperty)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-green-600/20 transition-all duration-300 transform active:scale-95"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Tanyakan Unit via WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}