import { fireEvent, render } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import {
    mockAddBoard,
    mockContext,
    mockToggleBoardMode,
} from '../../mocks/context.mock';
import AddBoard from './AddBoard';

describe('AddBoard component', () => {
    test('renders the component', () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={mockContext}>
                <AddBoard />
            </BoardContext.Provider>
        );

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
        const { getByTestId } = render(
            <BoardContext.Provider value={mockContext}>
                <AddBoard />
            </BoardContext.Provider>
        );

        fireEvent.click(getByTestId('addboard-create-standard-button'));

        expect(mockAddBoard).toHaveBeenCalledTimes(1);
        expect(mockAddBoard).toHaveBeenCalledWith({
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

        expect(mockToggleBoardMode).toHaveBeenCalledTimes(1);
        expect(mockToggleBoardMode).toHaveBeenCalledWith('boardDefaultMode');
    });

    test('calls addBoard and toggleBoardMode with the correct arguments when custom board is created', () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={mockContext}>
                <AddBoard />
            </BoardContext.Provider>
        );

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

        expect(mockAddBoard).toHaveBeenCalledTimes(2);
        expect(mockAddBoard).toHaveBeenCalledWith({
            id: 0,
            lanes: [],
            subtitle: 'A custom subtitle.',
            title: 'A custom title',
        });

        expect(mockToggleBoardMode).toHaveBeenCalledTimes(2);
        expect(mockToggleBoardMode).toHaveBeenCalledWith(
            'boardCustomLanesMode'
        );
    });
});
