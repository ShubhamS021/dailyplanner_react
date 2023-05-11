import { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { trashSVG } from '../../assets/svgs/trash.svg';
import { AddCardModal } from '../../components/AddCard/modal/AddCardModal';
import { CardMoveModal } from '../../components/CardMoveModal/CardMoveModal';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
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
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMoveModal, setShowMoveModal] = useState(false);
    const [cardToEdit, setCardToEdit] = useState<Card>();
    const [cardToMove, setCardToMove] = useState<Card>();
    const boardContext = useContext(BoardContext);

    const renderDelete = () => {
        return (
            <div
                className={`text-xs text-[#4d4d4d] font-semibold self-center place-self-end`}
            >
                <div
                    className="flex gap-1 cursor-pointer hover:text-red-500 ease-linear transition-all duration-150"
                    title="Delete all cards from lane"
                    data-testid="delete-all-from-lane-button"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    {trashSVG}
                    delete all
                </div>
            </div>
        );
    };

    const renderEmptyLane = () => {
        return <Dropzone text="Place tasks here.." />;
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
                                        boardContext.removeCardFromLane(
                                            c.id,
                                            id
                                        );
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
                    title={'Warning: Deleting all cards from lane'}
                    text={
                        'Are you sure you want to delete all cards from this lane? This action cannot be undone.'
                    }
                    submitButtonText={'Yes, delete all.'}
                    modalConfirmation={() => {
                        boardContext.removeCardsFromLane(id);
                    }}
                    closeModal={() => {
                        setShowModal(false);
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
                    title={'Move card to another board'}
                    text={'Choose the board you want move your card to:'}
                    submitButtonText={'Move the card'}
                    modalConfirmation={(newBoardId: number) => {
                        const newBoard = boardContext.boards.find(
                            (b) => b.id === newBoardId
                        );

                        if (newBoard === undefined)
                            throw new Error(`No board with id ${id} found.`);

                        const currentLane = boardContext.board.lanes.find((l) =>
                            l.cards.some((c) => c.id === cardToMove.id)
                        );

                        if (currentLane === undefined) {
                            throw new Error(
                                `Lane for card ${cardToMove.id} couldn't be determined.`
                            );
                        }

                        boardContext.moveCardToBoard(
                            cardToMove,
                            currentLane.id,
                            newBoard
                        );
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
                    submitButtonText={'Save changes'}
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
                        boardContext.updateCard(cardToEdit, id);
                    }}
                ></AddCardModal>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
        );
    };

    return (
        <div className="flex flex-col gap-2" data-testid={`lane-${id}`}>
            <div className="w-full grid grid-cols-[auto,auto,1fr] gap-1">
                <LabelComponent color={color} text={text} />
                <div
                    className={`text-xs text-[#4d4d4d] font-semibold self-center place-self-end`}
                >
                    ({cards?.length})
                </div>
                {isLastLane && renderDelete()}
            </div>
            {renderCards(cards)}
            {showModal ? renderDeleteConfirmationModal() : null}
            {showEditModal ? renderEditCardModal() : null}
            {showMoveModal ? renderMoveCardModal() : null}
        </div>
    );
};
