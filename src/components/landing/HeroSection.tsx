'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n/context';
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function HeroSection() {
  const { t } = useI18n();

  // États pour les animations
  const [currentText, setCurrentText] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showFilters, setShowFilters] = useState<string[]>([]);
  const [_showResults, setShowResults] = useState(false);
  const [_profileCount, setProfileCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  // Texte cible pour l'animation de frappe
  const targetText =
    'Influenceuses beauté françaises entre 50k et 500k followers sur Instagram, taux engagement >4%, audience féminine 18-35 ans';

  // Filtres à révéler progressivement
  const filters = useMemo(
    () => [
      { id: 'location', label: '📍 France', delay: 500 },
      { id: 'followers', label: '👥 50K-500K followers', delay: 700 },
      { id: 'engagement', label: '📈 +4% engagement', delay: 900 },
      { id: 'category', label: '💄 Beauté', delay: 1100 },
      { id: 'audience', label: '👩 Audience féminine', delay: 1300 },
      { id: 'age', label: '🔢 18-35 ans', delay: 1500 },
    ],
    []
  );

  // Fonction de réinitialisation de l'animation
  const resetAnimation = () => {
    setCurrentText('');
    setShowAnalysis(false);
    setShowFilters([]);
    setShowResults(false);
    setProfileCount(0);
    setIsAnalyzing(false);
  };

  // Animation de frappe avec boucle
  useEffect(() => {
    if (!isLooping) return;

    if (currentText.length < targetText.length) {
      const timer = setTimeout(
        () => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        },
        30 + Math.random() * 20
      );
      return () => clearTimeout(timer);
    } else if (currentText.length === targetText.length && !showAnalysis) {
      // Démarrer l'analyse après la frappe
      const analysisTimer = setTimeout(() => {
        setIsAnalyzing(true);
        setShowAnalysis(true);

        // Révéler les filtres progressivement
        filters.forEach((filter, index) => {
          setTimeout(() => {
            setShowFilters((prev) => [...prev, filter.id]);
            if (index === filters.length - 1) {
              // Derniers filtres, montrer les résultats
              setTimeout(() => {
                setIsAnalyzing(false);
                setShowResults(true);

                // Animer le compteur
                let count = 0;
                const increment = 2847 / 50;
                const counterTimer = setInterval(() => {
                  count += increment;
                  if (count >= 2847) {
                    setProfileCount(2847);
                    clearInterval(counterTimer);

                    // Programmer le redémarrage de l'animation après 4 secondes
                    setTimeout(() => {
                      resetAnimation();
                      setAnimationCycle((prev) => prev + 1);
                    }, 4000);
                  } else {
                    setProfileCount(Math.floor(count));
                  }
                }, 30);
              }, 800);
            }
          }, filter.delay);
        });
      }, 1000);

      return () => clearTimeout(analysisTimer);
    }
  }, [
    currentText,
    targetText,
    showAnalysis,
    isLooping,
    animationCycle,
    filters,
  ]);

  const handleStartTrial = () => {
    // Redirection vers l'inscription/onboarding
    window.location.href = '/onboarding';
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Left */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4 mr-2" />
              {t('hero.trustBadge')}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.headline')}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {t('hero.headlineHighlight')}
              </span>
              {t('hero.headlineEnd')}
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              {t('hero.subheadline')}
            </p>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center">
                <MagnifyingGlassIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">
                  {t('hero.benefits.aiSearch')}
                </span>
              </div>
              <div className="flex items-center">
                <ChartBarIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">
                  {t('hero.benefits.reports')}
                </span>
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">{t('hero.benefits.crm')}</span>
              </div>
              <div className="flex items-center">
                <SparklesIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-gray-700">
                  {t('hero.benefits.analytics')}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center lg:justify-start">
              <Button
                onClick={handleStartTrial}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl shadow-purple-500/25 transform transition-all duration-300 hover:scale-105"
              >
                🚀 Commencer l'Essai Gratuit 14 Jours
              </Button>
            </div>

            {/* Trust Indicators */}
            <p className="text-sm text-gray-500 mt-6">
              {t('hero.trustIndicators')}
            </p>
          </div>

          {/* Visual Right - Real AI Search Interface */}
          <div
            className="relative"
            onMouseEnter={() => setIsLooping(false)}
            onMouseLeave={() => setIsLooping(true)}
          >
            {/* AI Search Interface Mockup */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-500/20 p-6 border border-gray-200/50">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {t('hero.aiSearch.title')}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t('hero.aiSearch.subtitle')}
                  </p>
                </div>
              </div>

              {/* AI Search Input Animé */}
              <div className="relative mb-6">
                <div className={`w-full p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl text-sm text-gray-700 font-medium min-h-[60px] flex items-center ${(showAnalysis || isAnalyzing) ? 'pb-8' : ''}`}>
                  {currentText}
                  {currentText.length < targetText.length && (
                    <span className="animate-pulse bg-purple-500 w-0.5 h-4 inline-block ml-1"></span>
                  )}
                </div>
                {(showAnalysis || isAnalyzing) && (
                  <div className="absolute bottom-2 right-3 flex items-center space-x-1">
                    <SparklesIcon
                      className={`w-4 h-4 text-purple-600 ${isAnalyzing ? 'animate-spin' : 'animate-pulse'}`}
                    />
                    <span className="text-xs text-purple-600 font-medium">
                      {isAnalyzing ? 'Analyse en cours...' : 'Analyse terminée'}
                    </span>
                  </div>
                )}
              </div>

              {/* AI Analysis Results Animés */}
              {showAnalysis && (
                <div className="space-y-3 mb-6 animate-fadeIn">
                  <p className="text-xs font-medium text-gray-600">
                    Filtres détectés automatiquement :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter, index) => (
                      <span
                        key={filter.id}
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full transition-all duration-500 ${
                          showFilters.includes(filter.id)
                            ? 'animate-slideIn opacity-100 scale-100'
                            : 'opacity-0 scale-75'
                        } ${
                          filter.id === 'location'
                            ? 'bg-blue-100 text-blue-800'
                            : filter.id === 'followers'
                              ? 'bg-green-100 text-green-800'
                              : filter.id === 'engagement'
                                ? 'bg-purple-100 text-purple-800'
                                : filter.id === 'category'
                                  ? 'bg-pink-100 text-pink-800'
                                  : filter.id === 'audience'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-indigo-100 text-indigo-800'
                        }`}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animationFillMode: 'both',
                        }}
                      >
                        {filter.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results Preview */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    {t('hero.aiSearch.results')}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">
                      {t('hero.aiSearch.profilesCount')}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-700">
                        2,847
                      </div>
                      <div className="text-xs text-green-600">
                        {t('hero.aiSearch.stats.profiles')}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-700">
                        ~156K
                      </div>
                      <div className="text-xs text-blue-600">
                        {t('hero.aiSearch.stats.avgFollowers')}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-700">
                        5.2%
                      </div>
                      <div className="text-xs text-purple-600">
                        {t('hero.aiSearch.stats.avgEngagement')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-3 rounded-xl font-semibold text-sm">
                  {t('hero.aiSearch.ctaButton')}
                </div>
              </div>
            </div>

            {/* Floating AI Elements */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            </div>

            {/* Performance Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {t('hero.aiSearch.performanceBadge')}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">2,847+</div>
              <div className="text-gray-600">{t('hero.statsBar.brands')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">250M+</div>
              <div className="text-gray-600">
                {t('hero.statsBar.influencers')}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">10h</div>
              <div className="text-gray-600">
                économisées par semaine en moyenne
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">de précision des données</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS pour les animations personnalisées */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes countUp {
          from {
            transform: scale(0.8);
            opacity: 0.5;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.7s ease-out;
        }

        .animate-countUp {
          animation: countUp 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
