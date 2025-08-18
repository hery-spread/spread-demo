'use client';

import { useI18n } from '@/lib/i18n/context';
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SupportPage() {
  const { t } = useI18n();

  const supportChannels = [
    {
      title: t('support.channels.email.title'),
      description: t('support.channels.email.description'),
      responseTime: t('support.channels.email.responseTime'),
      contact: 'support@spread.app',
      icon: '📧',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      title: t('support.channels.chat.title'),
      description: t('support.channels.chat.description'),
      responseTime: t('support.channels.chat.responseTime'),
      contact: t('support.channels.chat.contact'),
      icon: '💬',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      title: t('support.channels.phone.title'),
      description: t('support.channels.phone.description'),
      responseTime: t('support.channels.phone.responseTime'),
      contact: '+33 1 23 45 67 89',
      icon: '📞',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
    },
  ];

  const faqCategories = [
    {
      title: t('support.faq.account.title'),
      questions: t('support.faq.account.questions').split('|'),
      icon: '👤',
    },
    {
      title: t('support.faq.billing.title'),
      questions: t('support.faq.billing.questions').split('|'),
      icon: '💳',
    },
    {
      title: t('support.faq.technical.title'),
      questions: t('support.faq.technical.questions').split('|'),
      icon: '🔧',
    },
    {
      title: t('support.faq.features.title'),
      questions: t('support.faq.features.questions').split('|'),
      icon: '⚡',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-green-200 hover:text-white transition-colors duration-300 mb-8"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">Retour à l'accueil</span>
            </Link>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
                <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">
              Support Client
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Nous sommes là pour vous aider à réussir avec Spread
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-green-200">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>24h/24, 7j/7 disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Support en français, anglais et néerlandais</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Support Channels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('support.channelsSection.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${channel.bgColor} rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-3xl">{channel.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {channel.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {channel.responseTime}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{channel.description}</p>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                  <div className="font-medium text-gray-900 text-sm mb-1">
                    {t('support.contact')}
                  </div>
                  <div className="text-gray-700 font-mono text-sm">
                    {channel.contact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-8 text-white">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🚨</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {t('support.emergency.title')}
                </h3>
                <p className="text-red-100">
                  {t('support.emergency.subtitle')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="font-medium mb-2">
                  {t('support.emergency.phone')}
                </div>
                <div className="text-xl font-mono">+33 1 23 45 67 89</div>
                <div className="text-sm text-red-100 mt-1">
                  {t('support.emergency.phoneHours')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="font-medium mb-2">
                  {t('support.emergency.email')}
                </div>
                <div className="text-xl font-mono">urgent@spread.app</div>
                <div className="text-sm text-red-100 mt-1">
                  {t('support.emergency.emailResponse')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('support.faqSection.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex} className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600">{question.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('support.resources.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('support.resources.documentation')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('support.resources.documentationDesc')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎥</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('support.resources.videos')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('support.resources.videosDesc')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t('support.resources.community')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('support.resources.communityDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('support.contactForm.title')}
            </h3>
            <p className="text-lg mb-6 text-green-100">
              {t('support.contactForm.description')}
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors duration-300 shadow-lg">
              {t('support.contactForm.button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
