import { fireEvent, render, screen } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import {
    mockAddLaneToBoard,
    mockContext,
    mockEnterBoard,
    mockRemoveLaneFromBoard,
} from '../../mocks/context.mock';
import { colors } from '../../theme/colors';
import { MyBoardLanes } from './MyBoardLanes';

describe('MyBoardLanes', () => {
    beforeEach(() => {
        render(
            <BoardContext.Provider value={mockContext}>
                <MyBoardLanes />
            </BoardContext.Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
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
        expect(blueColorButton.children[0]).toHaveStyle(
            'border: 2px solid rgba(0,0,0,0.3)'
        );
    });

    it('adds a new lane to the board when the "Add lane" button is clicked', () => {
        const laneNameInput = screen.getByTestId('myboardlanes-lanename-input');
        const blueColorButton = screen.getAllByTestId(
            'myboardlanes-lane-color-button'
        )[0];
        const addLaneButton = screen.getByTestId('myboardlanes-addlane-button');
        fireEvent.change(laneNameInput, { target: { value: 'New Lane' } });
        fireEvent.click(blueColorButton);
        fireEvent.click(addLaneButton);

        expect(mockAddLaneToBoard).toHaveBeenCalledTimes(1);
        expect(mockAddLaneToBoard).toHaveBeenCalledWith(
            {
                id: -1,
                title: 'New Lane',
                color: colors.sulzer33_blue,
                cards: [],
            },
            3
        );
    });

    it('removes a lane from the board when the remove button is clicked', () => {
        const removeButton = screen.getAllByTestId('tag-remove-button')[0];
        fireEvent.click(removeButton);

        expect(mockRemoveLaneFromBoard).toHaveBeenCalledTimes(1);
        expect(mockRemoveLaneFromBoard).toHaveBeenCalledWith(0, 3);
    });

    it('enters the board when the "Start" button is clicked', () => {
        const startButton = screen.getByTestId(
            'myboardlanes-create-own-button'
        );
        fireEvent.click(startButton);

        expect(mockEnterBoard).toHaveBeenCalledTimes(1);
        expect(mockEnterBoard).toHaveBeenCalledWith(2);
    });
});
