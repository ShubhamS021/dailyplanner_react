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
            size={'sm'}
            onClick={(_e) => {
                toggleCompactMode();
            }}
        >
            <div className="flex gap-2 items-center">
                {compactMode ? (
                    <LayoutDashboard width={16} height={16} />
                ) : (
                    <KanbanIcon width={16} height={16} />
                )}
                {compactMode
                    ? t('components.CompactModeToggle.normal')
                    : t('components.CompactModeToggle.compact')}
            </div>
        </Button>
    );
};

export default CompactMode;
