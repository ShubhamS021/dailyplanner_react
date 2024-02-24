export type Languages = Record<string, { id: number; nativeName: string }>;

export const languages: Languages = {
    en: { id: 1, nativeName: 'English' },
    de: { id: 2, nativeName: 'Deutsch' },
};
