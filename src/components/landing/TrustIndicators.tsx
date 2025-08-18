'use client';

import {
  ShieldCheckIcon,
  GlobeAltIcon,
  SparklesIcon,
  CheckBadgeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

export default function TrustIndicators() {
  const certificates = [
    {
      icon: ShieldCheckIcon,
      title: 'RGPD Compliant',
      description:
        'Conformité totale avec le règlement européen sur la protection des données',
    },
    {
      icon: LockClosedIcon,
      title: 'SSL Certifié',
      description:
        'Chiffrement de niveau bancaire pour toutes vos données sensibles',
    },
    {
      icon: CheckBadgeIcon,
      title: 'ISO 27001',
      description: "Certification de sécurité des systèmes d'information",
    },
    {
      icon: GlobeAltIcon,
      title: 'Uptime 99.9%',
      description: 'Disponibilité garantie avec infrastructure redondante',
    },
  ];

  const guarantees = [
    {
      icon: '💰',
      title: 'Garantie 30 jours',
      description:
        "Remboursement intégral sans question si vous n'êtes pas satisfait",
    },
    {
      icon: '🔄',
      title: 'Migration gratuite',
      description:
        'Nous migrons gratuitement vos données depuis votre outil actuel',
    },
    {
      icon: '📞',
      title: 'Formation incluse',
      description: 'Session de formation personnalisée pour votre équipe',
    },
    {
      icon: '⚡',
      title: 'Setup en 2 minutes',
      description: 'Configuration automatique et prise en main immédiate',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            Sécurité & Confiance
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Vos données entre de bonnes mains
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Spread respecte les plus hauts standards de sécurité et de
            protection des données
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:border-green-200">
                  <div className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-2 text-sm">
                    {cert.title}
                  </div>
                  <div className="text-gray-600 text-xs leading-relaxed">
                    {cert.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantees */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Nos Engagements
            </h4>
            <p className="text-gray-600">
              Nous prenons des engagements forts pour votre succès
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 group-hover:from-purple-100 group-hover:to-indigo-100 transition-all duration-300">
                  <div className="text-3xl mb-3">{guarantee.icon}</div>
                  <div className="font-semibold text-gray-900 mb-2 text-sm">
                    {guarantee.title}
                  </div>
                  <div className="text-gray-600 text-xs leading-relaxed">
                    {guarantee.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Trust Message */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-medium">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Rejoignez 2,847+ marques qui nous font déjà confiance
          </div>
        </div>
      </div>
    </section>
  );
}
