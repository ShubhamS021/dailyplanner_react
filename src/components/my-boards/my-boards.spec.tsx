import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import {
    act,
    fireEvent,
    render,
    renderHook,
    screen,
} from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import MyBoards from './my-boards';

describe('MyBoards', () => {
    const EDIT_BOARD_BUTTON_TESTID = 'edit-board-button';
    const CONFIRMATION_MODAL_TESTID = 'confirmation-modal';

    // add a default board with some columns
    beforeEach(() => {
        const { result: boardStore } = renderHook(() => useBoardStore());
        const { result: pageStore } = renderHook(() => usePageStore());

        act(() => {
            const boardId = 0;
            boardStore.current.addBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            });
            pageStore.current.setPage('boardCreatePage');
        });

        render(<MyBoards />);
    });

    test('renders the component', () => {
        expect(screen.getByTestId('page-title')).toBeInTheDocument();
        expect(screen.getByTestId('page-subtitle')).toBeInTheDocument();
        expect(
            screen.getByTestId('myboards-create-own-button')
        ).toBeInTheDocument();
    });

    test('renders the list of boards', () => {
        expect(screen.getAllByTestId('myboards-boardname')).toHaveLength(2);
    });

    // test('calls enterBoard when clicking the enter board button', () => {
    //     const { result } = renderHook(() => useBoardStore());
    //     const spy = vi.spyOn(result.current, 'enterBoard');

    //     const [enterBoardButton] = screen.getAllByTestId(
    //         'myboards-enterboard-button'
    //     );
    //     fireEvent.click(enterBoardButton);
    //     expect(spy).toHaveBeenCalledWith(0);
    // });

    // test('calls toggleBoardMode when clicking the create own button', () => {
    //     const { result } = renderHook(() => useBoardStore());
    //     const spy = vi.spyOn(result.current, 'toggleBoardMode');

    //     const createOwnButton = screen.getByTestId(
    //         'myboards-create-own-button'
    //     );
    //     fireEvent.click(createOwnButton);
    //     expect(spy).toHaveBeenCalledWith('boardCreatePage');
    // });

    test('renders the delete confirmation modal when clicking the remove board button', () => {
        const [removeBoardButton] = screen.getAllByTestId(
            'remove-board-button'
        );
        fireEvent.click(removeBoardButton);
        expect(
            screen.getAllByText('Warning: Deleting board')[0]
        ).toBeInTheDocument();
    });

    test('calls removeBoard when confirming the deletion of a board', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'removeBoard');

        const [removeBoardButton] = screen.getAllByTestId(
            'remove-board-button'
        );
        fireEvent.click(removeBoardButton);
        const [deleteBoardButton] = screen.getAllByText('Yes, delete board.');
        fireEvent.click(deleteBoardButton);
        expect(spy).toHaveBeenCalledWith(1);
    });

    test('should render the edit board modal when edit button is clicked', () => {
        const [editButton] = screen.getAllByTestId(EDIT_BOARD_BUTTON_TESTID);
        fireEvent.click(editButton);

        const editModal = screen.getByTestId(CONFIRMATION_MODAL_TESTID);
        expect(editModal).toBeInTheDocument();
    });

    test('should close the edit board modal directly after opening', () => {
        const [editButton] = screen.getAllByTestId(EDIT_BOARD_BUTTON_TESTID);
        fireEvent.click(editButton);

        const editModal = screen.getByTestId(CONFIRMATION_MODAL_TESTID);
        expect(editModal).toBeInTheDocument();

        const cancelButton = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        fireEvent.click(cancelButton);
    });

    test('should submit the edit board modal directly after opening', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'renameBoard');

        const [editButton] = screen.getAllByTestId(EDIT_BOARD_BUTTON_TESTID);
        fireEvent.click(editButton);

        const editModal = screen.getByTestId(CONFIRMATION_MODAL_TESTID);
        expect(editModal).toBeInTheDocument();

        const boardTitle = screen.getByTestId('boardedit-title-input');
        fireEvent.change(boardTitle, { target: { value: 'NEW TITLE' } });

        const boardSubtitle = screen.getByTestId('boardedit-subtitle-input');
        fireEvent.change(boardSubtitle, { target: { value: 'NEW SUBTITLE' } });

        const submitButton = screen.getByTestId('confirmation-modal-button');
        fireEvent.click(submitButton);

        expect(spy).toBeCalledWith(2, 'NEW TITLE', 'NEW SUBTITLE');
    });
});
