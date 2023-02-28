import { render } from '@testing-library/react';
import { CardComponent } from './Card';

test('renders basic card', () => {
    const { getByTestId } = render(
        <CardComponent title={'card title'} description="card description" />
    );

    expect(getByTestId(/card-title/i).textContent).toBe('card title');
    expect(getByTestId(/card-description/i).textContent).toBe(
        'card description'
    );
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
