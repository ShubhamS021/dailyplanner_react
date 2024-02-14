import { CardComponent } from '@/components/card/card';
import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import type Task from '@/interfaces/Task';
import { type Shirt } from '@/types/Shirt';
import { useTranslation } from 'react-i18next';
import { CardAddDescription } from './card-add-description';
import { CardAddDueDate } from './card-add-due-date';
import { CardAddEstimation } from './card-add-estimation';
import { CardAddTags } from './card-add-tags';
import { CardAddTasks } from './card-add-tasks';

export interface CardAddModalProps {
    card: Card;
    submitButtonText?: string;
    cancelButtonText?: string;
    updateTitle: (title: string) => void;
    updateDescription: (description: string) => void;
    updateTasks: (tasks: Task[]) => void;
    updateTags: (tags: Tag[]) => void;
    updateEstimation: (shirt: Shirt) => void;
    updateLowerTags: (tags: Tag[]) => void;
    closeModal: () => void;
    saveCard: () => void;
}

export const CardAddModal: React.FC<CardAddModalProps> = ({
    card,
    submitButtonText,
    cancelButtonText,
    updateTitle,
    updateDescription,
    updateTasks,
    updateTags,
    updateEstimation,
    updateLowerTags,
    closeModal,
    saveCard,
}) => {
    const { t } = useTranslation();

    const handleOnRemoveTag = (tag: Tag) => {
        if (tag.tagType === 'upper') {
            const newTags = card.upperTags?.filter((t) => t.id !== tag.id);
            if (newTags != null) {
                updateTags(newTags);
            }
        } else {
            const newTags = card.lowerTags?.filter((t) => t.id !== tag.id);
            if (newTags != null) {
                updateLowerTags(newTags);
            }
        }
    };

    const handleOnRemoveTask = (task: Task) => {
        const newTasks = card.tasks?.filter((t) => t.id !== task.id);
        if (newTasks != null) {
            updateTasks(newTasks);
        }
    };

    return (
        <div className="modal" data-testid="addcard-modal">
            <div className="min-w-[80vw] relative w-auto mx-auto max-w-3xl flex gap-6">
                {/* content */}
                <div className="modal-content">
                    {/* body */}
                    <div className="p-2">
                        <div className="relative flex flex-col gap-2 p-5 rounded-2xl bg-[#F8F8F8] dark:bg-[#1b2129]">
                            <CardAddDescription
                                headline={
                                    t(
                                        'components.AddCard.modal.AddCardModal.descriptionHeadline'
                                    ) ?? ''
                                }
                                card={card}
                                updateDescription={(description: string) => {
                                    updateDescription(description);
                                }}
                                updateTitle={(title: string) => {
                                    updateTitle(title);
                                }}
                            ></CardAddDescription>
                            <CardAddTasks
                                card={card}
                                updateTasks={(tasks: Task[]) => {
                                    updateTasks(tasks);
                                }}
                                headline={
                                    t(
                                        'components.AddCard.modal.AddCardModal.subtasksHeadline'
                                    ) ?? ''
                                }
                            ></CardAddTasks>
                            <div className="grid grid-cols-[1fr,auto,auto] gap-2">
                                <CardAddTags
                                    card={card}
                                    headline={
                                        t(
                                            'components.AddCard.modal.AddCardModal.tagsHeadline'
                                        ) ?? ''
                                    }
                                    updateTags={(tags: Tag[]) => {
                                        updateTags(tags);
                                    }}
                                ></CardAddTags>
                                <CardAddEstimation
                                    headline={
                                        t(
                                            'components.AddCard.modal.AddCardModal.estimationHeadline'
                                        ) ?? ''
                                    }
                                    card={card}
                                    updateEstimation={(shirt: Shirt) => {
                                        updateEstimation(shirt);
                                    }}
                                ></CardAddEstimation>
                                <CardAddDueDate
                                    headline={
                                        t(
                                            'components.AddCard.modal.AddCardModal.dueDateHeadline'
                                        ) ?? ''
                                    }
                                    card={card}
                                    updateTags={(tags: Tag[]) => {
                                        updateLowerTags(tags);
                                    }}
                                ></CardAddDueDate>
                            </div>
                        </div>
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-2 pb-2 rounded-b">
                        <button
                            className="button p-2 py-1.5 hover:text-red-500 soft"
                            type="button"
                            data-testid="addcard-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ??
                                t(
                                    'components.AddCard.modal.AddCardModal.cancel'
                                ) ??
                                ''}
                        </button>
                        <button
                            className="button primary-button p-2 py-1.5 soft"
                            type="button"
                            data-testid="addcard-modal-button"
                            onClick={() => {
                                saveCard();
                                closeModal();
                            }}
                        >
                            {submitButtonText ??
                                t(
                                    'components.AddCard.modal.AddCardModal.submit'
                                ) ??
                                ''}
                        </button>
                    </div>
                </div>
                <div className="min-w-[20vw]">
                    <div className="text-white text-xl mb-3">
                        {t('components.AddCard.modal.AddCardModal.newTask')}
                    </div>
                    <CardComponent
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        upperTags={card.upperTags}
                        tasks={card.tasks}
                        shirt={card.shirt}
                        lowerTags={card.lowerTags}
                        inEditMode={true}
                        onRemoveTag={(tag: Tag) => {
                            handleOnRemoveTag(tag);
                        }}
                        onRemoveTask={(task: Task) => {
                            handleOnRemoveTask(task);
                        }}
                        onUpdateTasks={(tasks: Task[]) => {
                            updateTasks(tasks);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
