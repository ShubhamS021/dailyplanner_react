import { type Card } from 'interfaces/Card';
import { CardComponent } from '../Card/Card';
import { LabelComponent } from '../Label/Label';

export interface LaneProps {
    id: number;
    color: string;
    text: string;
    cards?: Card[];
}

export const LaneComponent: React.FC<LaneProps> = ({
    id,
    color,
    text,
    cards,
}) => {
    const renderEmptyLane = () => {
        return (
            <>
                <CardComponent title="---" />
            </>
        );
    };

    const renderCards = (cards: Card[] | undefined) => {
        if (cards === undefined || cards.length === 0) return renderEmptyLane();
        return (
            <>
                {cards.map((c) => (
                    <CardComponent
                        key={`lane-${id}-card-${c.id}`}
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
        <div className="flex flex-col gap-2" data-testid="lane">
            <div className="w-fit">
                <LabelComponent color={color} text={text} />
            </div>
            {renderCards(cards)}
        </div>
    );
};
