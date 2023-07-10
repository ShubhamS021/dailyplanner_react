import {
    render,
    screen,
    fireEvent,
    renderHook,
    act,
    cleanup,
} from '@testing-library/react';
import { BoardHistory } from './BoardHistory';
import { initDB } from '../../utils/indexdb.util';
import { useBoardStore } from '../../hooks/useBoardStore/useBoardStore';
import { initialBoardState } from '../../hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '../../hooks/useBoardStore/data/initialLanes.state';

describe('BoardHistory', () => {
    // add a default board with some columns
    beforeEach(() => {
        void initDB();
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

    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('renders the component', () => {
        render(<BoardHistory />);

        expect(screen.getByTestId('page-board')).toBeInTheDocument();
    });

    it('displays the board title', () => {
        render(<BoardHistory />);

        expect(screen.getByText('History for: My tasks')).toBeInTheDocument();
    });

    // ! indexdb and hook not working together
    // it('displays the history entries', () => {
    //     const { result } = renderHook(() => useHistory());
    //     saveCreationToHistory(card, 1);
    //     saveMovementToHistory(card, 1, 1, 2);
    //     saveDeletionToHistory(card, 1);
    //     saveUpdateToHistory(card, 1);

    //     render(<BoardHistory />);

    //     expect(screen.getByText('CREATION')).toBeInTheDocument();
    //     expect(screen.getByText('MOVEMENT')).toBeInTheDocument();
    //     expect(screen.getByText('DELETION')).toBeInTheDocument();
    //     expect(screen.getByText('UPDATE')).toBeInTheDocument();
    // });

    it('calls toggleBoardMode when back button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = jest.spyOn(result.current, 'toggleBoardMode');
        render(<BoardHistory />);

        fireEvent.click(screen.getByTestId('btnBackToBoard'));

        expect(spy).toHaveBeenCalledWith('boardDefaultMode');
        expect(result.current.boardMode).toBe('boardDefaultMode');
    });
});
