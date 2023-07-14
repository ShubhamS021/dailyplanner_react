import { act, render, renderHook } from '@testing-library/react';
import App from './App';
import { initialBoardState } from 'hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from 'hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';

describe('App component', () => {
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

    it('renders AddBoard component when in boardCreateMode', () => {
        const { result } = renderHook(() => useBoardStore());
        act(() => {
            result.current.toggleBoardMode('boardCreateMode');
        });
        const { getByTestId } = render(<App />);

        expect(getByTestId(/addboard-title/)).toBeInTheDocument();
    });

    it('renders MyBoards component when in boardChooseMode', () => {
        const { result } = renderHook(() => useBoardStore());
        const { getByTestId } = render(<App />);
        act(() => {
            result.current.toggleBoardMode('boardChooseMode');
        });

        expect(getByTestId(/myboards-title/)).toBeInTheDocument();
    });

    it('renders MyBoardLanes component when in boardCustomLanesMode', () => {
        const { result } = renderHook(() => useBoardStore());
        const { getByTestId } = render(<App />);
        act(() => {
            result.current.toggleBoardMode('boardCustomLanesMode');
        });

        expect(getByTestId(/myboardlanes-title/)).toBeInTheDocument();
    });
});
