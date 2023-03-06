import { useRef, useState } from 'react';
import { addSVG } from '../../../assets/svgs/add.svg';
import { trashSVG } from '../../../assets/svgs/trash.svg';
import { uncheckedSVG } from '../../../assets/svgs/unchecked.svg';
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
    const taskTitle = useRef('');
    const [title, setTitle] = useState('');

    const handleAddNewTask = () => {
        if (card.tasks == null) card.tasks = [];
        const newTask: Task = {
            id: card.tasks?.length + 1,
            description: taskTitle.current,
        };
        updateTasks([...card.tasks, newTask]);
        setTitle('');
    };

    const handleRemoveTask = (task: Task) => {
        if (card.tasks === null) return;
        updateTasks(card.tasks?.filter((t) => t.id !== task.id) ?? []);
    };

    const handleSubtaskTitleChanges = (title: string) => {
        setTitle(title);
        taskTitle.current = title;
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="text-sm text-[#5E5E5E]">
                <div className="font-bold">{headline}</div>
                <p>{explanation}</p>
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
            {card.tasks?.map((t, index) => {
                return (
                    <div
                        key={index}
                        className="border-b border-solid py-2 text-sm grid grid-cols-[auto,1fr,auto] gap-2 items-center"
                    >
                        <div>{uncheckedSVG}</div>
                        <div>{t.description}</div>
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-lg focus:shadow-outline hover:bg-pink-800"
                            onClick={() => {
                                handleRemoveTask(t);
                            }}
                            title="Remove task from list."
                        >
                            {trashSVG}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
