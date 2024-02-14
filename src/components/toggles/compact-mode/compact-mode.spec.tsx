import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import CompactMode from './compact-mode';

describe('CompactModeToggle', () => {
    // add a default board with some columns
    beforeEach(() => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            const boardId = 0;
            result.current.addBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            });
        });
    });

    test('renders the button with the correct text', () => {
        const { getByTestId } = render(<CompactMode />);
        const button = getByTestId(/compactmode-toggle-button/);
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Compact mode');
    });

    test('clicking the button calls the toggleCompactMode function', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'toggleCompactMode');

        const { getByTestId } = render(<CompactMode />);
        const button = getByTestId(/compactmode-toggle-button/);
        fireEvent.click(button);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
