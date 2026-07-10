import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  LoaderCircle,
  Send,
  Trash2,
  Upload,
} from 'lucide-react';
import { CONTACT_INFO } from '../data';

const MAX_FILES = 6;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

interface CloudinaryUploadResponse {
  secure_url?: string;
  public_id?: string;
  error?: {
    message?: string;
  };
}

export default function ConsignmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    propertyType: 'Rumah',
    location: '',
    status: 'Dijual',
    desiredPrice: '',
    landArea: '',
    buildingArea: '',
    certificateStatus: 'SHM (Sertifikat Hak Milik)',
    description: '',
    agreement: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const propertyTypes = [
    'Rumah',
    'Tanah',
    'Apartemen',
    'Ruko',
    'Villa',
    'Gudang',
    'Properti Komersial',
  ];

  const certTypes = [
    'SHM (Sertifikat Hak Milik)',
    'HGB (Hak Guna Bangunan)',
    'SHSRS (Sertifikat Hak Satuan Rumah Susun)',
    'Girik / Letter C',
    'Lainnya / Belum Tahu',
  ];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }

    // Agar file yang sama dapat dipilih kembali.
    e.target.value = '';
  };

  const addFiles = (newFiles: File[]) => {
    setSubmitError('');

    const unsupportedFiles = newFiles.filter(
      (file) => !ALLOWED_IMAGE_TYPES.includes(file.type)
    );

    const oversizedFiles = newFiles.filter(
      (file) => file.size > MAX_FILE_SIZE
    );

    const validFiles = newFiles.filter(
      (file) =>
        ALLOWED_IMAGE_TYPES.includes(file.type) &&
        file.size <= MAX_FILE_SIZE
    );

    if (unsupportedFiles.length > 0) {
      setSubmitError(
        'Sebagian file ditolak. Gunakan format JPG, JPEG, PNG, atau WEBP.'
      );
    }

    if (oversizedFiles.length > 0) {
      setSubmitError(
        'Sebagian file melebihi batas maksimal 5 MB per foto.'
      );
    }

    const remainingSlots = MAX_FILES - files.length;

    if (remainingSlots <= 0) {
      setSubmitError(
        `Maksimal ${MAX_FILES} foto untuk setiap pengajuan properti.`
      );
      return;
    }

    const acceptedFiles = validFiles.slice(0, remainingSlots);

    if (acceptedFiles.length === 0) {
      return;
    }

    if (validFiles.length > remainingSlots) {
      setSubmitError(
        `Hanya ${MAX_FILES} foto pertama yang dapat ditambahkan.`
      );
    }

    const newPreviews = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles((previousFiles) => [
      ...previousFiles,
      ...acceptedFiles,
    ]);

    setFilePreviews((previousPreviews) => [
      ...previousPreviews,
      ...newPreviews,
    ]);

    setErrors((previousErrors) => {
      const updatedErrors = { ...previousErrors };
      delete updatedErrors.files;
      return updatedErrors;
    });
  };

  const removeFile = (index: number) => {
    const previewUrl = filePreviews[index];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFiles((previousFiles) =>
      previousFiles.filter((_, fileIndex) => fileIndex !== index)
    );

    setFilePreviews((previousPreviews) =>
      previousPreviews.filter(
        (_, previewIndex) => previewIndex !== index
      )
    );
  };

  const validateForm = () => {
    const temporaryErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      temporaryErrors.fullName = 'Nama lengkap wajib diisi.';
    }

    if (!formData.whatsapp.trim()) {
      temporaryErrors.whatsapp =
        'Nomor WhatsApp wajib diisi.';
    } else if (
      !/^[0-9+() -]{9,16}$/.test(formData.whatsapp.trim())
    ) {
      temporaryErrors.whatsapp =
        'Format nomor WhatsApp tidak valid.';
    }

    if (!formData.email.trim()) {
      temporaryErrors.email = 'Alamat email wajib diisi.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      temporaryErrors.email = 'Format email tidak valid.';
    }

    if (!formData.location.trim()) {
      temporaryErrors.location =
        'Lokasi properti wajib diisi.';
    }

    if (!formData.desiredPrice.trim()) {
      temporaryErrors.desiredPrice =
        'Harga penawaran wajib diisi.';
    }

    if (!formData.landArea.trim()) {
      temporaryErrors.landArea =
        'Luas tanah wajib diisi.';
    }

    if (files.length === 0) {
      temporaryErrors.files =
        'Unggah minimal satu foto properti.';
    }

    if (!formData.agreement) {
      temporaryErrors.agreement =
        'Anda harus menyetujui persetujuan pengelolaan data.';
    }

    setErrors(temporaryErrors);

    return Object.keys(temporaryErrors).length === 0;
  };

  const uploadFilesToCloudinary = async (
    selectedFiles: File[]
  ): Promise<string[]> => {
    const cloudName =
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();

    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

    if (!cloudName || !uploadPreset) {
      throw new Error(
        'Konfigurasi Cloudinary belum terbaca. Periksa file .env.local dan restart server.'
      );
    }

    const uploadPromises = selectedFiles.map(
      async (file): Promise<string> => {
        const uploadData = new FormData();

        uploadData.append('file', file);
        uploadData.append('upload_preset', uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: uploadData,
          }
        );

        const result =
          (await response.json()) as CloudinaryUploadResponse;

        if (!response.ok || !result.secure_url) {
          throw new Error(
            result.error?.message ||
              `Foto "${file.name}" gagal diunggah.`
          );
        }

        return result.secure_url;
      }
    );

    return Promise.all(uploadPromises);
  };

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isUploading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setSubmitError('');
    setWhatsappLink('');

    try {
      const photoUrls = await uploadFilesToCloudinary(files);

      const actionText =
        formData.status === 'Dijual'
          ? 'menjual'
          : 'menyewakan';

      const buildingAreaText = formData.buildingArea.trim()
        ? ` / LB ${formData.buildingArea.trim()} m²`
        : '';

      const descriptionText =
        formData.description.trim() || '-';

      const photoList = photoUrls
        .map((url, index) => `${index + 1}. ${url}`)
        .join('\n');

      const message = `Halo Ibu Tri,

Saya ingin ${actionText} properti dan menitipkan pemasarannya melalui website personal Ibu.

DATA PEMILIK
Nama lengkap: ${formData.fullName.trim()}
Nomor WhatsApp: ${formData.whatsapp.trim()}
Email: ${formData.email.trim()}

DETAIL PROPERTI
Jenis properti: ${formData.propertyType}
Status: ${formData.status}
Lokasi: ${formData.location.trim()}
Harga penawaran: ${formData.desiredPrice.trim()}
Spesifikasi: LT ${formData.landArea.trim()} m²${buildingAreaText}
Sertifikat: ${formData.certificateStatus}
Deskripsi: ${descriptionText}

FOTO PROPERTI
${photoList}

Foto properti telah diunggah melalui formulir website.

Mohon bantuannya untuk konsultasi dan strategi pemasaran properti tersebut. Terima kasih.`;

      const cleanMessage = message
        .replace(/\r\n/g, '\n')
        .trim();

      const rawPhoneNumber =
        CONTACT_INFO.whatsappPrimary.replace(/\D/g, '');

      const destinationNumber =
        rawPhoneNumber.startsWith('62')
          ? rawPhoneNumber
          : rawPhoneNumber.startsWith('0')
            ? `62${rawPhoneNumber.slice(1)}`
            : `62${rawPhoneNumber}`;

      const generatedWhatsappLink =
        `https://wa.me/${destinationNumber}` +
        `?text=${encodeURIComponent(cleanMessage)}`;

      setWhatsappLink(generatedWhatsappLink);
      setIsSubmitted(true);

      // Beri waktu singkat agar tampilan sukses terlihat.
      window.setTimeout(() => {
        window.location.assign(generatedWhatsappLink);
      }, 900);
    } catch (error) {
      console.error('Cloudinary upload error:', error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Foto gagal diunggah. Silakan coba kembali.'
      );

      setIsSubmitted(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section
      id="titip"
      className="relative overflow-hidden bg-gradient-to-r from-[#03045E] to-[#0077B6] py-20 text-white sm:py-24"
    >
      <div className="absolute right-0 top-0 -z-5 h-80 w-80 rounded-full bg-cyan-blue/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-5 h-96 w-96 rounded-full bg-light-blue/10 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-light-blue">
            Titip Jual &amp; Sewa Properti
          </span>

          <h2 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Ingin Menjual atau Menyewakan Properti?
          </h2>

          <p className="leading-relaxed text-blue-100 sm:text-lg">
            Titipkan aset properti Anda kepada Ibu Tri
            Listiana, konsultan properti di Valtis Property,
            dan dapatkan strategi pemasaran yang sesuai agar
            properti lebih mudah menjangkau calon pembeli atau
            penyewa.
          </p>
        </div>

        <div className="rounded-3xl border border-light-blue/20 bg-white p-6 text-navy shadow-2xl sm:p-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form
                key="consignment-form"
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <h3 className="border-b border-slate-100 pb-2 font-serif text-xl font-black text-[#03045E]">
                  1. Informasi Kontak Pemilik
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Nama Lengkap *
                    </label>

                    <input
                      type="text"
                      placeholder="Contoh: Farhan Sanjaya"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    />

                    {errors.fullName && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Nomor WhatsApp *
                    </label>

                    <input
                      type="text"
                      placeholder="Contoh: 0812XXXXXXXX"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsapp: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    />

                    {errors.whatsapp && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Email Utama *
                    </label>

                    <input
                      type="email"
                      placeholder="Contoh: alamat@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    />

                    {errors.email && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <h3 className="border-b border-slate-100 pb-2 pt-4 font-serif text-xl font-black text-[#03045E]">
                  2. Spesifikasi Detail Properti
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Status Properti *
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {['Dijual', 'Disewakan'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              status,
                            })
                          }
                          className={`rounded-xl border px-4 py-3 text-xs font-bold transition-all ${
                            formData.status === status
                              ? 'border-navy bg-navy text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {status === 'Dijual'
                            ? '🏡 Dijual'
                            : '🔑 Disewakan'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Jenis Properti *
                    </label>

                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertyType: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    >
                      {propertyTypes.map((propertyType) => (
                        <option
                          key={propertyType}
                          value={propertyType}
                        >
                          {propertyType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Status Sertifikat *
                    </label>

                    <select
                      value={formData.certificateStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          certificateStatus: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    >
                      {certTypes.map((certificateType) => (
                        <option
                          key={certificateType}
                          value={certificateType}
                        >
                          {certificateType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Harga Penawaran *
                    </label>

                    <input
                      type="text"
                      placeholder="Contoh: Rp1,8 Miliar"
                      value={formData.desiredPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          desiredPrice: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    />

                    {errors.desiredPrice && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.desiredPrice}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Luas Tanah (m²) *
                    </label>

                    <input
                      type="number"
                      min="1"
                      placeholder="Contoh: 120"
                      value={formData.landArea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          landArea: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    />

                    {errors.landArea && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.landArea}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-navy">
                      Luas Bangunan (m²) / Kosongkan jika tanah
                    </label>

                    <input
                      type="number"
                      min="1"
                      placeholder="Contoh: 180"
                      value={formData.buildingArea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          buildingArea: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy">
                    Lokasi Lengkap Properti *
                  </label>

                  <input
                    type="text"
                    placeholder="Contoh: Cluster Lavender, Gading Serpong, Tangerang Selatan"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                  />

                  {errors.location && (
                    <p className="text-xs font-semibold text-red-500">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy">
                    Deskripsi &amp; Fasilitas Tambahan
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Contoh: Dekat mal, hadap matahari pagi, akses kendaraan mudah, renovasi baru..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                  />
                </div>

                <div className="space-y-2 pt-2 text-left">
                  <label className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-navy">
                    <span>Foto Properti *</span>

                    <HelpCircle
                      className="h-3.5 w-3.5 cursor-help text-slate-400"
                      aria-label="Foto akan diunggah ke Cloudinary"
                    />
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                      isDragging
                        ? 'scale-[0.99] border-cyan-blue bg-[#CAF0F8]/30'
                        : 'border-slate-200 hover:border-cyan-blue hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                    />

                    <div className="flex flex-col items-center space-y-2">
                      <div className="rounded-full bg-[#CAF0F8] p-3 text-[#0077B6]">
                        <Upload className="h-6 w-6" />
                      </div>

                      <p className="text-sm font-semibold text-navy">
                        Seret dan letakkan foto di sini, atau{' '}
                        <span className="text-[#0077B6] underline">
                          pilih file
                        </span>
                      </p>

                      <p className="max-w-xl text-xs text-slate-400">
                        Foto akan diunggah ke penyimpanan cloud
                        dan tautannya disertakan dalam pesan
                        WhatsApp. Maksimal {MAX_FILES} foto dan
                        5 MB per foto.
                      </p>
                    </div>
                  </div>

                  {errors.files && (
                    <p className="text-xs font-semibold text-red-500">
                      {errors.files}
                    </p>
                  )}

                  <AnimatePresence>
                    {filePreviews.length > 0 && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="mt-4 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3 md:grid-cols-4"
                      >
                        {filePreviews.map(
                          (preview, index) => (
                            <div
                              key={preview}
                              className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200"
                            >
                              <img
                                src={preview}
                                alt={`Preview properti ${
                                  index + 1
                                }`}
                                className="h-full w-full object-cover"
                              />

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile(index);
                                }}
                                className="absolute right-1.5 top-1.5 rounded-full bg-red-600 p-1 text-white opacity-90 transition-opacity hover:bg-red-700 hover:opacity-100"
                                aria-label={`Hapus foto ${
                                  index + 1
                                }`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-2 text-left">
                  <label className="flex cursor-pointer select-none items-start space-x-3 text-xs font-semibold text-slate-600">
                    <input
                      type="checkbox"
                      checked={formData.agreement}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agreement: e.target.checked,
                        })
                      }
                      className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-cyan-blue focus:ring-cyan-blue"
                    />

                    <span>
                      Saya menyetujui Ibu Tri Yatmi
                      menghubungi saya untuk memverifikasi data
                      dan membahas strategi pemasaran properti
                      ini. *
                    </span>
                  </label>

                  {errors.agreement && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {errors.agreement}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`inline-flex w-full items-center justify-center space-x-2 rounded-xl bg-[#03045E] px-8 py-4 font-extrabold text-white shadow-xl shadow-navy/20 transition-all duration-300 ${
                      isUploading
                        ? 'cursor-not-allowed opacity-60'
                        : 'hover:bg-[#0077B6] active:scale-[0.99]'
                    }`}
                  >
                    {isUploading ? (
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}

                    <span>
                      {isUploading
                        ? 'Mengunggah Foto Properti...'
                        : 'Kirim Data Properti & Hubungi Farida'}
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                key="success-message"
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="flex flex-col items-center space-y-6 px-4 py-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-black text-[#03045E]">
                    Foto dan Data Berhasil Disiapkan
                  </h3>

                  <p className="mx-auto max-w-md text-sm text-slate-600 sm:text-base">
                    Foto telah diunggah dan tautannya sudah
                    dimasukkan ke pesan WhatsApp. Anda akan
                    dialihkan ke WhatsApp Ibu Tri.
                  </p>
                </div>

                <div className="animate-pulse text-xs font-bold uppercase tracking-wider text-[#0077B6]">
                  Membuka WhatsApp...
                </div>

                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#03045E] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0077B6]"
                  >
                    <Send className="h-4 w-4" />
                    Buka WhatsApp Sekarang
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

