import { useContext, useState } from 'react';
import { BoardContext } from '../../context/BoardContext';
import { type Card } from '../../interfaces/Card';
import type Tag from '../../interfaces/Tag';
import type Task from '../../interfaces/Task';
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
    };

    const { addCardToLane } = useContext(BoardContext);
    const [card, setCard] = useState(initialCard);
    const [showModal, setShowModal] = useState(showModalInitially ?? false);

    const saveCard = () => {
        addCardToLane(card, 1);
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
            <div className="bg-[#f8f8f8] border border-[#f5f4f4] p-2 rounded-lg">
                <input
                    placeholder={placeholder}
                    className="bg-[#f8f8f8] focus:outline-none"
                    data-testid="addcard-input"
                    value={card.title}
                    onChange={(e) => {
                        updateTitle(e.target.value);
                    }}
                ></input>
                <button
                    disabled={card.title === ''}
                    type="button"
                    data-testid="addcard-button"
                    className="bg-[#17A2B8] text-white px-2 py-1 rounded font-semibold hover:ring-2 hover:ring-[#057C8E] hover:shadow-[0_2px_4px_rgba(5,124,142,0.4)] disabled:bg-gray-400 disabled:ring-0 disabled:shadow-none ease-linear transition-all duration-150"
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
