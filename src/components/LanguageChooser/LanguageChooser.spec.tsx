import { fireEvent, render, screen } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import { mockContext } from '../../mocks/context.mock';
import { LanguageChooser } from './LanguageChooser';

// Mock react-i18next useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key) => key),
        i18n: { resolvedLanguage: 'en', changeLanguage: jest.fn() },
    }),
}));

describe('LanguageChooser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the language chooser component with correct options', () => {
        render(
            <BoardContext.Provider value={mockContext}>
                <LanguageChooser />
            </BoardContext.Provider>
        );
        const languageText = screen.getByText(
            'components.LanguageChooser.language'
        );
        expect(languageText).toBeInTheDocument();

        const languageButtons = screen.getAllByRole('button');
        expect(languageButtons).toHaveLength(2);
        expect(languageButtons[0]).toHaveTextContent('English');
        expect(languageButtons[1]).toHaveTextContent('Deutsch');
    });

    it('should call updateLanguage and changeLanguage when a language button is clicked', async () => {
        render(
            <BoardContext.Provider value={mockContext}>
                <LanguageChooser />
            </BoardContext.Provider>
        );
        let languageButton = screen.getByText('English');

        fireEvent.click(languageButton);

        expect(mockContext.updateLanguage).toHaveBeenCalledWith('en');

        languageButton = screen.getByText('Deutsch');

        fireEvent.click(languageButton);

        expect(mockContext.updateLanguage).toHaveBeenCalledWith('de');
    });
});
