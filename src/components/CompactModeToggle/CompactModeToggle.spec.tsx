import { fireEvent, render } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import { mockContext, mocktoggleCompactMode } from '../../mocks/context.mock';
import CompactModeToggle from './CompactModeToggle';

describe('CompactModeToggle', () => {
    test('renders the button with the correct text', () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={mockContext}>
                <CompactModeToggle />
            </BoardContext.Provider>
        );
        const button = getByTestId(/compactmode-toggle-button/);
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Compact mode');
    });

    test('clicking the button calls the toggleCompactMode function', () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={mockContext}>
                <CompactModeToggle />
            </BoardContext.Provider>
        );
        const button = getByTestId(/compactmode-toggle-button/);
        fireEvent.click(button);
        expect(mocktoggleCompactMode).toHaveBeenCalledTimes(1);
    });
});
