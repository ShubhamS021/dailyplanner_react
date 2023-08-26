import { DEtranslation } from '@/assets/i18n/de';
import { ENtranslation } from '@/assets/i18n/en';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: import.meta.env.NODE_ENV === 'development',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: ENtranslation,
            },
            de: {
                translation: DEtranslation,
            },
        },
    })
    .catch(console.error);

export default i18n;
