import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  Loader2,
  Save,
  ImageIcon,
  Trash2,
  Plus,
  Star,
} from 'lucide-react';
import Swal from 'sweetalert2';

type PropertyFormData = {
  title: string;
  property_type: string;
  status: string;
  certificate: string;
  price: string;
  price_label: string;
  area: string;
  city: string;
  address: string;
  description: string;
  land_area: string;
  building_area: string;
  bedrooms: string;
  bathrooms: string;
  cover_image_url: string;
  images: string[];
  featured: boolean;
};

export default function EditProperty() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    property_type: 'Rumah',
    status: 'Dijual',
    certificate: 'SHM',
    price: '',
    price_label: '',
    area: '',
    city: '',
    address: '',
    description: '',
    land_area: '',
    building_area: '',
    bedrooms: '',
    bathrooms: '',
    cover_image_url: '',
    images: [],
    featured: false,
  });

  const isTanah = formData.property_type === 'Tanah' || formData.property_type === 'Kavling';
  const isGudang = formData.property_type === 'Gudang';
  const isRuko = formData.property_type === 'Ruko';
  const isKomersial = formData.property_type === 'Komersial';

  const tanpaBangunan = isTanah;
  const tanpaKamarTidur = isTanah || isGudang || isRuko || isKomersial;
  const tanpaKamarMandi = isTanah || isKomersial;

  useEffect(() => {
    async function fetchPropertyDetail() {
      try {
        setLoading(true);
        if (!id) return;

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            title: data.title || '',
            property_type: data.property_type || 'Rumah',
            status: data.status || 'Dijual',
            certificate: data.certificate || 'SHM',
            price: data.price?.toString() || '',
            price_label: data.price_label || '',
            area: data.area || '',
            city: data.city || '',
            address: data.address || '',
            description: data.description || '',
            land_area: data.land_area?.toString() || '',
            building_area: data.building_area?.toString() || '',
            bedrooms: data.bedrooms?.toString() || '',
            bathrooms: data.bathrooms?.toString() || '',
            cover_image_url: data.cover_image_url || '',
            images: Array.isArray(data.images) ? data.images : [],
            featured: Boolean(data.featured),
          });
        }
      } catch (error) {
        console.error('Gagal memuat detail properti:', error);

        Swal.fire({
          icon: 'error',
          title: 'Data Tidak Ditemukan',
          text: 'Properti yang Anda cari tidak tersedia atau telah dihapus.',
          confirmButtonColor: '#0077B6',
        }).then(() => {
          navigate('/admin/dashboard');
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPropertyDetail();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    if (name === 'property_type') {
      const nextIsTanah = value === 'Tanah' || value === 'Kavling';
      const nextIsGudang = value === 'Gudang';
      const nextIsRuko = value === 'Ruko';
      const nextIsKomersial = value === 'Komersial';

      const nextTanpaKamarTidur =
        nextIsTanah || nextIsGudang || nextIsRuko || nextIsKomersial;

      const nextTanpaKamarMandi = nextIsTanah || nextIsKomersial;

      setFormData((prev) => ({
        ...prev,
        property_type: value,
        building_area: nextIsTanah ? '' : prev.building_area,
        bedrooms: nextTanpaKamarTidur ? '' : prev.bedrooms,
        bathrooms: nextTanpaKamarMandi ? '' : prev.bathrooms,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      setUploadingCover(true);

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const uniqueId = Date.now() + '-' + Math.random().toString(36).substring(2, 7);
      const fileName = `cover_${uniqueId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);

      if (data?.publicUrl) {
        if (formData.cover_image_url) {
          const oldCoverName = formData.cover_image_url.split('/').pop();

          if (oldCoverName && !formData.cover_image_url.includes('images.unsplash.com')) {
            await supabase.storage.from('property-images').remove([oldCoverName]);
          }
        }

        setFormData((prev) => ({
          ...prev,
          cover_image_url: data.publicUrl,
        }));

        Swal.fire({
          icon: 'success',
          title: 'Foto utama berhasil diperbarui',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Gagal upload cover:', error);

      Swal.fire({
        icon: 'error',
        title: 'Upload Gagal',
        text: 'Gagal mengunggah foto utama ke cloud storage.',
        confirmButtonColor: '#0077B6',
      });
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      setUploadingGallery(true);

      const files = Array.from(e.target.files) as File[];
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const uniqueId = Date.now() + '-' + Math.random().toString(36).substring(2, 7);
        const fileName = `gallery_${uniqueId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);

        if (data?.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        }
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      Swal.fire({
        icon: 'success',
        title: `${uploadedUrls.length} Foto berhasil ditambahkan ke galeri`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error('Gagal upload gambar galeri:', error);

      Swal.fire({
        icon: 'error',
        title: 'Upload Galeri Gagal',
        text: 'Terjadi kesalahan saat mengunggah beberapa foto galeri.',
        confirmButtonColor: '#0077B6',
      });
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = async (indexToRemove: number) => {
    const imageUrlToRemove = formData.images[indexToRemove];

    if (!imageUrlToRemove) return;

    const result = await Swal.fire({
      title: 'Hapus Foto dari Galeri?',
      text: 'Foto akan langsung dihapus permanen dari penyimpanan cloud Supabase!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Ya, Hapus Foto',
      cancelButtonText: 'Batal',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const fileName = imageUrlToRemove.split('/').pop();

        if (fileName) {
          const { error: storageError } = await supabase.storage
            .from('property-images')
            .remove([fileName]);

          if (storageError) throw storageError;
        }

        setFormData((prev) => ({
          ...prev,
          images: prev.images.filter((_, index) => index !== indexToRemove),
        }));

        Swal.fire({
          icon: 'success',
          title: 'Foto berhasil dihapus dari cloud storage',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error('Gagal menghapus gambar galeri:', error);

        Swal.fire({
          icon: 'error',
          title: 'Gagal Hapus',
          text: 'Terjadi masalah saat menghapus foto di cloud storage.',
          confirmButtonColor: '#0077B6',
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (!id) return;

      const cleanImagesArray = Array.isArray(formData.images)
        ? formData.images.filter((url) => typeof url === 'string' && url.trim() !== '')
        : [];

      const submitIsTanah =
        formData.property_type === 'Tanah' || formData.property_type === 'Kavling';
      const submitIsGudang = formData.property_type === 'Gudang';
      const submitIsRuko = formData.property_type === 'Ruko';
      const submitIsKomersial = formData.property_type === 'Komersial';

      const submitTanpaBangunan = submitIsTanah;
      const submitTanpaKamarTidur =
        submitIsTanah || submitIsGudang || submitIsRuko || submitIsKomersial;
      const submitTanpaKamarMandi = submitIsTanah || submitIsKomersial;

      const updatedData = {
        title: formData.title,
        property_type: formData.property_type,
        status: formData.status,
        certificate: formData.certificate,
        price: Number(formData.price) || 0,
        price_label: formData.price_label,
        area: formData.area,
        city: formData.city,
        address: formData.address,
        description: formData.description,
        land_area: formData.land_area ? Number(formData.land_area) : null,
        building_area: submitTanpaBangunan
          ? null
          : formData.building_area
            ? Number(formData.building_area)
            : null,
        bedrooms: submitTanpaKamarTidur
          ? null
          : formData.bedrooms
            ? Number(formData.bedrooms)
            : null,
        bathrooms: submitTanpaKamarMandi
          ? null
          : formData.bathrooms
            ? Number(formData.bathrooms)
            : null,
        cover_image_url: formData.cover_image_url,
        images: cleanImagesArray,
        featured: Boolean(formData.featured),
      };

      const { error } = await supabase
        .from('properties')
        .update(updatedData)
        .eq('id', id);

      if (error) throw error;

      Swal.fire({
        icon: 'success',
        title: 'Perubahan Disimpan!',
        text: 'Data properti dan galeri foto berhasil diperbarui.',
        confirmButtonColor: '#0077B6',
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        navigate('/admin/dashboard');
      });
    } catch (error) {
      console.error('Error updating property:', error);

      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: 'Sistem cloud gagal memperbarui data properti ini.',
        confirmButtonColor: '#0077B6',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 animate-spin text-[#0077B6] mx-auto" />
          <p className="text-slate-500 font-medium">Memuat data properti...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-8">
        {/* Header Form */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-5 mb-6">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Edit Data Properti
          </h1>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Nama / Judul Listing
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Tipe Properti
              </label>
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              >
                <option value="Rumah">Rumah</option>
                <option value="Tanah">Tanah</option>
                <option value="Apartemen">Apartemen</option>
                <option value="Ruko">Ruko</option>
                <option value="Villa">Villa</option>
                <option value="Gudang">Gudang</option>
                <option value="Komersial">Komersial</option>
                <option value="Kavling">Kavling</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              >
                <option value="Dijual">Dijual</option>
                <option value="Disewakan">Disewakan</option>
              </select>
            </div>

            {/* Primary Project */}
            <label className="col-span-1 sm:col-span-2 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 cursor-pointer hover:bg-amber-100 transition-colors">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mt-1 h-5 w-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />

              <span>
                <span className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                  <Star className="w-4 h-4 text-amber-600" />
                  Jadikan Primary Project
                </span>
                <span className="block text-xs text-slate-600 mt-0.5">
                  Aktifkan agar properti ini tampil sebagai banner khusus di halaman depan.
                </span>
              </span>
            </label>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Sertifikat
              </label>
              <select
                name="certificate"
                value={formData.certificate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              >
                <option value="SHM">SHM</option>
                <option value="SHGB">SHGB</option>
                <option value="HGB">HGB</option>
                <option value="PPJB">PPJB</option>
                <option value="Hubungi Marketing">Hubungi Marketing</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Harga Dasar (Angka)
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Label Harga Teks (Tampil di Web)
              </label>
              <input
                type="text"
                name="price_label"
                required
                value={formData.price_label}
                onChange={handleChange}
                placeholder="Contoh: Rp 1,5 Miliar"
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Area / Daerah
              </label>
              <input
                type="text"
                name="area"
                required
                value={formData.area}
                onChange={handleChange}
                placeholder="Contoh: BSD City"
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Kota
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Alamat Lengkap (Boleh Kosong)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
              />
            </div>

            {/* Spesifikasi Dimensi Tanah & Bangunan */}
            <div className="grid grid-cols-2 gap-4 col-span-1 sm:col-span-2">
              <div className={tanpaBangunan ? 'col-span-2' : 'col-span-1'}>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  L. Tanah (m²)
                </label>
                <input
                  type="number"
                  name="land_area"
                  value={formData.land_area}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                />
              </div>

              {!tanpaBangunan && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    L. Bangun (m²)
                  </label>
                  <input
                    type="number"
                    name="building_area"
                    value={formData.building_area}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                  />
                </div>
              )}
            </div>

            {/* Kamar Mandi & Kamar Tidur Kondisional */}
            {(!tanpaKamarTidur || !tanpaKamarMandi) && (
              <div className="grid grid-cols-2 gap-4 col-span-1 sm:col-span-2">
                {!tanpaKamarTidur && (
                  <div className={tanpaKamarMandi ? 'col-span-2' : 'col-span-1'}>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Kamar Tidur
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                    />
                  </div>
                )}

                {!tanpaKamarMandi && (
                  <div className={tanpaKamarTidur ? 'col-span-2' : 'col-span-1'}>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Kamar Mandi
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Foto Utama */}
            <div className="col-span-1 sm:col-span-2 space-y-2 border-t border-slate-100 pt-6">
              <label className="block text-sm font-semibold text-slate-700">
                Foto Utama (Cover Thumbnail)
              </label>

              <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                {formData.cover_image_url ? (
                  <img
                    src={formData.cover_image_url}
                    alt="Cover"
                    className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded-lg border border-slate-300 shadow-sm"
                  />
                ) : (
                  <div className="w-full sm:w-32 h-40 sm:h-24 flex flex-col items-center justify-center bg-slate-200 text-slate-400 rounded-lg">
                    <ImageIcon className="w-7 h-7" />
                  </div>
                )}

                <label className="w-full sm:w-auto text-center bg-white hover:bg-slate-100 text-[#0077B6] px-5 py-2.5 rounded-lg text-sm font-bold border border-slate-300 shadow-sm cursor-pointer transition-all">
                  {uploadingCover ? 'Mengunggah...' : 'Ganti Foto Utama'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                    disabled={uploadingCover}
                  />
                </label>
              </div>
            </div>

            {/* Galeri Foto */}
            <div className="col-span-1 sm:col-span-2 space-y-4 border-t border-slate-100 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Galeri Foto Tambahan
                  </label>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-1">
                    Interior, eksterior, fasum, dll. Anda bisa memilih beberapa foto sekaligus.
                  </p>
                </div>

                <label className="inline-flex items-center justify-center space-x-1.5 bg-[#0077B6] hover:bg-[#03045E] text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm whitespace-nowrap">
                  {uploadingGallery ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>Tambah Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryUpload}
                    disabled={uploadingGallery}
                  />
                </label>
              </div>

              {formData.images && formData.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  {formData.images.map((url, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square sm:aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm"
                    >
                      <img
                        src={url}
                        alt={`Galeri ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transform active:scale-95 transition-all"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 bg-slate-50/50">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-70" />
                  <p className="text-xs font-medium">Belum ada foto galeri.</p>
                </div>
              )}
            </div>

            <div className="col-span-1 sm:col-span-2 border-t border-slate-100 pt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Deskripsi Lengkap (Teks Bebas)
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition-all resize-y"
              />
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="pt-6 border-t border-slate-100 pb-2 sm:pb-0">
            <button
              type="submit"
              disabled={saving || uploadingCover || uploadingGallery}
              className="w-full sm:w-auto sm:float-right inline-flex items-center justify-center space-x-2 bg-[#0077B6] hover:bg-[#03045E] text-white px-8 py-3.5 sm:py-3 rounded-xl font-bold transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>

            <div className="clear-both"></div>
          </div>
        </form>
      </div>
    </div>
  );
}



