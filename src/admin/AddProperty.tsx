import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Save, Image, UploadCloud, X, Star } from 'lucide-react';

export const AddProperty: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State deteksi input Kota/Kabupaten (Dropdown atau Ketik Manual)
  const [isCustomCity, setIsCustomCity] = useState<boolean>(false);

  // 1. STATE UNTUK COVER UTAMA
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 2. STATE UNTUK GALERI FOTO TAMBAHAN
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  // State menampung seluruh input kolom sesuai skema database Supabase
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'Rumah',
    status: 'Dijual',
    price: '',
    price_label: '',
    area: '',
    city: '',
    land_area: '',
    building_area: '',
    bedrooms: '',
    bathrooms: '',
    certificate: 'SHM',
    published: true,
    featured: false,
  });

  const isTanah = formData.property_type === 'Tanah';
  const isGudang = formData.property_type === 'Gudang';
  const isRuko = formData.property_type === 'Ruko';
  const isKomersial = formData.property_type === 'Komersial';

  // Untuk tipe ini, kamar tidur tidak relevan
  const tanpaKamarTidur = isTanah || isGudang || isRuko || isKomersial;

  // Untuk tipe ini, kamar mandi tidak ditampilkan dan tidak dikirim ke database
  const tanpaKamarMandi = isTanah || isKomersial;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      const nextIsTanah = value === 'Tanah';
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

  // Fungsi menangani saat admin memilih file gambar COVER UTAMA
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handler pemilihan banyak foto untuk galeri sekaligus
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      setGalleryFiles((prev) => [...prev, ...filesArray]);

      const previewsArray = filesArray.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...previewsArray]);
    }
  };

  // Menghapus foto tertentu dari antrean list galeri sebelum disimpan
  const removeGalleryItem = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      let finalImageUrl =
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';

      // LOGIKA UNGGAH GAMBAR COVER UTAMA KE SUPABASE STORAGE
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error(`Gagal upload gambar cover: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        if (publicUrlData && publicUrlData.publicUrl) {
          finalImageUrl = publicUrlData.publicUrl;
        }
      }

      // LOGIKA UNGGAH BANYAK GAMBAR SEKALIGUS
      const uploadedGalleryUrls: string[] = [];

      if (galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(async (file, index) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `gallery-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 5)}-${index}.${fileExt}`;

          const { error: galleryUpError } = await supabase.storage
            .from('property-images')
            .upload(fileName, file);

          if (galleryUpError) throw galleryUpError;

          const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);

          return data.publicUrl;
        });

        const urls = await Promise.all(uploadPromises);
        uploadedGalleryUrls.push(...urls);
      }

      // Otomatisasi data strings pendukung
      const generatedListingCode = `RE-${Math.floor(10000 + Math.random() * 90000)}`;
      const generatedSlug = formData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const generatedAddress = `${formData.area}, ${formData.city}`;

      // Variabel kondisional tipe properti saat submit
      const submitIsTanah = formData.property_type === 'Tanah';
      const submitIsGudang = formData.property_type === 'Gudang';
      const submitIsRuko = formData.property_type === 'Ruko';
      const submitIsKomersial = formData.property_type === 'Komersial';

      const submitTanpaKamarTidur =
        submitIsTanah || submitIsGudang || submitIsRuko || submitIsKomersial;

      const submitTanpaKamarMandi = submitIsTanah || submitIsKomersial;

      // Susun objek payload data final
      const payload = {
        ...formData,
        listing_code: generatedListingCode,
        slug: generatedSlug,
        address: generatedAddress,
        cover_image_url: finalImageUrl,
        images: uploadedGalleryUrls,
        price: parseFloat(formData.price) || 0,
        land_area: formData.land_area ? parseFloat(formData.land_area) : null,
        building_area: submitIsTanah
          ? null
          : formData.building_area
            ? parseFloat(formData.building_area)
            : null,
        bedrooms: submitTanpaKamarTidur
          ? null
          : formData.bedrooms
            ? parseInt(formData.bedrooms, 10)
            : null,
        bathrooms: submitTanpaKamarMandi
          ? null
          : formData.bathrooms
            ? parseInt(formData.bathrooms, 10)
            : null,
        published: Boolean(formData.published),
        featured: Boolean(formData.featured),
      };

      const { error: insertError } = await supabase.from('properties').insert([payload]);

      if (insertError) throw insertError;

      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-[#03045E] p-6 text-white">
            <h2 className="text-xl font-bold font-serif">
              Tambah Katalog Properti Cloud
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              Formulir isian data spesifikasi unit properti resmi.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 font-medium rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Informasi Utama */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Nama / Judul Properti *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Contoh: Rumah Minimalis Modern Di Gading Serpong"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Tipe Properti *
                </label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                >
                  <option value="Rumah">Rumah</option>
                  <option value="Tanah">Tanah</option>
                  <option value="Apartemen">Apartemen</option>
                  <option value="Ruko">Ruko</option>
                  <option value="Villa">Villa</option>
                  <option value="Gudang">Gudang</option>
                  <option value="Komersial">Komersial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Status Iklan
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                >
                  <option value="Dijual">Dijual</option>
                  <option value="Disewakan">Disewakan</option>
                </select>
              </div>

              {/* Primary Project */}
              <label className="md:col-span-2 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 cursor-pointer hover:bg-amber-100 transition-colors">
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
            </div>

            {/* Harga */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Harga Murni (Angka Saja untuk Filter) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Contoh: 2500000000"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Label Harga Tampilan Web *
                </label>
                <input
                  type="text"
                  name="price_label"
                  required
                  value={formData.price_label}
                  onChange={handleChange}
                  placeholder="Contoh: Rp 2,5 Milyar atau Rp 45 Juta/Tahun"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                />
              </div>
            </div>

            {/* Lokasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Nama Area / Cluster *
                </label>
                <input
                  type="text"
                  name="area"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Contoh: Cluster Alicante, Gading Serpong"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Kota / Kabupaten *
                </label>

                {!isCustomCity ? (
                  <select
                    name="city"
                    required
                    value={formData.city}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomCity(true);
                        setFormData((prev) => ({ ...prev, city: '' }));
                      } else {
                        handleChange(e);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                  >
                    <option value="">-- Pilih Wilayah --</option>
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Tebet">Tebet</option>
                    <option value="Tangerang">Tangerang</option>
                    <option value="Serpong">Serpong</option>
                    <option value="BSD">BSD</option>
                    <option value="Alam Sutera">Alam Sutera</option>
                    <option value="custom" className="text-blue-600 font-semibold">
                      ➕ Ketik Lokasi Baru...
                    </option>
                  </select>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Ketik kota/kabupaten baru..."
                      className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCity(false);
                        setFormData((prev) => ({ ...prev, city: '' }));
                      }}
                      className="px-4 py-2 text-xs bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors font-bold"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Spesifikasi Teknis */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-100 pt-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Luas Tanah (m²)
                </label>
                <input
                  type="number"
                  name="land_area"
                  value={formData.land_area}
                  onChange={handleChange}
                  placeholder="LT"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                />
              </div>

              {!isTanah && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Luas Bangunan (m²)
                  </label>
                  <input
                    type="number"
                    name="building_area"
                    value={formData.building_area}
                    onChange={handleChange}
                    placeholder="LB"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                  />
                </div>
              )}

              {!tanpaKamarTidur && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    K. Tidur
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="Kamar"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                  />
                </div>
              )}

              {!tanpaKamarMandi && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    K. Mandi
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="Mandi"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                  />
                </div>
              )}
            </div>

            {/* Legalitas & Deskripsi */}
            <div className="border-t border-slate-100 pt-4 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Jenis Sertifikat
                </label>
                <input
                  type="text"
                  name="certificate"
                  value={formData.certificate}
                  onChange={handleChange}
                  placeholder="Contoh: SHM, PPJB, HGB"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Deskripsi Lengkap Properti *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Jelaskan detail kelebihan properti, bonus furnished, akses jalan, dekat fasilitas apa saja dsb..."
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
                />
              </div>
            </div>

            {/* FOTO 1: Cover Utama */}
            <div className="border-t border-slate-100 pt-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                1. Foto Utama Cover Properti *
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="aspect-video md:aspect-square w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview properti"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Image className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                      <span className="text-slate-400 text-xs block">
                        Belum ada foto cover
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-[#0077B6] rounded-xl py-6 bg-white cursor-pointer transition-colors group">
                    <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#0077B6] mb-1 transition-colors" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-[#0077B6] transition-colors">
                      Pilih File Foto Sampul Utama
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {imageFile && (
                    <p className="text-emerald-600 text-xs font-semibold mt-2">
                      ✓ Cover siap: {imageFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* FOTO 2: Galeri Tambahan */}
            <div className="border-t border-slate-100 pt-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                2. Foto Dokumen Galeri Interior / Detail Tambahan
              </label>

              <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-[#0077B6] rounded-xl py-6 bg-slate-50 cursor-pointer transition-colors group">
                <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#0077B6] mb-1 transition-colors" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-[#0077B6] transition-colors">
                  Pilih Banyak Foto Sekaligus
                </span>
                <span className="text-slate-400 text-xs mt-0.5">
                  Tahan Ctrl/Cmd untuk memilih beberapa gambar sekaligus
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="hidden"
                />
              </label>

              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                  {galleryPreviews.map((previewUrl, index) => (
                    <div
                      key={index}
                      className="aspect-video relative rounded-lg overflow-hidden border border-slate-200 group"
                    >
                      <img
                        src={previewUrl}
                        alt={`Preview galeri ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity shadow-md"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tombol Simpan */}
            <div className="border-t border-slate-200 pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center space-x-2 bg-[#0077B6] hover:bg-[#03045E] text-white px-6 py-3 rounded-xl font-bold shadow-md transition-colors disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>
                  {loading
                    ? 'Mengunggah Galeri & Menyimpan ke Cloud...'
                    : 'Simpan Properti & Galeri'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;