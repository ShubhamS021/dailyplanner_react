import { AddCard } from 'components/AddCard/AddCard';
import { BoardContext } from 'context/BoardContext';
import { type Lane } from 'interfaces/Lane';
import { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardTitle } from '../BoardTitle/BoardTitle';
import { LaneComponent } from '../Lane/Lane';

export const App = () => {
    const boardContext = useContext(BoardContext);

    const renderLanes = (lanes: Lane[]) => {
        return (
            <>
                {lanes.map((l) => (
                    <Droppable
                        droppableId={l.id.toString()}
                        key={`lane-${l.id}`}
                    >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <LaneComponent
                                    id={l.id}
                                    text={l.title}
                                    color={l.color}
                                    cards={l.cards}
                                ></LaneComponent>
                            </div>
                        )}
                    </Droppable>
                ))}
            </>
        );
    };

    return (
        <main className="p-10">
            <div className="h-16 mb-6 grid grid-cols-[1fr_auto]">
                <BoardTitle
                    title="My tasks"
                    subtitle="An overview of my tasks."
                />
                <div>
                    <AddCard placeholder={'Write a new task'} text={'add'} />
                </div>
            </div>
            <div
                className="p-5 rounded-2xl bg-[#F8F8F8] grid grid-cols-4 gap-6"
                data-testid="page-board"
            >
                <DragDropContext onDragEnd={boardContext.handleDragEnd}>
                    {renderLanes(boardContext.board)}
                </DragDropContext>
            </div>
        </main>
    );
};

export default App;
