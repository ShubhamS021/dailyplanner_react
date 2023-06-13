import { fireEvent, render, screen } from '@testing-library/react';
import { mockContext } from '../../mocks/context.mock';
import { BoardEditModal } from './BoardEditModal';

describe('boardeditModal', () => {
    it('renders the title and text props', () => {
        const title = 'Rename Board';

        render(
            <BoardEditModal
                title={title}
                board={mockContext.board}
                modalConfirmation={jest.fn()}
                closeModal={jest.fn()}
            />
        );

        expect(
            screen.getByTestId('confirmation-modal-title')
        ).toHaveTextContent(title);
    });

    it('renders the submit and cancel buttons with the correct text', () => {
        const submitButtonText = 'Update';
        const cancelButtonText = 'Cancel';

        render(
            <BoardEditModal
                title="Rename Board"
                board={mockContext.board}
                submitButtonText={submitButtonText}
                cancelButtonText={cancelButtonText}
                modalConfirmation={jest.fn()}
                closeModal={jest.fn()}
            />
        );

        const cancelButton = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        expect(cancelButton).toHaveTextContent(cancelButtonText);

        const submitButton = screen.getByTestId('confirmation-modal-button');
        expect(submitButton).toHaveTextContent(submitButtonText);
    });

    it('renders the board title and subtitle as input values', () => {
        render(
            <BoardEditModal
                title="Rename Board"
                board={mockContext.board}
                modalConfirmation={jest.fn()}
                closeModal={jest.fn()}
            />
        );

        const titleInput = screen.getByTestId('boardedit-title-input');
        expect(titleInput).toHaveValue(mockContext.board.title);

        const subtitleInput = screen.getByTestId('boardedit-subtitle-input');
        expect(subtitleInput).toHaveValue(mockContext.board.subtitle);
    });

    it('updates the board title and subtitle when the inputs are changed', () => {
        render(
            <BoardEditModal
                title="Rename Board"
                board={mockContext.board}
                modalConfirmation={jest.fn()}
                closeModal={jest.fn()}
            />
        );

        const titleInput = screen.getByTestId('boardedit-title-input');
        const newTitle = 'New Board Title';
        fireEvent.change(titleInput, { target: { value: newTitle } });
        expect(titleInput).toHaveValue(newTitle);

        const subtitleInput = screen.getByTestId('boardedit-subtitle-input');
        const newSubtitle = 'New Board Subtitle';
        fireEvent.change(subtitleInput, { target: { value: newSubtitle } });
        expect(subtitleInput).toHaveValue(newSubtitle);
    });

    it('should call closeModal when close button is clicked', () => {
        const closeModal = jest.fn();
        const { getByTestId } = render(
            <BoardEditModal
                title="Title"
                board={mockContext.board}
                modalConfirmation={jest.fn()}
                closeModal={closeModal}
            />
        );

        const closeButton = getByTestId('confirmation-modal-close-button');
        fireEvent.click(closeButton);

        expect(closeModal).toHaveBeenCalled();
    });

    it('should call closeModal when cancel button is clicked', () => {
        const closeModal = jest.fn();
        const { getByTestId } = render(
            <BoardEditModal
                title="Title"
                board={mockContext.board}
                modalConfirmation={jest.fn()}
                closeModal={closeModal}
            />
        );

        const cancelButton = getByTestId('confirmation-modal-cancel-button');
        fireEvent.click(cancelButton);

        expect(closeModal).toHaveBeenCalled();
    });

    it('should call modalConfirmation and closeModal when confirmation button is clicked', () => {
        const modalConfirmation = jest.fn();
        const closeModal = jest.fn();
        const { getByTestId } = render(
            <BoardEditModal
                title="Title"
                board={mockContext.board}
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
