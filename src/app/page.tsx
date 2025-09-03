'use client';

import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import PricingPreview from '@/components/landing/PricingPreview';
import FAQSection from '@/components/landing/FAQSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import SEOHead from '@/components/layout/SEOHead';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Head */}
      <SEOHead pathname="/" />

      {/* Landing Navbar */}
      <LandingNavbar />

      {/* Hero Section (TOFU) */}
      <div id="hero">
        <HeroSection featureType="search" />
      </div>

      {/* Features Section (MOFU) */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* Social Proof Section (MOFU) */}
      <div id="testimonials">
        <SocialProofSection />
      </div>

      {/* Pricing Preview Section (BOFU) */}
      <div id="pricing">
        <PricingPreview />
      </div>

      {/* Call to Action Section (BOFU) */}
      <CTASection />

      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* Trust Indicators
      <TrustIndicators /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
