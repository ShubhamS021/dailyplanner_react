import { useContext, useRef, useState } from 'react';
import { addSVG } from '../../../assets/svgs/add.svg';
import { editSVG } from '../../../assets/svgs/edit.svg';
import { saveSVG } from '../../../assets/svgs/save.svg';
import { trashSVG } from '../../../assets/svgs/trash.svg';
import { uncheckedSVG } from '../../../assets/svgs/unchecked.svg';
import { BoardContext } from '../../../context/BoardContext';
import { type Card } from '../../../interfaces/Card';
import type Task from '../../../interfaces/Task';

export interface AddCardSubtaskProps {
    headline: string;
    explanation: string;
    card: Card;
    updateTasks: (tasks: Task[]) => void;
}

export const AddCardSubtasks: React.FC<AddCardSubtaskProps> = ({
    headline,
    explanation,
    card,
    updateTasks,
}) => {
    const initialEditTask: Task = {
        id: -1,
        description: '',
    };

    const { findLastTaskIdInSpecificCard } = useContext(BoardContext);
    const taskTitle = useRef('');
    const [title, setTitle] = useState('');
    const [taskEditTitle, setTaskEditTitle] = useState('');
    const [taskEdit, setTaskEdit] = useState(initialEditTask);

    const handleAddNewTask = () => {
        if (card.tasks == null) card.tasks = [];
        const newTask: Task = {
            id: findLastTaskIdInSpecificCard(card) + 1,
            description: taskTitle.current,
            fulfilled: false,
        };
        updateTasks([...card.tasks, newTask]);
        setTitle('');
    };

    const handleEditTaskSubmit = (task: Task) => {
        if (card.tasks == null) card.tasks = [];
        task.description = taskEditTitle;
        updateTasks([...card.tasks.filter((t) => t.id !== task.id), task]);
        setTaskEdit(initialEditTask);
    };

    const handleEditTask = (task: Task) => {
        setTaskEditTitle(task.description);
        setTaskEdit(task);
    };

    const handleRemoveTask = (task: Task) => {
        if (card.tasks === null) return;
        updateTasks(card.tasks?.filter((t) => t.id !== task.id) ?? []);
    };

    const handleSubtaskTitleChanges = (title: string) => {
        setTitle(title);
        taskTitle.current = title;
    };

    const handleSubtaskEditTitleChanges = (title: string) => {
        setTaskEditTitle(title);
    };

    const isTaskInEditMode = (task: Task) => {
        return task === taskEdit;
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="text-sm text-[#5E5E5E]">
                <div className="font-bold" data-testid="addcardtasks-headline">
                    {headline}
                </div>
                <p data-testid="addcardtasks-explanation">{explanation}</p>
            </div>
            <div className="grid grid-cols-[1fr,auto] gap-2">
                <div className="border border-[#f5f4f4] p-2 rounded-lg flex gap-2 items-center">
                    {uncheckedSVG}
                    <input
                        placeholder={'Define a subtask.'}
                        className="focus:outline-none text-sm w-full"
                        data-testid="addcard-subtask-input"
                        value={title}
                        onChange={(e) => {
                            handleSubtaskTitleChanges(e.target.value);
                        }}
                    ></input>
                </div>
                <button
                    className="bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white font-semibold"
                    data-testid="addcard-subtask-button"
                    onClick={(_e) => {
                        handleAddNewTask();
                    }}
                >
                    <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] hover:stroke-white">
                        {addSVG}
                        <p className="font-semibold text-sm">Add subtask</p>
                    </div>
                </button>
            </div>
            <div className="max-h-44 overflow-auto">
                {card.tasks?.map((t, index) => {
                    return (
                        <div
                            key={index}
                            className={`group border-b border-solid py-2 text-sm grid grid-cols-[auto,1fr,auto] gap-2 items-center`}
                        >
                            <div className="ml-1">{uncheckedSVG}</div>
                            {isTaskInEditMode(t) && (
                                <>
                                    <input
                                        className="focus:outline-none text-sm w-full border border-[#f5f4f4] p-2 rounded-lg"
                                        data-testid="addcard-subtask-edit-input"
                                        value={taskEditTitle}
                                        onChange={(e) => {
                                            handleSubtaskEditTitleChanges(
                                                e.target.value
                                            );
                                        }}
                                    ></input>
                                </>
                            )}
                            {!isTaskInEditMode(t) && <div>{t.description}</div>}
                            <div className="invisible group-hover:visible flex gap-2">
                                {!isTaskInEditMode(t) && (
                                    <>
                                        <button
                                            className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline"
                                            onClick={() => {
                                                handleEditTask(t);
                                            }}
                                            title="Edit this task."
                                            data-testid="addcard-subtask-edit-button"
                                        >
                                            {editSVG}
                                        </button>

                                        <button
                                            className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline hover:bg-pink-600"
                                            onClick={() => {
                                                handleRemoveTask(t);
                                            }}
                                            title="Remove this task."
                                            data-testid="addcard-subtask-delete-button"
                                        >
                                            {trashSVG}
                                        </button>
                                    </>
                                )}
                                {isTaskInEditMode(t) && (
                                    <>
                                        <button
                                            className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline"
                                            onClick={() => {
                                                handleEditTaskSubmit(t);
                                            }}
                                            title="Save this task."
                                            data-testid="addcard-subtask-edit-submit-button"
                                        >
                                            {saveSVG}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
