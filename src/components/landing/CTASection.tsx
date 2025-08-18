'use client';

import { Button } from '@/components/ui/Button';
import {
  RocketLaunchIcon,
  CalendarDaysIcon,
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export default function CTASection() {
  const handleStartTrial = () => {
    window.location.href = '/onboarding';
  };

  const handleBookDemo = () => {
    window.location.href = '/onboarding?demo=true';
  };

  const urgencyStats = [
    {
      icon: UserGroupIcon,
      number: '2,847+',
      label: 'marketeurs nous font déjà confiance',
    },
    {
      icon: ChartBarIcon,
      number: '10h',
      label: 'économisées par semaine en moyenne',
    },
    {
      icon: SparklesIcon,
      number: '347%',
      label: "d'augmentation du ROI en moyenne",
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-400 to-blue-400 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Content */}
        <div className="text-center mb-16">
          {/* Urgency Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold mb-8 animate-pulse">
            🔥 Offre limitée : Essai gratuit 14 jours
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Rejoignez les 2,847+ marketeurs qui
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {' '}
              économisent 10h/semaine{' '}
            </span>
            avec Spread
          </h2>

          {/* Subheadline */}
          <p className="text-xl lg:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Arrêtez de perdre du temps sur des recherches manuelles
            d\'influenceurs. Laissez notre IA faire le travail pour vous.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              onClick={handleStartTrial}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-6 text-xl font-bold shadow-2xl shadow-green-500/25 transform transition-all duration-300 hover:scale-110 border-2 border-green-400"
            >
              <RocketLaunchIcon className="w-6 h-6 mr-3" />
              🚀 Commencer l'Essai Gratuit
            </Button>
            <Button
              onClick={handleBookDemo}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-12 py-6 text-xl font-bold bg-white/10 backdrop-blur-sm"
            >
              <CalendarDaysIcon className="w-6 h-6 mr-3" />
              📞 Réserver une Démo
            </Button>
          </div>

          {/* Guarantee */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div className="text-white font-semibold">Sans Engagement</div>
                <div className="text-purple-200 text-sm">
                  Annulez à tout moment
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">🔐</span>
                </div>
                <div className="text-white font-semibold">Sécurisé</div>
                <div className="text-purple-200 text-sm">Aucune CB requise</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <div className="text-white font-semibold">Accès Immédiat</div>
                <div className="text-purple-200 text-sm">
                  Configuration en 2 minutes
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {urgencyStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-purple-200 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Final Urgency Message */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30">
            <div className="text-center">
              <div className="text-orange-300 font-bold text-lg mb-2">
                ⏰ Ne perdez plus de temps avec des recherches manuelles
              </div>
              <div className="text-white text-sm">
                Pendant que vous hésitez, vos concurrents trouvent déjà les
                meilleurs influenceurs avec Spread
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="border-t border-white/20 pt-12">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center text-purple-200">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm">
                2,847+ utilisateurs actifs maintenant
              </span>
            </div>
            <div className="flex items-center text-purple-200">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm">Noté 4.9/5 sur Trustpilot</span>
            </div>
            <div className="flex items-center text-purple-200">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm">Support français 7j/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
