import { fireEvent, render } from '@testing-library/react';
import { AddCardEstimation } from './AddCardEstimation';
import { card } from '../../../../__mocks__/cards.mock';
import { vi } from 'vitest';

describe('AddCardEstimation', () => {
    const headline = 'Test Headline';
    const updateEstimationMock = vi.fn();

    it('renders the headline', () => {
        const { getByTestId } = render(
            <AddCardEstimation
                headline={headline}
                card={card}
                updateEstimation={updateEstimationMock}
            />
        );

        const headlineElement = getByTestId('AddCardEstimation-headline');
        expect(headlineElement).toHaveTextContent(headline);
    });

    it('calls updateEstimation when the select value changes', () => {
        const { getByTestId } = render(
            <AddCardEstimation
                headline={headline}
                card={card}
                updateEstimation={updateEstimationMock}
            />
        );

        const selectElement = getByTestId('addcard-estimation-select');

        fireEvent.change(selectElement, { target: { value: 'L' } });

        expect(updateEstimationMock).toHaveBeenCalledWith('L');
    });
});
