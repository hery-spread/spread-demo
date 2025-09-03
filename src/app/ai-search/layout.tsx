import LandingNavbar from '@/components/landing/LandingNavbar';
import Footer from '@/components/landing/Footer';
import SEOHead from '@/components/layout/SEOHead';

export default function AISearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* SEO Head */}
      <SEOHead pathname="/ai-search" />

      {/* Landing Navbar */}
      <LandingNavbar />

      {/* Main Content avec padding pour le navbar fixed */}
      <div className="pt-24">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
