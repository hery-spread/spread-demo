'use client';

import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Pages qui ne doivent pas avoir le layout dashboard (sidebar + header)
  const isLandingPage = pathname === '/';
  const isMarketingPage =
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/share/') ||
    pathname.startsWith('/ai-search') ||
    pathname.startsWith('/messaging') ||
    pathname.startsWith('/campaigns') ||
    pathname.startsWith('/reports');

  // Si c'est la landing page ou une page marketing, pas de layout dashboard
  if (isLandingPage || isMarketingPage) {
    return <>{children}</>;
  }

  // Sinon, utiliser le layout dashboard avec sidebar et header
  return <MainLayout>{children}</MainLayout>;
}
