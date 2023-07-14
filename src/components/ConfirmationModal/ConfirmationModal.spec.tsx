import { fireEvent, render, screen } from '@testing-library/react';
import { ConfirmationModal } from './ConfirmationModal';

describe('ConfirmationModal', () => {
    const closeModal = jest.fn();
    const modalConfirmation = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders with title and text', () => {
        const title = 'Are you sure?';
        const text = 'This action cannot be undone.';
        render(
            <ConfirmationModal
                title={title}
                text={text}
                closeModal={closeModal}
                modalConfirmation={modalConfirmation}
            />
        );

        const titleElement = screen.getByTestId('confirmation-modal-title');
        const textElement = screen.getByText(text);
        expect(titleElement).toHaveTextContent(title);
        expect(textElement).toBeInTheDocument();
    });

    test('clicking cancel button calls closeModal', () => {
        render(
            <ConfirmationModal
                title="Are you sure?"
                text="This action cannot be undone."
                closeModal={closeModal}
                modalConfirmation={modalConfirmation}
            />
        );

        const cancelButton = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        fireEvent.click(cancelButton);
        expect(closeModal).toHaveBeenCalled();
    });

    test('clicking submit button calls modalConfirmation and closeModal', () => {
        render(
            <ConfirmationModal
                title="Are you sure?"
                text="This action cannot be undone."
                closeModal={closeModal}
                modalConfirmation={modalConfirmation}
            />
        );

        const submitButton = screen.getByTestId('confirmation-modal-button');
        fireEvent.click(submitButton);
        expect(modalConfirmation).toHaveBeenCalled();
        expect(closeModal).toHaveBeenCalled();
    });

    test('renders custom submit and cancel button text', () => {
        const submitButtonText = 'Yes, delete it';
        const cancelButtonText = 'No, keep it';
        render(
            <ConfirmationModal
                title="Are you sure?"
                text="This action cannot be undone."
                closeModal={closeModal}
                modalConfirmation={modalConfirmation}
                submitButtonText={submitButtonText}
                cancelButtonText={cancelButtonText}
            />
        );

        const cancelButton = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        const submitButton = screen.getByTestId('confirmation-modal-button');
        expect(cancelButton).toHaveTextContent(cancelButtonText);
        expect(submitButton).toHaveTextContent(submitButtonText);
    });
});
