import { render } from '@testing-library/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { colors } from '../../theme/colors';
import { CardComponent } from './Card';

test('renders basic card', () => {
    const { getByTestId } = render(
        <DragDropContext onDragEnd={() => {}}>
            <CardComponent
                title={'card title'}
                description="card description"
            />
        </DragDropContext>
    );

    expect(getByTestId(/card-title/i).textContent).toBe('card title');
    expect(getByTestId(/card-description/i).textContent).toBe(
        'card description'
    );
});

test('renders card with tags and tasks', () => {
    const { getByTestId, queryAllByTestId } = render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="some_id">
                {(provided: any) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Draggable draggableId={'1'} index={1}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <CardComponent
                                        title={'card title'}
                                        description="card description"
                                        tasks={[
                                            {
                                                id: 1,
                                                description: 'Task 1',
                                                fulfilled: false,
                                            },
                                            {
                                                id: 2,
                                                description: 'Task 2',
                                                fulfilled: true,
                                            },
                                            {
                                                id: 3,
                                                description: 'Task 3',
                                                fulfilled: false,
                                            },
                                        ]}
                                        lowerTags={[
                                            {
                                                id: 1,
                                                color: colors.sulzer33_yellow,
                                                text: 'Tag High 1',
                                            },
                                        ]}
                                        upperTags={[
                                            {
                                                id: 1,
                                                color: colors.sulzer33_purple,
                                                text: 'Tag Low 1',
                                            },
                                        ]}
                                    />
                                </div>
                            )}
                        </Draggable>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

    expect(getByTestId(/card-title/i).textContent).toBe('card title');
    expect(getByTestId(/card-description/i).textContent).toBe(
        'card description'
    );
    expect(queryAllByTestId(/card-tags/).length).toBe(2);
    expect(queryAllByTestId(/card-task/).length).toBe(3);
});

test('breaks render on card with empty title', () => {
    const consoleErrorFn = jest
        .spyOn(console, 'error')
        .mockImplementation(() => jest.fn());
    try {
        expect(render(<CardComponent title={''} />)).toThrowError(
            'no title set'
        );
    } catch (e) {
        expect(e.message).toBe('no title set');
        consoleErrorFn.mockRestore();
    }
});
