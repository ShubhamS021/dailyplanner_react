import {
    DragDropContext,
    type DropResult,
    Droppable,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import CompactModeToggle from '../../components/CompactModeToggle/CompactModeToggle';
import { DarkModeToggle } from '../../components/DarkModeToggle/DarkModeToggle';
import Export from '../../components/Export/Export';
import { HistoryToggle } from '../../components/HistoryToggle/HistoryToggle';
import Import from '../../components/Import/Import';
import { type Lane } from '../../interfaces/Lane';
import { AddCard } from '../AddCard/AddCard';
import { BoardTitle } from '../Board/BoardTitle/BoardTitle';
import { LaneComponent } from '../Lane/Lane';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import useHistory from 'hooks/useHistory/useHistory';
import { ArrowLeftIcon } from 'ui/Icons/Icons';

export const Board = () => {
    const [board, toggleBoardMode, handleDragEnd] = useBoardStore(
        (state) => [state.board, state.toggleBoardMode, state.handleDragEnd],
        shallow
    );

    const { addMovementToHistory } = useHistory(board.id);

    const { t } = useTranslation();

    const handleBackToBoards = () => {
        toggleBoardMode('boardChooseMode');
    };

    const renderLanes = (lanes: Lane[]) => {
        if (lanes === null) return;
        return (
            <>
                {lanes.map((l, index) => (
                    <Droppable droppableId={`${l.id}`} key={`lane-${l.id}`}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <LaneComponent
                                    id={l.id}
                                    text={l.title}
                                    color={l.color}
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
        console.log(board, result);

        const { draggableId, source, destination } = result;
        const details = draggableId.split('-');
        const laneId = +details[1];
        const cardId = +details[3];
        const card = board.lanes
            .find((l) => l.id === laneId)
            ?.cards.find((c) => c.id === cardId);

        if (card !== null && card !== undefined) {
            console.log(
                card,
                board.id,
                source.droppableId,
                destination?.droppableId ?? source.droppableId
            );

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
        <main className="p-10">
            <div className="h-16 mb-6 grid grid-cols-[auto,1fr_auto] items-center">
                <div
                    className="cursor-pointer mr-4 stroke-[#14161F] dark:stroke-[#DEDEDE]"
                    data-testid="btnBackToBoards"
                    onClick={() => {
                        handleBackToBoards();
                    }}
                >
                    <ArrowLeftIcon />
                </div>
                <BoardTitle title={board.title} subtitle={board.subtitle} />
                <div className="flex gap-2 items-center">
                    <AddCard
                        placeholder={t('components.Board.add')}
                        text={t('components.Board.addSubmit')}
                    />
                </div>
            </div>
            <div
                className={`p-5 rounded-2xl bg-[#F8F8F8] grid gap-6 dark:bg-[#212932]`}
                style={{
                    gridTemplateColumns: `repeat(${board.lanes?.length},minmax(200px,1fr)`,
                }}
                data-testid="page-board"
            >
                <DragDropContext onDragEnd={handleDrag}>
                    {renderLanes(board.lanes)}
                </DragDropContext>
            </div>

            <div className="flex justify-end gap-2 mt-2 items-center">
                <HistoryToggle />
                <DarkModeToggle />
                <CompactModeToggle />
                <Export />
                <Import />
            </div>
        </main>
    );
};

export default Board;
