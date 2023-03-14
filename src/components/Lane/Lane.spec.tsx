import { fireEvent, render } from '@testing-library/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardContext } from '../../context/BoardContext';
import { type Card } from '../../interfaces/Card';
import { mockContext } from '../../mocks/context.mock';
import { colors } from '../../theme/colors';
import { LaneComponent } from './Lane';

test('renders basic lane', () => {
    const { getByTestId } = render(
        <LaneComponent
            color={colors.green}
            text="Lane ABC"
            id={1}
            isLastLane={false}
        />
    );
    expect(getByTestId(/page-label/i).textContent).toBe('Lane ABC');
});

test('renders lane with no cards -> dropzone', () => {
    const cards: Card[] = [];
    const { getByTestId, queryAllByTestId } = render(
        <LaneComponent
            color={colors.green}
            text="Lane ABC"
            id={1}
            cards={cards}
            isLastLane={false}
        />
    );
    expect(getByTestId(/page-label/i).textContent).toBe('Lane ABC');
    expect(queryAllByTestId(/dropzone/i).length).toBe(1);
});

test('renders lane with card', () => {
    const cards: Card[] = [
        { id: 1, title: 'card 1' },
        { id: 2, title: 'card 2' },
        { id: 3, title: 'card 3' },
    ];
    const { getByTestId, queryAllByTestId } = render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="some_id">
                {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <LaneComponent
                            color={colors.green}
                            text="Lane ABC"
                            id={1}
                            cards={cards}
                            isLastLane={false}
                        />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
    expect(getByTestId(/page-label/i).textContent).toBe('Lane ABC');
    expect(queryAllByTestId('card').length).toBe(3);
});

test('clicking delete all button shows confirmation modal', () => {
    const { getByTestId } = render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="some_id">
                {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <LaneComponent
                            color={colors.green}
                            text="Lane ABC"
                            id={1}
                            isLastLane={true}
                        />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
    const deleteButton = getByTestId('delete-all-from-lane-button');
    fireEvent.click(deleteButton);
    expect(getByTestId('confirmation-modal')).toBeInTheDocument();
});

test('clicking remove task button calls removeCardFromLane function from context', () => {
    const removeCardFromLaneMock = jest.fn();
    const { getByTestId } = render(
        <BoardContext.Provider
            value={{
                ...mockContext,
                removeCardFromLane: removeCardFromLaneMock,
            }}
        >
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                color={colors.green}
                                text="Lane ABC"
                                id={1}
                                cards={[{ id: 1, title: 'card 1' }]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardContext.Provider>
    );
    const removeTaskButton = getByTestId('remove-card-button');
    fireEvent.click(removeTaskButton);
    expect(removeCardFromLaneMock).toHaveBeenCalledTimes(1);
    expect(removeCardFromLaneMock).toHaveBeenCalledWith(1, 1);
});

test('clicking yes, delete all button calls removeCardsFromLane function from context', () => {
    const removeCardsFromLaneMock = jest.fn();
    const { getByTestId } = render(
        <BoardContext.Provider
            value={{
                ...mockContext,
                removeCardsFromLane: removeCardsFromLaneMock,
            }}
        >
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                color={colors.green}
                                text="Lane ABC"
                                id={1}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardContext.Provider>
    );
    const deleteButton = getByTestId('delete-all-from-lane-button');
    fireEvent.click(deleteButton);
    const yesButton = getByTestId('confirmation-modal-button');
    fireEvent.click(yesButton);
    expect(removeCardsFromLaneMock).toHaveBeenCalledTimes(1);
    expect(removeCardsFromLaneMock).toHaveBeenCalledWith(1);
});
