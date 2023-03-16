import { useRef, useState } from 'react';
import { closeSVG } from '../../../assets/svgs/close.svg';
import { editSVG } from '../../../assets/svgs/edit.svg';
import { infoCircleSVG } from '../../../assets/svgs/infoCircle.svg';
import { saveSVG } from '../../../assets/svgs/save.svg';
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
    const [editTitle, setEditTitle] = useState(false);
    const title = useRef(card.title);

    return (
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            data-testid="addcard-modal"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* header */}
                    <div className=" group px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] gap-2 ">
                        <div className="flex gap-2">
                            {infoCircleSVG}
                            {editTitle && (
                                <>
                                    <input
                                        className="focus:outline-none text-sm w-full border border-[#f5f4f4] p-2 rounded-lg"
                                        data-testid="addcard-title-edit-input"
                                        placeholder={title.current}
                                        onChange={(e) => {
                                            title.current = e.target.value;
                                        }}
                                    ></input>
                                    <button
                                        className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline"
                                        onClick={() => {
                                            updateTitle(title.current);
                                            setEditTitle(false);
                                        }}
                                        title="Save this task."
                                        data-testid="addcard-title-edit-submit-button"
                                    >
                                        {saveSVG}
                                    </button>
                                </>
                            )}
                            {!editTitle && (
                                <div className="w-full grid grid-cols-[1fr,auto]">
                                    <h3
                                        className="text-base font-semibold"
                                        data-testid="addcard-modal-title"
                                    >
                                        {card.title}
                                    </h3>
                                    <button
                                        className="invisible group-hover:visible inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline"
                                        onClick={() => {
                                            setEditTitle(true);
                                        }}
                                        title="Edit this task."
                                        data-testid="addcard-title-edit-button"
                                    >
                                        {editSVG}
                                    </button>
                                </div>
                            )}
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
                        <AddCardDueDate
                            headline={'Add due date'}
                            explanation={'Define a due date for this task.'}
                            card={card}
                            updateTags={(tags: Tag[]) => {
                                updateLowerTags(tags);
                            }}
                        ></AddCardDueDate>
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
                            {cancelButtonText ?? 'Cancel'}
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
                            {submitButtonText ?? 'Add task'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
