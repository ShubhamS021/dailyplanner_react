import { render } from '@testing-library/react';
import { type Card } from 'interfaces/Card';
import { colors } from '../../theme/colors';
import { LaneComponent } from './Lane';

test('renders basic lane', () => {
    const { getByTestId } = render(
        <LaneComponent color={colors.green} text="Lane ABC" id={1} />
    );
    expect(getByTestId(/page-label/i).textContent).toBe('Lane ABC');
});

test('renders lane with empty card', () => {
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
    expect(queryAllByTestId('card').length).toBe(1);
});

test('renders lane with card', () => {
    const cards: Card[] = [
        { id: 1, title: 'card 1' },
        { id: 2, title: 'card 2' },
        { id: 3, title: 'card 3' },
    ];
    const { getByTestId, queryAllByTestId } = render(
        <LaneComponent
            color={colors.green}
            text="Lane ABC"
            id={1}
            cards={cards}
        />
    );
    expect(getByTestId(/page-label/i).textContent).toBe('Lane ABC');
    expect(queryAllByTestId('card').length).toBe(3);
});
