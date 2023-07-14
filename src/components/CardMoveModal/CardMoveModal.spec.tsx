import {
    act,
    fireEvent,
    render,
    renderHook,
    screen,
} from '@testing-library/react';
import { initialBoardState } from 'hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from 'hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { CardMoveModal, type CardMoveModalProps } from './CardMoveModal';

const modalConfirmationMock = jest.fn();
const closeModalMock = jest.fn();

const defaultProps: CardMoveModalProps = {
    title: 'Move Card',
    text: 'Select a board to move this card to:',
    modalConfirmation: modalConfirmationMock,
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
        const titleElement = screen.getByTestId('confirmation-modal-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Move Card');
    });

    test('renders the text', () => {
        renderHook(() => useBoardStore());
        render(<CardMoveModal {...defaultProps} />);
        const textElement = screen.getByText(
            'Select a board to move this card to:'
        );
        expect(textElement).toBeInTheDocument();
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
        fireEvent.click(submitButtonElement);
        expect(modalConfirmationMock).toHaveBeenCalledWith(1);
        expect(closeModalMock).toHaveBeenCalled();
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
