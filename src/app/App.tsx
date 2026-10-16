import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Providers
import { LanguageProvider } from '../hooks/useLanguage';
import { VariantProvider } from '../hooks/useVariant';
import { FavouritesProvider } from '../hooks/useFavourites';
import { CompareProvider } from '../hooks/useCompare';

// Navigation & Layout Components
import { VariantSwitcher } from '../components/switcher/VariantSwitcher';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { FloatingWhatsApp } from '../components/shared/FloatingWhatsApp';
import { CookieConsent } from '../components/shared/CookieConsent';
import { ClientReviewModal } from '../components/shared/ClientReviewModal';
import { CompareModal } from '../components/shared/CompareModal';
import { CompareBar } from '../components/shared/CompareBar';

// Primary Home is loaded directly
import { Home } from '../pages/Home';

// Lazy-loaded pages
const Properties = lazy(() => import('../pages/Properties').then(m => ({ default: m.Properties })));
const PropertyDetail = lazy(() => import('../pages/PropertyDetail').then(m => ({ default: m.PropertyDetail })));
const DakhinaCity = lazy(() => import('../pages/DakhinaCity').then(m => ({ default: m.DakhinaCity })));
const AboutUs = lazy(() => import('../pages/Company/AboutUs').then(m => ({ default: m.AboutUs })));
const MessageFromMD = lazy(() => import('../pages/Company/MessageFromMD').then(m => ({ default: m.MessageFromMD })));
const BoardOfDirectors = lazy(() => import('../pages/Company/BoardOfDirectors').then(m => ({ default: m.BoardOfDirectors })));
const RehabMembership = lazy(() => import('../pages/Company/RehabMembership').then(m => ({ default: m.RehabMembership })));
const AwardsAchievements = lazy(() => import('../pages/Company/AwardsAchievements').then(m => ({ default: m.AwardsAchievements })));
const OurTeams = lazy(() => import('../pages/Company/OurTeams').then(m => ({ default: m.OurTeams })));
const OurClients = lazy(() => import('../pages/OurClients').then(m => ({ default: m.OurClients })));
const MediaNews = lazy(() => import('../pages/MediaNews').then(m => ({ default: m.MediaNews })));
const Career = lazy(() => import('../pages/Career').then(m => ({ default: m.Career })));
const ContactUs = lazy(() => import('../pages/ContactUs').then(m => ({ default: m.ContactUs })));
const NotFound = lazy(() => import('../pages/NotFound').then(m => ({ default: m.NotFound })));

const PageFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-3">
    <div className="w-10 h-10 border-3 border-[#128341]/20 border-t-[#128341] rounded-full animate-spin" />
    <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">Loading Page...</span>
  </div>
);

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // If not linking to an anchor, scroll to top
    if (!window.location.hash.includes('#')) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return null;
};

// Main App Inner layout
const AppContent: React.FC = () => {
  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-inherit bg-inherit selection:bg-amber-500/20 selection:text-amber-900">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Floating 5-Variant Switcher Bar */}
      <VariantSwitcher />

      {/* Primary Sticky Header */}
      <div className="pt-8 sm:pt-10">
        <Navbar />
      </div>

      {/* Main Page Body */}
      <main id="main-content" className="flex-1 focus:outline-none">
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:slug" element={<PropertyDetail />} />
            <Route path="/dakhina-city" element={<DakhinaCity />} />

            {/* Company subpages with canonical and alias routes */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/company/about" element={<AboutUs />} />

            <Route path="/message-from-md" element={<MessageFromMD />} />
            <Route path="/company/md-message" element={<MessageFromMD />} />

            <Route path="/board-of-directors" element={<BoardOfDirectors />} />
            <Route path="/company/board" element={<BoardOfDirectors />} />

            <Route path="/rehab-membership" element={<RehabMembership />} />
            <Route path="/company/rehab" element={<RehabMembership />} />

            <Route path="/awards-achievements" element={<AwardsAchievements />} />
            <Route path="/company/awards" element={<AwardsAchievements />} />

            <Route path="/our-teams" element={<OurTeams />} />
            <Route path="/company/teams" element={<OurTeams />} />

            {/* Institutional & Media */}
            <Route path="/our-clients" element={<OurClients />} />
            <Route path="/clients" element={<OurClients />} />

            <Route path="/media-news" element={<MediaNews />} />
            <Route path="/career" element={<Career />} />

            {/* Contact & Schedule */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Shared Global Overlays */}
      <CompareBar />
      <CompareModal />
      <ClientReviewModal />
      <FloatingWhatsApp />
      <CookieConsent />

      {/* Primary Global Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <LanguageProvider>
        <VariantProvider>
          <FavouritesProvider>
            <CompareProvider>
              <AppContent />
            </CompareProvider>
          </FavouritesProvider>
        </VariantProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;
