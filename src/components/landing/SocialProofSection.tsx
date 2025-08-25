'use client';

import { useI18n } from '@/lib/i18n/context';
import { StarIcon } from '@heroicons/react/24/solid';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function SocialProofSection() {
  const { t } = useI18n();
  const testimonials = [
    {
      name: t('socialProof.testimonials.0.name'),
      role: t('socialProof.testimonials.0.role'),
      company: t('socialProof.testimonials.0.company'),
      avatar: 'MD',
      rating: 5,
      text: t('socialProof.testimonials.0.text'),
      results: t('socialProof.testimonials.0.results'),
    },
    {
      name: t('socialProof.testimonials.1.name'),
      role: t('socialProof.testimonials.1.role'),
      company: t('socialProof.testimonials.1.company'),
      avatar: 'TC',
      rating: 5,
      text: t('socialProof.testimonials.1.text'),
      results: t('socialProof.testimonials.1.results'),
    },
    {
      name: t('socialProof.testimonials.2.name'),
      role: t('socialProof.testimonials.2.role'),
      company: t('socialProof.testimonials.2.company'),
      avatar: 'SM',
      rating: 5,
      text: t('socialProof.testimonials.2.text'),
      results: t('socialProof.testimonials.2.results'),
    },
  ];

  const stats = [
    {
      number: t('socialProof.stats.0.number'),
      label: t('socialProof.stats.0.label'),
    },
    {
      number: t('socialProof.stats.1.number'),
      label: t('socialProof.stats.1.label'),
    },
    {
      number: t('socialProof.stats.2.number'),
      label: t('socialProof.stats.2.label'),
    },
    {
      number: t('socialProof.stats.3.number'),
      label: t('socialProof.stats.3.label'),
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <StarIcon className="w-4 h-4 mr-2" />
            {t('socialProof.badge')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('socialProof.title')}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}
              {t('socialProof.titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('socialProof.subtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </blockquote>

              {/* Results */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6">
                <div className="text-green-700 font-semibold text-center">
                  📈 {testimonial.results}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50">
          <div className="grid md:grid-cols-2 gap-12 text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {t('socialProof.trustIndicators.excellence.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('socialProof.trustIndicators.excellence.description')}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {t('socialProof.trustIndicators.support.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('socialProof.trustIndicators.support.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
