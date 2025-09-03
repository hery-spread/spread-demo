'use client';

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Preview */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/50 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h3>
            <p className="text-lg text-gray-600">
              Tout ce que vous devez savoir sur nos tarifs et fonctionnalités
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                💳 Puis-je changer de plan à tout moment ?
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout
                moment. Les changements sont pris en compte immédiatement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔄 Que se passe-t-il après l&apos;essai gratuit ?
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                Votre compte passe automatiquement au plan sélectionné. Vous
                pouvez annuler à tout moment avant la fin de l&apos;essai.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📊 Les crédits sont-ils reportés chaque mois ?
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                Non, les crédits se renouvellent chaque mois. Vous pouvez
                acheter des crédits supplémentaires si nécessaire.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 Y a-t-il des frais cachés ?
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                Aucun. Nos tarifs sont transparents et incluent toutes les
                fonctionnalités listées dans votre plan.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔒 Mes données sont-elles sécurisées ?
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                Absolument. Nous utilisons un chiffrement de niveau bancaire et
                respectons le RGPD européen.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📞 Quel support est disponible ?
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                Support par email 5j/7 de 9h à 18h, chat en direct, et support
                téléphonique pour les plans Pro et Elite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
