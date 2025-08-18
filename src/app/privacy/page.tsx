'use client';

import { useI18n } from '@/lib/i18n/context';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PrivacyPage() {
  const { t } = useI18n();

  const sections = [
    {
      title: t('privacy.sections.dataCollection.title'),
      content: t('privacy.sections.dataCollection.content'),
      icon: '📊',
    },
    {
      title: t('privacy.sections.dataUsage.title'), 
      content: t('privacy.sections.dataUsage.content'),
      icon: '🔄',
    },
    {
      title: t('privacy.sections.dataSharing.title'),
      content: t('privacy.sections.dataSharing.content'),
      icon: '🤝',
    },
    {
      title: t('privacy.sections.dataSecurity.title'),
      content: t('privacy.sections.dataSecurity.content'),
      icon: '🔒',
    },
    {
      title: t('privacy.sections.userRights.title'),
      content: t('privacy.sections.userRights.content'),
      icon: '⚖️',
    },
    {
      title: t('privacy.sections.cookies.title'),
      content: t('privacy.sections.cookies.content'),
      icon: '🍪',
    },
    {
      title: t('privacy.sections.contact.title'),
      content: t('privacy.sections.contact.content'),
      icon: '📧',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">{t('privacy.backToHome')}</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {t('privacy.title')}
              </h1>
              <p className="text-lg text-gray-600">
                {t('privacy.subtitle')}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{t('privacy.lastUpdated')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{t('privacy.effectiveDate')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introduction */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('privacy.intro.title')}
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>{t('privacy.intro.content')}</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">{section.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h3>
              </div>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('privacy.contactSection.title')}
            </h3>
            <p className="text-lg mb-6 text-purple-100">
              {t('privacy.contactSection.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-purple-200">privacy@spread.app</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏢</span>
                <div>
                  <div className="font-medium">{t('privacy.contactSection.address')}</div>
                  <div className="text-purple-200">Paris, France</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
