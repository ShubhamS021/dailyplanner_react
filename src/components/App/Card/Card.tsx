import { type Tag } from 'interfaces/Tag';
import { type Task } from 'interfaces/Task';
import { TagComponent } from '../Tag/Tag';
import { TaskComponent } from '../Task/Task';

export interface CardProps {
    title: string;
    description?: string;
    upperTags?: Tag[];
    lowerTags?: Tag[];
    tasks?: Task[];
}

export const CardComponent: React.FC<CardProps> = ({
    title,
    description,
    upperTags,
    lowerTags,
    tasks,
}) => {
    if (title === '') throw new Error('no title set');

    const renderTags = (tags: Tag[] | undefined) => {
        if (tags === undefined) return;
        return (
            <>
                <div className="flex gap-1">
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
        <div className="bg-white border border-solid rounded-lg border-[#DDDDDD] p-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-2 items-start">
                {renderTags(upperTags)}
                <h3 className="font-semibold text-base">{title}</h3>
                {description !== '' && (
                    <p className="text-sm text-[#5A5A65]">{description}</p>
                )}
                {renderTasks(tasks)}
                {renderTags(lowerTags)}
            </div>
        </div>
    );
};
