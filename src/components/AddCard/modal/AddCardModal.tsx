import { useTranslation } from 'react-i18next';
import { CardComponent } from '../../../components/Card/Card';
import { type Card } from '../../../interfaces/Card';
import type Tag from '../../../interfaces/Tag';
import type Task from '../../../interfaces/Task';
import { type Shirt } from '../../../types/Shirt';
import { AddCardDescription } from './AddCardDescription';
import { AddCardDueDate } from './AddCardDueDate';
import { AddCardEstimation } from './AddCardEstimation';
import { AddCardSubtasks } from './AddCardSubtasks';
import { AddCardTags } from './AddCardTags';

export interface AddCardModalProps {
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

export const AddCardModal: React.FC<AddCardModalProps> = ({
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
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            data-testid="addcard-modal"
        >
            <div className="min-w-[80vw] relative w-auto mx-auto max-w-3xl flex gap-6">
                {/* content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* body */}
                    <div className="p-2">
                        <div className="relative flex flex-col gap-2 p-5 rounded-2xl bg-[#F8F8F8]">
                            <AddCardDescription
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
                            ></AddCardDescription>
                            <AddCardSubtasks
                                card={card}
                                updateTasks={(tasks: Task[]) => {
                                    updateTasks(tasks);
                                }}
                                headline={
                                    t(
                                        'components.AddCard.modal.AddCardModal.subtasksHeadline'
                                    ) ?? ''
                                }
                            ></AddCardSubtasks>
                            <div className="grid grid-cols-[1fr,auto,auto] gap-2">
                                <AddCardTags
                                    card={card}
                                    headline={
                                        t(
                                            'components.AddCard.modal.AddCardModal.tagsHeadline'
                                        ) ?? ''
                                    }
                                    updateTags={(tags: Tag[]) => {
                                        updateTags(tags);
                                    }}
                                ></AddCardTags>
                                <AddCardEstimation
                                    headline={
                                        t(
                                            'components.AddCard.modal.AddCardModal.estimationHeadline'
                                        ) ?? ''
                                    }
                                    card={card}
                                    updateEstimation={(shirt: Shirt) => {
                                        updateEstimation(shirt);
                                    }}
                                ></AddCardEstimation>
                                <AddCardDueDate
                                    headline={
                                        t(
                                            'components.AddCard.modal.AddCardModal.dueDateHeadline'
                                        ) ?? ''
                                    }
                                    card={card}
                                    updateTags={(tags: Tag[]) => {
                                        updateLowerTags(tags);
                                    }}
                                ></AddCardDueDate>
                            </div>
                        </div>
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-2 pb-2 rounded-b">
                        <button
                            className="bg-[#ECEEF8] text-black p-2 py-1.5 rounded-md font-semibold hover:text-red-500 ease-linear transition-all duration-150"
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
                            className="bg-[#17A2B8] text-white p-2 py-1.5 rounded-md font-semibold ease-linear transition-all duration-150"
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
