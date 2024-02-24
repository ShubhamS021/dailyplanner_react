import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import Task from '@/interfaces/Task';
import { TaskComponent } from '@/ui/task';

export interface CardTasksProps {
    cardId: number;
    tasks: Task[];
    editMode?: boolean;
    onRemoveTask?: (task: Task) => void;
    onUpdateTasks?: (tasks: Task[]) => void;
}

export const CardTasks: React.FC<CardTasksProps> = ({
    cardId,
    tasks,
    editMode,
    onRemoveTask,
}) => {
    const [updateTask] = useBoardStore((state) => [state.updateTask]);

    return (
        <div
            data-testid={editMode === true ? 'card-edit-tasks' : 'card-tasks'}
            className="w-full"
        >
            {tasks.map((t) => (
                <TaskComponent
                    key={t.id}
                    description={t.description}
                    fulfilled={t.fulfilled}
                    isRemoveable={editMode}
                    onFulfillTask={(fulfilled: boolean) => {
                        if (editMode === false) {
                            updateTask(cardId, t.id, fulfilled);
                        }
                    }}
                    onRemove={() => {
                        if (onRemoveTask != null) {
                            onRemoveTask(t);
                        }
                    }}
                />
            ))}
        </div>
    );
};
