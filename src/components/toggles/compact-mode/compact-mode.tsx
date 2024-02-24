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
    );
};

export default CompactMode;
