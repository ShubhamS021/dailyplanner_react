import { colors } from '../../../theme/colors';
import { TagComponent } from '../Tag/Tag';

export interface Tag {
    id: number;
    text: string;
    color: string;
}

const upperTags: Tag[] = [
    { id: 1, text: 'Tag A', color: colors.rose },
    { id: 2, text: 'Tag B', color: colors.green },
];

const lowerTags: Tag[] = [
    { id: 1, text: 'Tag C', color: colors.rose },
    { id: 2, text: 'Tag D', color: colors.green },
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

export const CardComponent = () => {
    return (
        <div className="bg-white border border-solid rounded-lg border-[#DDDDDD] p-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-2 items-start">
                {renderTags(upperTags)}
                <h3 className="font-semibold text-base">Card title</h3>
                <p className="text-sm text-[#5A5A65]">
                    A description of a task.
                </p>
                {/* <Tasks /> */}
                {renderTags(lowerTags)}
            </div>
        </div>
    );
};
