import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { AboutSociety } from './components/AboutSociety/AboutSociety';
import { Facilities } from './components/Facilities/Facilities';
import { Gallery } from './components/Gallery/Gallery';
import { Location } from './components/Location/Location';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { societyData } from './data/societyData';

export function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
      {/* Light Professional Sober Sticky Navbar */}
      <Navbar shortName={societyData.shortName} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with 100% Real Images Background Slider */}
        <Hero
          shortName={societyData.shortName}
          tagline={societyData.tagline}
          heroHeadline={societyData.heroHeadline}
          heroSubheadline={societyData.heroSubheadline}
          slides={societyData.heroSlides}
          googleMapsUrl={societyData.contact.googleMapsUrl}
        />

        {/* About Standalone 6-Floor Building (G+6) with Verified MCS Act Registration */}
        <AboutSociety data={societyData} />

        {/* Verified Amenities (Dedicated Parking, Lift, Security, Utilities - No Hall) */}
        <Facilities amenities={societyData.amenities} />

        {/* Photo & Video Function Collages (All Real Photos & Videos with Lightbox & Player) */}
        <Gallery photos={societyData.photos} videos={societyData.videos} />

        {/* Location & Nearby Connectivity (Station, Bus/Auto, Markets, Hospitals) */}
        <Location data={societyData} />

        {/* Building Guidelines & Emergency Contacts (No Office Desk) */}
        <Contact data={societyData} />
      </main>

      {/* Professional Sober Footer */}
      <Footer data={societyData} />
    </div>
  );
}

export default App;
