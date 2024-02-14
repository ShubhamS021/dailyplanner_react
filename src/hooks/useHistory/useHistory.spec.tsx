import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { act, renderHook } from '@testing-library/react';
import { useHistory } from './useHistory';

describe('useHistory', () => {
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

    test('gets the history for board', () => {
        const { result } = renderHook(() => useHistory(1));
        expect(result.current.history).toBeDefined();
    });
});
