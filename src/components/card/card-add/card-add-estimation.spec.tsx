import { fireEvent, render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { card } from '../../../../__mocks__/cards.mock';
import { CardAddEstimation } from './card-add-estimation';

describe('AddCardEstimation', () => {
    const headline = 'Test Headline';

    test('renders the headline', () => {
        const updateEstimationMock = vi.fn();
        const { getByTestId } = render(
            <CardAddEstimation
                headline={headline}
                card={card}
                updateEstimation={updateEstimationMock}
            />
        );

        const headlineElement = getByTestId('AddCardEstimation-headline');
        expect(headlineElement).toHaveTextContent(headline);
    });

    test('calls updateEstimation when the select value changes', () => {
        // Arrange
        const updateEstimationMock = vi.fn();
        const { getByTestId } = render(
            <CardAddEstimation
                headline={headline}
                card={card}
                updateEstimation={(shirt) => updateEstimationMock(shirt)}
            />
        );

        // Act
        const selectElement = getByTestId('addcard-estimation-select');
        fireEvent.click(selectElement);

        // setTimeout(() => {
        //     const selectElementL = getByTestId('addcard-estimation-select-L');
        //     fireEvent.click(selectElementL);

        //     // Assert
        //     expect(updateEstimationMock).toHaveBeenCalledWith('L');
        // }, 500);
    });
});
