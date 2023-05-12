import { fireEvent, render } from '@testing-library/react';
import { AddCardDescription } from './AddCardDescription';

test('renders the basic AddCardDescription', () => {
    const { getByTestId } = render(
        <AddCardDescription
            headline={'description'}
            card={{ id: 1, title: 'card', description: 'card description' }}
            updateDescription={(description: string) => {
                throw new Error('Function not implemented.');
            }}
            updateTitle={(title: string) => {
                throw new Error('Function not implemented.');
            }}
        />
    );

    expect(getByTestId(/addcarddescription-headline/).textContent).toBe(
        'description'
    );
});

test('changes description', () => {
    const { getByTestId } = render(
        <AddCardDescription
            headline={'description'}
            card={{ id: 1, title: 'card', description: 'card description' }}
            updateDescription={(description: string) => {
                expect(description).not.toBe('');
            }}
            updateTitle={(title: string) => {
                throw new Error('Function not implemented.');
            }}
        />
    );

    const input = getByTestId(/addcard-description-input/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW DESCRIPTION' } });
});
