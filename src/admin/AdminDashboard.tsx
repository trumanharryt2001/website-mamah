import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Property } from '../types';
import { propertyService } from '../services/propertyService';
import { Plus, LogOut, Home, FileText, Pencil, Trash2, TrendingUp, Building, Tag, Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// --- FUNGSI HELPER UNTUK MEMPROSES DATA GRAFIK 7 HARI TERAKHIR ---
const processVisitorData = (visits: any[]) => {
  const daysName = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const last7Days = [];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push({
      dateStr: d.toDateString(), 
      name: daysName[d.getDay()], 
      pengunjung: 0
    });
  }

  visits.forEach(visit => {
    const visitDate = new Date(visit.created_at).toDateString();
    const dayIndex = last7Days.findIndex(d => d.dateStr === visitDate);
    if (dayIndex !== -1) {
      last7Days[dayIndex].pengunjung += 1;
    }
  });

  return last7Days;
};

export const AdminDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [visitorChartData, setVisitorChartData] = useState<any[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        
        const propData = await propertyService.getPublishedProperties();
        setProperties(propData);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: visitsData, error } = await supabase
          .from('page_views')
          .select('created_at')
          .gte('created_at', sevenDaysAgo.toISOString());

        if (!error && visitsData) {
          setTotalVisitors(visitsData.length);
          setVisitorChartData(processVisitorData(visitsData));
        } else if (error) {
          console.error('Gagal memuat data pengunjung:', error.message);
          setVisitorChartData(processVisitorData([]));
        }

      } catch (error) {
        console.error('Gagal memuat data dashboard:', error);
      } finally { // <--- SUDAH DIPERBAIKI MENJADI FINALLY
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Properti?',
      text: "Data properti yang dihapus beserta seluruh fotonya di storage akan dibersihkan permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', 
      cancelButtonColor: '#94a3b8',  
      confirmButtonText: 'Ya, Hapus Semua!',
      cancelButtonText: 'Batal',
      reverseButtons: true 
    });
    
    if (result.isConfirmed) {
      try {
        setLoading(true);

        // 1. Ambil data secara langsung dari database Supabase
        const { data: propertyData, error: fetchError } = await supabase
          .from('properties')
          .select('cover_image_url, images')
          .eq('id', id)
          .single();

        if (fetchError) throw new Error("Gagal mengambil info gambar dari database.");

        const filesToDelete: string[] = [];

        if (propertyData) {
          // Fungsi pembersih nama file dari query string & URL encoding
          const getCleanFileName = (url: string) => {
            if (!url || url.includes('images.unsplash.com')) return null;
            const noQuery = url.split('?')[0]; 
            const fileName = noQuery.split('/').pop(); 
            return fileName ? decodeURIComponent(fileName) : null; 
          };

          // Ambil nama file cover
          if (propertyData.cover_image_url) {
            const coverName = getCleanFileName(propertyData.cover_image_url);
            if (coverName) filesToDelete.push(coverName);
          }

          // Ambil nama file dari array galeri (images)
          if (Array.isArray(propertyData.images)) {
            propertyData.images.forEach((url: string) => {
              const fileName = getCleanFileName(url);
              if (fileName) filesToDelete.push(fileName);
            });
          }

          // 2. EKSEKUSI HAPUS SEMUA FILE GAMBAR DI SUPABASE STORAGE
          if (filesToDelete.length > 0) {
            const { error: storageError } = await supabase
              .storage
              .from('property-images') 
              .remove(filesToDelete);

            if (storageError) {
              console.error('Gagal membersihkan file di storage:', storageError.message);
            } else {
              console.log('File gambar sukses terhapus dari storage:', filesToDelete);
            }
          }
        }

        // 3. HAPUS DATA DARI DATABASE TABLE
        const { error: deleteError } = await supabase
          .from('properties')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;

        // 4. Perbarui tampilan UI dashboard
        setProperties(prev => prev.filter(prop => prop.id !== id));
        
        Swal.fire({
          title: 'Terhapus!',
          text: 'Properti dan seluruh aset gambar berhasil dibersihkan tanpa sisa.',
          icon: 'success',
          confirmButtonColor: '#0077B6'
        });

      } catch (error: any) {
        console.error('Gagal menghapus properti:', error);
        Swal.fire({
          title: 'Gagal Hapus!',
          text: error.message || 'Terjadi kesalahan saat menghapus properti.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Kalkulasi Statistik
  const totalProperties = properties.length;
  const totalDijual = properties.filter(p => p.status === 'Dijual').length;
  const totalDisewakan = properties.filter(p => p.status === 'Disewakan').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <nav className="bg-[#03045E] text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Home className="w-5 h-5 text-[#CAF0F8]" />
          </div>
          <span className="font-serif font-bold text-lg sm:text-xl tracking-tight">Admin Tri Yatmi</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1.5 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Keluar Sesi</span>
        </button>
      </nav>

      {/* Main Content Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Ringkasan Dashboard</h1>
            <p className="mt-1.5 text-sm text-slate-500">Pantau performa website dan kelola listing properti Anda.</p>
          </div>
          <button 
            onClick={() => navigate('/admin/properties/new')}
            className="inline-flex items-center justify-center space-x-2 bg-[#0077B6] hover:bg-[#03045E] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-cyan-blue/20 transition-all transform active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah Properti Baru</span>
          </button>
        </div>

        {/* OVERVIEW STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">+Aktif</span>
            </div>
            <h3 className="text-3xl font-black text-slate-800">{totalProperties}</h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Total Properti</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <Tag className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-800">{totalDijual}</h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Status Dijual</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center">
                <Home className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-800">{totalDisewakan}</h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Status Disewakan</p>
          </div>

          <div className="bg-gradient-to-br from-[#03045E] to-[#0077B6] p-5 rounded-2xl shadow-md border border-[#0077B6] flex flex-col text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#CAF0F8]" />
            </div>
            <h3 className="text-3xl font-black text-white">{totalVisitors}</h3>
            <p className="text-xs font-medium text-blue-200 uppercase tracking-wider mt-1">Kunjungan Web (7 Hari)</p>
          </div>
        </div>

        {/* GRAFIK AREA PENGUNJUNG */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Trafik Pengunjung Website</h2>
              <p className="text-xs text-slate-500 mt-1">Statistik kunjungan unik dalam 7 hari terakhir</p>
            </div>
          </div>
          <div className="h-[280px] w-full">
            {visitorChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0077B6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0077B6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pengunjung" 
                    stroke="#0077B6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorViews)" 
                    activeDot={{ r: 6, fill: '#03045E', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                Memuat data grafik...
              </div>
            )}
          </div>
        </div>

        {/* MANAJEMEN LISTING PROPERTI */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Daftar Properti Anda</h2>
          
          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0077B6] mx-auto mb-4"></div>
              <p className="text-slate-500 font-medium">Memproses data...</p>
            </div>
          ) : properties.length > 0 ? (
            <div className="bg-white shadow-sm rounded-2xl border border-slate-100 overflow-hidden">
              
              {/* TAMPILAN DESKTOP */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-sm text-left">
                  <thead className="bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-6 py-4">Properti</th>
                      <th className="px-6 py-4">Tipe & Status</th>
                      <th className="px-6 py-4">Harga</th>
                      <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {properties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 flex items-center space-x-4 font-medium text-slate-900">
                          <img 
                            src={prop.cover_image_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'} 
                            alt="" 
                            className="w-14 h-14 object-cover rounded-xl bg-slate-100 shadow-sm" 
                          />
                          <div>
                            <div className="font-bold text-sm line-clamp-1">{prop.title}</div>
                            <div className="text-xs text-slate-400 font-medium mt-0.5">{prop.area}, {prop.city}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-700">{prop.property_type}</div>
                          <span className={`inline-block text-[10px] uppercase tracking-wider mt-1 font-bold px-2 py-0.5 rounded-md ${prop.status === 'Dijual' ? 'bg-blue-50 text-blue-600' : 'bg-cyan-50 text-cyan-600'}`}>{prop.status}</span>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-[#0077B6]">{prop.price_label}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center space-x-2">
                            <Link 
                              to={`/admin/properties/edit/${prop.id}`}
                              className="p-2 bg-slate-50 hover:bg-[#CAF0F8] text-[#0077B6] rounded-lg transition-colors border border-slate-200 hover:border-cyan-blue"
                              title="Edit Properti"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button 
                              onClick={() => handleDelete(prop.id)}
                              className="p-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition-colors border border-red-100"
                              title="Hapus Properti"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TAMPILAN MOBILE */}
              <div className="block md:hidden divide-y divide-slate-100">
                {properties.map((prop) => (
                  <div key={prop.id} className="p-5 flex flex-col space-y-4 bg-white hover:bg-slate-50/50">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={prop.cover_image_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'} 
                        alt="" 
                        className="w-20 h-20 object-cover rounded-xl shadow-sm bg-slate-100 flex-shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-slate-800 line-clamp-2 text-sm leading-tight">{prop.title}</div>
                        <div className="text-xs text-slate-400 font-medium mt-1">{prop.area}, {prop.city}</div>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{prop.property_type}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${prop.status === 'Dijual' ? 'bg-blue-50 text-blue-600' : 'bg-cyan-50 text-cyan-600'}`}>
                            {prop.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-dashed border-slate-200">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Harga</span>
                        <span className="text-sm font-black text-[#0077B6] font-mono">{prop.price_label}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link 
                          to={`/admin/properties/edit/${prop.id}`}
                          className="p-2 bg-slate-50 hover:bg-[#0077B6] text-[#0077B6] hover:text-white border border-slate-200 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(prop.id)}
                          className="p-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 max-w-xl mx-auto px-6 shadow-sm">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800">Katalog Properti Kosong</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">Anda belum menambahkan properti apapun. Klik tombol biru di atas untuk membuat listing pertama Anda!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


