import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { DarkMode } from './dark-mode';

describe('DarkModeToggle', () => {
    const BTN_TEST_ID = 'theme-mode-button';

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

    test('should render the dark mode toggle component with correct text', () => {
        const { getByTestId, getByText } = render(<DarkMode />);

        const toggleButton = getByTestId(BTN_TEST_ID);
        const toggleText = getByText('Dark');

        expect(toggleButton).toBeInTheDocument();
        expect(toggleText).toBeInTheDocument();
    });

    test('should render the light mode toggle component with correct text', () => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            result.current.toggleThemeMode('dark');
        });

        const { getByTestId, getByText } = render(<DarkMode />);

        const toggleButton = getByTestId(BTN_TEST_ID);
        const toggleText = getByText('Light');

        expect(toggleButton).toBeInTheDocument();
        expect(toggleText).toBeInTheDocument();
    });

    test('should call toggleThemeMode function for dark mode when the toggle button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'toggleThemeMode');

        const { getByTestId } = render(<DarkMode />);

        const toggleButton = getByTestId(BTN_TEST_ID);
        fireEvent.click(toggleButton);

        expect(spy).toHaveBeenCalled();
    });

    test('should call toggleThemeMode function for light mode when the toggle button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'toggleThemeMode');

        act(() => {
            result.current.toggleThemeMode('dark');
        });

        const { getByTestId } = render(<DarkMode />);

        const toggleButton = getByTestId(BTN_TEST_ID);
        fireEvent.click(toggleButton);

        expect(spy).toHaveBeenCalled();
    });
});
