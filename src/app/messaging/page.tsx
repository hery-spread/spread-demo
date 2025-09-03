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

export default function MessagingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Head */}
      <SEOHead pathname="/messaging" />

      {/* Landing Navbar */}
      <LandingNavbar />

      {/* Hero Section - Messagerie */}
      <div id="hero">
        <HeroSection featureType="messaging" />
      </div>

      {/* Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* Social Proof Section */}
      <div id="testimonials">
        <SocialProofSection />
      </div>

      {/* Pricing Preview Section */}
      <div id="pricing">
        <PricingPreview />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* Call to Action Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
