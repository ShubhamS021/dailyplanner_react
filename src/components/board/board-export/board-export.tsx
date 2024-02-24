import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';

export const BoardExport = () => {
    const [boards, exportBoardsToJSON] = useBoardStore((state) => [
        state.boards,
        state.exportBoardsToJSON,
    ]);

    const { t } = useTranslation();

    return (
        <Button
            className="font-semibold"
            data-testid="export-button"
            size={'sm'}
            variant={'outline'}
            disabled={boards.length === 0}
            onClick={(_e) => {
                exportBoardsToJSON();
            }}
        >
            {t('components.Export.export')}
        </Button>
    );
};

export default BoardExport;
