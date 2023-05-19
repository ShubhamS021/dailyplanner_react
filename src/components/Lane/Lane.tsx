import { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { editSVG } from '../../assets/svgs/edit.svg';
import { trashSVG } from '../../assets/svgs/trash.svg';
import { AddCardModal } from '../../components/AddCard/modal/AddCardModal';
import { CardMoveModal } from '../../components/CardMoveModal/CardMoveModal';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { LaneRenameModal } from '../../components/LaneRenameModal/LaneRenameModal';
import { BoardContext } from '../../context/BoardContext';
import { type Card } from '../../interfaces/Card';
import type Tag from '../../interfaces/Tag';
import type Task from '../../interfaces/Task';
import { CardComponent } from '../Card/Card';
import { Dropzone } from '../Dropzone/Dropzone';
import { LabelComponent } from '../Label/Label';

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showLaneEditModal, setShowLaneEditModal] = useState(false);
    const [showMoveModal, setShowMoveModal] = useState(false);
    const [cardToEdit, setCardToEdit] = useState<Card>();
    const [cardToMove, setCardToMove] = useState<Card>();
    const {
        removeCardFromLane,
        removeCardsFromLane,
        moveCardToBoard,
        renameLane,
        updateCard,
        boards,
        board,
    } = useContext(BoardContext);
    const { t } = useTranslation();

    const renderDelete = () => {
        return (
            <div className={`text-xs text-[#4d4d4d] font-semibold`}>
                <div
                    className="flex gap-1 cursor-pointer hover:text-red-500 ease-linear transition-all duration-150"
                    title={t('components.Lane.deleteTitle') ?? ''}
                    data-testid="delete-all-from-lane-button"
                    onClick={() => {
                        setShowDeleteModal(true);
                    }}
                >
                    {trashSVG}
                    {t('components.Lane.deleteAll')}
                </div>
            </div>
        );
    };

    const renderEdit = () => {
        return (
            <div className={`text-xs text-[#4d4d4d] font-semibold`}>
                <div
                    className="flex gap-1 cursor-pointer hover:text-[#17A2B8] ease-linear transition-all duration-150"
                    title={t('components.Lane.editTitle') ?? ''}
                    data-testid="edit-lane-button"
                    onClick={() => {
                        setShowLaneEditModal(true);
                    }}
                >
                    {editSVG}
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
                                    lowerTags={c.lowerTags}
                                    onRemoveCard={() => {
                                        removeCardFromLane(c.id, id);
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
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
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
                    }}
                    closeModal={() => {
                        setShowMoveModal(false);
                    }}
                ></CardMoveModal>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
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
                    closeModal={() => {
                        setShowEditModal(false);
                    }}
                    saveCard={() => {
                        updateCard(cardToEdit, id);
                    }}
                ></AddCardModal>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
        );
    };

    const renderLaneEditCardModal = (laneId: number) => {
        return (
            <>
                <LaneRenameModal
                    title={t('components.Lane.editTitle')}
                    text={t('components.Lane.editText')}
                    board={board}
                    laneId={laneId}
                    modalConfirmation={(title: string) => {
                        renameLane(laneId, title);
                    }}
                    closeModal={() => {
                        setShowLaneEditModal(false);
                    }}
                ></LaneRenameModal>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
        );
    };

    return (
        <div className="flex flex-col gap-2" data-testid={`lane-${id}`}>
            <div className="w-full grid grid-cols-[auto,auto,1fr] gap-1">
                <LabelComponent color={color} text={text} />
                <div
                    className={`text-xs text-[#4d4d4d] font-semibold self-center`}
                >
                    ({cards?.length})
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
