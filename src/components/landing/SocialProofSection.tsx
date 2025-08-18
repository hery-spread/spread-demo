'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function SocialProofSection() {
  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Marketing Manager',
      company: 'Fashion Brand Co.',
      avatar: 'MD',
      rating: 5,
      text: 'Spread a révolutionné notre façon de travailler. Nous trouvons maintenant les influenceurs parfaits en quelques minutes au lieu de plusieurs heures.',
      results: '+347% ROI sur nos campagnes',
    },
    {
      name: 'Thomas Chen',
      role: 'Founder',
      company: 'Tech Startup Inc.',
      avatar: 'TC',
      rating: 5,
      text: "La qualité des données d'audience est exceptionnelle. Nous prenons enfin des décisions basées sur de vraies données, pas des approximations.",
      results: '10h économisées par semaine',
    },
    {
      name: 'Sophie Martin',
      role: 'Directrice Marketing',
      company: 'Beauty & Wellness',
      avatar: 'SM',
      rating: 5,
      text: "Le CRM intégré nous permet de gérer toutes nos campagnes en un seul endroit. C'est un game-changer pour notre productivité.",
      results: '+250% de conversions',
    },
  ];

  const companyLogos = [
    'Sephora',
    "L'Oréal",
    'Nike',
    'Adidas',
    'Samsung',
    'Coca-Cola',
  ];

  const stats = [
    { number: '98%', label: 'Taux de satisfaction client' },
    { number: '2,847+', label: 'Marques nous font confiance' },
    { number: '1.2M+', label: 'Influenceurs référencés' },
    { number: '10h', label: 'Économisées par semaine' },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <StarIcon className="w-4 h-4 mr-2" />
            Approuvé par 2,847+ marketeurs
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ils nous font déjà
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}
              confiance{' '}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez pourquoi les plus grandes marques choisissent Spread pour
            leurs campagnes d'influence
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

        {/* Company Logos */}
        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm font-medium mb-8 uppercase tracking-wide">
            Ils nous font confiance
          </p>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 w-full h-16 flex items-center justify-center border border-gray-200/50 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="font-bold text-gray-600 text-lg">{company}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Excellence Reconnue
              </h3>
              <p className="text-gray-600 text-sm">
                Noté 4.9/5 sur Trustpilot avec plus de 500 avis vérifiés
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Support Dédié</h3>
              <p className="text-gray-600 text-sm">
                Équipe support francophone disponible 7j/7 pour vous accompagner
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <div className="text-white font-bold">🔒</div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Données Sécurisées
              </h3>
              <p className="text-gray-600 text-sm">
                Conformité RGPD et chiffrement de niveau bancaire de vos données
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
