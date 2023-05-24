import { fireEvent, render, screen } from '@testing-library/react';
import { mockContext } from '../../mocks/context.mock';
import { LaneEditModal } from './LaneEditModal';

describe('LaneEditModal', () => {
    it('renders the title and text props', () => {
        const title = 'Rename Lane';

        render(
            <LaneEditModal
                title={title}
                board={mockContext.board}
                laneId={0}
                modalConfirmation={jest.fn()}
                closeModal={jest.fn()}
                editNameText={''}
                editLabelText={''}
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
            <LaneEditModal
                title="Rename Lane"
                board={mockContext.board}
                laneId={0}
                submitButtonText={submitButtonText}
                cancelButtonText={cancelButtonText}
                modalConfirmation={jest.fn()}
                closeModal={jest.fn()}
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
        render(
            <LaneEditModal
                title="Rename Lane"
                board={mockContext.board}
                laneId={0}
                modalConfirmation={jest.fn()}
                closeModal={jest.fn()}
                editNameText={''}
                editLabelText={''}
            />
        );

        const titleInput = screen.getByTestId('LaneEdit-title-input');
        expect(titleInput).toHaveValue('Not Started');
    });

    it('updates the lane title when the inputs are changed', () => {
        render(
            <LaneEditModal
                title="Rename Lane"
                board={mockContext.board}
                laneId={0}
                modalConfirmation={jest.fn()}
                closeModal={jest.fn()}
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
        const closeModal = jest.fn();
        const { getByTestId } = render(
            <LaneEditModal
                title="Title"
                board={mockContext.board}
                laneId={0}
                modalConfirmation={jest.fn()}
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
        const closeModal = jest.fn();
        const { getByTestId } = render(
            <LaneEditModal
                title="Title"
                board={mockContext.board}
                laneId={0}
                modalConfirmation={jest.fn()}
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
        const modalConfirmation = jest.fn();
        const closeModal = jest.fn();
        const { getByTestId } = render(
            <LaneEditModal
                title="Title"
                board={mockContext.board}
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
