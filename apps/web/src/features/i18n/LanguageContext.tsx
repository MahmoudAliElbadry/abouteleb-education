import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'ar' | 'en' | 'tr';

const STORAGE_KEY = 'abou-language';

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'ar' || stored === 'en' || stored === 'tr' ? stored : 'en';
  } catch {
    return 'en';
  }
}

const LanguageContext = createContext<
  { language: Language; setLanguage: (language: Language) => void } | undefined
>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // localStorage unavailable (private browsing, disabled storage, test env) — ignore
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function localize<T>(language: Language, ar: T, en: T, tr: T): T {
  return language === 'ar' ? ar : language === 'tr' ? tr : en;
}
