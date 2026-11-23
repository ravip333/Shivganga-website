import type { SocietyData } from '../types';

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const getAssetUrl = (path: string): string => {
  return `${baseUrl}${path.replace(/^\.?\//, '')}`;
};

export const societyData: SocietyData = {
  shortName: "Shivganga CHS",
  fullName: "Shivganga Co-operative Housing Society Ltd.",
  tagline: "Standalone 6-Floor Residential Building",
  heroHeadline: "Welcome to Shivganga CHS",
  heroSubheadline: "A peaceful, well-maintained standalone residential building with Ground + 6 Floors, dedicated resident parking, passenger elevator, and 24/7 security watch.",

  quickSpecs: [
    { label: "Building Structure", value: "Ground + 6 Floors", iconName: "Building2" },
    { label: "Resident Parking", value: "Dedicated Ground Parking", iconName: "Car" },
    { label: "Elevator Access", value: "Passenger Lift (G to 6th)", iconName: "ArrowUpDown" },
    { label: "Security Watch", value: "24/7 Gate Surveillance", iconName: "ShieldCheck" },
  ],

  overview: [
    "Shivganga CHS is an established standalone residential building with Ground + 6 floors, designed for quiet, comfortable, and dignified family living.",
    "The building features demarcated ground-level parking, a reliable passenger elevator connecting all six residential floors, round-the-clock gate security watch, and systematic water and utility management.",
    "Duly registered under the Maharashtra Co-operative Societies Act, our society fosters close-knit community harmony, clean surroundings, and active resident celebrations."
  ],

  // Real photographs for the background slider
  heroSlides: [
    {
      id: "slide-1",
      imageUrl: getAssetUrl("society-photos/building-photo-11.jpeg"),
      title: "Standalone 6-Floor Elevation",
      subtitle: "Daytime architectural view of the Ground + 6 residential floors with ventilated balconies.",
      badge: "G+6 Elevation"
    },
    {
      id: "slide-2",
      imageUrl: getAssetUrl("society-photos/building-photo-13.jpeg"),
      title: "Dedicated Ground Parking",
      subtitle: "Spacious dedicated parking slots for resident four-wheelers and two-wheelers.",
      badge: "Resident Parking"
    },
    {
      id: "slide-3",
      imageUrl: getAssetUrl("society-photos/building-photo-12.jpeg"),
      title: "Daylight Building Facade",
      subtitle: "Neatly maintained exterior elevation with open surroundings and natural light.",
      badge: "Daylight View"
    },
    {
      id: "slide-4",
      imageUrl: getAssetUrl("society-photos/building-photo-1-enhanced.jpeg"),
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
      shortDesc: "Demarcated covered and open ground parking spaces exclusively reserved for resident four-wheelers and two-wheelers.",
      iconName: "Car",
      image: getAssetUrl("society-photos/building-photo-13.jpeg"),
      badge: "Dedicated Bays"
    },
    {
      id: "amenity-2",
      name: "Passenger Elevator (Lift)",
      shortDesc: "Continuous passenger elevator servicing all 6 residential floors with regular AMC maintenance and backup.",
      iconName: "ArrowUpDown",
      image: getAssetUrl("society-photos/building-photo-12.jpeg"),
      badge: "Ground to 6th"
    },
    {
      id: "amenity-3",
      name: "24/7 Security Gate",
      shortDesc: "Manned security check-post at the main entrance with visitor logs and nighttime surveillance.",
      iconName: "ShieldCheck",
      image: getAssetUrl("society-photos/building-photo-3-enhanced.jpeg"),
      badge: "Manned 24/7"
    },
    {
      id: "amenity-4",
      name: "Water & Utility Backup",
      shortDesc: "Underground & overhead water storage tanks with automated pumps and common lighting backup.",
      iconName: "Droplets",
      image: getAssetUrl("society-photos/building-photo-10.jpeg"),
      badge: "Dual Reservoirs"
    }
  ],

  // Society Celebrations & Functions
  celebrations: [
    {
      id: "cel-holi",
      name: "Holi Celebration",
      category: "holi",
      season: "Festival of Colors • March",
      description: "Vibrant annual festival of colors where resident families, children, and seniors gather in the compound for eco-friendly celebrations, traditional music, and sweets.",
      highlights: [
        "Organic, skin-safe colors & dry gulal",
        "Community music & joyful festivities",
        "Traditional festive snacks & Gujiya distribution",
        "Coordinated campus wash & cleanup"
      ],
      coverImage: getAssetUrl("society-photos/building-photo-3-enhanced.jpeg"),
      badge: "Annual Festival",
      accentColor: "rose"
    },
    {
      id: "cel-mens-day",
      name: "Men's Day Celebration",
      category: "mens_day",
      season: "Community Gathering • November",
      description: "A special society get-together organized to recognize, appreciate, and celebrate the dedicated men and fathers of Shivganga CHS for their support and family care.",
      highlights: [
        "Morning tea & community breakfast meetup",
        "Friendly felicitation & mutual appreciation",
        "Casual discussions & community bonding",
        "Group photo sessions & commemorative moments"
      ],
      coverImage: getAssetUrl("society-photos/building-photo-2-enhanced.jpeg"),
      badge: "Community Event",
      accentColor: "sky"
    },
    {
      id: "cel-diwali",
      name: "Diwali Deepotsav & Illumination",
      category: "festivals",
      season: "Festival of Lights • October/November",
      description: "Spectacular decorative lighting covering the entire 6-floor residential facade, welcoming lanterns at the entrance gate, and floor-wise rangolis.",
      highlights: [
        "Full G+6 building perimeter lighting",
        "Lobby & entrance lantern decorations",
        "Floor-wise diya displays by residents",
        "Festive sweets exchange and greetings"
      ],
      coverImage: getAssetUrl("society-photos/building-photo-1-enhanced.jpeg"),
      badge: "Grand Illumination",
      accentColor: "amber"
    },
    {
      id: "cel-national",
      name: "Republic & Independence Day",
      category: "national",
      season: "26th January & 15th August",
      description: "Patriotic flag hoisting ceremony at the main gate compound attended by all residents, singing of the national anthem, and distribution of sweets to children.",
      highlights: [
        "Ceremonial flag hoisting by senior residents",
        "Collective National Anthem singing",
        "Participation by children & youth",
        "Sweets distribution and morning refreshments"
      ],
      coverImage: getAssetUrl("society-photos/building-photo-9-enhanced.jpeg"),
      badge: "National Days",
      accentColor: "emerald"
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
      imageUrl: getAssetUrl("society-photos/building-photo-11.jpeg"),
      caption: "Clear daylight perspective of the Ground + 6 floors standalone residential tower.",
      featured: true
    },
    {
      id: "p-2",
      title: "Residential Facade & Balconies",
      category: "elevation",
      categoryLabel: "Building Elevation",
      imageUrl: getAssetUrl("society-photos/building-photo-12.jpeg"),
      caption: "Daylight view highlighting clean balcony layout and ventilation windows.",
      featured: false
    },
    {
      id: "p-3",
      title: "Vertical Structural Perspective",
      category: "elevation",
      categoryLabel: "Building Elevation",
      imageUrl: getAssetUrl("society-photos/building-photo-8-enhanced.jpeg"),
      caption: "Full height view from Ground to 6th floor terrace line.",
      featured: false
    },
    {
      id: "p-4",
      title: "Building Corner & Exterior Drainage",
      category: "elevation",
      categoryLabel: "Building Elevation",
      imageUrl: getAssetUrl("society-photos/building-photo-10.jpeg"),
      caption: "Exterior structural quality and dedicated utility pipelines.",
      featured: false
    },

    // 2. Dedicated Parking & Campus
    {
      id: "p-5",
      title: "Ground Floor Dedicated Parking",
      category: "parking",
      categoryLabel: "Dedicated Parking",
      imageUrl: getAssetUrl("society-photos/building-photo-13.jpeg"),
      caption: "Spacious ground-level parking bays reserved for resident vehicles.",
      featured: true
    },
    {
      id: "p-6",
      title: "Entrance Driveway Approach",
      category: "parking",
      categoryLabel: "Dedicated Parking",
      imageUrl: getAssetUrl("society-photos/building-photo-2-enhanced.jpeg"),
      caption: "Paved entrance driveway providing smooth vehicle access into the compound.",
      featured: false
    },
    {
      id: "p-7",
      title: "Ground Level Entrance & Bays",
      category: "parking",
      categoryLabel: "Dedicated Parking",
      imageUrl: getAssetUrl("society-photos/building-photo-5-enhanced.jpeg"),
      caption: "Clean ground-level entry and parking lanes.",
      featured: false
    },
    {
      id: "p-8",
      title: "Covered Parking Sections",
      category: "parking",
      categoryLabel: "Dedicated Parking",
      imageUrl: getAssetUrl("society-photos/building-photo-7-enhanced.jpeg"),
      caption: "Demarcated vehicle slots under the residential floors.",
      featured: false
    },
    {
      id: "p-9",
      title: "Security Post & Gate Approach",
      category: "parking",
      categoryLabel: "Dedicated Parking",
      imageUrl: getAssetUrl("society-photos/building-photo-9-enhanced.jpeg"),
      caption: "Manned security gate and perimeter entrance pathway.",
      featured: false
    },

    // 3. Holi Celebration
    {
      id: "p-holi-1",
      title: "Holi Celebrations & Festive Spirit",
      category: "holi",
      categoryLabel: "Holi Celebration",
      imageUrl: getAssetUrl("society-photos/building-photo-3-enhanced.jpeg"),
      caption: "Community celebration during Holi festival with resident families.",
      date: "March 2026",
      featured: true
    },
    {
      id: "p-holi-2",
      title: "Festive Evening Ambiance Post-Holi",
      category: "holi",
      categoryLabel: "Holi Celebration",
      imageUrl: getAssetUrl("society-photos/building-photo-6-enhanced.jpeg"),
      caption: "Peaceful evening lighting following the daytime colorful festival.",
      date: "March 2026",
      featured: false
    },

    // 4. Men's Day Celebration
    {
      id: "p-mens-1",
      title: "Men's Day Society Meetup & Get-Together",
      category: "mens_day",
      categoryLabel: "Men's Day Celebration",
      imageUrl: getAssetUrl("society-photos/building-photo-2-enhanced.jpeg"),
      caption: "Morning tea meetup and appreciation get-together honoring resident fathers and men.",
      date: "November 2026",
      featured: true
    },
    {
      id: "p-mens-2",
      title: "Campus Gathering & Fellowship",
      category: "mens_day",
      categoryLabel: "Men's Day Celebration",
      imageUrl: getAssetUrl("society-photos/building-photo-7-enhanced.jpeg"),
      caption: "Community fellowship and pleasant informal discussions at the ground campus.",
      date: "November 2026",
      featured: false
    },

    // 5. Diwali & Festive Illumination
    {
      id: "p-10",
      title: "Diwali & Festive Lighting Elevation",
      category: "festivals",
      categoryLabel: "Diwali & Lights",
      imageUrl: getAssetUrl("society-photos/building-photo-1-enhanced.jpeg"),
      caption: "Colorful festive illumination adorning the building during celebrations.",
      date: "Diwali Celebration",
      featured: true
    },
    {
      id: "p-11",
      title: "Evening Illumination & Gate Ambiance",
      category: "festivals",
      categoryLabel: "Diwali & Lights",
      imageUrl: getAssetUrl("society-photos/building-photo-3-enhanced.jpeg"),
      caption: "Evening ambient lights creating a warm and welcoming residential atmosphere.",
      featured: false
    },
    {
      id: "p-12",
      title: "Balcony Light Decorations",
      category: "festivals",
      categoryLabel: "Diwali & Lights",
      imageUrl: getAssetUrl("society-photos/building-photo-4-enhanced.jpeg"),
      caption: "Balconies lit up with festive lanterns and strings during celebrations.",
      featured: false
    },
    {
      id: "p-13",
      title: "Nighttime Tower Atmosphere",
      category: "festivals",
      categoryLabel: "Diwali & Lights",
      imageUrl: getAssetUrl("society-photos/building-photo-6-enhanced.jpeg"),
      caption: "Peaceful evening view of the building under soft perimeter lighting.",
      featured: false
    },

    // 6. National Celebrations
    {
      id: "p-nat-1",
      title: "Ceremonial Entrance Gate & Gathering Point",
      category: "national",
      categoryLabel: "National Days",
      imageUrl: getAssetUrl("society-photos/building-photo-9-enhanced.jpeg"),
      caption: "Main entrance area where residents gather for Republic Day and Independence Day flag hoisting.",
      date: "National Celebrations",
      featured: true
    },
    {
      id: "p-nat-2",
      title: "Daylight Campus Elevation & Flag Line",
      category: "national",
      categoryLabel: "National Days",
      imageUrl: getAssetUrl("society-photos/building-photo-11.jpeg"),
      caption: "Full view of the building proudly hoisted with patriotic bunting and flags.",
      featured: false
    }
  ],

  // Real Walkthrough Videos
  videos: [
    {
      id: "v-1",
      title: "Building Exterior & Dedicated Parking Walkthrough",
      duration: "0:12",
      videoUrl: getAssetUrl("society-videos/society-walkthrough-1.mp4"),
      thumbnailUrl: getAssetUrl("society-videos/society-walkthrough-1-poster.jpg"),
      caption: "Live video showing building front elevation, entrance driveway, and ground parking area.",
      category: "Campus Walkthrough"
    },
    {
      id: "v-2",
      title: "Vertical 6-Floor Elevation & Surroundings",
      duration: "0:07",
      videoUrl: getAssetUrl("society-videos/society-walkthrough-2.mp4"),
      thumbnailUrl: getAssetUrl("society-videos/society-walkthrough-2-poster.jpg"),
      caption: "Vertical video scan of the Ground + 6 floors facade, balconies, and open surroundings.",
      category: "Elevation Scan"
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
      { label: "Lift AMC Emergency Support", number: "Emergency Roster" },
      { label: "Local Police Station", number: "100 / 112" },
      { label: "Emergency Ambulance", number: "102 / 108" }
    ]
  }
};
