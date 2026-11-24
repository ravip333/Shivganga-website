import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { AboutSociety } from './components/AboutSociety/AboutSociety';
import { Gallery } from './components/Gallery/Gallery';
import { Location } from './components/Location/Location';
import { Footer } from './components/Footer/Footer';
import { societyData } from './data/societyData';
import type { MediaCategory } from './types';

export function App() {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<MediaCategory>('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
      {/* Light Professional Sticky Navbar (4 Clean Links) */}
      <Navbar shortName={societyData.shortName} />

      {/* Main Content Sections - Streamlined & Uncluttered */}
      <main className="flex-1">
        {/* 1. Hero Section - Minimalist & Visual */}
        <Hero
          shortName={societyData.shortName}
          tagline={societyData.tagline}
          heroHeadline={societyData.heroHeadline}
          heroSubheadline={societyData.heroSubheadline}
          slides={societyData.heroSlides}
          googleMapsUrl={societyData.contact.googleMapsUrl}
        />

        {/* 2. About & Amenities Combined - 4 Clean Visual Cards with Zero Fluff */}
        <AboutSociety data={societyData} />

        {/* 3. Visual Media & Celebrations Collages (Holi, Men's Day, Diwali, Parking, Videos) */}
        <Gallery
          photos={societyData.photos}
          videos={societyData.videos}
          externalSelectedCategory={selectedGalleryCategory}
          isUploadModalOpen={isUploadOpen}
          onCloseUploadModal={() => setIsUploadOpen(false)}
          onOpenUploadModal={(cat) => {
            if (cat) setSelectedGalleryCategory(cat);
            setIsUploadOpen(true);
          }}
        />

        {/* 4. Location, Directions & Google Map with Helplines */}
        <Location data={societyData} />
      </main>

      {/* Clean Modern Footer */}
      <Footer data={societyData} />
    </div>
  );
}

export default App;
