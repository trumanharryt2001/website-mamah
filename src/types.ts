// export interface Property {
//   id: string;
//   name: string;
//   location: string;
//   priceVal: number; // For filtering
//   priceText: string;
//   status: 'Dijual' | 'Disewakan';
//   type: 'Rumah' | 'Tanah' | 'Apartemen' | 'Ruko' | 'Villa' | 'Gudang' | 'Properti Komersial';
//   bedrooms?: number;
//   bathrooms?: number;
//   landArea: string; // e.g. "120 m²" or "500 m²"
//   buildingArea?: string; // e.g. "100 m²"
//   badge: string;
//   description: string;
//   image: string;
//   additionalHighlights?: string[];
// }

export interface PropertyArea {
  id: string;
  name: string;
  image: string;
  propertyCount: number;
}

export interface LayananItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // maps to Lucide icon name
}

// export interface TestimonialItem {
//   id: string;
//   name: string;
//   role: string;
//   content: string;
//   avatar: string;
// }

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  readTime: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  sort_order: number;
  alt_text: string | null;
  created_at: string;
}

export interface Property {
  id: string;
  listing_code: string;
  title: string;
  slug: string;
  status: 'Dijual' | 'Disewakan';
  property_type: string;
  city: string;
  area: string;
  address: string;
  price: number;
  price_label: string;
  land_area?: number;
  building_area?: number;
  bedrooms?: number;
  bathrooms?: number;
  carport?: number;
  garage?: number;
  floors?: number;
  certificate: string;
  electricity?: number;
  facing?: string;
  description?: string;
  features?: string[];
  cover_image_url?: string;
  images?: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  property_images?: PropertyImage[];
}

