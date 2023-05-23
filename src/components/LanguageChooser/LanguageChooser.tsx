import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BoardContext } from '../../context/BoardContext';

export const LanguageChooser = () => {
    const { t, i18n } = useTranslation();
    const { updateLanguage } = useContext(BoardContext);

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
