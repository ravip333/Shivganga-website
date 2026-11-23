import type { SocietyData } from '../types';

export const societyData: SocietyData = {
  shortName: "Shivganga CHS",
  fullName: "Shivganga Co-operative Housing Society Ltd.",
  tagline: "Standalone 6-Floor Residential Building",
  heroHeadline: "Welcome to Shivganga CHS",
  heroSubheadline: "A peaceful, well-maintained standalone residential building with Ground + 6 Floors, dedicated resident parking, passenger elevator, and 24/7 security watch.",

  quickSpecs: [
    { label: "Building Structure", value: "Ground + 6 Floors", iconName: "Building2" },
    { label: "Parking", value: "Dedicated Ground Parking", iconName: "Car" },
    { label: "Elevator", value: "Passenger Lift (G to 6th)", iconName: "ArrowUpDown" },
    { label: "Security", value: "24/7 Manned Gate", iconName: "ShieldCheck" },
  ],

  overview: [
    "Shivganga CHS is an established standalone residential building with Ground + 6 floors, designed for quiet and comfortable family living.",
    "The building features demarcated ground-level parking, a reliable passenger elevator connecting all six floors, 24/7 gate security, and comprehensive water and utility management.",
    "Duly registered under the Maharashtra Co-operative Societies Act, our society ensures clean common areas, transparent administration, and quick access to nearby transit and daily markets."
  ],

  // Real photographs for the background slider
  heroSlides: [
    {
      id: "slide-1",
      imageUrl: "./society-photos/building-photo-11.jpeg",
      title: "Standalone 6-Floor Elevation",
      subtitle: "Daytime architectural view of the Ground + 6 residential floors with ventilated balconies.",
      badge: "G+6 Elevation"
    },
    {
      id: "slide-2",
      imageUrl: "./society-photos/building-photo-13.jpeg",
      title: "Dedicated Ground Parking",
      subtitle: "Spacious dedicated parking slots for four-wheelers and two-wheelers.",
      badge: "Resident Parking"
    },
    {
      id: "slide-3",
      imageUrl: "./society-photos/building-photo-12.jpeg",
      title: "Daylight Building Facade",
      subtitle: "Neatly maintained exterior elevation with open surroundings and natural light.",
      badge: "Daylight View"
    },
    {
      id: "slide-4",
      imageUrl: "./society-photos/building-photo-1-enhanced.jpeg",
      title: "Festive Evening Lighting",
      subtitle: "Warm festive lights and peaceful night ambiance during celebrations.",
      badge: "Evening Lights"
    }
  ],

  // Simple, verified amenities (no hall)
  amenities: [
    {
      id: "amenity-1",
      name: "Dedicated Ground Parking",
      shortDesc: "Demarcated covered and open ground parking spaces for resident four-wheelers and two-wheelers.",
      iconName: "Car",
      image: "./society-photos/building-photo-13.jpeg",
      badge: "Dedicated Bays"
    },
    {
      id: "amenity-2",
      name: "Passenger Elevator (Lift)",
      shortDesc: "Continuous passenger elevator servicing all 6 residential floors with regular maintenance and backup.",
      iconName: "ArrowUpDown",
      image: "./society-photos/building-photo-12.jpeg",
      badge: "Ground to 6th"
    },
    {
      id: "amenity-3",
      name: "24/7 Security Gate",
      shortDesc: "Manned security check-post at the main entrance with visitor logs and nighttime surveillance.",
      iconName: "ShieldCheck",
      image: "./society-photos/building-photo-3-enhanced.jpeg",
      badge: "Manned 24/7"
    },
    {
      id: "amenity-4",
      name: "Water & Utility Backup",
      shortDesc: "Underground & overhead water storage tanks with automated pumps and common lighting backup.",
      iconName: "Droplets",
      image: "./society-photos/building-photo-10.jpeg",
      badge: "Dual Reservoirs"
    }
  ],

  // Categorized Photos for Function Collages
  photos: [
    // 1. Elevation & Architecture
    {
      id: "p-1",
      title: "Full 6-Storey Building Elevation",
      category: "elevation",
      categoryLabel: "Building Elevation",
      imageUrl: "./society-photos/building-photo-11.jpeg",
      caption: "Clear daylight perspective of the Ground + 6 floors standalone residential tower.",
      featured: true
    },
    {
      id: "p-2",
      title: "Residential Facade & Balconies",
      category: "elevation",
      categoryLabel: "Building Elevation",
      imageUrl: "./society-photos/building-photo-12.jpeg",
      caption: "Daylight view highlighting clean balcony layout and ventilation windows.",
      featured: false
    },
    {
      id: "p-3",
      title: "Vertical Structural Perspective",
      category: "elevation",
      categoryLabel: "Building Elevation",
      imageUrl: "./society-photos/building-photo-8-enhanced.jpeg",
      caption: "Full height view from Ground to 6th floor terrace line.",
      featured: false
    },
    {
      id: "p-4",
      title: "Building Corner & Exterior Drainage",
      category: "elevation",
      categoryLabel: "Building Elevation",
      imageUrl: "./society-photos/building-photo-10.jpeg",
      caption: "Exterior structural quality and dedicated utility pipelines.",
      featured: false
    },

    // 2. Dedicated Parking & Campus
    {
      id: "p-5",
      title: "Ground Floor Dedicated Parking",
      category: "parking",
      categoryLabel: "Parking & Campus",
      imageUrl: "./society-photos/building-photo-13.jpeg",
      caption: "Spacious ground-level parking bays reserved for resident vehicles.",
      featured: true
    },
    {
      id: "p-6",
      title: "Entrance Driveway Approach",
      category: "parking",
      categoryLabel: "Parking & Campus",
      imageUrl: "./society-photos/building-photo-2-enhanced.jpeg",
      caption: "Paved entrance driveway providing smooth vehicle access into the compound.",
      featured: false
    },
    {
      id: "p-7",
      title: "Ground Level Entrance & Bays",
      category: "parking",
      categoryLabel: "Parking & Campus",
      imageUrl: "./society-photos/building-photo-5-enhanced.jpeg",
      caption: "Clean ground-level entry and parking lanes.",
      featured: false
    },
    {
      id: "p-8",
      title: "Covered Parking Sections",
      category: "parking",
      categoryLabel: "Parking & Campus",
      imageUrl: "./society-photos/building-photo-7-enhanced.jpeg",
      caption: "Demarcated vehicle slots under the residential floors.",
      featured: false
    },
    {
      id: "p-9",
      title: "Security Post & Gate Approach",
      category: "parking",
      categoryLabel: "Parking & Campus",
      imageUrl: "./society-photos/building-photo-9-enhanced.jpeg",
      caption: "Manned security gate and perimeter entrance pathway.",
      featured: false
    },

    // 3. Festive Celebrations & Functions
    {
      id: "p-10",
      title: "Diwali & Festive Lighting Elevation",
      category: "festivals",
      categoryLabel: "Festivals & Functions",
      imageUrl: "./society-photos/building-photo-1-enhanced.jpeg",
      caption: "Colorful festive illumination adorning the building during celebrations.",
      featured: true
    },
    {
      id: "p-11",
      title: "Evening Illumination & Gate Ambiance",
      category: "festivals",
      categoryLabel: "Festivals & Functions",
      imageUrl: "./society-photos/building-photo-3-enhanced.jpeg",
      caption: "Evening ambient lights creating a warm and welcoming residential atmosphere.",
      featured: false
    },
    {
      id: "p-12",
      title: "Balcony Light Decorations",
      category: "festivals",
      categoryLabel: "Festivals & Functions",
      imageUrl: "./society-photos/building-photo-4-enhanced.jpeg",
      caption: "Balconies lit up with festive lanterns and strings during celebrations.",
      featured: false
    },
    {
      id: "p-13",
      title: "Nighttime Tower Atmosphere",
      category: "festivals",
      categoryLabel: "Festivals & Functions",
      imageUrl: "./society-photos/building-photo-6-enhanced.jpeg",
      caption: "Peaceful evening view of the building under soft perimeter lighting.",
      featured: false
    }
  ],

  // Real Walkthrough Videos
  videos: [
    {
      id: "v-1",
      title: "Building Exterior & Dedicated Parking Walkthrough",
      duration: "0:12",
      videoUrl: "./society-videos/society-walkthrough-1.mp4",
      thumbnailUrl: "./society-videos/society-walkthrough-1-poster.jpg",
      caption: "Live video showing building front elevation, entrance driveway, and ground parking area."
    },
    {
      id: "v-2",
      title: "Vertical 6-Floor Elevation & Surroundings",
      duration: "0:07",
      videoUrl: "./society-videos/society-walkthrough-2.mp4",
      thumbnailUrl: "./society-videos/society-walkthrough-2-poster.jpg",
      caption: "Vertical video scan of the Ground + 6 floors facade, balconies, and open surroundings."
    }
  ],

  // Sober, clean connectivity points
  connectivity: [
    {
      title: "Railway Station",
      time: "5–10 Mins",
      iconName: "Train",
      desc: "Suburban railway station for easy daily commute to central hubs."
    },
    {
      title: "Auto & Bus Stand",
      time: "2 Mins Walk",
      iconName: "Bus",
      desc: "Regular auto-rickshaw availability and local municipal bus stops."
    },
    {
      title: "Daily Vegetable & Grocery Market",
      time: "3–5 Mins Walk",
      iconName: "ShoppingBag",
      desc: "Fresh vegetables, supermarkets, milk booths, and bakeries nearby."
    },
    {
      title: "Hospitals & Pharmacies",
      time: "5 Mins",
      iconName: "HeartPulse",
      desc: "Reputed multi-speciality hospitals, clinics, and 24x7 chemist shops."
    }
  ],

  contact: {
    address: "Shivganga CHS, Standalone 6-Floor Residential Building",
    landmark: "Near Connecting Road / Main Locality",
    locationNote: "Quiet residential location with clean access and dedicated ground parking.",
    googleMapsUrl: "https://share.google/fc4tVuIdwMKMJBVt9",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Shiv+Ganga+Society",
    securityPhone: "Security Gate Desk / Building Intercom",
    officeTimings: "Tue–Sat: 6:30 PM – 8:00 PM | Sun: 10:30 AM – 12:30 PM",
    emergencyContacts: [
      { label: "Security Guard on Duty", number: "Main Gate Intercom" },
      { label: "Lift Emergency Support", number: "On-Duty Roster" },
      { label: "Local Police Station", number: "100 / 112" },
      { label: "Emergency Ambulance", number: "102 / 108" }
    ]
  }
};
