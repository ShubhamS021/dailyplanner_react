import { useTranslation } from 'react-i18next';
import { closeSVG } from '../../../assets/svgs/close.svg';
import { type Card } from '../../../interfaces/Card';
import type Tag from '../../../interfaces/Tag';
import type Task from '../../../interfaces/Task';
import { AddCardDescription } from './AddCardDescription';
import { AddCardDueDate } from './AddCardDueDate';
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
    updateLowerTags,
    closeModal,
    saveCard,
}) => {
    const { t } = useTranslation();

    return (
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            data-testid="addcard-modal"
        >
            <div className="min-w-[30vw] relative w-auto my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* header */}
                    <div className=" group px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] gap-2 ">
                        <div className="flex gap-2">
                            <h3
                                className="text-base font-semibold"
                                data-testid="addcard-modal-title"
                            >
                                New Task
                            </h3>
                        </div>
                        <div>
                            <button
                                data-testid="addcard-modal-close-button"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                {closeSVG}
                            </button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="p-5">
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
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
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
            </div>
        </div>
    );
};
