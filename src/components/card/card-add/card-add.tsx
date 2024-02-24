import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { useHistory } from '@/hooks/useHistory/useHistory';
import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import type Task from '@/interfaces/Task';
import { type Shirt } from '@/types/Shirt';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { useState } from 'react';
import { CardAddModal } from './card-add-modal';

export interface CardAddProps {
    placeholder: string;
    text: string;
    showModalInitially?: boolean;
}

export const CardAdd: React.FC<CardAddProps> = ({
    text,
    placeholder,
    showModalInitially,
}) => {
    const initialCard: Card = {
        title: '',
        id: 0,
        shirt: 'S',
    };

    const [addCardToLane, board] = useBoardStore((state) => [
        state.addCardToLane,
        state.board,
    ]);

    const { addCreationToHistory } = useHistory(board.id);

    const [card, setCard] = useState(initialCard);
    const [showModal, setShowModal] = useState(showModalInitially ?? false);

    const saveCard = () => {
        addCardToLane(card, 0);
        addCreationToHistory(card, board.id);
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
            <div className="flex gap-2">
                <Input
                    placeholder={placeholder}
                    data-testid="addcard-input"
                    value={card.title}
                    onChange={(e) => {
                        updateTitle(e.target.value);
                    }}
                ></Input>
                <Button
                    disabled={card.title === ''}
                    type="button"
                    data-testid="addcard-button"
                    variant={'outline'}
                    size={'sm'}
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    {text}
                </Button>
            </div>
            {showModal ? (
                <>
                    <CardAddModal
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
                    ></CardAddModal>

                    <div className="backdrop"></div>
                </>
            ) : null}
        </>
    );
};
