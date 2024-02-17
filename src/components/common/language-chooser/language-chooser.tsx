import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { Separator } from '@/ui/separator';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from './config/languages.config';

export interface LanguageChooserProps {
    small?: boolean;
}

export const LanguageChooser: React.FC<LanguageChooserProps> = ({
    small = false,
}) => {
    const [updateLanguage] = useBoardStore((state) => [state.updateLanguage]);

    const { i18n } = useTranslation();

    const handleLanguageChange = async (language: string) => {
        updateLanguage(language);
        return await i18n.changeLanguage(language);
    };

    return (
        <div className="flex gap-2 h-full">
            {Object.keys(languages).map(
                (language: string, i: number, _languages: string[]) => (
                    <Fragment key={languages[language].id}>
                        <button
                            className={`${
                                i18n.resolvedLanguage === language
                                    ? 'font-semibold text-xs text-sky-500'
                                    : 'font-normal text-xs'
                            }`}
                            type="submit"
                            onClick={() => {
                                void handleLanguageChange(language);
                            }}
                        >
                            {small
                                ? languages[language].nativeName.substring(0, 2)
                                : languages[language].nativeName}
                        </button>
                        {i + 1 !== _languages.length && (
                            <Separator orientation="vertical" />
                        )}
                    </Fragment>
                )
            )}
        </div>
    );
};
