import { fireEvent, render } from '@testing-library/react';
import { type Shirt } from '../../../types/Shirt';
import { AddCardEstimation } from './AddCardEstimation';

describe('AddCardEstimation', () => {
    const headline = 'Test Headline';
    const card = { id: 1, title: 'Test Card', shirt: 'M' as Shirt };
    const updateEstimationMock = jest.fn();

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
