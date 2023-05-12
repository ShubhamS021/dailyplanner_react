import { t } from 'i18next';
import { useContext } from 'react';
import { editSVG } from '../../assets/svgs/edit.svg';
import { routeSVG } from '../../assets/svgs/route.svg';
import { trashSVG } from '../../assets/svgs/trash.svg';
import { BoardContext } from '../../context/BoardContext';
import { type Tag } from '../../interfaces/Tag';
import { type Task } from '../../interfaces/Task';
import { TagComponent } from '../Tag/Tag';
import { TaskComponent } from '../Task/Task';

export interface CardProps {
    id: number;
    title: string;
    description?: string;
    upperTags?: Tag[];
    lowerTags?: Tag[];
    tasks?: Task[];
    inEditMode?: boolean;
    onRemoveCard?: () => void;
    onEditCard?: () => void;
    onMoveCard?: () => void;
    onRemoveTag?: (tag: Tag) => void;
    onRemoveTask?: (task: Task) => void;
}

export const CardComponent: React.FC<CardProps> = ({
    id,
    title,
    description,
    upperTags,
    lowerTags,
    tasks,
    inEditMode = false,
    onRemoveCard,
    onEditCard,
    onMoveCard,
    onRemoveTag,
    onRemoveTask,
}) => {
    if (title === '') throw new Error('no title set');
    const { updateTask, compactMode } = useContext(BoardContext);

    const renderTags = (tags: Tag[] | undefined) => {
        if (tags === undefined) return;
        return (
            <>
                <div className="flex gap-1" data-testid="card-tags">
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

    const renderTasks = () => {
        if (tasks === undefined) return;
        if (compactMode) return;
        return (
            <>
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
            </>
        );
    };

    const renderDescription = () => {
        if (description === '') return;
        if (compactMode) return;
        return (
            <p
                className="text-sm text-[#5A5A65]"
                data-testid="card-description"
            >
                {description}
            </p>
        );
    };

    return (
        <div
            className="group bg-white border border-solid rounded-lg border-[#DDDDDD] p-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
            data-testid={`card-${id}`}
        >
            <div className="flex flex-col gap-2 items-start w-full">
                <div>{renderTags(upperTags)}</div>
                <div className="grid grid-cols-[1fr,auto] w-full">
                    <h3
                        className="font-semibold text-base"
                        data-testid="card-title"
                    >
                        {title}
                    </h3>
                    {!inEditMode && (
                        <div
                            className="invisible group-hover:visible flex gap-1"
                            data-testid={`card-${id}-actions`}
                        >
                            <button
                                className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline"
                                onClick={() => {
                                    if (onMoveCard != null) {
                                        onMoveCard();
                                    }
                                }}
                                title={t('components.Card.move') ?? ''}
                                data-testid="move-card-button"
                            >
                                {routeSVG}
                            </button>
                            <button
                                className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline"
                                onClick={() => {
                                    if (onEditCard != null) {
                                        onEditCard();
                                    }
                                }}
                                title={t('components.Card.edit') ?? ''}
                                data-testid="edit-card-button"
                            >
                                {editSVG}
                            </button>

                            <button
                                className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline hover:bg-pink-600"
                                onClick={() => {
                                    if (onRemoveCard != null) {
                                        onRemoveCard();
                                    }
                                }}
                                title={t('components.Card.remove') ?? ''}
                                data-testid="remove-card-button"
                            >
                                {trashSVG}
                            </button>
                        </div>
                    )}
                </div>

                {renderDescription()}
                {renderTasks()}
                {renderTags(lowerTags)}
            </div>
        </div>
    );
};
