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
import { t } from 'i18next';
import { expect, test, vi } from 'vitest';
import { BoardEditModal } from './board-edit-modal';

describe('boardeditModal', () => {
    const BOARDEDIT_TITLE_INPUT_TESTID = 'boardedit-title-input';
    const BOARDEDIT_SUBTITLE_INPUT_TESTID = 'boardedit-subtitle-input';

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

    test('renders the title and text props', () => {
        const { result } = renderHook(() => useBoardStore());

        const boardId = 1;
        const title = 'My tasks';
        const subtitle = 'An overview of my tasks.';

        act(() => {
            result.current.renameBoard(boardId, title, subtitle);
        });

        render(
            <BoardEditModal
                title={title}
                board={result.current.board}
                modalConfirmation={vi.fn()}
                closeModal={vi.fn()}
            />
        );

        expect(
            screen.getByText(t('components.BoardEditModal.title'))
        ).toBeInTheDocument();
        expect(screen.getByTestId(BOARDEDIT_TITLE_INPUT_TESTID)).toHaveValue(
            title
        );
        expect(screen.getByTestId(BOARDEDIT_SUBTITLE_INPUT_TESTID)).toHaveValue(
            subtitle
        );
    });

    test('renders the submit and cancel buttons with the correct text', () => {
        const { result } = renderHook(() => useBoardStore());

        const submitButtonText = 'Update';
        const cancelButtonText = 'Cancel';

        render(
            <BoardEditModal
                title="Rename Board"
                board={result.current.board}
                submitButtonText={submitButtonText}
                cancelButtonText={cancelButtonText}
                modalConfirmation={vi.fn()}
                closeModal={vi.fn()}
            />
        );

        const cancelButton = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        expect(cancelButton).toHaveTextContent(cancelButtonText);

        const submitButton = screen.getByTestId('confirmation-modal-button');
        expect(submitButton).toHaveTextContent(submitButtonText);
    });

    test('renders the board title and subtitle as input values', () => {
        const { result } = renderHook(() => useBoardStore());

        render(
            <BoardEditModal
                title="Rename Board"
                board={result.current.board}
                modalConfirmation={vi.fn()}
                closeModal={vi.fn()}
            />
        );

        const titleInput = screen.getByTestId(BOARDEDIT_TITLE_INPUT_TESTID);
        expect(titleInput).toHaveValue(result.current.board.title);

        const subtitleInput = screen.getByTestId(
            BOARDEDIT_SUBTITLE_INPUT_TESTID
        );
        expect(subtitleInput).toHaveValue(result.current.board.subtitle);
    });

    test('updates the board title and subtitle when the inputs are changed', () => {
        const { result } = renderHook(() => useBoardStore());
        render(
            <BoardEditModal
                title="Rename Board"
                board={result.current.board}
                modalConfirmation={vi.fn()}
                closeModal={vi.fn()}
            />
        );

        const titleInput = screen.getByTestId(BOARDEDIT_TITLE_INPUT_TESTID);
        const newTitle = 'New Board Title';
        fireEvent.change(titleInput, { target: { value: newTitle } });
        expect(titleInput).toHaveValue(newTitle);

        const subtitleInput = screen.getByTestId(
            BOARDEDIT_SUBTITLE_INPUT_TESTID
        );
        const newSubtitle = 'New Board Subtitle';
        fireEvent.change(subtitleInput, { target: { value: newSubtitle } });
        expect(subtitleInput).toHaveValue(newSubtitle);
    });

    test('should call closeModal when close button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());

        const closeModal = vi.fn();
        const { getByTestId } = render(
            <BoardEditModal
                title="Title"
                board={result.current.board}
                modalConfirmation={vi.fn()}
                closeModal={closeModal}
            />
        );

        const closeButton = getByTestId('confirmation-modal-close-button');
        fireEvent.click(closeButton);

        expect(closeModal).toHaveBeenCalled();
    });

    test('should call closeModal when cancel button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());

        const closeModal = vi.fn();
        const { getByTestId } = render(
            <BoardEditModal
                title="Title"
                board={result.current.board}
                modalConfirmation={vi.fn()}
                closeModal={closeModal}
            />
        );

        const cancelButton = getByTestId('confirmation-modal-cancel-button');
        fireEvent.click(cancelButton);

        expect(closeModal).toHaveBeenCalled();
    });

    test('should call modalConfirmation and closeModal when confirmation button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());

        const modalConfirmation = vi.fn();
        const closeModal = vi.fn();
        const { getByTestId } = render(
            <BoardEditModal
                title="Title"
                board={result.current.board}
                modalConfirmation={modalConfirmation}
                closeModal={closeModal}
            />
        );

        const confirmButton = getByTestId('confirmation-modal-button');
        fireEvent.click(confirmButton);

        expect(modalConfirmation).toHaveBeenCalledWith(
            'My tasks',
            'An overview of my tasks.'
        );
        expect(closeModal).toHaveBeenCalled();
    });
});
