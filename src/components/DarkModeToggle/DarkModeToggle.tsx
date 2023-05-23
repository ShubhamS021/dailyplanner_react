import { moonSVG } from 'assets/svgs/moon.svg';
import { sunSVG } from 'assets/svgs/sun.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type ThemeMode = 'light' | 'dark';

export const DarkModeToggle = () => {
    const { t } = useTranslation();
    const [mode, setMode] = useState(
        localStorage.getItem('color-theme') as ThemeMode
    );
    const toggleMode = () => {
        if (mode === 'dark') {
            localStorage.setItem('color-theme', 'light');
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            setMode('light');
        } else {
            localStorage.setItem('color-theme', 'dark');
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            setMode('dark');
        }
    };
    return (
        <>
            <button
                className="hover:text-[#17A2B8] font-semibold"
                data-testid="theme-mode-button"
                onClick={(_e) => {
                    toggleMode();
                }}
            >
                <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] hover:stroke-[#17A2B8] dark:text-[#5E5E5E] dark:hover:text-[#17A2B8] soft">
                    {mode === 'light' && moonSVG}
                    {mode === 'dark' && sunSVG}
                    <p className="font-semibold text-sm">
                        {mode === 'light'
                            ? t('components.DarkModeToggle.dark')
                            : t('components.DarkModeToggle.light')}
                    </p>
                </div>
            </button>
        </>
    );
};
