import { PageTitle } from '@/components/page-title/page-title';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { useHistory } from '@/hooks/useHistory/useHistory';
import { type Card } from '@/interfaces/Card';
import { type Lane } from '@/interfaces/Lane';
import {
    DragDropContext,
    Droppable,
    type DropResult,
    type DroppableProvided,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { CardAdd } from '../card/card-add-modal/card-add';
import { LaneComponent } from '../lane/lane';
import CompactMode from '../toggles/compact-mode/compact-mode';

export const Board = () => {
    const [board, handleDragEnd] = useBoardStore((state) => [
        state.board,
        state.handleDragEnd,
    ]);

    const { addMovementToHistory } = useHistory(board.id);

    const { t } = useTranslation();

    const renderLanes = (lanes: Lane[]) => {
        if (lanes === null) return;
        return (
            <>
                {lanes.map((l, index) => (
                    <Droppable droppableId={`${l.id}`} key={`lane-${l.id}`}>
                        {(provided: DroppableProvided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <LaneComponent
                                    id={l.id}
                                    text={l.title}
                                    variant={l.variant}
                                    cards={l.cards}
                                    isLastLane={index === lanes.length - 1}
                                ></LaneComponent>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </>
        );
    };

    const handleDrag = (result: DropResult) => {
        const { draggableId, source, destination } = result;
        const details = draggableId.split('-');
        const laneId = +details[1];
        const cardId = +details[3];
        const card = board.lanes
            .find((l: Lane) => l.id === laneId)
            ?.cards.find((c: Card) => c.id === cardId);

        if (card !== null && card !== undefined) {
            addMovementToHistory(
                card,
                board.id,
                +source.droppableId,
                destination?.droppableId != null
                    ? +destination?.droppableId
                    : +source.droppableId
            );
        }
        handleDragEnd(result);
    };

    return (
        <div className="grid grid-cols-[auto, 1fr] py-10 px-5">
            <div className="grid grid-cols-[auto,1fr_auto] items-center">
                <PageTitle title={board.title} subtitle={board.subtitle} />
                <div className="flex flex-col gap-2 items-end">
                    <CardAdd
                        placeholder={t('components.Board.add')}
                        text={t('components.Board.addSubmit')}
                    />
                    <CompactMode />
                </div>
            </div>
            <div
                className={`grid gap-6`}
                style={{
                    gridTemplateColumns: `repeat(${board.lanes?.length},minmax(200px,1fr)`,
                }}
                data-testid="page-board"
            >
                <DragDropContext onDragEnd={handleDrag}>
                    {renderLanes(board.lanes)}
                </DragDropContext>
            </div>
        </div>
    );
};
