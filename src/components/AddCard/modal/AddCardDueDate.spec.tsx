import { fireEvent, render } from '@testing-library/react';
import { AddCardDueDate } from './AddCardDueDate';

describe('AddCardDueDate', () => {
    const mockCard = { id: 1, title: 'test-card', lowerTags: [] };
    const mockUpdateTags = jest.fn();

    it('renders the headline and explanation', () => {
        const { getByTestId } = render(
            <AddCardDueDate
                headline="Add Due Date"
                explanation="Enter a date to add a due date to the card"
                card={mockCard}
                updateTags={mockUpdateTags}
            />
        );

        expect(getByTestId('AddCardDueDate-headline')).toHaveTextContent(
            'Add Due Date'
        );
        expect(getByTestId('AddCardDueDate-explanation')).toHaveTextContent(
            'Enter a date to add a due date to the card'
        );
    });

    it('adds a new date when the "Add due date" button is clicked', () => {
        const { getByTestId } = render(
            <AddCardDueDate
                headline="Add Due Date"
                explanation="Enter a date to add a due date to the card"
                card={mockCard}
                updateTags={mockUpdateTags}
            />
        );

        const input = getByTestId('addcard-lowertags-input');
        const button = getByTestId('addcard-lowertags-button');

        fireEvent.change(input, { target: { value: '2000-01-01' } });

        fireEvent.click(button);

        expect(mockUpdateTags).toHaveBeenCalledWith([
            { id: 1, text: '2000-01-01', color: '#cbdfd8' },
        ]);
    });
});
