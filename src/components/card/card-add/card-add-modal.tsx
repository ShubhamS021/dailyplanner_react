import { CardComponent } from '@/components/card/card';
import PageTitle from '@/components/common/page-title/page-title';
import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import type Task from '@/interfaces/Task';
import { type Shirt } from '@/types/Shirt';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { Cross1Icon } from '@radix-ui/react-icons';
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
            <div className="flex gap-6">
                {/* content */}
                <div className="modal-content">
                    {/* header */}
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] items-center gap-2">
                        <PageTitle
                            title={t(
                                'components.AddCard.modal.AddCardModal.descriptionHeadline'
                            )}
                        ></PageTitle>
                        <div>
                            <Button
                                size={'icon'}
                                variant={'ghost'}
                                data-testid="confirmation-modal-close-button"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                <Cross1Icon />
                            </Button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 grid grid-cols-[1fr,auto,1fr] gap-2">
                        <div className="flex flex-col gap-2">
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

                            <div className="grid grid-cols-[1fr,auto,auto] gap-2"></div>
                        </div>
                        <Separator orientation="vertical" className="mx-4" />
                        <div className="flex flex-col gap-3">
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
                            <Separator />
                            <div className="w-full flex space-between gap-3">
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
                        <Button
                            size={'sm'}
                            variant={'outline'}
                            data-testid="addcard-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ?? 'Cancel'}
                        </Button>
                        <Button
                            size={'sm'}
                            data-testid="addcard-modal-button"
                            onClick={() => {
                                saveCard();
                                closeModal();
                            }}
                        >
                            {submitButtonText ?? 'Ok'}
                        </Button>
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
