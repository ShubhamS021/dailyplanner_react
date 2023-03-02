import { render } from '@testing-library/react';
import { type Card } from 'interfaces/Card';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { colors } from '../../theme/colors';
import { LaneComponent } from './Lane';

test('renders basic lane', () => {
    const { getByTestId } = render(
        <LaneComponent color={colors.green} text="Lane ABC" id={1} />
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
                        />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
    expect(getByTestId(/page-label/i).textContent).toBe('Lane ABC');
    expect(queryAllByTestId('card').length).toBe(3);
});
