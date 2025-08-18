'use client';

import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  CursorArrowRippleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function FeaturesSection() {
  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Recherche IA Multi-Plateformes',
      description:
        'Trouvez des influenceurs sur Instagram, YouTube et TikTok avec notre IA qui comprend le langage naturel.',
      benefits: [
        'Recherche vocale intelligente',
        'Filtres avancés automatiques',
        'Suggestions personnalisées',
        'Base de données 1.2M+ profils',
      ],
      color: 'purple',
    },
    {
      icon: ChartBarIcon,
      title: "Rapports d'Audience Ultra-Détaillés",
      description:
        "Accédez aux données d'audience les plus complètes du marché pour prendre les meilleures décisions.",
      benefits: [
        'Démographie précise',
        "Centres d'intérêt détaillés",
        "Analyse de l'engagement",
        'Détection de fake followers',
      ],
      color: 'indigo',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'CRM & Communication Intégrée',
      description:
        "Gérez vos campagnes avec un CRM conçu spécialement pour l'influence marketing.",
      benefits: [
        'Pipeline de négociation',
        'Intégration email native',
        'Suivi automatisé',
        'Campagnes groupées',
      ],
      color: 'green',
    },
    {
      icon: SparklesIcon,
      title: 'Analytics de Performance',
      description:
        'Mesurez le ROI de vos campagnes avec des métriques avancées et des rapports personnalisés.',
      benefits: [
        'ROI en temps réel',
        "Métriques d'engagement",
        'Rapports automatisés',
        'Comparatif concurrentiel',
      ],
      color: 'blue',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: {
        bg: 'from-purple-500 to-purple-600',
        text: 'text-purple-600',
        lightBg: 'bg-purple-50',
        border: 'border-purple-200',
      },
      indigo: {
        bg: 'from-indigo-500 to-indigo-600',
        text: 'text-indigo-600',
        lightBg: 'bg-indigo-50',
        border: 'border-indigo-200',
      },
      green: {
        bg: 'from-green-500 to-green-600',
        text: 'text-green-600',
        lightBg: 'bg-green-50',
        border: 'border-green-200',
      },
      blue: {
        bg: 'from-blue-500 to-blue-600',
        text: 'text-blue-600',
        lightBg: 'bg-blue-50',
        border: 'border-blue-200',
      },
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-6">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Fonctionnalités Avancées
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tout ce dont vous avez besoin pour
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}
              réussir{' '}
            </span>
            vos campagnes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                         Une suite complète d&apos;outils conçus pour les professionnels du
             marketing d&apos;influence moderne
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-gray-700"
                    >
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.bg} mr-3 flex-shrink-0`}
                      ></div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Integration Preview */}
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-gray-200">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Intégrations Natives
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Connectez Spread à votre stack marketing existant pour une
                expérience fluide et productive.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                  <GlobeAltIcon className="w-6 h-6 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    Google Workspace
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-600" />
                  <span className="font-medium text-gray-900">
                    Microsoft Outlook
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                  <ChartBarIcon className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-gray-900">
                    Google Analytics
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                  <ShieldCheckIcon className="w-6 h-6 text-indigo-600" />
                  <span className="font-medium text-gray-900">Zapier</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Integration Mockup */}
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-gray-900">
                    Connecter vos outils
                  </h4>
                  <CursorArrowRippleIcon className="w-5 h-5 text-purple-600" />
                </div>

                <div className="space-y-4">
                  {['Gmail', 'Slack', 'HubSpot'].map((tool, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg"></div>
                        <span className="font-medium text-gray-900">
                          {tool}
                        </span>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Success Indicator */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
