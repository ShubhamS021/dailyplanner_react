import {
    act,
    fireEvent,
    render,
    renderHook,
    screen,
} from '@testing-library/react';
import { colors } from '../../theme/colors';
import { MyBoardLanes } from './MyBoardLanes';
import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { vi } from 'vitest';

describe('MyBoardLanes', () => {
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

    beforeEach(() => {
        render(<MyBoardLanes />);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component', () => {
        const title = screen.getByTestId('myboardlanes-title');
        expect(title).toBeInTheDocument();
    });

    it('allows the user to enter a lane name and pick a color', () => {
        const laneNameInput = screen.getByTestId('myboardlanes-lanename-input');
        const blueColorButton = screen.getAllByTestId(
            'myboardlanes-lane-color-button'
        )[0];
        fireEvent.change(laneNameInput, { target: { value: 'New Lane' } });
        fireEvent.click(blueColorButton);

        expect(laneNameInput).toHaveValue('New Lane');
    });

    it('adds a new lane to the board when the "Add lane" button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'addLaneToBoard');

        const laneNameInput = screen.getByTestId('myboardlanes-lanename-input');
        const blueColorButton = screen.getAllByTestId(
            'myboardlanes-lane-color-button'
        )[0];
        const addLaneButton = screen.getByTestId('myboardlanes-addlane-button');
        fireEvent.change(laneNameInput, { target: { value: 'New Lane' } });
        fireEvent.click(blueColorButton);
        fireEvent.click(addLaneButton);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
            {
                id: -1,
                title: 'New Lane',
                color: colors.Green,
                cards: [],
            },
            3
        );
    });

    it('removes a lane from the board when the remove button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'removeLaneFromBoard');

        const laneNameInput = screen.getByTestId('myboardlanes-lanename-input');
        const blueColorButton = screen.getAllByTestId(
            'myboardlanes-lane-color-button'
        )[0];
        const addLaneButton = screen.getByTestId('myboardlanes-addlane-button');
        fireEvent.change(laneNameInput, { target: { value: 'New Lane' } });
        fireEvent.click(blueColorButton);
        fireEvent.click(addLaneButton);

        const removeButton = screen.getAllByTestId('tag-remove-button')[0];
        fireEvent.click(removeButton);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(0, 4);
    });

    it('enters the board when the "Start" button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'enterBoard');

        const laneNameInput = screen.getByTestId('myboardlanes-lanename-input');
        const blueColorButton = screen.getAllByTestId(
            'myboardlanes-lane-color-button'
        )[0];
        const addLaneButton = screen.getByTestId('myboardlanes-addlane-button');
        fireEvent.change(laneNameInput, { target: { value: 'New Lane' } });
        fireEvent.click(blueColorButton);
        fireEvent.click(addLaneButton);

        const startButton = screen.getByTestId(
            'myboardlanes-create-own-button'
        );
        fireEvent.click(startButton);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(5);
    });
});
