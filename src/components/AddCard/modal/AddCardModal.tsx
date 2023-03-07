import { closeSVG } from '../../../assets/svgs/close.svg';
import { infoCircleSVG } from '../../../assets/svgs/infoCircle.svg';
import { type Card } from '../../../interfaces/Card';
import type Tag from '../../../interfaces/Tag';
import type Task from '../../../interfaces/Task';
import { AddCardDescription } from './AddCardDescription';
import { AddCardSubtasks } from './AddCardSubtasks';
import { AddCardTags } from './AddCardTags';

export interface AddCardModalProps {
    card: Card;
    updateDescription: (description: string) => void;
    updateTasks: (tasks: Task[]) => void;
    updateTags: (tags: Tag[]) => void;
    closeModal: () => void;
    saveCard: () => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
    card,
    updateDescription,
    updateTasks,
    updateTags,
    closeModal,
    saveCard,
}) => {
    return (
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            data-testid="addcard-modal"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* header */}
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] gap-2">
                        <div className="flex gap-2">
                            {infoCircleSVG}
                            <h3
                                className="text-base font-semibold"
                                data-testid="addcard-modal-title"
                            >
                                {card.title}
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
                    <div className="relative px-6 flex flex-col gap-2">
                        <hr className="border-t-1 border-[#C4C4C4] max-h-[1px] my-4"></hr>
                        <AddCardDescription
                            headline={`What's your task?`}
                            explanation={
                                'Give a short description of the task you need to track.'
                            }
                            updateDescription={(description: string) => {
                                updateDescription(description);
                            }}
                        ></AddCardDescription>
                        <AddCardSubtasks
                            card={card}
                            updateTasks={(tasks: Task[]) => {
                                updateTasks(tasks);
                            }}
                            headline={'Subtasks'}
                            explanation={
                                'If your task has multiple steps, break it down into subtasks and list them here.'
                            }
                        ></AddCardSubtasks>
                        <AddCardTags
                            card={card}
                            headline={'Add Tags'}
                            explanation={
                                'Choose or define tags to your task to make it easier to find and group with other similar tasks.'
                            }
                            updateTags={(tags: Tag[]) => {
                                updateTags(tags);
                            }}
                        ></AddCardTags>
                        <hr className="border-t-1 border-[#C4C4C4] max-h-[1px] my-4"></hr>
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
                            Cancel
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
                            Add task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
