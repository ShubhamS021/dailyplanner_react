import { CardComponent } from '@/components/card/card';
import { CardMoveModal } from '@/components/card/card-move-modal/card-move-modal';
import { ConfirmationModal } from '@/components/common/confirmation-modal/confirmation-modal';
import { LaneActions } from '@/components/lane/lane-actions/lane-actions';
import { LaneEditModal } from '@/components/lane/lane-edit-modal/lane-edit-modal';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { useHistory } from '@/hooks/useHistory/useHistory';
import { type Card } from '@/interfaces/Card';
import { type Lane } from '@/interfaces/Lane';
import type Tag from '@/interfaces/Tag';
import type Task from '@/interfaces/Task';
import { ColorVariant } from '@/types/ColorVariant';
import { type Shirt } from '@/types/Shirt';
import { Badge } from '@/ui/badge';
import { Dropzone } from '@/ui/dropzone/dropzone';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { CardAddModal } from '../card/card-add/card-add-modal';

export interface LaneProps {
    id: number;
    variant: ColorVariant;
    text: string;
    cards?: Card[];
    isLastLane: boolean;
}

export const LaneComponent: React.FC<LaneProps> = ({
    id,
    variant,
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
    ] = useBoardStore((state) => [
        state.boards,
        state.board,
        state.removeCardFromLane,
        state.removeCardsFromLane,
        state.moveCardToBoard,
        state.renameLane,
        state.updateLaneColor,
        state.updateCard,
    ]);

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

                        const currentLane = board.lanes.find((l: Lane) =>
                            l.cards.some((c: Card) => c.id === cardToMove.id)
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
                <CardAddModal
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
                ></CardAddModal>
                <div className="backdrop"></div>
            </>
        );
    };

    const renderLaneEditCardModal = (laneId: number) => {
        return (
            <>
                <LaneEditModal
                    title={t('components.Lane.edit')}
                    editNameText={t('components.Lane.editNameText')}
                    editLabelText={t('components.Lane.editLabelText')}
                    board={board}
                    laneId={laneId}
                    modalConfirmation={(
                        title: string,
                        variant: ColorVariant
                    ) => {
                        renameLane(laneId, title);
                        updateLaneColor(laneId, variant);
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
            <div className="w-full grid grid-cols-[auto,1fr] gap-1">
                <div className="flex items-center">
                    <Badge variant={variant} size={'xs'}>
                        {text}
                    </Badge>
                </div>
                {/* <div
                    className={`bg-accent text-accent-foreground text-xs border border-accent rounded p-1 px-2 font-semibold self-center`}
                >
                    {cards?.length}
                </div> */}
                <div className="flex self-center place-self-end gap-2 items-center">
                    <LaneActions
                        onShowLaneEditModal={() => {
                            setShowLaneEditModal(true);
                        }}
                        onShowDeleteModal={() => {
                            setShowDeleteModal(true);
                        }}
                        isLastLane={isLastLane}
                    />
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
