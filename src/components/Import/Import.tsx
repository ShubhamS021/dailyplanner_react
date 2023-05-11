import { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { fileImportSVG } from '../../assets/svgs/file-import.svg';
import { BoardContext } from '../../context/BoardContext';

export const Import = () => {
    const boardContext = useContext(BoardContext);
    const { t } = useTranslation();
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        boardContext.importBoardFromJSON(e);
    };

    const handleClickImport = () => {
        if (inputRef.current !== null) {
            inputRef.current.click();
        }
    };

    return (
        <>
            <button
                className="bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white font-semibold"
                data-testid="import-button"
                onClick={(_e) => {
                    handleClickImport();
                }}
            >
                <input
                    className="hidden"
                    type="file"
                    onChange={handleImport}
                    ref={inputRef}
                    data-testid="import-input"
                />
                <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] hover:stroke-white">
                    {fileImportSVG}
                    <p className="font-semibold text-sm">
                        {t('components.Import.import')}
                    </p>
                </div>
            </button>
        </>
    );
};

export default Import;
