import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase'; // 👈 Import Supabase ditambahkan di sini

// Import komponen-komponen utama publik lama Anda
import Header from './components/Header';
import Hero from './components/Hero';
import PropertySearch, { FilterState } from './components/PropertySearch';
import PropertySection from './components/PropertySection';
import About from './components/About';
import Services from './components/Services';
import WhyChooseTriYatmi from './components/WhyChooseTriYatmi';
import AreaLayanan from './components/AreaLayanan';
import WorkProcess from './components/WorkProcess';
import ConsignmentForm from './components/ConsignmentForm';
// import Testimonials from './components/Testimonials';
import Articles from './components/Articles';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import FloatingWA from './components/FloatingWA';

// Import komponen admin baru kita
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedRoute from './admin/ProtectedRoute';
import AddProperty from './admin/AddProperty';
import EditProperty from './admin/EditProperty';

// --- KOMPONEN HALAMAN UTAMA PUBLIK ---
function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    type: '',
    status: '',
    priceRange: '',
  });

  // 1. Synchronize SEO Metas & Structured LocalBusiness Schema
  useEffect(() => {
    document.title = 'Triyatmi | Konsultan Properti Utama & Agen Profesional';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Website personal resmi Triyatmi, konsultan properti profesional terpercaya (terafiliasi dengan Valtis Property) untuk kebutuhan jual, beli, sewa, serta investasi.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Website personal resmi Triyatmi, konsultan properti profesional terpercaya (terafiliasi dengan Valtis Property) untuk kebutuhan jual, beli, sewa, serta investasi.';
      document.head.appendChild(meta);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      'name': 'Triyatmi - Konsultan Properti Utama',
      'image': `${window.location.origin}/images/tri-yatmi-professional.png`,
      'description': 'Temukan properti terbaik bersama Triyatmi, konsultan properti profesional terpercaya untuk kebutuhan jual, beli, sewa, serta investasi di Jabodetabek.',
      'telephone': '+62 819-1109-2009',
      'url': window.location.origin,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Ruko Alicante Blok A. No 10, Gading Serpong, Pagedangan',
        'addressLocality': 'Tangerang Regency',
        'addressRegion': 'Banten',
        'postalCode': '15334',
        'addressCountry': 'ID'
      }
    };

    const scriptId = 'valtis-jsonld';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, []);

  // 2. Multi-section Active Observer on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      const sections = [
        { id: 'home', element: document.getElementById('home') },
        { id: 'properti', element: document.getElementById('properti') },
        { id: 'layanan', element: document.getElementById('layanan') },
        { id: 'tentang', element: document.getElementById('tentang') },
        { id: 'titip', element: document.getElementById('titip') },
        { id: 'artikel', element: document.getElementById('artikel') },
        { id: 'kontak', element: document.getElementById('kontak') },
      ];

      for (const section of sections) {
        if (section.element) {
          const top = section.element.offsetTop;
          const height = section.element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🌟 3. SISTEM PELACAK PENGUNJUNG (REAL-TIME TRACKER)
  useEffect(() => {
    async function logVisit() {
      // Menggunakan sessionStorage agar refresh halaman tidak dihitung ganda
      if (!sessionStorage.getItem('has_visited')) {
        try {
          const { error } = await supabase.from('page_views').insert([{}]);
          if (!error) {
            sessionStorage.setItem('has_visited', 'true');
          } else {
            console.error('Error logging visit to Supabase:', error);
          }
        } catch (error) {
          console.error('Gagal mencatat kunjungan:', error);
        }
      }
    }
    logVisit();
  }, []);

  // Smooth scroll helper
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // Search filter submit
  const handleSearchFilter = (newFilters: FilterState) => {
    setFilters(newFilters);
    handleNavigation('properti');
  };

  // Regional selection trigger
  const handleSelectArea = (areaName: string) => {
    // KUNCI PERBAIKAN: Normalisasi nama "BSD City" menjadi "BSD" agar query pencarian cocok
    // dengan data teks "BSD" yang ada di database / panel admin.
    const searchLocation = areaName === 'BSD City' ? 'BSD' : areaName;

    setFilters({
      location: searchLocation,
      type: '',
      status: '',
      priceRange: '',
    });
    handleNavigation('properti');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-cyan-blue selection:text-white">
      {/* Dynamic Glass Sticky Header */}
      <Header activeSection={activeSection} onNavigate={handleNavigation} />

      <main className="flex-grow pt-0">
        {/* Home Banner section */}
        <Hero onSearchClick={() => handleNavigation('properti')} onNavigate={handleNavigation} />

        {/* Floating Property Search Filter Box */}
        <PropertySearch onSearch={handleSearchFilter} />

        {/* Live filtered Properties catalog section */}
        <PropertySection filters={filters} />

        {/* Layout services bento style section */}
        <Services />

        {/* Detailed biographical content section */}
        <About onNavigate={handleNavigation} />

        {/* Value props points highlights */}
        <WhyChooseTriYatmi />

        {/* Grid of geographical areas coverages */}
        <AreaLayanan onSelectArea={handleSelectArea} />

        {/* Stepper Work progress timeline section */}
        <WorkProcess />

        {/* Drag-drop property deposit submission form */}
        <ConsignmentForm />

        {/* Genuine verified testimonials section */}
        {/* <Testimonials /> */}

        {/* Blog articles modular educational section */}
        <Articles />

        {/* Conversions call-to-action cards */}
        <CTASection onNavigate={handleNavigation} />
      </main>

      {/* Structured professional corporate footer */}
      <Footer onNavigate={handleNavigation} />

      {/* Sticky Dual WhatsApp Actions contact hub */}
      <FloatingWA />
    </div>
  );
}

// --- UTAMA APP ROUTER SWITCHBOARD ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik: Mengarah ke halaman utama */}
        <Route path="/" element={<HomePage />} />

        {/* Rute Admin: Form Isian Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rute Admin: Dashboard Utama yang diproteksi Guard Session */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Rute Admin: Tambah properti baru */}
        <Route 
          path="/admin/properties/new" 
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          } 
        />

        {/* Rute Admin: Edit properti bawaan ID parameter */}
        <Route 
          path="/admin/properties/edit/:id" 
          element={
            <ProtectedRoute>
              <EditProperty />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}




