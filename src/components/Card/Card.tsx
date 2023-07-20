import { t } from 'i18next';
import {
    DragDropContext,
    Draggable,
    Droppable,
    type DropResult,
} from 'react-beautiful-dnd';
import { type Tag } from '../../interfaces/Tag';
import { type Task } from '../../interfaces/Task';
import { type Shirt } from '../../types/Shirt';
import { TagComponent } from '../Tag/Tag';
import { TaskComponent } from '../Task/Task';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import { EditIcon, RouteIcon, TrashIcon } from 'ui/Icons/Icons';

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
    const [boards, compactMode, updateTask] = useBoardStore(
        (state) => [state.boards, state.compactMode, state.updateTask],
        shallow
    );

    const renderTags = (tags: Tag[] | undefined) => {
        if (tags === undefined) return;
        return (
            <>
                <div
                    className="flex gap-1 wrap w-full"
                    data-testid={inEditMode ? 'card-edit-tags' : 'card-tags'}
                >
                    {tags.map((t) => (
                        <TagComponent
                            key={t.id}
                            color={t.color}
                            text={t.text}
                            isRemoveable={inEditMode}
                            onRemove={() => {
                                if (onRemoveTag != null) {
                                    onRemoveTag(t);
                                }
                            }}
                        />
                    ))}
                </div>
            </>
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
            <div
                data-testid={inEditMode ? 'card-edit-tasks' : 'card-tasks'}
                className="w-full"
            >
                {tasks.map((t) => (
                    <TaskComponent
                        key={t.id}
                        description={t.description}
                        fulfilled={t.fulfilled}
                        isRemoveable={inEditMode}
                        onFulfillTask={(fulfilled: boolean) => {
                            if (!inEditMode) {
                                updateTask(id, t.id, fulfilled);
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
        if (compactMode) return;
        return (
            <div
                className="text-[11px] text-gray-400 "
                data-testid="card-estimation"
            >
                {shirt ?? 'S'}
            </div>
        );
    };

    const renderCardActions = () => {
        return (
            <div
                className="invisible group-hover:visible flex gap-1"
                data-testid={`card-${id}-actions`}
            >
                <button
                    className="small-button"
                    onClick={() => {
                        if (onMoveCard != null) {
                            onMoveCard();
                        }
                    }}
                    title={t('components.Card.move') ?? ''}
                    data-testid="move-card-button"
                    disabled={boards.length < 2}
                >
                    <RouteIcon />
                </button>
                <button
                    className="small-button"
                    onClick={() => {
                        if (onEditCard != null) {
                            onEditCard();
                        }
                    }}
                    title={t('components.Card.edit') ?? ''}
                    data-testid="edit-card-button"
                >
                    <EditIcon />
                </button>

                <button
                    className="small-button hover:bg-pink-600"
                    onClick={() => {
                        if (onRemoveCard != null) {
                            onRemoveCard();
                        }
                    }}
                    title={t('components.Card.remove') ?? ''}
                    data-testid="remove-card-button"
                >
                    <TrashIcon />
                </button>
            </div>
        );
    };

    return (
        <div className="group card" data-testid={`card-${id}`}>
            <div className="flex flex-col gap-2 items-start w-full">
                {renderTags(upperTags)}
                <div className="grid grid-cols-[1fr,auto] w-full">
                    <h3
                        className="font-semibold text-base dark:text-white"
                        data-testid="card-title"
                    >
                        {title}
                    </h3>
                </div>

                {renderDescription()}
                {inEditMode && renderTasksDraggable()}
                {!inEditMode && renderTasks()}
                {renderTags(lowerTags)}
                <div className="grid grid-cols-[1fr,auto] w-full items-center">
                    {!inEditMode && renderCardActions()}
                    {renderEstimation()}
                </div>
            </div>
        </div>
    );
};
