import { fireEvent, render } from '@testing-library/react';
import { AddCardDescription } from './AddCardDescription';

test('renders the basic AddCardDescription', () => {
    const { getByTestId } = render(
        <AddCardDescription
            headline={'description'}
            card={{ id: 1, title: 'card', description: 'card description', shirt: 'S' }}
            updateDescription={(description: string) => {
               
            }}
            updateTitle={(title: string) => {
               
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
            card={{ id: 1, title: 'card', description: 'card description', shirt: 'S'}}
            updateDescription={(description: string) => {
                expect(description).not.toBe('');
            }}
            updateTitle={() => {
                
            }}
        />
    );

    const input = getByTestId(/addcard-description-input/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW DESCRIPTION' } });
});
