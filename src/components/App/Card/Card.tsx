import { type Tag } from 'interfaces/Tag';
import { type Task } from 'interfaces/Task';
import { colors } from '../../../theme/colors';
import { TagComponent } from '../Tag/Tag';
import { TaskComponent } from '../Task/Task';

export interface CardProps {
    title: string;
    description?: string;
}

const upperTags: Tag[] = [
    { id: 1, text: 'Tag A', color: colors.rose },
    { id: 2, text: 'Tag B', color: colors.green },
];

const lowerTags: Tag[] = [
    { id: 1, text: 'Tag C', color: colors.rose },
    { id: 2, text: 'Tag D', color: colors.green },
];

const tasks: Task[] = [
    { id: 1, description: 'Task 1', fulfilled: false },
    { id: 2, description: 'Task 2', fulfilled: true },
    { id: 3, description: 'Task 3', fulfilled: false },
];

export const renderTags = (tags: Tag[]) => {
    return (
        <>
            <div className="flex gap-1">
                {tags.map((t) => (
                    <TagComponent key={t.id} color={t.color} text={t.text} />
                ))}
            </div>
        </>
    );
};

export const renderTasks = (tasks: Task[]) => {
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

export const CardComponent = (props: CardProps) => {
    if (props.title === '') throw new Error('no title set');

    return (
        <div className="bg-white border border-solid rounded-lg border-[#DDDDDD] p-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-2 items-start">
                {upperTags.length > 0 && renderTags(upperTags)}
                <h3 className="font-semibold text-base">{props.title}</h3>
                {props.description !== '' && (
                    <p className="text-sm text-[#5A5A65]">
                        {props.description}
                    </p>
                )}
                {tasks.length > 0 && renderTasks(tasks)}
                {lowerTags.length > 0 && renderTags(lowerTags)}
            </div>
        </div>
    );
};
