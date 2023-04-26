import { fireEvent, render, screen } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import { mockContext } from '../../mocks/context.mock';
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
    test('renders the title', () => {
        render(
            <BoardContext.Provider value={mockContext}>
                <CardMoveModal {...defaultProps} />
            </BoardContext.Provider>
        );

        const titleElement = screen.getByTestId('confirmation-modal-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('Move Card');
    });

    test('renders the text', () => {
        render(
            <BoardContext.Provider value={mockContext}>
                <CardMoveModal {...defaultProps} />
            </BoardContext.Provider>
        );

        const textElement = screen.getByText(
            'Select a board to move this card to:'
        );
        expect(textElement).toBeInTheDocument();
    });

    test('renders the cancel button with default text', () => {
        render(
            <BoardContext.Provider value={mockContext}>
                <CardMoveModal {...defaultProps} />
            </BoardContext.Provider>
        );

        const cancelButtonElement = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        expect(cancelButtonElement).toBeInTheDocument();
        expect(cancelButtonElement).toHaveTextContent('Cancel');
    });

    test('renders the submit button with default text', () => {
        render(
            <BoardContext.Provider value={mockContext}>
                <CardMoveModal {...defaultProps} />
            </BoardContext.Provider>
        );

        const submitButtonElement = screen.getByTestId(
            'confirmation-modal-button'
        );
        expect(submitButtonElement).toBeInTheDocument();
        expect(submitButtonElement).toHaveTextContent('Ok');
    });

    test('calls the modalConfirmation function when the submit button is clicked', () => {
        render(
            <BoardContext.Provider value={mockContext}>
                <CardMoveModal {...defaultProps} />
            </BoardContext.Provider>
        );

        const submitButtonElement = screen.getByTestId(
            'confirmation-modal-button'
        );
        fireEvent.click(submitButtonElement);
        expect(modalConfirmationMock).toHaveBeenCalledWith(1);
        expect(closeModalMock).toHaveBeenCalled();
    });

    test('calls the closeModal function when the close button is clicked', () => {
        render(
            <BoardContext.Provider value={mockContext}>
                <CardMoveModal {...defaultProps} />
            </BoardContext.Provider>
        );

        const closeButtonElement = screen.getByTestId(
            'confirmation-modal-close-button'
        );
        fireEvent.click(closeButtonElement);
        expect(closeModalMock).toHaveBeenCalled();
    });
});
