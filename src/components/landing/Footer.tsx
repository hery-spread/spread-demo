'use client';

import { useI18n } from '@/lib/i18n/context';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
  const { t } = useI18n();

  const quickLinks = [
    { label: t('footer.quickLinks.features'), href: '#features' },
    { label: t('footer.quickLinks.pricing'), href: '#pricing' },
    { label: t('footer.quickLinks.testimonials'), href: '#testimonials' },
    { label: t('footer.quickLinks.demo'), href: '/onboarding?demo=true' },
  ];

  const legalLinks = [
    { label: t('footer.legal.privacy'), href: '/privacy' },
    { label: t('footer.legal.terms'), href: '/terms' },
    { label: t('footer.legal.cookies'), href: '/cookies' },
    { label: t('footer.legal.gdpr'), href: '/gdpr' },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/spread', icon: '💼' },
    { label: 'Twitter', href: 'https://twitter.com/spread', icon: '🐦' },
    { label: 'YouTube', href: 'https://youtube.com/@spread', icon: '📺' },
    { label: 'Instagram', href: 'https://instagram.com/spread', icon: '📸' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {t('footer.brand.name')}
                  </h3>
                  <p className="text-purple-200 text-sm">
                    {t('footer.brand.tagline')}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                {t('footer.brand.description')}
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <EnvelopeIcon className="w-5 h-5 text-purple-400" />
                  <span>{t('footer.contact.email')}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <PhoneIcon className="w-5 h-5 text-purple-400" />
                  <span>{t('footer.contact.phone')}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPinIcon className="w-5 h-5 text-purple-400" />
                  <span>{t('footer.contact.address')}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <GlobeAltIcon className="w-5 h-5 text-purple-400" />
                  <span>{t('footer.contact.website')}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">
                {t('footer.quickLinks.title')}
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">
                {t('footer.legal.title')}
              </h4>
              <ul className="space-y-4">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Support Button */}
              <div className="mt-8">
                <a
                  href="/support"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  💬 {t('footer.support.button')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Stats */}
        <div className="py-8 border-t border-purple-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">
                {t('footer.social.title')}
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="text-right">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-300 mb-2">250M+</div>
                  <div className="text-sm text-gray-400">{t('footer.stats.influencers')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-300 mb-2">2,847+</div>
                  <div className="text-sm text-gray-400">{t('footer.stats.clients')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-purple-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-xl text-purple-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-indigo-600/40 transition-all duration-300 group"
            >
              <span className="text-sm font-medium">{t('footer.backToTop')}</span>
              <span className="text-lg group-hover:-translate-y-1 transition-transform duration-300">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
