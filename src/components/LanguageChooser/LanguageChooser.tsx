import { useTranslation } from 'react-i18next';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import { languages } from './config/languages.config';

export const LanguageChooser = () => {
    const [updateLanguage] = useBoardStore(
        (state) => [state.updateLanguage],
        shallow
    );

    const { t, i18n } = useTranslation();

    const handleLanguageChange = async (language: string) => {
        updateLanguage(language);
        return await i18n.changeLanguage(language);
    };

    return (
        <div className="flex gap-2 dark:text-[#8B8B8B]">
            {t('components.LanguageChooser.language')}
            {Object.keys(languages).map((language: string) => (
                <button
                    key={language}
                    className={`${
                        i18n.resolvedLanguage === language
                            ? 'font-bold text-[#5A5A65] dark:text-[#8B8B8B]'
                            : 'font-normal'
                    }`}
                    type="submit"
                    onClick={() => {
                        void handleLanguageChange(language);
                    }}
                >
                    {languages[language].nativeName}
                </button>
            ))}
        </div>
    );
};
