import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import BoardExport from './board-export';

describe('Export', () => {
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

    it('exports a board', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'exportBoardToJSON');
        const { getByTestId } = render(<BoardExport />);

        const exportButton = getByTestId('export-button');
        fireEvent.click(exportButton);

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
