export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface Amenity {
  id: string;
  name: string;
  shortDesc: string;
  iconName: string;
  image: string;
  badge: string;
}

export type MediaCategory =
  | 'all'
  | 'elevation'
  | 'parking'
  | 'holi'
  | 'mens_day'
  | 'festivals'
  | 'national'
  | 'videos';

export interface PhotoItem {
  id: string;
  title: string;
  category: MediaCategory;
  categoryLabel: string;
  imageUrl: string;
  caption: string;
  date?: string;
  featured?: boolean;
}

export interface CelebrationItem {
  id: string;
  name: string;
  category: MediaCategory;
  season: string;
  description: string;
  highlights: string[];
  coverImage: string;
  badge: string;
  accentColor: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  category?: string;
  description?: string;
}

export type GalleryItem = PhotoItem;

export interface ConnectivityItem {
  title: string;
  time: string;
  iconName: string;
  desc: string;
}

export interface SocietyData {
  shortName: string;
  fullName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  quickSpecs: {
    label: string;
    value: string;
    iconName: string;
  }[];
  overview: string[];
  amenities: Amenity[];
  heroSlides: HeroSlide[];
  celebrations: CelebrationItem[];
  photos: PhotoItem[];
  videos: VideoItem[];
  connectivity: ConnectivityItem[];
  contact: {
    address: string;
    landmark: string;
    locationNote: string;
    googleMapsUrl: string;
    directionsUrl: string;
    securityPhone: string;
    officeTimings: string;
    emergencyContacts: {
      label: string;
      number: string;
    }[];
  };
}
