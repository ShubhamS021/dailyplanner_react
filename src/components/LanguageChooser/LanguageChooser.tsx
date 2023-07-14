import { useTranslation } from 'react-i18next';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';

export const LanguageChooser = () => {
    const [updateLanguage] = useBoardStore(
        (state) => [state.updateLanguage],
        shallow
    );

    const { t, i18n } = useTranslation();
    const languages: Record<string, { nativeName: string }> = {
        en: { nativeName: 'English' },
        de: { nativeName: 'Deutsch' },
    };

    const handleLanguageChange = async (lng: string) => {
        updateLanguage(lng);
        return await i18n.changeLanguage(lng);
    };

    return (
        <div className="flex gap-2 dark:text-[#8B8B8B]">
            {t('components.LanguageChooser.language')}
            {Object.keys(languages).map((lng: string) => (
                <button
                    key={lng}
                    className={`${
                        i18n.resolvedLanguage === lng
                            ? 'font-bold text-[#5A5A65] dark:text-[#8B8B8B]'
                            : 'font-normal'
                    }`}
                    type="submit"
                    onClick={() => {
                        void handleLanguageChange(lng);
                    }}
                >
                    {languages[lng].nativeName}
                </button>
            ))}
        </div>
    );
};
