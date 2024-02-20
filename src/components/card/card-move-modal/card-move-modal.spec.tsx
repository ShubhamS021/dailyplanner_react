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
import { expect, test, vi } from 'vitest';
import { CardMoveModal, type CardMoveModalProps } from './card-move-modal';

const modalConfirmationMock = vi.fn();
const closeModalMock = vi.fn();

const defaultProps: CardMoveModalProps = {
    title: 'Move Card',
    modalConfirmation: (boardId) => modalConfirmationMock(boardId),
    closeModal: closeModalMock,
};

describe('CardMoveModal', () => {
    // add a default board with some columns
    beforeEach(() => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            const boardId = 0;
            const first = {
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            };

            const second = {
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId + 2,
            };
            result.current.addBoard(first);
            result.current.addBoard(second);
        });
    });

    test('renders the title', () => {
        renderHook(() => useBoardStore());
        render(<CardMoveModal {...defaultProps} />);
        const titleElement = screen.getByTestId('page-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Move Card');
    });

    test('renders the cancel button with default text', () => {
        renderHook(() => useBoardStore());
        render(<CardMoveModal {...defaultProps} />);
        const cancelButtonElement = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        expect(cancelButtonElement).toBeInTheDocument();
        expect(cancelButtonElement).toHaveTextContent('Cancel');
    });

    test('renders the submit button with default text', () => {
        renderHook(() => useBoardStore());
        render(<CardMoveModal {...defaultProps} />);
        const submitButtonElement = screen.getByTestId(
            'confirmation-modal-button'
        );
        expect(submitButtonElement).toBeInTheDocument();
        expect(submitButtonElement).toHaveTextContent('Ok');
    });

    test('calls the modalConfirmation function when the submit button is clicked', () => {
        renderHook(() => useBoardStore());
        render(<CardMoveModal {...defaultProps} />);
        const submitButtonElement = screen.getByTestId(
            'confirmation-modal-button'
        );

        expect(submitButtonElement).toBeDisabled();

        const selectElement = screen.getByTestId('board-selection');
        fireEvent.click(selectElement);

        setTimeout(() => {
            const selectElementBoard = screen.getByTestId('board-selection-1');
            fireEvent.click(selectElementBoard);

            fireEvent.click(submitButtonElement);
            expect(modalConfirmationMock).toHaveBeenCalledWith(1);
            expect(closeModalMock).toHaveBeenCalled();
        }, 500);
    });

    test('calls the closeModal function when the close button is clicked', () => {
        renderHook(() => useBoardStore());
        render(<CardMoveModal {...defaultProps} />);
        const closeButtonElement = screen.getByTestId(
            'confirmation-modal-close-button'
        );
        fireEvent.click(closeButtonElement);
        expect(closeModalMock).toHaveBeenCalled();
    });
});
