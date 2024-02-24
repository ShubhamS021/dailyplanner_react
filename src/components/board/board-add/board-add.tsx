import PageTitle from '@/components/common/page-title/page-title';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import {
    getLocalizedInitialBoardState,
    getLocalizedInitialLanesState,
} from '@/hooks/useBoardStore/util/board.util';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Separator } from '@/ui/separator';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const BoardAdd = () => {
    const [addBoard] = useBoardStore((state) => [state.addBoard]);

    const [setPage] = usePageStore((state) => [state.setPage]);

    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateStandardBoard = () => {
        const newBoard = {
            ...getLocalizedInitialBoardState(),
            lanes: getLocalizedInitialLanesState(),
        };
        addBoard(newBoard);
        setPage('boardDefaultPage');
    };

    const handleCreateCustomBoard = () => {
        const customBoard = { ...getLocalizedInitialBoardState() };
        customBoard.title = name;
        customBoard.subtitle = description;

        addBoard(customBoard);
        setPage('boardCustomLanesPage');
    };

    const handleNameChanges = (name: string) => {
        setName(name);
    };

    const handleDescriptionChanges = (description: string) => {
        setDescription(description);
    };

    const isValid = () => {
        return name !== '' && description !== '';
    };

    return (
        <div className="h-full p-10 grid grid-cols-1 grid-rows-1 justify-center items-center">
            <div className="h-full grid grid-rows-[auto,1fr,auto] gap-3">
                <PageTitle
                    title={t('components.board-add.title')}
                    subtitle={t('components.board-add.subtitle')}
                ></PageTitle>

                <div className="grid grid-cols-[1fr,50px,1fr] gap-3 mt-10">
                    <div className="flex flex-col gap-10">
                        <h3 className="mt-10 text-xl font-semibold">
                            {t('components.board-add.standardBoard')}
                        </h3>
                        <div data-testid="board-add-standard-subtitle">
                            {t('components.board-add.standard')}

                            <div className="flex gap-2 my-3">
                                {getLocalizedInitialLanesState().map((lane) => {
                                    return (
                                        <Badge
                                            className="dark:text-gray-800"
                                            key={lane.id}
                                            variant={lane.variant}
                                        >
                                            {lane.title}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <Button
                                data-testid="board-add-create-standard-button"
                                onClick={() => {
                                    handleCreateStandardBoard();
                                }}
                            >
                                {t('components.board-add.create')}
                            </Button>
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex flex-col gap-10">
                        <h3 className="mt-10 text-xl font-semibold">
                            {t('components.board-add.customBoard')}
                        </h3>
                        <div data-testid="board-add-custom-subtitle">
                            <p>{t('components.board-add.custom')}</p>
                            <p>{t('components.board-add.customDescription')}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>{t('components.board-add.name')}</Label>
                            <Input
                                data-testid="board-add-enter-name-input"
                                onChange={(e) => {
                                    handleNameChanges(e.target.value);
                                }}
                            ></Input>
                            <Label>
                                {t('components.board-add.description')}
                            </Label>
                            <Input
                                data-testid="board-add-enter-description-input"
                                onChange={(e) => {
                                    handleDescriptionChanges(e.target.value);
                                }}
                            ></Input>
                        </div>
                        <div>
                            <Button
                                disabled={!isValid()}
                                type="button"
                                data-testid="board-add-create-own-button"
                                onClick={() => {
                                    handleCreateCustomBoard();
                                }}
                            >
                                {t('components.board-add.nextToLanes')}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 justify-center mt-20 pb-3 text-xs text-gray-400 hover:text-primary cursor-help">
                    <Info width={16} height={16} />
                    {t('components.board-add.PS')}
                </div>
            </div>
        </div>
    );
};
export default BoardAdd;
