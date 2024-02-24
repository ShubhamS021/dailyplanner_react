import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import {
    act,
    fireEvent,
    render,
    renderHook,
    screen,
} from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { MyBoardLanes } from './my-board-lanes';

describe('MyBoardLanes', () => {
    const LANENAME_INPUT_TESTID = 'myboardlanes-lanename-input';
    const LANE_COLOR_BUTTON_TESTID = 'myboardlanes-lane-color-button';
    const ADDLANE_BUTTON_TESTID = 'myboardlanes-addlane-button';

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

    test('renders the component', () => {
        const title = screen.getByTestId('page-title');
        expect(title).toBeInTheDocument();
    });

    test('allows the user to enter a lane name and pick a color', () => {
        const laneNameInput = screen.getByTestId(LANENAME_INPUT_TESTID);
        const blueColorButton = screen.getAllByTestId(
            LANE_COLOR_BUTTON_TESTID
        )[0];
        fireEvent.change(laneNameInput, { target: { value: 'New Lane' } });
        fireEvent.click(blueColorButton);

        expect(laneNameInput).toHaveValue('New Lane');
    });

    test('adds a new lane to the board when the "Add lane" button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'addLaneToBoard');

        const laneNameInput = screen.getByTestId(LANENAME_INPUT_TESTID);
        const blueColorButton = screen.getAllByTestId(
            LANE_COLOR_BUTTON_TESTID
        )[0];
        const addLaneButton = screen.getByTestId(ADDLANE_BUTTON_TESTID);
        fireEvent.change(laneNameInput, { target: { value: 'New Lane' } });
        fireEvent.click(blueColorButton);
        fireEvent.click(addLaneButton);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
            {
                id: -1,
                title: 'New Lane',
                variant: 'green',
                cards: [],
            },
            3
        );
    });

    test('removes a lane from the board when the remove button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'removeLaneFromBoard');

        const laneNameInput = screen.getByTestId(LANENAME_INPUT_TESTID);
        const blueColorButton = screen.getAllByTestId(
            LANE_COLOR_BUTTON_TESTID
        )[0];
        const addLaneButton = screen.getByTestId(ADDLANE_BUTTON_TESTID);
        fireEvent.change(laneNameInput, { target: { value: 'New Lane' } });
        fireEvent.click(blueColorButton);
        fireEvent.click(addLaneButton);

        const removeButton = screen.getAllByTestId('tag-remove-button')[0];
        fireEvent.click(removeButton);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(0, 4);
    });

    test('enters the board when the "Start" button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'enterBoard');

        const laneNameInput = screen.getByTestId(LANENAME_INPUT_TESTID);
        const blueColorButton = screen.getAllByTestId(
            LANE_COLOR_BUTTON_TESTID
        )[0];
        const addLaneButton = screen.getByTestId(ADDLANE_BUTTON_TESTID);
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
