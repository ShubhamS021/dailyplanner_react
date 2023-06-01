import { HistoryToggle } from 'components/HistoryToggle/HistoryToggle';
import { DarkModeToggle } from 'components/DarkModeToggle/DarkModeToggle';
import { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { arrowLeftSVG } from '../../assets/svgs/arrow-left.svg';
import CompactModeToggle from '../../components/CompactModeToggle/CompactModeToggle';
import Export from '../../components/Export/Export';
import Import from '../../components/Import/Import';
import { BoardContext } from '../../context/BoardContext';
import { type Lane } from '../../interfaces/Lane';
import { AddCard } from '../AddCard/AddCard';
import { BoardTitle } from '../Board/BoardTitle/BoardTitle';
import { LaneComponent } from '../Lane/Lane';

export const Board = () => {
    const { toggleBoardMode, handleDragEnd, board } = useContext(BoardContext);
    const { t } = useTranslation();

    const handleBackToBoards = () => {
        toggleBoardMode('boardChooseMode');
    };

    const renderLanes = (lanes: Lane[]) => {
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
                    {arrowLeftSVG}
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
                    gridTemplateColumns: `repeat(${board.lanes.length},minmax(200px,1fr)`,
                }}
                data-testid="page-board"
            >
                <DragDropContext onDragEnd={handleDragEnd}>
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
