import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { MoonIcon, SunIcon } from '@/ui/Icons/Icons';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';

export const DarkMode = () => {
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
        <Button
            className="hover:text-sky-500"
            data-testid="theme-mode-button"
            variant={'ghost'}
            size={'sm'}
            onClick={(_e) => {
                toggleMode();
            }}
        >
            <div className="flex gap-2 items-center">
                {themeMode === 'dark' && (
                    <SunIcon viewBox={{ x: 0, y: 0, width: 18, height: 18 }} />
                )}
                {themeMode === 'light' && (
                    <MoonIcon viewBox={{ x: 0, y: 0, width: 18, height: 18 }} />
                )}
                {themeMode === 'light'
                    ? t('components.DarkModeToggle.dark')
                    : t('components.DarkModeToggle.light')}
            </div>
        </Button>
    );
};
