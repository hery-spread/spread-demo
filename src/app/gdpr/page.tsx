'use client';

import { useI18n } from '@/lib/i18n/context';
import {
  ArrowLeftIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function GDPRPage() {
  const { t } = useI18n();

  const rights = [
    {
      title: t('gdpr.rights.access.title'),
      description: t('gdpr.rights.access.description'),
      icon: '👁️',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: t('gdpr.rights.rectification.title'),
      description: t('gdpr.rights.rectification.description'),
      icon: '✏️',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t('gdpr.rights.erasure.title'),
      description: t('gdpr.rights.erasure.description'),
      icon: '🗑️',
      color: 'from-red-500 to-pink-500',
    },
    {
      title: t('gdpr.rights.portability.title'),
      description: t('gdpr.rights.portability.description'),
      icon: '📦',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: t('gdpr.rights.restriction.title'),
      description: t('gdpr.rights.restriction.description'),
      icon: '⏸️',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      title: t('gdpr.rights.objection.title'),
      description: t('gdpr.rights.objection.description'),
      icon: '🚫',
      color: 'from-gray-500 to-slate-500',
    },
  ];

  const dataTypes = [
    {
      category: t('gdpr.dataTypes.personal.title'),
      items: t('gdpr.dataTypes.personal.items'),
      icon: '👤',
    },
    {
      category: t('gdpr.dataTypes.technical.title'),
      items: t('gdpr.dataTypes.technical.items'),
      icon: '💻',
    },
    {
      category: t('gdpr.dataTypes.behavioral.title'),
      items: t('gdpr.dataTypes.behavioral.items'),
      icon: '📈',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">{t('gdpr.backToHome')}</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldExclamationIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {t('gdpr.title')}
              </h1>
              <p className="text-lg text-gray-600">{t('gdpr.subtitle')}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{t('gdpr.lastUpdated')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>{t('gdpr.regulation')}</span>
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
              {t('gdpr.intro.title')}
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>{t('gdpr.intro.content')}</p>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('gdpr.rightsSection.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rights.map((right, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${right.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl">{right.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {right.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{right.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data We Process */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('gdpr.dataSection.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dataTypes.map((type, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{type.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {type.category}
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {type.items.split('|').map((item, itemIndex) => (
                      <li key={itemIndex}>• {item.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Basis */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('gdpr.legalBasis.title')}
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: t('gdpr.legalBasis.content'),
                }}
              />
            </div>
          </div>
        </div>

        {/* Exercise Your Rights */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {t('gdpr.exerciseSection.title')}
            </h3>
            <p className="text-lg mb-8 text-indigo-100 text-center">
              {t('gdpr.exerciseSection.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <div className="font-medium mb-1">Email</div>
                <div className="text-indigo-200 text-sm">
                  privacy@spread.app
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="font-medium mb-1">
                  {t('gdpr.exerciseSection.form')}
                </div>
                <div className="text-indigo-200 text-sm">
                  {t('gdpr.exerciseSection.formDesc')}
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div className="font-medium mb-1">
                  {t('gdpr.exerciseSection.response')}
                </div>
                <div className="text-indigo-200 text-sm">
                  {t('gdpr.exerciseSection.responseTime')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection Officer */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('gdpr.dpo.title')}
            </h2>
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <div className="flex-1">
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>{t('gdpr.dpo.content')}</p>
                </div>
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="font-medium text-indigo-900">
                    {t('gdpr.dpo.contact')}
                  </div>
                  <div className="text-indigo-700">dpo@spread.app</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
