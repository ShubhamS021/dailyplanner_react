import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { act, render, renderHook } from '@testing-library/react';
import App from './app';

describe('App component', () => {
    it('renders AddBoard component when in boardCreatePage', () => {
        const { result: pageStore } = renderHook(() => usePageStore());

        act(() => {
            pageStore.current.setPage('boardCreatePage');
        });
        const { getByTestId } = render(<App />);

        expect(getByTestId(/addboard-title/)).toBeInTheDocument();
    });

    it('renders MyBoards component when in boardChoosePage', () => {
        const { result: pageStore } = renderHook(() => usePageStore());
        const { getByTestId } = render(<App />);
        act(() => {
            pageStore.current.setPage('boardChoosePage');
        });

        expect(getByTestId(/myboards-title/)).toBeInTheDocument();
    });

    it('renders MyBoardLanes component when in boardCustomLanesPage', () => {
        const { result: boardStore } = renderHook(() => useBoardStore());
        const { result: pageStore } = renderHook(() => usePageStore());
        const { getByTestId } = render(<App />);
        act(() => {
            boardStore.current.addBoard({ ...initialBoardState });
            pageStore.current.setPage('boardCustomLanesPage');
        });

        expect(getByTestId(/myboardlanes-title/)).toBeInTheDocument();
    });
});
