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
        ).toHaveLength(1);
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
            screen.getByText(/warning: deleting board/i)
        ).toBeInTheDocument();
    });

    test('calls removeBoard when confirming the deletion of a board', () => {
        const removeBoardButton = screen.getAllByTestId(
            'remove-board-button'
        )[0];
        fireEvent.click(removeBoardButton);
        const deleteBoardButton = screen.getByText(/yes, delete board./i);
        fireEvent.click(deleteBoardButton);
        expect(mockRemoveBoard).toHaveBeenCalledWith(0);
    });
});
