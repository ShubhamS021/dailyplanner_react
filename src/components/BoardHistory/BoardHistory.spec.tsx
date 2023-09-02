import {
    render,
    screen,
    fireEvent,
    renderHook,
    act,
} from '@testing-library/react';
import { BoardHistory } from './BoardHistory';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import useHistory from '@/hooks/useHistory/useHistory';
import { card } from '../../../__mocks__/cards.mock';
import { vi } from 'vitest';

vi.mock('@/hooks/useHistory/useHistory', () => {
    return {
        default: () => ({
            history: [
                { id: 1, type: 'CREATION', data: card },
                { id: 2, type: 'MOVEMENT', data: card },
                { id: 3, type: 'DELETION', data: card },
                { id: 4, type: 'UPDATE', data: card },
                { id: 5, type: 'BOARDMOVEMENT', data: card },
            ],
            addCreationToHistory: vi.fn(),
            addMovementToHistory: vi.fn(),
            addDeletionToHistory: vi.fn(),
            addUpdateToHistory: vi.fn(),
            addBoardMovementToHistory: vi.fn(),
        }),
    };
});

describe('BoardHistory', () => {
    it('renders the component', () => {
        render(<BoardHistory />);

        expect(screen.getByTestId('page-board')).toBeInTheDocument();
    });

    it('displays the board title', () => {
        const { result: boardStore } = renderHook(() => useBoardStore());

        act(() => {
            const boardId = 0;
            boardStore.current.addBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            });
        });

        render(<BoardHistory />);

        expect(screen.getByText('History for: My tasks')).toBeInTheDocument();
    });

    it('displays the history entries', () => {
        const { result: boardStore } = renderHook(() => useBoardStore());

        act(() => {
            const boardId = 0;
            boardStore.current.addBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            });
        });

        const { result: history } = renderHook(() => useHistory(1));
        act(() => {
            history.current.addCreationToHistory(card, 1);
            history.current.addMovementToHistory(card, 1, 1, 2);
            history.current.addDeletionToHistory(card, 1);
            history.current.addUpdateToHistory(card, 1);
            history.current.addBoardMovementToHistory(card, 1, 1, 2);
        });

        const { getByTestId } = render(<BoardHistory />);

        expect(getByTestId('CREATION')).toBeInTheDocument();
        expect(getByTestId('MOVEMENT')).toBeInTheDocument();
        expect(getByTestId('DELETION')).toBeInTheDocument();
        expect(getByTestId('UPDATE')).toBeInTheDocument();
        expect(getByTestId('BOARDMOVEMENT')).toBeInTheDocument();
    });

    it('calls toggleBoardMode when back button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'toggleBoardMode');
        render(<BoardHistory />);

        fireEvent.click(screen.getByTestId('btnBackToBoard'));

        expect(spy).toHaveBeenCalledWith('boardDefaultMode');
        expect(result.current.boardMode).toBe('boardDefaultMode');
    });
});
