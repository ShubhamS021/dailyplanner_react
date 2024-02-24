import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { useTranslation } from 'react-i18next';

export const BoardImport: React.FC = () => {
    const [importBoardFromJSON] = useBoardStore((state) => [
        state.importBoardFromJSON,
    ]);

    const { t } = useTranslation();

    return (
        <Button
            className="font-semibold"
            data-testid="import-button"
            size={'sm'}
            variant={'outline'}
            onClick={(_e) => {
                (_e.currentTarget.children[0] as HTMLInputElement).click();
            }}
        >
            <Input
                className="hidden"
                type="file"
                accept="application/JSON"
                onChange={(e) => importBoardFromJSON(e, true)}
                onClick={(e) => {
                    e.currentTarget.value = '';
                }}
                data-testid="import-input"
                multiple={true}
            />
            {t('components.Import.import')}
        </Button>
    );
};

export default BoardImport;
