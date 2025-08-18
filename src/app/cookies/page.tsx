'use client';

import { useI18n } from '@/lib/i18n/context';
import { ArrowLeftIcon, CakeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CookiesPage() {
  const { t } = useI18n();

  const cookieTypes = [
    {
      title: t('cookies.types.essential.title'),
      description: t('cookies.types.essential.description'),
      examples: t('cookies.types.essential.examples'),
      icon: '🔧',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-100 to-emerald-100',
    },
    {
      title: t('cookies.types.analytics.title'),
      description: t('cookies.types.analytics.description'), 
      examples: t('cookies.types.analytics.examples'),
      icon: '📊',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-100 to-indigo-100',
    },
    {
      title: t('cookies.types.marketing.title'),
      description: t('cookies.types.marketing.description'),
      examples: t('cookies.types.marketing.examples'),
      icon: '🎯',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-100 to-pink-100',
    },
    {
      title: t('cookies.types.functional.title'),
      description: t('cookies.types.functional.description'),
      examples: t('cookies.types.functional.examples'),
      icon: '⚙️',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-100 to-red-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-orange-600 hover:text-orange-800 transition-colors duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">{t('cookies.backToHome')}</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <CakeIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {t('cookies.title')}
              </h1>
              <p className="text-lg text-gray-600">
                {t('cookies.subtitle')}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{t('cookies.lastUpdated')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>{t('cookies.effectiveDate')}</span>
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
              {t('cookies.intro.title')}
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>{t('cookies.intro.content')}</p>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {cookieTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${type.bgColor} rounded-xl flex items-center justify-center`}>
                  <span className="text-2xl">{type.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {type.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {type.description}
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {t('cookies.examples')}
                </p>
                <p className="text-sm text-gray-600">
                  {type.examples}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Management Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('cookies.management.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    🌐
                  </span>
                  {t('cookies.management.browser.title')}
                </h3>
                <div className="prose prose-sm text-gray-600">
                  <div dangerouslySetInnerHTML={{ __html: t('cookies.management.browser.content') }} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    ⚙️
                  </span>
                  {t('cookies.management.preferences.title')}
                </h3>
                <div className="prose prose-sm text-gray-600">
                  <div dangerouslySetInnerHTML={{ __html: t('cookies.management.preferences.content') }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Party Services */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('cookies.thirdParty.title')}
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: t('cookies.thirdParty.content') }} />
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12">
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('cookies.contactSection.title')}
            </h3>
            <p className="text-lg mb-6 text-orange-100">
              {t('cookies.contactSection.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-orange-200">privacy@spread.app</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🍪</span>
                <div>
                  <div className="font-medium">{t('cookies.contactSection.preferences')}</div>
                  <div className="text-orange-200">{t('cookies.contactSection.manage')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
