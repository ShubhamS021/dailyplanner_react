import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { Button } from '@/ui/button';
import { KanbanIcon, LayoutDashboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CompactMode = () => {
    const [compactMode, toggleCompactMode] = useBoardStore((state) => [
        state.compactMode,
        state.toggleCompactMode,
    ]);

    const { t } = useTranslation();

    return (
        <span className="relative inline-flex">
            <Button
                data-testid="compactmode-toggle-button"
                variant={'outline'}
                size={'xs'}
                onClick={(_e) => {
                    toggleCompactMode();
                }}
            >
                <div className="flex gap-1 items-center text-xs">
                    {compactMode ? (
                        <LayoutDashboard width={14} height={14} />
                    ) : (
                        <KanbanIcon width={14} height={14} />
                    )}
                    {compactMode
                        ? t('components.CompactModeToggle.normal')
                        : t('components.CompactModeToggle.compact')}
                </div>
            </Button>
            {compactMode && (
                <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lavender opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-lavender"></span>
                </span>
            )}
        </span>
    );
};

export default CompactMode;
