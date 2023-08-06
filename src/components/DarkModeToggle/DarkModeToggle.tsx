import { useTranslation } from 'react-i18next';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { MoonIcon, SunIcon } from '@/ui/Icons/Icons';

export const DarkModeToggle = () => {
    const { t } = useTranslation();

    const [themeMode, toggleThemeMode] = useBoardStore((state) => [
        state.themeMode,
        state.toggleThemeMode,
    ]);

    const toggleMode = () => {
        if (themeMode === 'dark') {
            toggleThemeMode('light');
        } else {
            toggleThemeMode('dark');
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
                <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] dark:stroke-[#B5B5B5] hover:stroke-[#17A2B8] dark:hover:stroke-[#17A2B8] dark:text-[#B5B5B5] dark:hover:text-[#17A2B8] soft">
                    {themeMode === 'dark' && (
                        <SunIcon
                            viewBox={{ x: 0, y: 0, width: 18, height: 18 }}
                        />
                    )}
                    {themeMode === 'light' && (
                        <MoonIcon
                            viewBox={{ x: 0, y: 0, width: 18, height: 18 }}
                        />
                    )}
                    <p className="font-semibold text-sm">
                        {themeMode === 'light'
                            ? t('components.DarkModeToggle.dark')
                            : t('components.DarkModeToggle.light')}
                    </p>
                </div>
            </button>
        </>
    );
};
