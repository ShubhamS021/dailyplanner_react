import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import {
    act,
    fireEvent,
    render,
    renderHook,
    screen,
} from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageChooser } from './language-chooser';

describe('LanguageChooser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

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

    it('should render the language chooser component with correct options (small=false)', () => {
        render(<LanguageChooser />);

        const languageButtons = screen.getAllByRole('button');
        expect(languageButtons).toHaveLength(2);
        expect(languageButtons[0]).toHaveTextContent('English');
        expect(languageButtons[1]).toHaveTextContent('Deutsch');
    });

    it('should render the language chooser component with correct options (small=true)', () => {
        render(<LanguageChooser small={true} />);

        const languageButtons = screen.getAllByRole('button');
        expect(languageButtons).toHaveLength(2);
        expect(languageButtons[0]).toHaveTextContent('En');
        expect(languageButtons[1]).toHaveTextContent('De');
    });

    it('should call updateLanguage and changeLanguage when a language button is clicked', async () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'updateLanguage');

        render(<LanguageChooser />);
        let languageButton = screen.getByText('English');

        fireEvent.click(languageButton);

        expect(spy).toHaveBeenCalledWith('en');

        languageButton = screen.getByText('Deutsch');

        fireEvent.click(languageButton);

        expect(spy).toHaveBeenCalledWith('de');
    });
});
