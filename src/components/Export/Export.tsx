import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { fileExportSVG } from '../../assets/svgs/file-export.svg';
import { BoardContext } from '../../context/BoardContext';

export const Export = () => {
    const boardContext = useContext(BoardContext);
    const { t } = useTranslation();

    const handleExport = () => {
        boardContext.exportBoardToJSON();
    };

    return (
        <button
            className="hover:text-[#17A2B8] font-semibold dark:text-[#5E5E5E] dark:hover:text-[#17A2B8]"
            data-testid="export-button"
            onClick={(_e) => {
                handleExport();
            }}
        >
            <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] hover:stroke-[#17A2B8] soft">
                {fileExportSVG}
                <p className="font-semibold text-sm">
                    {t('components.Export.export')}
                </p>
            </div>
        </button>
    );
};

export default Export;
