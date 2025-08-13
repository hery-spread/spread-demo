'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ListBulletIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  UserIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Recherche',
    href: '/search',
    icon: MagnifyingGlassIcon,
    description: 'Trouver des influenceurs',
  },
  {
    name: 'Mes Listes',
    href: '/lists',
    icon: ListBulletIcon,
    description: 'Gérer vos listes',
  },
  {
    name: 'Communications',
    href: '/communications',
    icon: ChatBubbleLeftRightIcon,
    description: 'Emails et conversations',
  },
  {
    name: 'Campagnes',
    href: '/campagnes',
    icon: MegaphoneIcon,
    description: 'Gérer vos campagnes',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="w-72 bg-white/80 backdrop-blur-xl shadow-xl shadow-gray-500/10 h-full flex flex-col border-r border-gray-200/50">
      {/* Brand Header */}
      <div className="p-8 border-b border-gray-100/50 relative overflow-hidden group">
        {/* Background shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Spread
            </h1>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Influence Marketing
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isHovered = hoveredItem === item.name;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group relative flex items-center px-4 py-4 text-sm font-medium rounded-2xl 
                transition-all duration-300 transform-gpu overflow-hidden
                ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25 scale-[1.02] translate-x-1'
                    : 'text-gray-700 hover:bg-white/60 hover:backdrop-blur-sm hover:shadow-md hover:scale-[1.01] hover:translate-x-1'
                }
              `}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Glassmorphism shimmer effect */}
              <div
                className={`
                absolute inset-0 transition-transform duration-1000 
                ${isHovered || isActive ? 'translate-x-full' : '-translate-x-full'}
                bg-gradient-to-r from-transparent via-white/20 to-transparent
              `}
              />

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full animate-in slide-in-from-left duration-300" />
              )}

              <div className="relative z-10 flex items-center space-x-4 w-full">
                <div
                  className={`
                  transition-all duration-300 transform-gpu
                  ${
                    isActive
                      ? 'text-white'
                      : isHovered
                        ? 'text-purple-600 scale-110 rotate-12'
                        : 'text-gray-500'
                  }
                `}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={`
                    font-semibold transition-all duration-300
                    ${isActive ? 'text-white' : isHovered ? 'text-gray-900' : 'text-gray-700'}
                  `}
                  >
                    {item.name}
                  </div>
                  <div
                    className={`
                    text-xs transition-all duration-300 mt-0.5
                    ${
                      isActive
                        ? 'text-purple-100'
                        : isHovered
                          ? 'text-gray-600 opacity-100'
                          : 'text-gray-500 opacity-0'
                    }
                  `}
                  >
                    {item.description}
                  </div>
                </div>

                {/* Hover arrow indicator */}
                <div
                  className={`
                  transition-all duration-300 transform
                  ${
                    isHovered && !isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2'
                  }
                `}
                >
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Subtle border glow on hover */}
              {isHovered && !isActive && (
                <div className="absolute inset-0 rounded-2xl border border-purple-200/50 bg-gradient-to-r from-purple-50/10 to-blue-50/10" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Zone Compte */}
      <div className="p-4 border-t border-gray-100/50">
        <div className="space-y-1">
          <Link
            href="/account"
            className={`
              group flex items-center px-3 py-2 text-xs font-medium rounded-lg
              transition-all duration-200 transform-gpu
              ${
                pathname === '/account'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <UserIcon
              className={`
                w-4 h-4 mr-2 transition-colors duration-200
                ${pathname === '/account' ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'}
              `}
            />
            Mon compte
          </Link>

          <Link
            href="/pricing"
            className={`
              group flex items-center px-3 py-2 text-xs font-medium rounded-lg
              transition-all duration-200 transform-gpu
              ${
                pathname === '/pricing'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <CreditCardIcon
              className={`
                w-4 h-4 mr-2 transition-colors duration-200
                ${pathname === '/pricing' ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'}
              `}
            />
            Mon abonnement
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-400 text-center">
            © 2025 Spread
          </div>
        </div>
      </div>
    </div>
  );
}
