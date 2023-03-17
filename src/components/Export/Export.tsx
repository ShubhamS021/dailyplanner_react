import { useContext } from 'react';
import { fileExportSVG } from '../../assets/svgs/file-export.svg';
import { BoardContext } from '../../context/BoardContext';

export const Export = () => {
    const boardContext = useContext(BoardContext);
    const handleExport = () => {
        boardContext.exportBoardToJSON();
    };

    return (
        <button
            className="bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white font-semibold"
            data-testid="export-button"
            onClick={(_e) => {
                handleExport();
            }}
        >
            <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] hover:stroke-white">
                {fileExportSVG}
                <p className="font-semibold text-sm">Export</p>
            </div>
        </button>
    );
};

export default Export;
