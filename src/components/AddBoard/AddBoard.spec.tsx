import { act, fireEvent, render, renderHook } from '@testing-library/react';
import AddBoard from './AddBoard';
import { initialBoardState } from 'hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from 'hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { vi } from 'vitest';

describe('AddBoard component', () => {
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

    test('renders the component', () => {
        const { getByTestId } = render(<AddBoard />);

        expect(getByTestId('addboard-title')).toBeInTheDocument();
        expect(getByTestId('addboard-standard-subtitle')).toBeInTheDocument();
        expect(getByTestId('addboard-custom-subtitle')).toBeInTheDocument();
        expect(
            getByTestId('addboard-create-standard-button')
        ).toBeInTheDocument();
        expect(getByTestId('addboard-enter-name-input')).toBeInTheDocument();
        expect(
            getByTestId('addboard-enter-description-input')
        ).toBeInTheDocument();
        expect(getByTestId('addboard-create-own-button')).toBeInTheDocument();
    });

    test('calls addBoard and toggleBoardMode with the correct arguments when standard board is created', () => {
        const { result } = renderHook(() => useBoardStore());
        const spyAddBoard = vi.spyOn(result.current, 'addBoard');
        const spyToggleBoardMode = vi.spyOn(result.current, 'toggleBoardMode');
        const { getByTestId } = render(<AddBoard />);

        fireEvent.click(getByTestId('addboard-create-standard-button'));

        expect(spyAddBoard).toHaveBeenCalledTimes(1);
        expect(spyAddBoard).toHaveBeenCalledWith({
            id: 0,
            lanes: [
                {
                    cards: [],
                    color: '#e1e4e8',
                    id: 0,
                    title: 'Not Started',
                },
                {
                    cards: [],
                    color: '#f0e7f6',
                    id: 1,
                    title: 'In Progress',
                },
                {
                    cards: [],
                    color: '#ffdce0',
                    id: 2,
                    title: 'Blocked',
                },
                {
                    cards: [],
                    color: '#cbdfd8',
                    id: 3,
                    title: 'Done',
                },
            ],
            subtitle: 'An overview of my tasks.',
            title: 'My tasks',
        });

        expect(spyToggleBoardMode).toHaveBeenCalledTimes(1);
        expect(spyToggleBoardMode).toHaveBeenCalledWith('boardDefaultMode');
    });

    test('calls addBoard and toggleBoardMode with the correct arguments when custom board is created', () => {
        const { result } = renderHook(() => useBoardStore());
        const spyAddBoard = vi.spyOn(result.current, 'addBoard');
        const spyToggleBoardMode = vi.spyOn(result.current, 'toggleBoardMode');

        const { getByTestId } = render(<AddBoard />);

        const nameInput = getByTestId('addboard-enter-name-input');
        const descriptionInput = getByTestId(
            'addboard-enter-description-input'
        );
        const createOwnButton = getByTestId('addboard-create-own-button');

        fireEvent.change(nameInput, { target: { value: 'A custom title' } });
        fireEvent.change(descriptionInput, {
            target: { value: 'A custom subtitle.' },
        });
        fireEvent.click(createOwnButton);

        expect(spyAddBoard).toHaveBeenCalledTimes(1);
        expect(spyAddBoard).toHaveBeenCalledWith({
            id: 0,
            lanes: [],
            subtitle: 'A custom subtitle.',
            title: 'A custom title',
        });

        expect(spyToggleBoardMode).toHaveBeenCalledTimes(1);
        expect(spyToggleBoardMode).toHaveBeenCalledWith('boardCustomLanesMode');
    });
});
