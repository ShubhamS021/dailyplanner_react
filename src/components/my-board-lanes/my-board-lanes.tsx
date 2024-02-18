import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { type Lane } from '@/interfaces/Lane';
import { ColorVariant } from '@/types/ColorVariant';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Separator } from '@/ui/separator';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorChooser } from '../common/color-chooser/color-chooser';
import PageTitle from '../common/page-title/page-title';

export const MyBoardLanes = () => {
    const [boards, addLaneToBoard, removeLaneFromBoard, enterBoard] =
        useBoardStore((state) => [
            state.boards,
            state.addLaneToBoard,
            state.removeLaneFromBoard,
            state.enterBoard,
        ]);

    const [laneValue, setLaneValue] = useState('');
    const [selectedColor, setSelectedColor] = useState('green' as ColorVariant);
    const { t } = useTranslation();

    const handleStart = () => {
        enterBoard(boards[boards.length - 1].id);
    };

    const handleAddNewLane = () => {
        const newLane: Lane = {
            id: -1,
            title: laneValue,
            variant: selectedColor,
            cards: [],
        };

        addLaneToBoard(newLane, boards.length);
        setLaneValue('');
    };

    const handleLaneRemove = (laneId: number) => {
        removeLaneFromBoard(laneId, boards.length);
    };

    const handleLaneChanges = (name: string) => {
        setLaneValue(name);
    };

    return (
        <div className="p-10 grid grid-cols-1 grid-rows-1 ">
            <div className="flex flex-col gap-3">
                <PageTitle
                    title={t('components.MyBoardLanes.define')}
                    subtitle={t('components.MyBoardLanes.subtitle')}
                />

                <div className="grid grid-cols-[1fr,50px,1fr] gap-3 mt-10">
                    <div className="flex flex-col gap-10">
                        <h3 className="mt-10 text-xl font-semibold">
                            {t('components.MyBoardLanes.laneconfiguration')}
                        </h3>

                        <Label>{t('components.MyBoardLanes.name') ?? ''}</Label>
                        <Input
                            className="w-2/3"
                            data-testid="myboardlanes-lanename-input"
                            onChange={(e) => {
                                handleLaneChanges(e.target.value);
                            }}
                            value={laneValue}
                        />
                        <div className="flex flex-col gap-10">
                            <Label>
                                {t('components.MyBoardLanes.color') ?? ''}
                            </Label>
                            <ColorChooser
                                onSelectColor={(variant: ColorVariant) =>
                                    setSelectedColor(variant)
                                }
                            ></ColorChooser>
                        </div>
                        <div>
                            <Button
                                disabled={laneValue === ''}
                                data-testid="myboardlanes-addlane-button"
                                onClick={() => {
                                    handleAddNewLane();
                                }}
                            >
                                <p className="font-semibold text-sm">
                                    {t('components.MyBoardLanes.add')}
                                </p>
                            </Button>
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex flex-col gap-10">
                        <h3 className="mt-10 text-xl font-semibold">
                            {t('components.MyBoardLanes.finalLanes')}
                        </h3>

                        <div>
                            <div
                                className={`grid grid-flow-col-dense wrap gap-2`}
                            >
                                {boards[boards.length - 1].lanes.length === 0 &&
                                    t('components.MyBoardLanes.noLanes')}
                                <div className="flex gap-2">
                                    {boards[boards.length - 1].lanes?.map(
                                        (l: Lane) => {
                                            return (
                                                <Badge
                                                    className="dark:text-gray-800"
                                                    variant={l.variant}
                                                    size={'sm'}
                                                    key={l.id}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {l.title}

                                                        <Trash2
                                                            width={12}
                                                            height={12}
                                                            className={`text-gray-500 hover:text-black hover:cursor-pointer`}
                                                            onClick={() => {
                                                                handleLaneRemove(
                                                                    l.id
                                                                );
                                                            }}
                                                            data-testid="tag-remove-button"
                                                        />
                                                    </span>
                                                </Badge>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                disabled={
                                    boards[boards.length - 1].lanes.length === 0
                                }
                                type="button"
                                data-testid="myboardlanes-create-own-button"
                                onClick={() => {
                                    handleStart();
                                }}
                            >
                                {t('components.MyBoardLanes.start')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyBoardLanes;
