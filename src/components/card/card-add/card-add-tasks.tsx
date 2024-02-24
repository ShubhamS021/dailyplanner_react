import { findLastTaskIdInCard } from '@/hooks/useBoardStore/util/board.util';
import { type Card } from '@/interfaces/Card';
import type Task from '@/interfaces/Task';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface CardAddTasksProps {
    headline: string;
    card: Card;
    updateTasks: (tasks: Task[]) => void;
}

export const CardAddTasks: React.FC<CardAddTasksProps> = ({
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
            <Label data-testid="addcardtasks-headline">{headline}</Label>
            <div className="flex gap-2">
                <Input
                    placeholder={
                        t('components.AddCard.modal.AddCardSubtasks.define') ??
                        ''
                    }
                    data-testid="addcard-subtask-input"
                    value={title}
                    onChange={(e) => {
                        handleSubtaskTitleChanges(e.target.value);
                    }}
                ></Input>
                <Button
                    data-testid="addcard-subtask-button"
                    onClick={(_e) => {
                        handleAddNewTask();
                    }}
                    disabled={title === ''}
                    size={'sm'}
                >
                    {t('components.AddCard.modal.AddCardSubtasks.add') ?? ''}
                </Button>
            </div>
        </div>
    );
};
