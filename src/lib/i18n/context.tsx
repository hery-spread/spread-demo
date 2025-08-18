'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageOption } from './types';
import frTranslations from './locales/fr.json';
import enTranslations from './locales/en.json';
import nlTranslations from './locales/nl.json';

// Langues disponibles
export const availableLanguages: LanguageOption[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
];

// Map des traductions
const translations = {
  fr: frTranslations,
  en: enTranslations,
  nl: nlTranslations,
};

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  availableLanguages: LanguageOption[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export function I18nProvider({
  children,
  defaultLanguage = 'fr',
}: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Fonction pour récupérer une traduction par clé avec support de paramètres
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback vers l'anglais si la clé n'existe pas
        const fallbackKeys = key.split('.');
        let fallbackValue: unknown = translations.en;
        for (const fk of fallbackKeys) {
          if (
            fallbackValue &&
            typeof fallbackValue === 'object' &&
            fallbackValue !== null &&
            fk in fallbackValue
          ) {
            fallbackValue = (fallbackValue as Record<string, unknown>)[fk];
          } else {
            return `Missing translation: ${key}`;
          }
        }
        value = fallbackValue;
        break;
      }
    }

    if (typeof value !== 'string') {
      return `Invalid translation: ${key}`;
    }

    // Remplacer les paramètres dans la chaîne de traduction
    if (params) {
      return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
        return str.replace(
          new RegExp(`{{${paramKey}}}`, 'g'),
          String(paramValue)
        );
      }, value);
    }

    return value;
  };

  // Fonction pour changer la langue avec persistance
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);

    // Sauvegarder dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('spread-language', newLanguage);

      // Mettre à jour l'attribut lang du document HTML
      document.documentElement.lang = newLanguage;
    }
  };

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('spread-language') as Language;
      if (
        savedLanguage &&
        availableLanguages.some((lang) => lang.code === savedLanguage)
      ) {
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
      } else {
        // Détecter la langue du navigateur
        const browserLanguage = navigator.language.split('-')[0] as Language;
        if (availableLanguages.some((lang) => lang.code === browserLanguage)) {
          setLanguageState(browserLanguage);
          document.documentElement.lang = browserLanguage;
        } else {
          document.documentElement.lang = defaultLanguage;
        }
      }
    }
  }, [defaultLanguage]);

  const value = {
    language,
    setLanguage,
    t,
    availableLanguages,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
