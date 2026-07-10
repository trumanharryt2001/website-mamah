import { supabase } from '../lib/supabase';
import { Property } from '../types';

export const propertyService = {
  // Mengambil semua data properti yang published = true
  // Primary Project / featured akan muncul lebih dulu
  async getPublishedProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (*)
      `)
      .eq('published', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gagal memuat data properti dari database:', error.message);
      return [];
    }

    return (data || []) as Property[];
  },
};


