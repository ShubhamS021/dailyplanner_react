import { trashSVG } from '../../assets/svgs/trash.svg';
import { type Tag } from '../../interfaces/Tag';
import { type Task } from '../../interfaces/Task';
import { TagComponent } from '../Tag/Tag';
import { TaskComponent } from '../Task/Task';

export interface CardProps {
    title: string;
    description?: string;
    upperTags?: Tag[];
    lowerTags?: Tag[];
    tasks?: Task[];
    onRemoveTask: () => void;
}

export const CardComponent: React.FC<CardProps> = ({
    title,
    description,
    upperTags,
    lowerTags,
    tasks,
    onRemoveTask,
}) => {
    if (title === '') throw new Error('no title set');

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
                    <div className="invisible group-hover:visible">
                        <button
                            className="inline-flex items-center justify-center w-6 h-6 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-lg focus:shadow-outline hover:bg-pink-800"
                            onClick={() => {
                                onRemoveTask();
                            }}
                            title="Remove task from list."
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
