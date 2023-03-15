import { useContext } from 'react';
import { editSVG } from '../../assets/svgs/edit.svg';
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
    onRemoveCard: () => void;
    onEditCard: () => void;
}

export const CardComponent: React.FC<CardProps> = ({
    id,
    title,
    description,
    upperTags,
    lowerTags,
    tasks,
    onRemoveCard,
    onEditCard,
}) => {
    if (title === '') throw new Error('no title set');
    const boardContext = useContext(BoardContext);

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
                        />
                    ))}
                </div>
            </>
        );
    };

    const renderTasks = (tasks: Task[] | undefined) => {
        if (tasks === undefined) return;
        return (
            <>
                {tasks.map((t) => (
                    <TaskComponent
                        key={t.id}
                        description={t.description}
                        fulfilled={t.fulfilled}
                        onFulfillTask={(fulfilled: boolean) => {
                            boardContext.updateTask(id, t.id, fulfilled);
                        }}
                    />
                ))}
            </>
        );
    };

    return (
        <div
            className="group bg-white border border-solid rounded-lg border-[#DDDDDD] p-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
            data-testid="card"
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
                    <div className="invisible group-hover:visible flex gap-1">
                        <button
                            className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline"
                            onClick={() => {
                                onEditCard();
                            }}
                            title="Edit this card."
                            data-testid="edit-card-button"
                        >
                            {editSVG}
                        </button>

                        <button
                            className="inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline hover:bg-pink-600"
                            onClick={() => {
                                onRemoveCard();
                            }}
                            title="Remove this card."
                            data-testid="remove-card-button"
                        >
                            {trashSVG}
                        </button>
                    </div>
                </div>

                {description !== '' && (
                    <p
                        className="text-sm text-[#5A5A65]"
                        data-testid="card-description"
                    >
                        {description}
                    </p>
                )}
                {renderTasks(tasks)}
                {renderTags(lowerTags)}
            </div>
        </div>
    );
};
