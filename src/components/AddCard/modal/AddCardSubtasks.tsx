import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Card } from '@/interfaces/Card';
import type Task from '@/interfaces/Task';
import { findLastTaskIdInCard } from '@/hooks/useBoardStore/util/board.util';
import { UncheckedIcon } from '@/ui/Icons/Icons';

export interface AddCardSubtaskProps {
    headline: string;
    card: Card;
    updateTasks: (tasks: Task[]) => void;
}

export const AddCardSubtasks: React.FC<AddCardSubtaskProps> = ({
    headline,
    card,
    updateTasks,
}) => {
    const taskTitle = useRef('');
    const [title, setTitle] = useState('');
    const { t } = useTranslation();

    const handleAddNewTask = () => {
        if (card.tasks == null) card.tasks = [];
        const newTask: Task = {
            id: findLastTaskIdInCard(card) + 1,
            description: taskTitle.current,
            fulfilled: false,
        };
        updateTasks([...card.tasks, newTask]);
        setTitle('');
    };

    const handleSubtaskTitleChanges = (title: string) => {
        setTitle(title);
        taskTitle.current = title;
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="field-caption">
                <div className="font-bold" data-testid="addcardtasks-headline">
                    {headline}
                </div>
            </div>
            <div className="grid grid-cols-[1fr,auto] gap-2">
                <div className="formField p-2 flex gap-2 items-center">
                    <input
                        placeholder={
                            t(
                                'components.AddCard.modal.AddCardSubtasks.define'
                            ) ?? ''
                        }
                        className="focus:outline-none text-sm w-full"
                        data-testid="addcard-subtask-input"
                        value={title}
                        onChange={(e) => {
                            handleSubtaskTitleChanges(e.target.value);
                        }}
                    ></input>
                </div>
                <button
                    className="button"
                    data-testid="addcard-subtask-button"
                    onClick={(_e) => {
                        handleAddNewTask();
                    }}
                    disabled={title === ''}
                >
                    <div className="flex gap-2 items-center p-2">
                        <UncheckedIcon
                            viewBox={{ x: 0, y: 0, width: 18, height: 18 }}
                        />
                        <p className="font-semibold text-sm">
                            {t(
                                'components.AddCard.modal.AddCardSubtasks.add'
                            ) ?? ''}
                        </p>
                    </div>
                </button>
            </div>
            <div
                className="max-h-44 overflow-auto"
                data-testid="addcard-subtask-tasks"
            ></div>
        </div>
    );
};
