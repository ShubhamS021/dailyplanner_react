import { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BoardContext } from '../../context/BoardContext';
import { type Card } from '../../interfaces/Card';
import { CardComponent } from '../Card/Card';
import { Dropzone } from '../Dropzone/Dropzone';
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
    const boardContext = useContext(BoardContext);

    const renderEmptyLane = () => {
        return <Dropzone text="Place tasks here.." />;
    };

    const renderCards = (cards: Card[] | undefined) => {
        if (cards === undefined || cards.length === 0) return renderEmptyLane();
        return (
            <>
                {cards.map((c, index) => (
                    <Draggable
                        key={`${c.id}`}
                        draggableId={`lane-${id}-card-${c.id}`}
                        index={index}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <CardComponent
                                    key={`lane-${id}-card-${c.id}`}
                                    title={c.title}
                                    description={c.description}
                                    upperTags={c.upperTags}
                                    tasks={c.tasks}
                                    lowerTags={c.lowerTags}
                                    onRemoveTask={() => {
                                        boardContext.removeCardFromLane(
                                            c.id,
                                            id
                                        );
                                    }}
                                />
                            </div>
                        )}
                    </Draggable>
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
