import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enData from '../data/content.en.json';
import bnData from '../data/content.bn.json';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  content: typeof enData;
  isBn: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dakhina_lang');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  const content = language === 'bn' ? bnData : enData;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dakhina_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        content,
        isBn: language === 'bn',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
