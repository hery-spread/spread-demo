'use client';

import { useI18n } from '@/lib/i18n/context';
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function TermsPage() {
  const { t } = useI18n();

  const sections = [
    {
      title: t('terms.sections.acceptance.title'),
      content: t('terms.sections.acceptance.content'),
      icon: '✅',
    },
    {
      title: t('terms.sections.services.title'),
      content: t('terms.sections.services.content'),
      icon: '🛠️',
    },
    {
      title: t('terms.sections.userAccounts.title'),
      content: t('terms.sections.userAccounts.content'),
      icon: '👤',
    },
    {
      title: t('terms.sections.usage.title'),
      content: t('terms.sections.usage.content'),
      icon: '📋',
    },
    {
      title: t('terms.sections.payment.title'),
      content: t('terms.sections.payment.content'),
      icon: '💳',
    },
    {
      title: t('terms.sections.intellectual.title'),
      content: t('terms.sections.intellectual.content'),
      icon: '©️',
    },
    {
      title: t('terms.sections.liability.title'),
      content: t('terms.sections.liability.content'),
      icon: '⚠️',
    },
    {
      title: t('terms.sections.termination.title'),
      content: t('terms.sections.termination.content'),
      icon: '🔚',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-300 mb-8"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">Retour à l'accueil</span>
            </Link>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
                <DocumentTextIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">
              Conditions d'Utilisation
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Les règles d'utilisation de la plateforme Spread
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Mise à jour : 15 décembre 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>En vigueur depuis : 1er janvier 2024</span>
              </div>
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
              {t('terms.intro.title')}
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>{t('terms.intro.content')}</p>
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
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
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('terms.contactSection.title')}
            </h3>
            <p className="text-lg mb-6 text-blue-100">
              {t('terms.contactSection.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-blue-200">legal@spread.app</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏢</span>
                <div>
                  <div className="font-medium">
                    {t('terms.contactSection.address')}
                  </div>
                  <div className="text-blue-200">Paris, France</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
