import { renderHook, act } from '@testing-library/react';
import { useBoardStore } from './useBoardStore';
import { type Lane } from 'interfaces/Lane';
import { card } from '../../../__mocks__/cards.mock';
import { initialLanes } from './data/initialLanes.state';
import { initialBoardState } from './data/initialBoard.state';
import { initDB } from 'utils/indexdb.util';

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
            result.current.addCardToInitialBoardLane(card, boardId);
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

    // test('updateCard updates the properties of a card', () => {
    //     const { result } = renderHook(() => useBoardStore());

    //     const laneId = 1;
    //     const cardId = 1;

    //     act(() => {
    //         result.current.addCardToLane(card, laneId);
    //     });

    //     act(() => {
    //         result.current.updateCard(cardUpdate, laneId);
    //     });

    //     act(() => {
    //         const lane = result.current.board.lanes.find(
    //             (lane) => lane.id === laneId
    //         );
    //         const cardResult = lane?.cards.find((card) => card.id === cardId);

    //         expect(cardResult?.title).toBe(cardUpdate.title);
    //         expect(cardResult?.description).toBe(cardUpdate.description);
    //     });
    // });
});
