import { useContext, useState } from 'react';
import { BoardContext } from '../../context/BoardContext';
import { type Card } from '../../interfaces/Card';
import type Tag from '../../interfaces/Tag';
import type Task from '../../interfaces/Task';
import { type Shirt } from '../../types/Shirt';
import { AddCardModal } from './modal/AddCardModal';

export interface AddCardProps {
    placeholder: string;
    text: string;
    showModalInitially?: boolean;
}

export const AddCard: React.FC<AddCardProps> = ({
    text,
    placeholder,
    showModalInitially,
}) => {
    const initialCard: Card = {
        title: '',
        id: 0,
        shirt: 'S',
    };

    const { addCardToLane } = useContext(BoardContext);
    const [card, setCard] = useState(initialCard);
    const [showModal, setShowModal] = useState(showModalInitially ?? false);

    const saveCard = () => {
        addCardToLane(card, 0);
    };

    const resetToInitial = () => {
        setCard(initialCard);
    };

    const updateTitle = (title: string) => {
        setCard({ ...card, title });
    };

    const updateDescription = (description: string) => {
        setCard({ ...card, description });
    };

    const updateEstimation = (shirt: Shirt) => {
        setCard({ ...card, shirt });
    };

    const updateTasks = (tasks: Task[]) => {
        setCard({ ...card, tasks });
    };

    const updateTags = (tags: Tag[]) => {
        setCard({ ...card, upperTags: tags });
    };

    const updateLowerTags = (tags: Tag[]) => {
        setCard({ ...card, lowerTags: tags });
    };

    const closeModal = () => {
        resetToInitial();
        setShowModal(false);
    };

    return (
        <>
            <div className="formField rounded-lg">
                <input
                    placeholder={placeholder}
                    className="focus:outline-none"
                    data-testid="addcard-input"
                    value={card.title}
                    role="textbox"
                    onChange={(e) => {
                        updateTitle(e.target.value);
                    }}
                ></input>
                <button
                    disabled={card.title === ''}
                    type="button"
                    data-testid="addcard-button"
                    className="button primary-button px-2 py-1 soft"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    {text}
                </button>
            </div>
            {showModal ? (
                <>
                    <AddCardModal
                        card={card}
                        updateTitle={(title: string) => {
                            updateTitle(title);
                        }}
                        updateDescription={(description: string) => {
                            updateDescription(description);
                        }}
                        updateEstimation={(shirt: Shirt) => {
                            updateEstimation(shirt);
                        }}
                        updateTasks={(tasks: Task[]) => {
                            updateTasks(tasks);
                        }}
                        updateTags={(tags: Tag[]) => {
                            updateTags(tags);
                        }}
                        updateLowerTags={(tags: Tag[]) => {
                            updateLowerTags(tags);
                        }}
                        closeModal={() => {
                            closeModal();
                        }}
                        saveCard={() => {
                            saveCard();
                        }}
                    ></AddCardModal>

                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};
