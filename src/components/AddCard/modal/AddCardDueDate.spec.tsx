import { fireEvent, render } from '@testing-library/react';
import { AddCardDueDate } from './AddCardDueDate';

describe('AddCardDueDate', () => {
    const mockCard = { id: 1, title: 'test-card', lowerTags: [] };
    const mockUpdateTags = jest.fn();

    it('renders the headline and explanation', () => {
        const { getByTestId } = render(
            <AddCardDueDate
                headline="Add Due Date"
                card={mockCard}
                updateTags={mockUpdateTags}
            />
        );

        expect(getByTestId('AddCardDueDate-headline')).toHaveTextContent(
            'Add Due Date'
        );
    });

    it('adds a new date when the "Add due date" button is clicked', () => {
        const { getByTestId } = render(
            <AddCardDueDate
                headline="Add Due Date"
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

    it('adds a new tag when the "Add due date" button is clicked and the input is not empty', () => {
        const { getByTestId } = render(
            <AddCardDueDate
                headline="Add Due Date"
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

    it('does not add a new tag when the "Add due date" button is clicked and the input is empty', () => {
        const { getByTestId } = render(
            <AddCardDueDate
                headline="Add Due Date"
                card={mockCard}
                updateTags={mockUpdateTags}
            />
        );

        const button = getByTestId('addcard-lowertags-button');

        fireEvent.click(button);

        expect(mockUpdateTags).toBeCalledTimes(2); // tests from before
    });

    it('removes a tag when the remove button is clicked', () => {
        const mockCardWithTag = {
            id: 1,
            title: 'test-card',
            lowerTags: [{ id: 1, text: 'Some tag', color: '#00b341' }],
        };

        const { getByTestId } = render(
            <AddCardDueDate
                headline="Add Due Date"
                card={mockCardWithTag}
                updateTags={mockUpdateTags}
            />
        );

        const removeButton = getByTestId('tag-remove-button');

        fireEvent.click(removeButton);

        expect(mockUpdateTags).toHaveBeenCalledWith([]);
    });
});
