import { colors } from 'theme/colors';
import { type Card } from '../../../interfaces/Card';
import { CardComponent } from '../Card/Card';
import { LabelComponent } from '../Label/Label';

export interface LaneProps {
    color: string;
    text: string;
}

export const LaneComponent = (props: LaneProps) => {
    const cards: Card[] = [
        {
            id: 1,
            title: 'Working title',
            description: 'Some text',
            upperTags: [
                { id: 1, text: 'Tag A', color: colors.rose },
                { id: 2, text: 'Tag B', color: colors.green },
            ],
            lowerTags: [
                { id: 1, text: 'Tag C', color: colors.rose },
                { id: 2, text: 'Tag D', color: colors.green },
            ],
            tasks: [
                { id: 1, description: 'Task 1' },
                { id: 2, description: 'Task 2' },
            ],
        },
    ];

    const renderCards = (cards: Card[] | undefined) => {
        if (cards === undefined) return;
        return (
            <>
                {cards.map((c, index) => (
                    <CardComponent
                        key={index}
                        title={c.title}
                        description={c.description}
                        upperTags={c.upperTags}
                        tasks={c.tasks}
                        lowerTags={c.lowerTags}
                    />
                ))}
            </>
        );
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="w-fit">
                <LabelComponent color={props.color} text={props.text} />
            </div>
            {renderCards(cards)}
        </div>
    );
};
