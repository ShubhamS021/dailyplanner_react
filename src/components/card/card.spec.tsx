import { render } from '@testing-library/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { expect, test } from 'vitest';
import { CardComponent } from './card';

describe('Card', () => {
    const CARD_TITLE = 'card title';
    const NOT_IMPLEMENTED_MESSAGE = 'Not implemented';

    test('renders basic card', () => {
        const { getByTestId } = render(
            <DragDropContext onDragEnd={() => {}}>
                <CardComponent
                    title={CARD_TITLE}
                    description="card description"
                    onRemoveCard={() => {}}
                    onEditCard={() => {}}
                    id={0}
                    onMoveCard={() => {}}
                    shirt={'XS'}
                />
            </DragDropContext>
        );

        expect(getByTestId(/card-title/i).textContent).toBe(CARD_TITLE);
        expect(getByTestId(/card-description/i).textContent).toBe(
            'card description'
        );
    });

    test('renders card with tags and tasks', () => {
        const { getByTestId, queryAllByTestId } = render(
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Draggable draggableId={'1'} index={1}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <CardComponent
                                            title={CARD_TITLE}
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
                                                    variant: 'green',
                                                    text: 'Tag High 1',
                                                    tagType: 'lower',
                                                },
                                            ]}
                                            upperTags={[
                                                {
                                                    id: 1,
                                                    variant: 'green',
                                                    text: 'Tag Low 1',
                                                    tagType: 'upper',
                                                },
                                            ]}
                                            onRemoveCard={function (): void {
                                                throw new Error(
                                                    NOT_IMPLEMENTED_MESSAGE
                                                );
                                            }}
                                            onEditCard={function (): void {
                                                throw new Error(
                                                    NOT_IMPLEMENTED_MESSAGE
                                                );
                                            }}
                                            id={0}
                                            onMoveCard={function (): void {
                                                throw new Error(
                                                    NOT_IMPLEMENTED_MESSAGE
                                                );
                                            }}
                                            shirt={'XS'}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );

        expect(getByTestId(/card-title/i).textContent).toBe(CARD_TITLE);
        expect(getByTestId(/card-description/i).textContent).toBe(
            'card description'
        );
        expect(queryAllByTestId(/card-tags/).length).toBe(2);
        expect(queryAllByTestId(/card-task/).length).toBe(4);
    });
});
