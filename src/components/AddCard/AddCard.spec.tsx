import { fireEvent, render } from '@testing-library/react';
import { AddCard } from './AddCard';

test('renders the basic addCard', () => {
    const { getByTestId } = render(
        <AddCard placeholder={'add a card'} text={'button text'} />
    );
    expect(getByTestId(/addcard-input/)).toHaveAttribute(
        'placeholder',
        'add a card'
    );
    expect(getByTestId(/addcard-button/).textContent).toBe('button text');
});

test('add a new card', () => {
    const { getByTestId } = render(
        <AddCard placeholder={'add a card'} text={'button text'} />
    );

    const input = getByTestId(/addcard-input/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW CARD' } });

    expect(input.value).toBe('NEW CARD');
    const button = getByTestId(/addcard-button/);
    fireEvent.click(button);

    expect(input.value).toBe('');
});
