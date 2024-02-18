import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { type Tag } from '@/interfaces/Tag';
import { type Task } from '@/interfaces/Task';
import { type Shirt } from '@/types/Shirt';
import { Badge } from '@/ui/badge';
import { Label } from '@/ui/label';
import { TaskComponent } from '@/ui/task';
import {
    DragDropContext,
    Draggable,
    Droppable,
    type DropResult,
} from 'react-beautiful-dnd';
import { CardActions } from './card-actions/card-actions';
import { CardTags } from './card-tags/card-tags';
import { CardTasks } from './card-tasks/card-tasks';

export interface CardProps {
    id: number;
    title: string;
    description?: string;
    upperTags?: Tag[];
    lowerTags?: Tag[];
    tasks?: Task[];
    shirt: Shirt;
    inEditMode?: boolean;
    onRemoveCard?: () => void;
    onEditCard?: () => void;
    onMoveCard?: () => void;
    onRemoveTag?: (tag: Tag) => void;
    onRemoveTask?: (task: Task) => void;
    onUpdateTasks?: (tasks: Task[]) => void;
}

export const CardComponent: React.FC<CardProps> = ({
    id,
    title,
    description,
    upperTags,
    lowerTags,
    tasks,
    shirt,
    inEditMode = false,
    onRemoveCard,
    onEditCard,
    onMoveCard,
    onRemoveTag,
    onRemoveTask,
    onUpdateTasks,
}) => {
    const [compactMode, updateTask] = useBoardStore((state) => [
        state.compactMode,
        state.updateTask,
    ]);

    const renderTags = (tags: Tag[] | undefined) => {
        if (tags === undefined) return;
        return (
            <CardTags
                editMode={inEditMode}
                tags={tags}
                onRemoveTag={onRemoveTag}
            />
        );
    };

    const reorder = (list: Task[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: DropResult) => {
        // no tasks to drag..
        if (tasks == null || tasks === undefined) {
            return;
        }

        // dropped outside the list
        if (result.destination == null) {
            return;
        }

        const reorderedTasks = reorder(
            tasks,
            result.source.index,
            result.destination.index
        );

        if (reorderedTasks == null) {
            return;
        }

        if (onUpdateTasks != null) {
            onUpdateTasks(reorderedTasks);
        }
    };

    const renderTasksDraggable = () => {
        if (tasks === undefined) return;
        if (compactMode) return;
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(droppableProvided, _droppableSnapshot) => (
                        <div
                            data-testid={
                                inEditMode ? 'card-edit-tasks' : 'card-tasks'
                            }
                            className="w-full"
                            ref={droppableProvided.innerRef}
                        >
                            {tasks.map((t, index) => (
                                <Draggable
                                    key={t.id}
                                    draggableId={`card-${id}-task-${t.id}`}
                                    index={index}
                                >
                                    {(
                                        draggableProvided,
                                        _draggableSnapshot
                                    ) => (
                                        <div
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                        >
                                            <TaskComponent
                                                key={t.id}
                                                description={t.description}
                                                fulfilled={t.fulfilled}
                                                isRemoveable={inEditMode}
                                                onFulfillTask={(
                                                    fulfilled: boolean
                                                ) => {
                                                    if (!inEditMode) {
                                                        updateTask(
                                                            id,
                                                            t.id,
                                                            fulfilled
                                                        );
                                                    }
                                                }}
                                                onRemove={() => {
                                                    if (onRemoveTask != null) {
                                                        onRemoveTask(t);
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

    const renderTasks = () => {
        if (tasks === undefined) return;
        if (compactMode) return;
        return (
            <CardTasks
                cardId={id}
                editMode={inEditMode}
                tasks={tasks}
                onRemoveTask={onRemoveTask}
                onUpdateTasks={onUpdateTasks}
            />
        );
    };

    const renderDescription = () => {
        if (description === '') return;
        if (compactMode) return;
        return (
            <p
                className="text-sm text-[#5A5A65] dark:text-[#B8B8B8]"
                data-testid="card-description"
            >
                {description}
            </p>
        );
    };

    const renderEstimation = () => {
        return (
            <Badge
                variant={'light_grey'}
                size={'xs'}
                data-testid="card-estimation"
            >
                {shirt ?? 'S'}
            </Badge>
        );
    };

    const renderCardActions = () => {
        return (
            <div
                className="invisible group-hover:visible flex gap-1"
                data-testid={`card-${id}-actions`}
            >
                <CardActions
                    onEditCard={() => {
                        if (onEditCard != null) {
                            onEditCard();
                        }
                    }}
                    onMoveCard={() => {
                        if (onMoveCard != null) {
                            onMoveCard();
                        }
                    }}
                    onRemoveCard={() => {
                        if (onRemoveCard != null) {
                            onRemoveCard();
                        }
                    }}
                />
            </div>
        );
    };

    return (
        <div className="group card" data-testid={`card-${id}`}>
            <div className="flex flex-col gap-2 items-start w-full">
                <div className="w-full grid grid-cols-[1fr,auto] gap-1">
                    <div className="flex flex-col gap-2">
                        {renderTags(upperTags)}
                        <Label data-testid="card-title">{title}</Label>
                    </div>
                    {!inEditMode && renderCardActions()}
                </div>

                {renderDescription()}
                {inEditMode ? renderTasksDraggable() : renderTasks()}

                <div className="w-full grid grid-cols-[1fr,auto]">
                    {renderTags(lowerTags)}
                    {renderEstimation()}
                </div>
            </div>
        </div>
    );
};
