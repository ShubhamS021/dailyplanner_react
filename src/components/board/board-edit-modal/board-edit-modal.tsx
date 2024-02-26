import { ColorChooser } from '@/components/common/color-chooser/color-chooser';
import PageTitle from '@/components/common/page-title/page-title';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { type Board } from '@/interfaces/Board';
import { type Lane } from '@/interfaces/Lane';
import { ColorVariant } from '@/types/ColorVariant';
import { GripVerticalIcon } from '@/ui/Icons/Icons';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Separator } from '@/ui/separator';
import { Cross1Icon } from '@radix-ui/react-icons';
import { PlusIcon, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    DragDropContext,
    Draggable,
    Droppable,
    type DropResult,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

export interface BoardEditModalProps {
    board: Board;
    title: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    modalConfirmation: (title: string, subtitle: string) => void;
    closeModal: () => void;
}

export const BoardEditModal: React.FC<BoardEditModalProps> = ({
    board,
    title,
    submitButtonText,
    cancelButtonText,
    closeModal,
    modalConfirmation,
}) => {
    const [boards, addLaneToBoard, removeLaneFromBoard, moveLane] =
        useBoardStore((state) => [
            state.boards,
            state.addLaneToBoard,
            state.removeLaneFromBoard,
            state.moveLane,
        ]);

    const [currentEditBoard, setCurrentEditBoard] = useState(board);
    const [boardTitle, setBoardTitle] = useState(board.title);
    const [boardSubTitle, setBoardSubTitle] = useState(board.subtitle);
    const [boardLaneTitle, setBoardLaneTitle] = useState('');
    const [selectedColor, setSelectedColor] = useState('green' as ColorVariant);
    const { t } = useTranslation();

    const handleLaneTitleChanges = (title: string) => {
        setBoardLaneTitle(title);
    };

    const handleAddNewLane = () => {
        if (board.lanes == null) board.lanes = [];
        const newLane: Lane = {
            id: -1,
            title: boardLaneTitle,
            variant: selectedColor,
            cards: [],
        };

        addLaneToBoard(newLane, board.id);
        setBoardLaneTitle('');
    };

    const handleRemoveLane = (id: number) => {
        removeLaneFromBoard(id, board.id);
    };

    useEffect(() => {
        const updatedBoard = boards.find((b) => b.id === currentEditBoard.id);
        if (updatedBoard != null) setCurrentEditBoard(updatedBoard);
    }, [boards]);

    const renderTitleAndSubtitle = () => {
        return (
            <>
                <Label>{t('components.BoardEditModal.title')}</Label>
                <Input
                    data-testid="boardedit-title-input"
                    value={boardTitle}
                    onChange={(e) => {
                        setBoardTitle(e.target.value);
                    }}
                ></Input>
                <Label>{t('components.BoardEditModal.subtitle')}</Label>
                <Input
                    data-testid="boardedit-subtitle-input"
                    value={boardSubTitle}
                    onChange={(e) => {
                        setBoardSubTitle(e.target.value);
                    }}
                ></Input>
            </>
        );
    };

    const renderAddLane = () => {
        return (
            <div className="flex flex-col gap-2">
                <Label>{t('components.BoardEditModal.addLane')}</Label>
                <Input
                    placeholder={
                        t('components.BoardEditModal.addLaneText') ?? ''
                    }
                    data-testid="boardedit-lane-add-input"
                    value={boardLaneTitle}
                    onChange={(e) => {
                        handleLaneTitleChanges(e.target.value);
                    }}
                ></Input>
                <ColorChooser
                    onSelectColor={(variant: ColorVariant) =>
                        setSelectedColor(variant)
                    }
                ></ColorChooser>
                <div>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        data-testid="boardedit-lane-add-button"
                        onClick={(_e) => {
                            handleAddNewLane();
                        }}
                        disabled={boardLaneTitle === ''}
                        className="flex gap-2"
                    >
                        <PlusIcon width={16} height={16} />
                        {t('components.BoardEditModal.addLane')}
                    </Button>
                </div>
            </div>
        );
    };

    const onDragEnd = (result: DropResult) => {
        if (result.destination?.index != null) {
            moveLane(board, result.source.index, result.destination?.index);
        }
    };

    const renderMoveRemoveLane = () => {
        return (
            <div className="flex flex-col gap-2 max-h-[50vh] overflow-auto">
                <Label>{t('components.BoardEditModal.moveRemoveLane')}</Label>
                <small>{t('components.BoardEditModal.removeHint') ?? ''}</small>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(droppableProvided, _droppableSnapshot) => (
                            <div
                                className="flex flex-col gap-2"
                                ref={droppableProvided.innerRef}
                            >
                                {currentEditBoard.lanes.map(
                                    (lane: Lane, index: number) => (
                                        <Draggable
                                            key={lane.id}
                                            draggableId={`board-lane-${lane.id}`}
                                            index={index}
                                        >
                                            {(
                                                draggableProvided,
                                                _draggableSnapshot
                                            ) => (
                                                <div
                                                    className="grid grid-cols-[auto,1fr,auto] gap-2 items-center group bg-white dark:bg-[#2E3842] dark:text-[#DEDEDE] border border-[#f5f4f4] dark:border-[#34414E] p-2 rounded-lg"
                                                    key={`board-${board.id}-lane-${lane.id}`}
                                                    data-testid={`board-${board.id}-lane-${lane.id}`}
                                                    ref={
                                                        draggableProvided.innerRef
                                                    }
                                                    {...draggableProvided.draggableProps}
                                                    {...draggableProvided.dragHandleProps}
                                                >
                                                    <div className="dark:stroke-[#DEDEDE]">
                                                        <GripVerticalIcon />
                                                    </div>
                                                    <div>
                                                        <Badge
                                                            variant={
                                                                lane.variant
                                                            }
                                                        >{`${lane.title} (${
                                                            lane.cards.length
                                                        } ${t(
                                                            'components.BoardEditModal.tasks'
                                                        )})`}</Badge>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            size={'icon'}
                                                            variant={'outline'}
                                                            className="disabled:cursor-not-allowed"
                                                            onClick={() => {
                                                                handleRemoveLane(
                                                                    lane.id
                                                                );
                                                            }}
                                                            data-testid="remove-lane-button"
                                                            disabled={
                                                                lane.cards
                                                                    .length > 0
                                                            }
                                                        >
                                                            <Trash2
                                                                width={16}
                                                                height={16}
                                                            />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                )}
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    };

    return (
        <div className="modal" data-testid="confirmation-modal">
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="modal-content">
                    {/* header */}
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] items-center gap-2">
                        <PageTitle title={title}></PageTitle>
                        <div>
                            <Button
                                size={'icon'}
                                variant={'ghost'}
                                data-testid="confirmation-modal-close-button"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                <Cross1Icon />
                            </Button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            {renderTitleAndSubtitle()}
                            <Separator className="my-3" />
                            {renderAddLane()}
                        </div>
                        <div>{renderMoveRemoveLane()}</div>
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
                        <Button
                            size={'sm'}
                            variant={'outline'}
                            data-testid="confirmation-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ?? 'Cancel'}
                        </Button>
                        <Button
                            size={'sm'}
                            data-testid="confirmation-modal-button"
                            onClick={() => {
                                modalConfirmation(boardTitle, boardSubTitle);
                                closeModal();
                            }}
                        >
                            {' '}
                            {submitButtonText ?? 'Ok'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
