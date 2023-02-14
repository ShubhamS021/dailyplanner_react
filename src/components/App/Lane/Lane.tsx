import { type Card } from '../../../interfaces/Card';
import { CardComponent } from '../Card/Card';
import { LabelComponent } from '../Label/Label';

export interface LaneProps {
    color: string;
    text: string;
    cards?: Card[];
}

export const LaneComponent: React.FC<LaneProps> = ({ color, text, cards }) => {
    const renderEmptyLane = () => {
        return (
            <>
                <CardComponent title="Nothing in here..." />
            </>
        );
    };

    const renderCards = (cards: Card[] | undefined) => {
        if (cards === undefined) return renderEmptyLane();
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
                <LabelComponent color={color} text={text} />
            </div>
            {renderCards(cards)}
        </div>
    );
};
