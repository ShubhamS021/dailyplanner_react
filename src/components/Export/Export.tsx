import { useTranslation } from 'react-i18next';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import { FileExportIcon } from 'ui/Icons';

interface ExportProps {
    all?: boolean;
}

export const Export: React.FC<ExportProps> = ({ all = false }) => {
    const [board, exportBoardToJSON, exportBoardsToJSON] = useBoardStore(
        (state) => [
            state.board,
            state.exportBoardToJSON,
            state.exportBoardsToJSON,
        ],
        shallow
    );

    const { t } = useTranslation();

    const handleExport = () => {
        exportBoardToJSON(board);
    };

    const handleExportAll = () => {
        exportBoardsToJSON();
    };

    return (
        <button
            className="hover:text-[#17A2B8] font-semibold dark:text-[#B5B5B5] dark:hover:text-[#17A2B8]"
            data-testid="export-button"
            onClick={(_e) => {
                if (all) {
                    handleExportAll();
                } else {
                    handleExport();
                }
            }}
        >
            <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] dark:stroke-[#B5B5B5] hover:stroke-[#17A2B8] dark:hover:stroke-[#17A2B8] soft">
                <FileExportIcon />
                <p className="font-semibold text-sm">
                    {all
                        ? t('components.Export.exportAll')
                        : t('components.Export.export')}
                </p>
            </div>
        </button>
    );
};

export default Export;
