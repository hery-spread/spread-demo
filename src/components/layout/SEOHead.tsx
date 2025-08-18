'use client';

import Head from 'next/head';
import { useI18n } from '@/lib/i18n/context';
import {
  getSEOMetadata,
  generateHreflangTags,
  generateStructuredData,
} from '@/lib/i18n/seo';

interface SEOHeadProps {
  pathname?: string;
}

export default function SEOHead({ pathname = '/' }: SEOHeadProps) {
  const { language } = useI18n();
  const metadata = getSEOMetadata(language);
  const hreflangTags = generateHreflangTags(pathname);
  const structuredData = generateStructuredData(language);

  return (
    <Head>
      {/* Meta tags de base */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />

      {/* Meta tags pour le language */}
      <meta httpEquiv="content-language" content={language} />
      <html lang={language} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metadata.ogTitle} />
      <meta property="og:description" content={metadata.ogDescription} />
      <meta property="og:image" content="/og-image.jpg" />
      <meta property="og:url" content={`https://spread.app${pathname}`} />
      <meta property="og:site_name" content="Spread" />
      <meta
        property="og:locale"
        content={
          language === 'fr' ? 'fr_FR' : language === 'en' ? 'en_US' : 'nl_NL'
        }
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.twitterTitle} />
      <meta name="twitter:description" content={metadata.twitterDescription} />
      <meta name="twitter:image" content="/twitter-card.jpg" />
      <meta name="twitter:site" content="@SpreadApp" />
      <meta name="twitter:creator" content="@SpreadApp" />

      {/* Balises hreflang pour le SEO multilingue */}
      {hreflangTags.map((tag, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={tag.hrefLang}
          href={tag.href}
        />
      ))}

      {/* Canonical URL */}
      <link rel="canonical" href={`https://spread.app${pathname}`} />

      {/* Favicon et icons */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Balises pour robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Données structurées JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Preconnect pour optimiser les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* Meta tags viewport pour mobile */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {/* Theme color pour mobile */}
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />
    </Head>
  );
}
