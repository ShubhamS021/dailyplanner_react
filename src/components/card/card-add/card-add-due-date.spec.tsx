import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { card } from '../../../../__mocks__/cards.mock';
import { CardAddDueDate } from './card-add-due-date';

describe('AddCardDueDate', () => {
    const mockUpdateTags = vi.fn();

    test('renders the headline and explanation', () => {
        const { getByTestId } = render(
            <CardAddDueDate
                headline="Add Due Date"
                card={card}
                updateTags={mockUpdateTags}
            />
        );

        expect(getByTestId('AddCardDueDate-headline')).toHaveTextContent(
            'Add Due Date'
        );
    });

    // TODO: readd tests but without setTimeout
    // test('adds a new date when the "Add due date" button is clicked', () => {
    //     const { getByTestId } = render(
    //         <CardAddDueDate
    //             headline="Add Due Date"
    //             card={card}
    //             updateTags={mockUpdateTags}
    //         />
    //     );

    //     setTimeout(() => {
    //         const calender = getByTestId('addcard-duedate-calender');
    //         fireEvent.click(calender);
    //     }, 500);

    //     setTimeout(() => {
    //         const select = getByTestId('addcard-duedate-select');
    //         fireEvent.click(select);
    //     }, 1000);

    //     setTimeout(() => {
    //         const selectToday = getByTestId('addcard-duedate-today');
    //         fireEvent.click(selectToday);
    //         expect(mockUpdateTags).toHaveBeenCalled();
    //     }, 1500);
    // });
});
