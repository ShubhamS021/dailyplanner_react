// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { DEtranslation } from '@/assets/i18n/de';
import { ENtranslation } from '@/assets/i18n/en';
import 'fake-indexeddb/auto';
import i18n from '@/i18n';
import { initReactI18next } from 'react-i18next';

if (!i18n.isInitialized) {
    i18n.use(initReactI18next)
        .init({
            lng: 'en',
            fallbackLng: 'en',
            resources: {
                en: {
                    translation: ENtranslation,
                },
                de: {
                    translation: DEtranslation,
                },
            },
        })
        .finally(() => {});
}

// Run cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
    cleanup();
});
