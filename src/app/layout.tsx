import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import { I18nProvider } from '@/lib/i18n/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spread - Influence Marketing Platform',
  description:
    'Découvrez et analysez des influenceurs sur Instagram, YouTube et TikTok',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <I18nProvider defaultLanguage="fr">
          <ConditionalLayout>{children}</ConditionalLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
