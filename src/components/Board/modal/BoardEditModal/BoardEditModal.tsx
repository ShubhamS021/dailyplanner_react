import { useState } from 'react';
import {
    DragDropContext,
    Draggable,
    Droppable,
    type DropResult,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { TagComponent } from '@/ui/Tag/Tag';
import { type Board } from '@/interfaces/Board';
import { type Lane } from '@/interfaces/Lane';
import { BaseColors, colors } from '@/theme/colors';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import {
    CloseIcon,
    GripVerticalIcon,
    InfoCircleIcon,
    TrashIcon,
} from '@/ui/Icons/Icons';

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
    const [addLaneToBoard, removeLaneFromBoard, moveLane] = useBoardStore(
        (state) => [
            state.addLaneToBoard,
            state.removeLaneFromBoard,
            state.moveLane,
        ]
    );

    const [boardTitle, setBoardTitle] = useState(board.title);
    const [boardSubTitle, setBoardSubTitle] = useState(board.subtitle);
    const [boardLaneTitle, setBoardLaneTitle] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(colors.Green);
    const { t } = useTranslation();

    const handleLaneTitleChanges = (title: string) => {
        setBoardLaneTitle(title);
    };

    const handleTagColorSelection = (color: string) => {
        setSelectedColor(color);
    };

    const handleTagColorSelectionIndex = (index: number) => {
        setSelectedColorIndex(index);
    };

    const handleAddNewLane = () => {
        if (board.lanes == null) board.lanes = [];
        const newLane: Lane = {
            id: -1,
            title: boardLaneTitle,
            color: selectedColor,
            cards: [],
        };

        addLaneToBoard(newLane, board.id);
        setBoardLaneTitle('');
    };

    const handleRemoveLane = (id: number) => {
        removeLaneFromBoard(id, board.id);
    };

    const renderTitleAndSubtitle = () => {
        return (
            <>
                <div className="font-semibold text-base dark:text-white">
                    {t('components.BoardEditModal.titleAndDescription')}
                </div>
                <div className="formField">
                    <input
                        placeholder={t('components.BoardEditModal.title') ?? ''}
                        className="focus:outline-none text-sm w-full"
                        data-testid="boardedit-title-input"
                        value={boardTitle}
                        onChange={(e) => {
                            setBoardTitle(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="formField">
                    <input
                        placeholder={
                            t('components.BoardEditModal.subtitle') ?? ''
                        }
                        className="focus:outline-none text-sm w-full"
                        data-testid="boardedit-subtitle-input"
                        value={boardSubTitle}
                        onChange={(e) => {
                            setBoardSubTitle(e.target.value);
                        }}
                    ></input>
                </div>
            </>
        );
    };

    const renderAddLane = () => {
        return (
            <>
                <div className="font-semibold text-base dark:text-white">
                    {t('components.BoardEditModal.addLane')}
                </div>
                <div className="grid grid-cols-[1fr,auto] gap-2">
                    <div className="formField p-2 flex gap-2 items-center">
                        <input
                            placeholder={
                                t('components.BoardEditModal.addLaneText') ?? ''
                            }
                            className="focus:outline-none text-sm w-full"
                            data-testid="boardedit-lane-add-input"
                            value={boardLaneTitle}
                            onChange={(e) => {
                                handleLaneTitleChanges(e.target.value);
                            }}
                        ></input>
                        {renderColorSelector()}
                    </div>
                    <button
                        className="button"
                        data-testid="boardedit-lane-add-button"
                        onClick={(_e) => {
                            handleAddNewLane();
                        }}
                        disabled={boardLaneTitle === ''}
                    >
                        <div className="flex gap-2 items-center p-2">
                            <p className="font-semibold text-sm">
                                {t('components.BoardEditModal.add') ?? ''}
                            </p>
                        </div>
                    </button>
                </div>
            </>
        );
    };

    const renderColorSelector = () => {
        return (
            <div className="flex gap-2 dark:text-[#8B8B8B]">
                {BaseColors.map((color, index) => (
                    <div
                        key={color}
                        className={`cursor-pointer `}
                        data-testid="myboardlanes-lane-color-button"
                        onClick={() => {
                            handleTagColorSelectionIndex(index);
                            handleTagColorSelection(color);
                        }}
                    >
                        <TagComponent
                            color={color}
                            hasOutline={index === selectedColorIndex}
                        ></TagComponent>
                    </div>
                ))}
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
            <>
                <div className="font-semibold text-base dark:text-white">
                    {t('components.BoardEditModal.moveRemoveLane')}
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(droppableProvided, _droppableSnapshot) => (
                            <div
                                className="flex flex-col gap-2"
                                ref={droppableProvided.innerRef}
                            >
                                {board.lanes.map((lane, index) => (
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
                                                ref={draggableProvided.innerRef}
                                                {...draggableProvided.draggableProps}
                                                {...draggableProvided.dragHandleProps}
                                            >
                                                <div className="dark:stroke-[#DEDEDE]">
                                                    <GripVerticalIcon />
                                                </div>
                                                <div>
                                                    <TagComponent
                                                        color={lane.color}
                                                        text={`${lane.title} (${
                                                            lane.cards.length
                                                        } ${t(
                                                            'components.BoardEditModal.tasks'
                                                        )})`}
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        className="small-button disabled:cursor-not-allowed"
                                                        onClick={() => {
                                                            handleRemoveLane(
                                                                lane.id
                                                            );
                                                        }}
                                                        data-testid="remove-lane-button"
                                                        disabled={
                                                            lane.cards.length >
                                                            0
                                                        }
                                                    >
                                                        <TrashIcon classes="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <small>{t('components.BoardEditModal.removeHint') ?? ''}</small>
            </>
        );
    };

    return (
        <div className="modal" data-testid="confirmation-modal">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="modal-content">
                    {/* header */}
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] gap-2">
                        <div className="flex gap-2 dark:stroke-[#fff] dark:fill-[#fff]">
                            <InfoCircleIcon />

                            <h3
                                className="text-base font-semibold"
                                data-testid="confirmation-modal-title"
                            >
                                {title}
                            </h3>
                        </div>
                        <div>
                            <button
                                data-testid="confirmation-modal-close-button"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                <CloseIcon
                                    viewBox={{
                                        x: 0,
                                        y: 0,
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex flex-col gap-2">
                        {renderTitleAndSubtitle()}
                        {renderAddLane()}
                        {renderMoveRemoveLane()}
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
                        <button
                            className="bg-[#ECEEF8] text-black p-2 py-1.5 rounded-md font-semibold hover:text-gray-400 soft"
                            type="button"
                            data-testid="confirmation-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ?? 'Cancel'}
                        </button>
                        <button
                            className="bg-[#17A2B8] text-white p-2 py-1.5 rounded-md font-semibold soft"
                            type="button"
                            data-testid="confirmation-modal-button"
                            onClick={() => {
                                modalConfirmation(boardTitle, boardSubTitle);
                                closeModal();
                            }}
                        >
                            {submitButtonText ?? 'Ok'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
