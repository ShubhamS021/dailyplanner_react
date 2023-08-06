import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { DarkModeToggle } from './DarkModeToggle';
import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { vi } from 'vitest';

// Mock react-i18next useTranslation hook
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: vi.fn((key) => key),
    }),
}));

describe('DarkModeToggle', () => {
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

    it('should render the dark mode toggle component with correct text', () => {
        const { getByTestId, getByText } = render(<DarkModeToggle />);

        const toggleButton = getByTestId('theme-mode-button');
        const toggleText = getByText('components.DarkModeToggle.dark');

        expect(toggleButton).toBeInTheDocument();
        expect(toggleText).toBeInTheDocument();
    });

    it('should render the light mode toggle component with correct text', () => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            result.current.toggleThemeMode('dark');
        });

        const { getByTestId, getByText } = render(<DarkModeToggle />);

        const toggleButton = getByTestId('theme-mode-button');
        const toggleText = getByText('components.DarkModeToggle.light');

        expect(toggleButton).toBeInTheDocument();
        expect(toggleText).toBeInTheDocument();
    });

    it('should call toggleThemeMode function for dark mode when the toggle button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'toggleThemeMode');

        const { getByTestId } = render(<DarkModeToggle />);

        const toggleButton = getByTestId('theme-mode-button');
        fireEvent.click(toggleButton);

        expect(spy).toHaveBeenCalled();
    });

    it('should call toggleThemeMode function for light mode when the toggle button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'toggleThemeMode');

        act(() => {
            result.current.toggleThemeMode('dark');
        });

        const { getByTestId } = render(<DarkModeToggle />);

        const toggleButton = getByTestId('theme-mode-button');
        fireEvent.click(toggleButton);

        expect(spy).toHaveBeenCalled();
    });
});
