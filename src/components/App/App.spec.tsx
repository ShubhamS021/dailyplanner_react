import { act, render, renderHook } from '@testing-library/react';
import App from './App';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';

describe('App component', () => {
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
            result.current.addBoard({ ...initialBoardState });
            result.current.toggleBoardMode('boardCustomLanesMode');
        });

        expect(getByTestId(/myboardlanes-title/)).toBeInTheDocument();
    });
});
