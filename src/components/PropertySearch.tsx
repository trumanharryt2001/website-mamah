import React, { useState } from 'react';
import { Search, MapPin, Home, ClipboardList, DollarSign } from 'lucide-react';

export interface FilterState {
  location: string;
  type: string;
  status: string;
  priceRange: string;
}

interface PropertySearchProps {
  onSearch: (filters: FilterState) => void;
}

export default function PropertySearch({ onSearch }: PropertySearchProps) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const locations = [
    { value: '', label: 'Semua Lokasi' },
    { value: 'BSD City', label: 'BSD City' },
    { value: 'Bintaro', label: 'Bintaro' },
    { value: 'Alam Sutera', label: 'Alam Sutera' },
    { value: 'Serpong', label: 'Serpong' },
    { value: 'Jakarta', label: 'Jakarta Selatan' },
    { value: 'Tangerang', label: 'Tangerang' },
    { value: 'Depok', label: 'Depok' },
    { value: 'Bekasi', label: 'Bekasi' },
  ];

  const types = [
    { value: '', label: 'Semua Tipe' },
    { value: 'Rumah', label: 'Rumah' },
    { value: 'Tanah', label: 'Tanah' },
    { value: 'Apartemen', label: 'Apartemen' },
    { value: 'Ruko', label: 'Ruko' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Gudang', label: 'Gudang' },
    { value: 'Properti Komersial', label: 'Komersial' },
  ];

  const statuses = [
    { value: '', label: 'Semua Status' },
    { value: 'Dijual', label: 'Dijual' },
    { value: 'Disewakan', label: 'Disewakan' },
  ];

  const priceRanges = [
    { value: '', label: 'Semua Harga' },
    { value: 'under-1.5B', label: 'Di bawah 1.5 Miliar' },
    { value: '1.5B-2.5B', label: '1.5 - 2.5 Miliar' },
    { value: '2.5B-5B', label: '2.5 - 5 Miliar' },
    { value: 'above-5B', label: 'Di atas 5 Miliar' },
    { value: 'rent-under-10M', label: 'Sewa < 10 Juta/bln' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      type,
      status,
      priceRange,
    });
  };

  const handleReset = () => {
    setLocation('');
    setType('');
    setStatus('');
    setPriceRange('');
    onSearch({
      location: '',
      type: '',
      status: '',
      priceRange: '',
    });
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 z-20 -mt-10 sm:-mt-14">
      <div className="bg-white rounded-3xl shadow-xl shadow-navy/10 border border-light-blue/20 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Lokasi Filter */}
          <div className="space-y-2">
            <label className="flex items-center text-xs font-bold text-navy uppercase tracking-wider space-x-1.5 select-none">
              <MapPin className="w-3.5 h-3.5 text-[#0077B6]" />
              <span>Lokasi</span>
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#CAF0F8]/20 border border-[#90E0EF]/60 rounded-xl px-4 py-3 text-sm font-semibold text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:bg-white transition-all cursor-pointer appearance-none"
              >
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Jenis Properti Filter */}
          <div className="space-y-2">
            <label className="flex items-center text-xs font-bold text-navy uppercase tracking-wider space-x-1.5 select-none">
              <Home className="w-3.5 h-3.5 text-[#0077B6]" />
              <span>Tipe Properti</span>
            </label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#CAF0F8]/20 border border-[#90E0EF]/60 rounded-xl px-4 py-3 text-sm font-semibold text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:bg-white transition-all cursor-pointer appearance-none"
              >
                {types.map((tp) => (
                  <option key={tp.value} value={tp.value}>
                    {tp.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Status Properti */}
          <div className="space-y-2">
            <label className="flex items-center text-xs font-bold text-navy uppercase tracking-wider space-x-1.5 select-none">
              <ClipboardList className="w-3.5 h-3.5 text-[#0077B6]" />
              <span>Status</span>
            </label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#CAF0F8]/20 border border-[#90E0EF]/60 rounded-xl px-4 py-3 text-sm font-semibold text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:bg-white transition-all cursor-pointer appearance-none"
              >
                {statuses.map((stat) => (
                  <option key={stat.value} value={stat.value}>
                    {stat.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">
                ▼
              </div>
            </div>
          </div>

          {/* Rentang Harga */}
          <div className="space-y-2">
            <label className="flex items-center text-xs font-bold text-navy uppercase tracking-wider space-x-1.5 select-none">
              <DollarSign className="w-3.5 h-3.5 text-[#0077B6]" />
              <span>Rentang Harga</span>
            </label>
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-[#CAF0F8]/20 border border-[#90E0EF]/60 rounded-xl px-4 py-3 text-sm font-semibold text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:bg-white transition-all cursor-pointer appearance-none"
              >
                {priceRanges.map((pr) => (
                  <option key={pr.value} value={pr.value}>
                    {pr.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mt-6 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-navy hover:bg-slate-50 transition-colors"
          >
            Bersihkan Filter
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#0077B6] hover:bg-[#03045E] text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-primary-blue/20 transition-all duration-300"
          >
            <Search className="w-4 h-4" />
            <span>Cari Properti</span>
          </button>
        </div>
      </div>
    </div>
  );
}
