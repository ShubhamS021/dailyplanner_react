import { renderHook, act, cleanup } from '@testing-library/react';
import { useBoardStore } from './useBoardStore';
import { type Lane } from 'interfaces/Lane';
import { card } from '../../../__mocks__/cards.mock';
import { initialLanes } from './data/initialLanes.state';
import { initialBoardState } from './data/initialBoard.state';
import { initDB } from 'utils/indexdb.util';
import { type DropResult } from 'react-beautiful-dnd';

describe('useBoardStore', () => {
    // add a default board with some columns
    beforeEach(() => {
        void initDB();
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

    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    test('addLaneToBoard adds a lane to the board', () => {
        const { result } = renderHook(() => useBoardStore());

        const lane: Lane = {
            id: 5,
            title: 'NEW',
            color: '#000',
            cards: [],
        };

        act(() => {
            result.current.addLaneToBoard(lane, 1);
        });

        expect(result.current.board.lanes).toHaveLength(5);
    });

    test('addCardToLane adds a card to the specified lane', () => {
        const { result } = renderHook(() => useBoardStore());

        const laneId = 1;

        act(() => {
            result.current.addCardToLane(card, laneId);
        });

        const lane = result.current.board.lanes.find(
            (lane) => lane.id === laneId
        );
        expect(lane).toBeDefined();

        if (lane != null) {
            expect(lane.cards).toContainEqual(card);
        }
    });

    test('addCardToInitialBoardLane adds a card to the first lane of the board', () => {
        const { result } = renderHook(() => useBoardStore());

        const boardId = 1;

        act(() => {
            result.current.addCardToInitialBoardLane({ ...card }, boardId);
        });

        const board = result.current.board;
        const [lane] = board.lanes;

        expect(lane.cards).toHaveLength(1);
    });

    test('removeLaneFromBoard removes a lane from the board', () => {
        const { result } = renderHook(() => useBoardStore());

        const laneId = 4;
        const boardId = 1;

        act(() => {
            result.current.removeLaneFromBoard(laneId, boardId);
        });

        const board = result.current.board;
        const lane = board.lanes.find((lane) => lane.id === laneId);

        expect(lane).toBeUndefined();
    });

    test('Moves a card to a different board', () => {
        const { result } = renderHook(() => useBoardStore());
        const newCard = { ...card, id: 1 };

        act(() => {
            // add a second board
            result.current.addBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: 2,
            });

            // move the card to the first board
            const newBoard = result.current.boards.find((b) => b.id === 1);
            if (newBoard !== undefined) {
                result.current.moveCardToBoard(newCard, 1, newBoard);
            }
        });

        act(() => {
            const [firstBoard] = result.current.boards;
            const [initialLane] = firstBoard.lanes;
            expect(initialLane.cards.some((c) => c.id === newCard.id)).toBe(
                true
            );
        });
    });

    test('Clears a board', () => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            result.current.addCardToLane({ ...card }, 0);
            result.current.clearBoard();
        });

        act(() => {
            const [initialLane] = result.current.board.lanes;
            expect(initialLane.cards.includes(card)).toBe(false);
        });
    });

    test('Exports all boards', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = jest.spyOn(result.current, 'exportBoardToJSON');

        act(() => {
            result.current.addCardToLane({ ...card }, 0);
        });

        act(() => {
            result.current.exportBoardsToJSON();
            expect(spy).toHaveBeenCalled();
        });
    });

    test('Move a card to a different lane', () => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            result.current.addCardToLane({ ...card }, 0);
        });
        const source = {
            droppableId: '1',
            index: 0,
        };
        const destination = {
            droppableId: '2',
            index: 0,
        };
        act(() => {
            const dropResult: DropResult = {
                source,
                destination,
                reason: 'DROP',
                combine: undefined,
                mode: 'FLUID',
                draggableId: '1',
                type: '',
            };
            result.current.handleDragEnd(dropResult);
        });

        act(() => {
            expect(result.current.board.lanes[0].cards.includes(card)).toBe(
                false
            );
            expect(result.current.board.lanes[2].cards.length).toEqual(1);
        });
    });
});
