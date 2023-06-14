import { fireEvent, render, screen } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import {
    mockContext,
    mockEnterBoard,
    mockRemoveBoard,
    mockToggleBoardMode,
} from '../../mocks/context.mock';
import MyBoards from './MyBoards';

describe('MyBoards', () => {
    beforeEach(() => {
        render(
            <BoardContext.Provider value={mockContext}>
                <MyBoards />
            </BoardContext.Provider>
        );
    });

    test('renders the component', () => {
        expect(screen.getByTestId('myboards-title')).toBeInTheDocument();
        expect(screen.getByTestId('myboards-subtitle')).toBeInTheDocument();
        expect(
            screen.getByTestId('myboards-create-own-button')
        ).toBeInTheDocument();
    });

    test('renders the list of boards', () => {
        expect(
            screen.getAllByTestId('myboards-enterboard-button')
        ).toHaveLength(3);
    });

    test('calls enterBoard when clicking the enter board button', () => {
        const enterBoardButton = screen.getAllByTestId(
            'myboards-enterboard-button'
        )[0];
        fireEvent.click(enterBoardButton);
        expect(mockEnterBoard).toHaveBeenCalledWith(0);
    });

    test('calls toggleBoardMode when clicking the create own button', () => {
        const createOwnButton = screen.getByTestId(
            'myboards-create-own-button'
        );
        fireEvent.click(createOwnButton);
        expect(mockToggleBoardMode).toHaveBeenCalledWith('boardCreateMode');
    });

    test('renders the delete confirmation modal when clicking the remove board button', () => {
        const removeBoardButton = screen.getAllByTestId(
            'remove-board-button'
        )[0];
        fireEvent.click(removeBoardButton);
        expect(
            screen.getAllByText('Warning: Deleting board')[0]
        ).toBeInTheDocument();
    });

    test('calls removeBoard when confirming the deletion of a board', () => {
        const removeBoardButton = screen.getAllByTestId(
            'remove-board-button'
        )[0];
        fireEvent.click(removeBoardButton);
        const deleteBoardButton = screen.getAllByText(
            'Yes, delete board.'
        )[0];
        fireEvent.click(deleteBoardButton);
        expect(mockRemoveBoard).toHaveBeenCalledWith(0);
    });

    it('should render the edit board modal when edit button is clicked', () => {
        const editButton = screen.getAllByTestId('edit-board-button')[0];
        fireEvent.click(editButton);

        const editModal = screen.getByTestId('confirmation-modal');
        expect(editModal).toBeInTheDocument();
    });

    it('should close the edit board modal directly after opening', () => {
        const editButton = screen.getAllByTestId('edit-board-button')[0];
        fireEvent.click(editButton);

        const editModal = screen.getByTestId('confirmation-modal');
        expect(editModal).toBeInTheDocument();

        const cancelButton = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        fireEvent.click(cancelButton);
    });

    it('should submit the edit board modal directly after opening', () => {
        const editButton = screen.getAllByTestId('edit-board-button')[0];
        fireEvent.click(editButton);

        const editModal = screen.getByTestId('confirmation-modal');
        expect(editModal).toBeInTheDocument();

        const boardTitle = screen.getByTestId('boardedit-title-input');
        fireEvent.change(boardTitle, { target: { value: 'NEW TITLE' } });

        const boardSubtitle = screen.getByTestId('boardedit-subtitle-input');
        fireEvent.change(boardSubtitle, { target: { value: 'NEW SUBTITLE' } });

        const submitButton = screen.getByTestId('confirmation-modal-button');
        fireEvent.click(submitButton);

        expect(mockContext.renameBoard).toBeCalledWith(
            0,
            'NEW TITLE',
            'NEW SUBTITLE'
        );
    });
});
