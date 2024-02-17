import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';

interface ExportProps {
    all?: boolean;
}

export const BoardExport: React.FC<ExportProps> = ({ all = false }) => {
    const [board, exportBoardToJSON, exportBoardsToJSON] = useBoardStore(
        (state) => [
            state.board,
            state.exportBoardToJSON,
            state.exportBoardsToJSON,
        ]
    );

    const { t } = useTranslation();

    const handleExport = () => {
        exportBoardToJSON(board);
    };

    const handleExportAll = () => {
        exportBoardsToJSON();
    };

    return (
        <Button
            className="font-semibold"
            data-testid="export-button"
            variant={all ? 'ghost' : 'outline'}
            onClick={(_e) => {
                if (all) {
                    handleExportAll();
                } else {
                    handleExport();
                }
            }}
        >
            <div className="flex gap-2 items-center p-2">
                <p className="font-semibold text-sm">
                    {all
                        ? t('components.Export.exportAll')
                        : t('components.Export.export')}
                </p>
            </div>
        </Button>
    );
};

export default BoardExport;
