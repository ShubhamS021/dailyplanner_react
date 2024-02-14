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
import { LaneEditModal } from './lane-edit-modal';

describe('LaneEditModal', () => {
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

    it('renders the title and text props', () => {
        const { result } = renderHook(() => useBoardStore());
        const title = 'Rename Lane';

        render(
            <LaneEditModal
                title={title}
                board={result.current.board}
                laneId={0}
                modalConfirmation={vi.fn()}
                closeModal={vi.fn()}
                editNameText={''}
                editLabelText={''}
            />
        );

        expect(
            screen.getByTestId('confirmation-modal-title')
        ).toHaveTextContent(title);
    });

    it('renders the submit and cancel buttons with the correct text', () => {
        const { result } = renderHook(() => useBoardStore());
        const submitButtonText = 'Update';
        const cancelButtonText = 'Cancel';

        render(
            <LaneEditModal
                title="Rename Lane"
                board={result.current.board}
                laneId={0}
                submitButtonText={submitButtonText}
                cancelButtonText={cancelButtonText}
                modalConfirmation={vi.fn()}
                closeModal={vi.fn()}
                editNameText={''}
                editLabelText={''}
            />
        );

        const cancelButton = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        expect(cancelButton).toHaveTextContent(cancelButtonText);

        const submitButton = screen.getByTestId('confirmation-modal-button');
        expect(submitButton).toHaveTextContent(submitButtonText);
    });

    it('renders the lane title as input values', () => {
        const { result } = renderHook(() => useBoardStore());

        render(
            <LaneEditModal
                title="Rename Lane"
                board={result.current.board}
                laneId={0}
                modalConfirmation={vi.fn()}
                closeModal={vi.fn()}
                editNameText={''}
                editLabelText={''}
            />
        );

        const titleInput = screen.getByTestId('LaneEdit-title-input');
        expect(titleInput).toHaveValue('Not Started');
    });

    it('updates the lane title when the inputs are changed', () => {
        const { result } = renderHook(() => useBoardStore());

        render(
            <LaneEditModal
                title="Rename Lane"
                board={result.current.board}
                laneId={0}
                modalConfirmation={vi.fn()}
                closeModal={vi.fn()}
                editNameText={''}
                editLabelText={''}
            />
        );

        const titleInput = screen.getByTestId('LaneEdit-title-input');
        const newTitle = 'New Lane Title';
        fireEvent.change(titleInput, { target: { value: newTitle } });
        expect(titleInput).toHaveValue(newTitle);
    });

    it('should call closeModal when close button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());

        const closeModal = vi.fn();
        const { getByTestId } = render(
            <LaneEditModal
                title="Title"
                board={result.current.board}
                laneId={0}
                modalConfirmation={vi.fn()}
                closeModal={closeModal}
                editNameText={''}
                editLabelText={''}
            />
        );

        const closeButton = getByTestId('confirmation-modal-close-button');
        fireEvent.click(closeButton);

        expect(closeModal).toHaveBeenCalled();
    });

    it('should call closeModal when cancel button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());

        const closeModal = vi.fn();
        const { getByTestId } = render(
            <LaneEditModal
                title="Title"
                board={result.current.board}
                laneId={0}
                modalConfirmation={vi.fn()}
                closeModal={closeModal}
                editNameText={''}
                editLabelText={''}
            />
        );

        const cancelButton = getByTestId('confirmation-modal-cancel-button');
        fireEvent.click(cancelButton);

        expect(closeModal).toHaveBeenCalled();
    });

    it('should call modalConfirmation and closeModal when confirmation button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());

        const modalConfirmation = vi.fn();
        const closeModal = vi.fn();
        const { getByTestId } = render(
            <LaneEditModal
                title="Title"
                board={result.current.board}
                laneId={0}
                modalConfirmation={modalConfirmation}
                closeModal={closeModal}
                editNameText={''}
                editLabelText={''}
            />
        );

        const confirmButton = getByTestId('confirmation-modal-button');
        fireEvent.click(confirmButton);

        expect(modalConfirmation).toHaveBeenCalledWith(
            'Not Started',
            '#e1e4e8'
        );
        expect(closeModal).toHaveBeenCalled();
    });
});
