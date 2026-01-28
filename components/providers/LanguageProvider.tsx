"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary, Locale } from '@/lib/dictionary';

interface LanguageContextType {
    lang: Locale;
    toggleLanguage: () => void;
    dict: typeof dictionary.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Locale>('en');

    // Load language from local storage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('app-lang') as Locale;
        if (savedLang && (savedLang === 'en' || savedLang === 'tr')) {
            setLang(savedLang);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === 'en' ? 'tr' : 'en';
        setLang(newLang);
        localStorage.setItem('app-lang', newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, dict: dictionary[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
