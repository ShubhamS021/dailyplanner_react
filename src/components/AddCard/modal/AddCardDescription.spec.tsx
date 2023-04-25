import { fireEvent, render } from '@testing-library/react';
import { AddCardDescription } from './AddCardDescription';

test('renders the basic AddCardDescription', () => {
    const { getByTestId } = render(
        <AddCardDescription
            headline={'description'}
            explanation={'testing description'}
            card={{ id: 1, title: 'card', description: 'card description' }}
            updateDescription={(description: string) => {
                throw new Error('Function not implemented.');
            }}
        />
    );

    expect(getByTestId(/addcarddescription-headline/).textContent).toBe(
        'description'
    );
    expect(getByTestId(/addcarddescription-explanation/).textContent).toBe(
        'testing description'
    );
});

test('changes description', () => {
    const { getByTestId } = render(
        <AddCardDescription
            headline={'description'}
            explanation={'testing description'}
            card={{ id: 1, title: 'card', description: 'card description' }}
            updateDescription={(description: string) => {
                expect(description).not.toBe('');
            }}
        />
    );

    const input = getByTestId(/addcard-description-input/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW DESCRIPTION' } });
});
