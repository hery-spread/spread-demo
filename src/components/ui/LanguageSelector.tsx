'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export default function LanguageSelector({
  variant = 'default',
  className = '',
}: LanguageSelectorProps) {
  const { language, setLanguage, availableLanguages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = availableLanguages.find(
    (lang) => lang.code === language
  );

  const handleLanguageChange = (
    newLanguage: (typeof availableLanguages)[0]
  ) => {
    setLanguage(newLanguage.code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all duration-300
          ${
            variant === 'compact'
              ? 'border-purple-200 bg-white/80 hover:bg-purple-50 text-purple-700'
              : 'border-gray-200 bg-white/90 hover:bg-gray-50 text-gray-700'
          }
          hover:shadow-lg backdrop-blur-sm
        `}
        type="button"
      >
        {variant === 'default' && <GlobeAltIcon className="w-4 h-4" />}
        <span className="text-lg">{currentLanguage?.flag}</span>
        {variant === 'default' && (
          <span className="font-medium text-sm hidden sm:block">
            {currentLanguage?.name}
          </span>
        )}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-500/20 rounded-2xl border border-gray-200/50 py-2 z-50 overflow-hidden">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200
                  ${
                    language === lang.code
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1">{lang.name}</span>
                {language === lang.code && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                )}
              </button>
            ))}

            {/* Footer */}
            <div className="border-t border-gray-100 mt-2 pt-2 px-4 pb-2">
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                <GlobeAltIcon className="w-3 h-3" />
                <span>Multi-language</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
