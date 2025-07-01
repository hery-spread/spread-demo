'use client';

import { useUserAccount } from '@/hooks/useUserAccount';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/lists':
      return 'Mes Listes';
    case '/account':
      return 'Mon Compte';
    case '/search':
      return "Recherche d'Influenceurs";
    default:
      return 'Spread';
  }
};

const getPageIcon = (pathname: string) => {
  switch (pathname) {
    case '/':
      return '📊';
    case '/lists':
      return '📋';
    case '/account':
      return '👤';
    case '/search':
      return '🔍';
    default:
      return '🌟';
  }
};

export default function Header() {
  const { account, loading } = useUserAccount();
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const pageIcon = getPageIcon(pathname);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading) {
    return (
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-6 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-blue-50/50 animate-pulse" />

        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
          <div className="flex items-center space-x-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-6 relative overflow-hidden shadow-sm">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-blue-50/30 to-purple-50/30 animate-gradient-x" />

      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex justify-between items-center">
        {/* Page Title Section */}
        <div className="flex items-center space-x-4 group">
          <div className="text-3xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            {pageIcon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {pageTitle}
            </h2>
            <div className="text-sm text-gray-500 font-medium">
              {mounted &&
                new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="flex items-center space-x-8">
          {/* Searches Metric */}
          <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:rotate-12 transition-transform duration-300">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Recherches
              </div>
              <div className="text-lg font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">
                {account?.plan.limits.searches === 'unlimited'
                  ? '∞'
                  : account?.plan.limits.searches}
              </div>
            </div>
          </div>

          {/* Profiles Metric */}
          <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div
              className={`
              w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:rotate-12
              ${
                account &&
                account.plan.limits.profiles.used /
                  account.plan.limits.profiles.total >
                  0.8
                  ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/25'
                  : account &&
                      account.plan.limits.profiles.used /
                        account.plan.limits.profiles.total >
                        0.6
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/25'
                    : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25'
              }
            `}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Profils
              </div>
              <div
                className={`
                text-lg font-bold group-hover:scale-110 transition-transform duration-300
                ${
                  account &&
                  account.plan.limits.profiles.used /
                    account.plan.limits.profiles.total >
                    0.8
                    ? 'text-red-600'
                    : account &&
                        account.plan.limits.profiles.used /
                          account.plan.limits.profiles.total >
                          0.6
                      ? 'text-orange-600'
                      : 'text-blue-600'
                }
              `}
              >
                {account?.plan.limits.profiles.used}/
                {account?.plan.limits.profiles.total}
              </div>
            </div>
          </div>

          {/* Users Metric */}
          <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:rotate-12 transition-transform duration-300">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Équipe
              </div>
              <div className="text-lg font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                {account?.plan.limits.users.used}/
                {account?.plan.limits.users.total}
              </div>
            </div>
          </div>

          {/* Plan Badge */}
          <div className="ml-4">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 cursor-pointer border border-purple-500/20 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <span>✨</span>
                <span>{account?.plan.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Add custom animation keyframes to globals.css
// @keyframes gradient-x {
//   0%, 100% {
//     transform: translateX(-100%);
//   }
//   50% {
//     transform: translateX(100%);
//   }
// }
// @keyframes shimmer {
//   0% {
//     transform: translateX(-100%);
//   }
//   100% {
//     transform: translateX(100%);
//   }
// }
