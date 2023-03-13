import { type Lane } from 'interfaces/Lane';
import { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Export from '../../components/Export/Export';
import Import from '../../components/Import/Import';
import { BoardContext } from '../../context/BoardContext';
import { AddCard } from '../AddCard/AddCard';
import { BoardTitle } from '../BoardTitle/BoardTitle';
import { LaneComponent } from '../Lane/Lane';

export const App = () => {
    const boardContext = useContext(BoardContext);

    const renderLanes = (lanes: Lane[]) => {
        return (
            <>
                {lanes.map((l) => (
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
            <div className="flex justify-end gap-2 mt-2">
                <Export />
                <Import />
            </div>
        </main>
    );
};

export default App;
