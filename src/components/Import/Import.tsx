import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { fileImportSVG } from '../../assets/svgs/file-import.svg';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';

interface ImportProps {
    all?: boolean;
}
export const Import: React.FC<ImportProps> = ({ all = false }) => {
    const [importBoardFromJSON] = useBoardStore(
        (state) => [state.importBoardFromJSON],
        shallow
    );

    const { t } = useTranslation();
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        importBoardFromJSON(e, all);
    };

    const handleClickImport = () => {
        if (inputRef.current !== null) {
            inputRef.current.click();
        }
    };

    return (
        <>
            <button
                className="hover:text-[#17A2B8] dark:text-[#B5B5B5] dark:hover:text-[#17A2B8] font-semibold"
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
                    multiple={all}
                />

                <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] dark:stroke-[#B5B5B5] hover:stroke-[#17A2B8] dark:hover:stroke-[#17A2B8] soft">
                    {fileImportSVG}
                    <p className="font-semibold text-sm">
                        {all
                            ? t('components.Import.importAll')
                            : t('components.Import.import')}
                    </p>
                </div>
            </button>
        </>
    );
};

export default Import;
