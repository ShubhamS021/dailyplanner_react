import { fireEvent, render } from '@testing-library/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardContext } from '../../context/BoardContext';
import { type Card } from '../../interfaces/Card';
import {
    mockContext,
    mockRemoveCardFromLane,
    mockRemoveCardsFromLane,
    mockUpdateCard,
} from '../../mocks/context.mock';
import { LaneComponent } from './Lane';

const cards: Card[] = [
    {
        id: 1,
        title: 'Card 1',
        description: 'Card 1 description',
        upperTags: [],
        tasks: [],
        lowerTags: [],
        shirt: 'S',
    },
    {
        id: 2,
        title: 'Card 2',
        description: 'Card 2 description',
        upperTags: [],
        tasks: [],
        lowerTags: [],
        shirt: 'S',
    },
];

it('should render the correct lane text', () => {
    const laneText = 'Test Lane';
    const { getByTestId } = render(
        <LaneComponent
            id={1}
            text={laneText}
            color={'#ffffff'}
            isLastLane={false}
        />
    );
    const lane = getByTestId('lane-1');
    expect(lane).toHaveTextContent(laneText);
});

it('should render the correct lane color', () => {
    const laneColor = '#ff0000';
    const { getByTestId } = render(
        <LaneComponent
            id={1}
            text={'Test Lane'}
            color={laneColor}
            isLastLane={false}
        />
    );
    const lane = getByTestId('page-label');
    expect(lane).toHaveStyle(`background-color: ${laneColor}`);
});

it('should render an empty lane', () => {
    const { getByText } = render(
        <LaneComponent
            id={1}
            text={'Test Lane'}
            color={'#ffffff'}
            isLastLane={false}
        />
    );
    expect(getByText('components.Lane.dropzone')).toBeInTheDocument();
});

it('should render cards', () => {
    const { getByTestId } = render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="some_id">
                {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <LaneComponent
                            id={1}
                            text={'Test Lane'}
                            color={'#ffffff'}
                            cards={cards}
                            isLastLane={false}
                        />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
    const lane = getByTestId('lane-1');
    expect(lane).toContainElement(getByTestId('lane-1-card-1'));
    expect(lane).toContainElement(getByTestId('lane-1-card-2'));
});

it('should render delete all button in last lane', () => {
    const { getByTestId } = render(
        <LaneComponent
            id={1}
            text={'Test Lane'}
            color={'#ffffff'}
            isLastLane={true}
        />
    );
    expect(getByTestId('delete-all-from-lane-button')).toBeInTheDocument();
});

it('should open the confirmation modal when delete all button is clicked', () => {
    const { getByTestId, getByText } = render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="some_id">
                {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <LaneComponent
                            id={1}
                            text={'Test Lane'}
                            color={'#ffffff'}
                            cards={cards}
                            isLastLane={true}
                        />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
    fireEvent.click(getByTestId('delete-all-from-lane-button'));
    expect(getByText('components.Lane.deletionTitle')).toBeInTheDocument();
    expect(getByText('components.Lane.deletionText')).toBeInTheDocument();
});

it('should cancel the confirmation modal when delete all button is clicked', () => {
    const { getByTestId } = render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="some_id">
                {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <LaneComponent
                            id={1}
                            text={'Test Lane'}
                            color={'#ffffff'}
                            cards={cards}
                            isLastLane={true}
                        />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
    fireEvent.click(getByTestId('delete-all-from-lane-button'));
    fireEvent.click(getByTestId('confirmation-modal-cancel-button'));

    const lane = getByTestId('lane-1');
    expect(lane).toContainElement(getByTestId('lane-1-card-1'));
    expect(lane).toContainElement(getByTestId('lane-1-card-2'));
});

it('should submit the confirmation modal when delete all button is clicked', () => {
    const { getByTestId } = render(
        <BoardContext.Provider value={mockContext}>
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                id={1}
                                text={'Test Lane'}
                                color={'#ffffff'}
                                cards={cards}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardContext.Provider>
    );
    fireEvent.click(getByTestId('delete-all-from-lane-button'));
    fireEvent.click(getByTestId('confirmation-modal-button'));

    expect(mockRemoveCardsFromLane).toHaveBeenCalledTimes(1);
});

it('should remove a card from lane', () => {
    const { getAllByTestId } = render(
        <BoardContext.Provider value={mockContext}>
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                id={1}
                                text={'Test Lane'}
                                color={'#ffffff'}
                                cards={cards}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardContext.Provider>
    );
    const removeButton = getAllByTestId('remove-card-button')[0];
    fireEvent.click(removeButton);

    expect(mockRemoveCardFromLane).toHaveBeenCalledTimes(1);
});

it('should cancel edit a card from lane', () => {
    const { getAllByTestId } = render(
        <BoardContext.Provider value={mockContext}>
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                id={1}
                                text={'Test Lane'}
                                color={'#ffffff'}
                                cards={cards}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardContext.Provider>
    );
    const editButton = getAllByTestId('edit-card-button')[0];
    fireEvent.click(editButton);
});

it('should submit edit a card from lane', () => {
    const { getByTestId, getAllByTestId } = render(
        <BoardContext.Provider value={mockContext}>
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                id={1}
                                text={'Test Lane'}
                                color={'#ffffff'}
                                cards={cards}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardContext.Provider>
    );
    fireEvent.click(getAllByTestId('edit-card-button')[0]);

    // updateDescription
    const descriptionInput = getByTestId(
        /addcard-description-input/
    ) as HTMLInputElement;
    fireEvent.change(descriptionInput, {
        target: { value: 'NEW DESCRIPTION' },
    });

    // updateTasks
    const taskInput = getByTestId(/addcard-subtask-input/) as HTMLInputElement;
    fireEvent.change(taskInput, { target: { value: 'NEW TASK' } });

    fireEvent.click(getByTestId(/addcard-subtask-button/));

    // updateTags
    const tagInput = getByTestId(/addcard-tags-input/) as HTMLInputElement;
    fireEvent.change(tagInput, { target: { value: 'NEW TAG' } });
    fireEvent.click(getAllByTestId(/addcard-tag-color-button/)[0]);
    fireEvent.click(getByTestId(/addcard-tag-button/));

    // updateLowerTags
    const lowerTagInput = getByTestId(
        /addcard-lowertags-input/
    ) as HTMLInputElement;
    fireEvent.change(lowerTagInput, { target: { value: '2000-01-01' } });
    fireEvent.click(getByTestId(/addcard-lowertags-button/));

    // save card
    fireEvent.click(getByTestId(/addcard-modal-button/));

    // assert what the card have on the lane
    expect(mockUpdateCard).toBeCalledWith(
        {
            description: 'NEW DESCRIPTION',
            id: 1,
            lowerTags: [
                {
                    color: '#cbdfd8',
                    id: 1,
                    text: '2000-01-01',
                    tagType: 'lower',
                },
            ],
            title: 'Card 1',
            tasks: [{ description: 'NEW TASK', id: 3, fulfilled: false }],
            upperTags: [
                {
                    color: '#cbdfd8',
                    id: 1,
                    text: 'NEW TAG',
                    tagType: 'upper',
                },
            ],
            shirt: 'S',
        },
        1
    );
});
