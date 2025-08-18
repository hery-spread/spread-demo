import { Language, SEOMetadata, LanguageSEOMapping } from './types';

// Métadonnées SEO pour chaque langue
export const seoMetadata: LanguageSEOMapping = {
  fr: {
    title: "Spread - Plateforme IA #1 pour l'Influence Marketing | Trouvez les Influenceurs Parfaits",
    description: "Découvrez la première plateforme IA qui révolutionne la recherche d'influenceurs. Base de 250M+ profils, rapports d'audience détaillés, CRM intégré. Essai gratuit 14 jours.",
    keywords: "influence marketing, influenceurs, plateforme IA, recherche influenceurs, marketing digital, campagnes influence, rapports audience, CRM marketing, Instagram, YouTube, TikTok",
    ogTitle: "Spread - Trouvez les Influenceurs Parfaits en 30 Secondes avec l'IA",
    ogDescription: "La première plateforme IA pour l'influence marketing. 250M+ profils d'influenceurs, recherche intelligente, rapports ultra-détaillés. Essai gratuit 14 jours.",
    twitterTitle: "Spread - Plateforme IA #1 pour l'Influence Marketing",
    twitterDescription: "🚀 Trouvez les influenceurs parfaits en 30s avec l'IA | 250M+ profils | Rapports détaillés | CRM intégré | Essai gratuit 14j",
  },
  en: {
    title: "Spread - #1 AI Platform for Influence Marketing | Find Perfect Influencers",
    description: "Discover the first AI platform that revolutionizes influencer search. 250M+ profile database, detailed audience reports, integrated CRM. 14-day free trial.",
    keywords: "influence marketing, influencers, AI platform, influencer search, digital marketing, influence campaigns, audience reports, marketing CRM, Instagram, YouTube, TikTok",
    ogTitle: "Spread - Find Perfect Influencers in 30 Seconds with AI",
    ogDescription: "The first AI platform for influence marketing. 250M+ influencer profiles, smart search, ultra-detailed reports. 14-day free trial.",
    twitterTitle: "Spread - #1 AI Platform for Influence Marketing",
    twitterDescription: "🚀 Find perfect influencers in 30s with AI | 250M+ profiles | Detailed reports | Integrated CRM | 14-day free trial",
  },
  nl: {
    title: "Spread - #1 AI Platform voor Influence Marketing | Vind de Perfecte Influencers",
    description: "Ontdek het eerste AI-platform dat influencer zoeken revolutioneert. 250M+ profieldatabase, gedetailleerde publiekrapporten, geïntegreerde CRM. 14 dagen gratis proberen.",
    keywords: "influence marketing, influencers, AI platform, influencer zoeken, digitale marketing, influence campagnes, publiekrapporten, marketing CRM, Instagram, YouTube, TikTok",
    ogTitle: "Spread - Vind Perfecte Influencers in 30 Seconden met AI",
    ogDescription: "Het eerste AI-platform voor influence marketing. 250M+ influencer profielen, slimme zoekfunctie, ultragedetailleerde rapporten. 14 dagen gratis proberen.",
    twitterTitle: "Spread - #1 AI Platform voor Influence Marketing",
    twitterDescription: "🚀 Vind perfecte influencers in 30s met AI | 250M+ profielen | Gedetailleerde rapporten | Geïntegreerde CRM | 14 dagen gratis",
  },
};

// Fonction pour obtenir les métadonnées SEO pour une langue
export function getSEOMetadata(language: Language): SEOMetadata {
  return seoMetadata[language] || seoMetadata.en;
}

// Fonction pour générer les balises hreflang
export function generateHreflangTags(currentPath: string = '/'): Array<{
  hrefLang: string;
  href: string;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://spread.app';
  
  return [
    { hrefLang: 'fr', href: `${baseUrl}/fr${currentPath}` },
    { hrefLang: 'en', href: `${baseUrl}/en${currentPath}` },
    { hrefLang: 'nl', href: `${baseUrl}/nl${currentPath}` },
    { hrefLang: 'x-default', href: `${baseUrl}${currentPath}` }, // Langue par défaut
  ];
}

// Fonction pour généer le JSON-LD structuré
export function generateStructuredData(language: Language) {
  const metadata = getSEOMetadata(language);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Spread',
    description: metadata.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      name: language === 'fr' ? 'Essai Gratuit' : language === 'en' ? 'Free Trial' : 'Gratis Proefperiode',
      description: language === 'fr' 
        ? '14 jours d\'essai gratuit sans engagement' 
        : language === 'en' 
        ? '14-day free trial without commitment'
        : '14 dagen gratis proefperiode zonder verplichtingen',
    },
    provider: {
      '@type': 'Organization',
      name: 'Spread',
      url: 'https://spread.app',
      logo: 'https://spread.app/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['French', 'English', 'Dutch'],
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      language === 'fr' ? 'Recherche IA Multi-Plateformes' : language === 'en' ? 'Multi-Platform AI Search' : 'Multi-Platform AI Zoeken',
      language === 'fr' ? 'Rapports d\'Audience Détaillés' : language === 'en' ? 'Detailed Audience Reports' : 'Gedetailleerde Publiekrapporten',
      language === 'fr' ? 'CRM Intégré' : language === 'en' ? 'Integrated CRM' : 'Geïntegreerde CRM',
      language === 'fr' ? 'Analytics de Performance' : language === 'en' ? 'Performance Analytics' : 'Prestatie Analytics',
    ],
  };
}
