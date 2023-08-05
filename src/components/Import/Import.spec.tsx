import { act, fireEvent, render, renderHook } from '@testing-library/react';
import Import from './Import';
import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { vi } from 'vitest';

describe('Import', () => {
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

    it('imports a board', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'importBoardFromJSON');
        const { getByTestId } = render(<Import />);

        const input = getByTestId('import-input') as HTMLInputElement;
        const file = new File([''], 'test.json', { type: 'application/json' });
        const event = {
            target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        fireEvent.change(input, event);

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
