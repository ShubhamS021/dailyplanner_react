import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { Button } from '@/ui/button';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface ImportProps {
    all?: boolean;
}
export const BoardImport: React.FC<ImportProps> = ({ all = false }) => {
    const [importBoardFromJSON] = useBoardStore((state) => [
        state.importBoardFromJSON,
    ]);

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
            <Button
                className="font-semibold"
                data-testid="import-button"
                variant={all ? 'ghost' : 'outline'}
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

                <div className="flex gap-2 items-center p-2">
                    <p className="font-semibold text-sm">
                        {all
                            ? t('components.Import.importAll')
                            : t('components.Import.import')}
                    </p>
                </div>
            </Button>
        </>
    );
};

export default BoardImport;
