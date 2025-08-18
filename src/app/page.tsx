'use client';

import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import PricingPreview from '@/components/landing/PricingPreview';
import CTASection from '@/components/landing/CTASection';
import TrustIndicators from '@/components/landing/TrustIndicators';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (TOFU) */}
      <HeroSection />

      {/* Features Section (MOFU) */}
      <FeaturesSection />

      {/* Social Proof Section (MOFU) */}
      <SocialProofSection />

      {/* Pricing Preview Section (BOFU) */}
      <PricingPreview />

      {/* Call to Action Section (BOFU) */}
      <CTASection />

      {/* Trust Indicators */}
      <TrustIndicators />
    </div>
  );
}
