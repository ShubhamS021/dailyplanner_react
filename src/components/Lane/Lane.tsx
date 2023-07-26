import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { AddCardModal } from '../../components/AddCard/modal/AddCardModal';
import { CardMoveModal } from '../../components/CardMoveModal/CardMoveModal';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { type Card } from '../../interfaces/Card';
import type Tag from '../../interfaces/Tag';
import type Task from '../../interfaces/Task';
import { type Shirt } from '../../types/Shirt';
import { CardComponent } from '../Card/Card';
import { Dropzone } from '../Dropzone/Dropzone';
import { LabelComponent } from '../Label/Label';
import { LaneEditModal } from '../LaneEditModal/LaneEditModal';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import useHistory from 'hooks/useHistory/useHistory';
import { EditIcon, TrashIcon } from 'ui/Icons/Icons';

export interface LaneProps {
    id: number;
    color: string;
    text: string;
    cards?: Card[];
    isLastLane: boolean;
}

export const LaneComponent: React.FC<LaneProps> = ({
    id,
    color,
    text,
    cards,
    isLastLane,
}) => {
    const [
        boards,
        board,
        removeCardFromLane,
        removeCardsFromLane,
        moveCardToBoard,
        renameLane,
        updateLaneColor,
        updateCard,
    ] = useBoardStore(
        (state) => [
            state.boards,
            state.board,
            state.removeCardFromLane,
            state.removeCardsFromLane,
            state.moveCardToBoard,
            state.renameLane,
            state.updateLaneColor,
            state.updateCard,
        ],
        shallow
    );

    const {
        addDeletionToHistory,
        addBoardMovementToHistory,
        addUpdateToHistory,
    } = useHistory(board.id);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showLaneEditModal, setShowLaneEditModal] = useState(false);
    const [showMoveModal, setShowMoveModal] = useState(false);
    const [cardToEdit, setCardToEdit] = useState<Card>();
    const [cardToMove, setCardToMove] = useState<Card>();

    const { t } = useTranslation();

    const renderDelete = () => {
        return (
            <div
                className={`text-xs text-[#4d4d4d] dark:text-[#B5B5B5] font-semibold`}
            >
                <div
                    className="flex gap-1 cursor-pointer hover:text-red-500 soft stroke-[#5A5A65] dark:stroke-[#B5B5B5] dark:hover:stroke-red-500 hover:stroke-red-500"
                    title={t('components.Lane.deleteTitle') ?? ''}
                    data-testid="delete-all-from-lane-button"
                    onClick={() => {
                        setShowDeleteModal(true);
                    }}
                >
                    <TrashIcon classes="h-4 w-4" />

                    {t('components.Lane.deleteAll')}
                </div>
            </div>
        );
    };

    const renderEdit = () => {
        return (
            <div
                className={`text-xs text-[#4d4d4d] dark:text-[#B5B5B5] font-semibold`}
            >
                <div
                    className="flex gap-1 cursor-pointer hover:text-[#17A2B8] soft stroke-[#5A5A65] dark:stroke-[#B5B5B5] hover:stroke-[#17A2B8] dark:hover:stroke-[#17A2B8]"
                    title={t('components.Lane.editTitle') ?? ''}
                    data-testid="edit-lane-button"
                    onClick={() => {
                        setShowLaneEditModal(true);
                    }}
                >
                    <EditIcon classes="h-4 w-4" />
                    {t('components.Lane.edit')}
                </div>
            </div>
        );
    };

    const renderEmptyLane = () => {
        return <Dropzone text={t('components.Lane.dropzone') ?? ''} />;
    };

    const renderCards = (cards: Card[] | undefined) => {
        if (cards === undefined || cards.length === 0) return renderEmptyLane();
        return (
            <>
                {cards.map((c, index) => (
                    <Draggable
                        key={`${c.id}`}
                        draggableId={`lane-${id}-card-${c.id}`}
                        index={index}
                    >
                        {(provided) => (
                            <div
                                data-testid={`lane-${id}-card-${c.id}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <CardComponent
                                    id={c.id}
                                    key={`lane-${id}-card-${c.id}`}
                                    title={c.title}
                                    description={c.description}
                                    upperTags={c.upperTags}
                                    tasks={c.tasks}
                                    shirt={c.shirt}
                                    lowerTags={c.lowerTags}
                                    onRemoveCard={() => {
                                        removeCardFromLane(c.id, id);
                                        addDeletionToHistory(c, board.id);
                                    }}
                                    onEditCard={() => {
                                        setCardToEdit(c);
                                        setShowEditModal(true);
                                    }}
                                    onMoveCard={() => {
                                        setCardToMove(c);
                                        setShowMoveModal(true);
                                    }}
                                />
                            </div>
                        )}
                    </Draggable>
                ))}
            </>
        );
    };

    const renderDeleteConfirmationModal = () => {
        return (
            <>
                <ConfirmationModal
                    title={t('components.Lane.deletionTitle')}
                    text={t('components.Lane.deletionText')}
                    submitButtonText={t('components.Lane.deletionSubmit') ?? ''}
                    modalConfirmation={() => {
                        removeCardsFromLane(id);
                    }}
                    closeModal={() => {
                        setShowDeleteModal(false);
                    }}
                ></ConfirmationModal>
                <div className="backdrop"></div>
            </>
        );
    };

    const renderMoveCardModal = () => {
        if (cardToMove == null) return;
        return (
            <>
                <CardMoveModal
                    title={t('components.Lane.moveTitle')}
                    text={t('components.Lane.moveText')}
                    submitButtonText={t('components.Lane.moveSubmit') ?? ''}
                    modalConfirmation={(newBoardId: number) => {
                        const newBoard = boards.find(
                            (b) => b.id === newBoardId
                        );

                        if (newBoard === undefined)
                            throw new Error(`No board with id ${id} found.`);

                        const currentLane = board.lanes.find((l) =>
                            l.cards.some((c) => c.id === cardToMove.id)
                        );

                        if (currentLane === undefined) {
                            throw new Error(
                                `Lane for card ${cardToMove.id} couldn't be determined.`
                            );
                        }

                        moveCardToBoard(cardToMove, currentLane.id, newBoard);
                        addBoardMovementToHistory(
                            cardToMove,
                            board.id,
                            board.id,
                            newBoard.id
                        );
                    }}
                    closeModal={() => {
                        setShowMoveModal(false);
                    }}
                ></CardMoveModal>
                <div className="backdrop"></div>
            </>
        );
    };

    const renderEditCardModal = () => {
        if (cardToEdit == null) return;
        return (
            <>
                <AddCardModal
                    card={cardToEdit}
                    submitButtonText={t('components.Lane.editCardSubmit') ?? ''}
                    updateTitle={(title: string) => {
                        setCardToEdit((prevState) => {
                            if (prevState == null) return;
                            return { ...prevState, title };
                        });
                    }}
                    updateDescription={(description: string) => {
                        setCardToEdit((prevState) => {
                            if (prevState == null) return;
                            return { ...prevState, description };
                        });
                    }}
                    updateTasks={(tasks: Task[]) => {
                        setCardToEdit((prevState) => {
                            if (prevState == null) return;
                            return { ...prevState, tasks };
                        });
                    }}
                    updateTags={(tags: Tag[]) => {
                        setCardToEdit((prevState) => {
                            if (prevState == null) return;
                            return { ...prevState, upperTags: tags };
                        });
                    }}
                    updateLowerTags={(tags: Tag[]) => {
                        setCardToEdit((prevState) => {
                            if (prevState == null) return;
                            return { ...prevState, lowerTags: tags };
                        });
                    }}
                    updateEstimation={(shirt: Shirt) => {
                        setCardToEdit((prevState) => {
                            if (prevState == null) return;
                            return { ...prevState, shirt };
                        });
                    }}
                    closeModal={() => {
                        setShowEditModal(false);
                    }}
                    saveCard={() => {
                        updateCard(cardToEdit, id);
                        addUpdateToHistory(cardToEdit, board.id);
                    }}
                ></AddCardModal>
                <div className="backdrop"></div>
            </>
        );
    };

    const renderLaneEditCardModal = (laneId: number) => {
        return (
            <>
                <LaneEditModal
                    title={t('components.Lane.editTitle')}
                    editNameText={t('components.Lane.editNameText')}
                    editLabelText={t('components.Lane.editLabelText')}
                    board={board}
                    laneId={laneId}
                    modalConfirmation={(title: string, color: string) => {
                        renameLane(laneId, title);
                        updateLaneColor(laneId, color);
                    }}
                    closeModal={() => {
                        setShowLaneEditModal(false);
                    }}
                ></LaneEditModal>
                <div className="backdrop"></div>
            </>
        );
    };

    return (
        <div className="flex flex-col gap-2" data-testid={`lane-${id}`}>
            <div className="w-full grid grid-cols-[auto,auto,1fr] gap-1">
                <LabelComponent color={color} text={text} />
                <div
                    className={`text-xs text-[#4d4d4d] font-semibold self-center dark:text-[#B5B5B5]`}
                >
                    ({cards?.length}{' '}
                    {cards?.length === 1
                        ? t('components.Lane.task')
                        : t('components.Lane.tasks')}
                    )
                </div>
                <div className="group flex self-center place-self-end gap-2 items-center">
                    <div className="invisible group-hover:visible">
                        {renderEdit()}
                    </div>
                    {isLastLane && renderDelete()}
                </div>
            </div>
            {renderCards(cards)}
            {showDeleteModal ? renderDeleteConfirmationModal() : null}
            {showEditModal ? renderEditCardModal() : null}
            {showMoveModal ? renderMoveCardModal() : null}
            {showLaneEditModal ? renderLaneEditCardModal(id) : null}
        </div>
    );
};
