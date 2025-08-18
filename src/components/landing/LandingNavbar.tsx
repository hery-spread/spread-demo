'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useI18n } from '@/lib/i18n/context';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  const handleSignIn = () => {
    // Redirection vers page de connexion ou modal
    window.location.href = '/search'; // Temporaire - redirection vers dashboard
  };

  const handleSignUp = () => {
    // Redirection vers onboarding/inscription
    window.location.href = '/onboarding';
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navigationLinks = [
    { name: t('navbar.features'), action: () => scrollToSection('features') },
    { name: t('navbar.testimonials'), action: () => scrollToSection('testimonials') },
    { name: t('navbar.pricing'), action: () => scrollToSection('pricing') },
  ];

  return (
    <>
      {/* Fixed Glassmorphism Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-gray-500/10 rounded-2xl border border-white/20 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 transform transition-transform duration-300 hover:rotate-12 hover:scale-110">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    {t('navbar.brand')}
                  </h1>
                  <p className="text-xs text-gray-500 font-medium hidden sm:block">
                    {t('navbar.tagline')}
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigationLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={link.action}
                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <LanguageSelector variant="compact" />
                <Button
                  onClick={handleSignIn}
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 font-medium px-6"
                >
                  {t('navbar.signIn')}
                </Button>
                <Button
                  onClick={handleSignUp}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 shadow-lg shadow-purple-500/25 transform transition-all duration-300 hover:scale-105"
                >
                  {t('navbar.signUp')}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors duration-300"
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                  ) : (
                    <Bars3Icon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-500/20 rounded-2xl border border-white/20 p-6">
            {/* Navigation Links */}
            <div className="space-y-4 mb-6">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="block w-full text-left py-3 px-4 rounded-xl text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium transition-all duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-100">
              <div className="flex justify-center pb-3">
                <LanguageSelector />
              </div>
              <Button
                onClick={handleSignIn}
                variant="outline"
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-medium py-3"
              >
                {t('navbar.signIn')}
              </Button>
              <Button
                onClick={handleSignUp}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg shadow-purple-500/25"
              >
                🚀 {t('navbar.signUp')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
