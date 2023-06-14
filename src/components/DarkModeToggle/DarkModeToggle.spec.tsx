import { fireEvent, render } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import { mockContext } from '../../mocks/context.mock';
import { DarkModeToggle } from './DarkModeToggle';

// Mock react-i18next useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key) => key),
    }),
}));

describe('DarkModeToggle', () => {
    it('should render the dark mode toggle component with correct text', () => {
        const { getByTestId, getByText } = render(
            <BoardContext.Provider value={mockContext}>
                <DarkModeToggle />
            </BoardContext.Provider>
        );

        const toggleButton = getByTestId('theme-mode-button');
        const toggleText = getByText('components.DarkModeToggle.dark');

        expect(toggleButton).toBeInTheDocument();
        expect(toggleText).toBeInTheDocument();
    });

    it('should render the light mode toggle component with correct text', () => {
        const { getByTestId, getByText } = render(
            <BoardContext.Provider
                value={{ ...mockContext, themeMode: 'dark' }}
            >
                <DarkModeToggle />
            </BoardContext.Provider>
        );

        const toggleButton = getByTestId('theme-mode-button');
        const toggleText = getByText('components.DarkModeToggle.light');

        expect(toggleButton).toBeInTheDocument();
        expect(toggleText).toBeInTheDocument();
    });

    it('should call toggleThemeMode function for dark mode when the toggle button is clicked', () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={mockContext}>
                <DarkModeToggle />
            </BoardContext.Provider>
        );

        const toggleButton = getByTestId('theme-mode-button');
        fireEvent.click(toggleButton);

        expect(mockContext.toggleThemeMode).toHaveBeenCalled();
    });

    it('should call toggleThemeMode function for light mode when the toggle button is clicked', () => {
        const { getByTestId } = render(
            <BoardContext.Provider
                value={{ ...mockContext, themeMode: 'dark' }}
            >
                <DarkModeToggle />
            </BoardContext.Provider>
        );

        const toggleButton = getByTestId('theme-mode-button');
        fireEvent.click(toggleButton);

        expect(mockContext.toggleThemeMode).toHaveBeenCalled();
    });
});
