import { type Lane } from '@/interfaces/Lane';
import { act, cleanup, renderHook } from '@testing-library/react';
import { card } from '../../../__mocks__/cards.mock';
import { initialBoardState } from './data/initialBoard.state';
import { initialLanes } from './data/initialLanes.state';
import { useBoardStore } from './useBoardStore';

import { useDayplannerDB } from '@/hooks/useDayplannerDB/useDayplannerDB';
import { type Card } from '@/interfaces/Card';
import { type DropResult } from 'react-beautiful-dnd';
import { vi } from 'vitest';
import { fulfilledTask, task } from '../../../__mocks__/tasks.mock';

describe('useBoardStore', () => {
    // add a default board with some columns
    beforeEach(() => {
        renderHook(() => useDayplannerDB('history'));
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
        vi.resetAllMocks();
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

        // check negative case
        try {
            result.current.addCardToInitialBoardLane({ ...card }, 777);
        } catch (e) {
            expect(e.message).toBe('addCardToInitialBoardLane no board found');
        }
    });

    test('removeLaneFromBoard removes a lane from the board', () => {
        const { result } = renderHook(() => useBoardStore());

        const laneId = 1;
        const boardId = 1;

        act(() => {
            result.current.removeLaneFromBoard(laneId, boardId);
        });

        const board = result.current.board;
        const lane = board.lanes.find((lane) => lane.id === laneId);

        expect(lane).toBeUndefined();

        // check negative case
        try {
            result.current.removeLaneFromBoard(laneId, 777);
        } catch (e) {
            expect(e.message).toBe('removeLaneFromBoard no board found');
        }
    });

    test('removeLaneFromBoard fails due to unknown lane', () => {
        const { result } = renderHook(() => useBoardStore());

        const laneId = 1;
        const wrongLaneId = 666;
        const boardId = 1;

        act(() => {
            result.current.removeLaneFromBoard(wrongLaneId, boardId);
        });

        const board = result.current.board;
        const lane = board.lanes.find((lane) => lane.id === laneId);

        expect(lane).toBeDefined();
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
        const spy = vi.spyOn(result.current, 'exportBoardToJSON');

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

    test('Move a card in a lane', () => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            result.current.addCardToLane({ ...card }, 0);
            result.current.addCardToLane({ ...card }, 0);
        });

        const source = {
            droppableId: '1',
            index: 0,
        };
        const destination = {
            droppableId: '1',
            index: 1,
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
            const movedCard = result.current.board.lanes[0].cards.find(
                (c) => c.id === 1
            );

            if (movedCard !== undefined) {
                expect(
                    result.current.board.lanes[0].cards.indexOf(movedCard)
                ).toBe(0);
            }
        });
    });

    test('Fail movement due to missing destination', () => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            result.current.addCardToLane({ ...card }, 0);
        });
        const source = {
            droppableId: '1',
            index: 1,
        };

        act(() => {
            const dropResult: DropResult = {
                source,
                destination: null,
                reason: 'DROP',
                combine: undefined,
                mode: 'FLUID',
                draggableId: '1',
                type: '',
            };
            result.current.handleDragEnd(dropResult);
        });

        act(() => {
            const [firstLane] = result.current.board.lanes;
            expect(firstLane.cards.some((c) => c.id === card.id)).toBe(true);
        });
    });

    test('Fail movement due to same destination', () => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            result.current.addCardToLane({ ...card }, 0);
        });
        const source = {
            droppableId: '1',
            index: 1,
        };
        const destination = {
            droppableId: '1',
            index: 1,
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
            const [firstLane] = result.current.board.lanes;
            expect(firstLane.cards.some((c) => c.id === card.id)).toBe(true);
        });
    });

    test('Restores a board', () => {
        const { result } = renderHook(() => useBoardStore());

        const boardId = 777;
        act(() => {
            result.current.addBoard({ ...initialBoardState, id: boardId });
        });

        act(() => {
            result.current.updateBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            });
        });

        expect(result.current.boards.some((b) => b.id === boardId)).toBe(true);
    });

    test('Adds a task to a card', () => {
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            result.current.addCardToLane({ ...card }, 0);
        });

        act(() => {
            const [firstLane] = result.current.board.lanes;
            const [firstCard] = firstLane.cards;

            if (firstCard != null) {
                const updatedCard: Card = {
                    ...firstCard,
                    tasks: [task, fulfilledTask],
                };
                result.current.updateCard(updatedCard, firstLane.id);
            }
        });

        // check the two tasks
        act(() => {
            const [firstLane] = result.current.board.lanes;
            const [firstCard] = firstLane.cards;

            if (firstCard?.tasks !== undefined) {
                expect(firstCard.tasks.length).toBe(2);
                const [first, second] = firstCard.tasks;
                expect(first.fulfilled).toBeUndefined();
                expect(second.fulfilled).toBe(true);
            }
        });

        // update the two tasks
        act(() => {
            const [firstLane] = result.current.board.lanes;
            const [firstCard] = firstLane.cards;

            if (firstCard.tasks !== undefined) {
                const [first, second] = firstCard.tasks;

                result.current.updateTask(firstCard.id, first.id, true);
                result.current.updateTask(firstCard.id, second.id, false);

                expect(first.fulfilled).toBe(true);
                expect(second.fulfilled).toBe(false);
            }
        });

        // check negative cases
        act(() => {
            const [firstLane] = result.current.board.lanes;
            const [firstCard] = firstLane.cards;

            if (firstCard.tasks !== undefined) {
                const [first] = firstCard.tasks;

                try {
                    result.current.updateTask(777, first.id, false);
                } catch (e) {
                    expect(e.message).toBe('Expected card not in lanes!');
                }

                try {
                    result.current.updateTask(firstCard.id, 777, true);
                } catch (e) {
                    expect(e.message).toBe('Expected task not in card!');
                }
            }
        });
    });

    test('Renames a board', () => {
        const { result } = renderHook(() => useBoardStore());

        const newTitle = 'Title after rename';
        const newSubtitle = 'Subtitle after rename';

        const [firstBoard] = result.current.boards;
        act(() => {
            result.current.renameBoard(firstBoard.id, newTitle, newSubtitle);
        });

        act(() => {
            const [firstBoard] = result.current.boards;
            expect(firstBoard.title).toBe(newTitle);
            expect(firstBoard.subtitle).toBe(newSubtitle);
        });

        // check negative case
        try {
            result.current.renameBoard(777, newTitle, newSubtitle);
        } catch (e) {
            expect(e.message).toBe('No board with id 777 found.');
        }
    });

    test('Renames a lane', () => {
        const { result } = renderHook(() => useBoardStore());

        const newTitle = 'Title after rename';
        act(() => {
            const [firstLane] = result.current.board.lanes;
            result.current.renameLane(firstLane.id, newTitle);
        });

        act(() => {
            const [firstLane] = result.current.board.lanes;
            expect(firstLane.title).toBe(newTitle);
        });

        // check negative case
        try {
            result.current.renameLane(777, newTitle);
        } catch (e) {
            expect(e.message).toBe('No lane with id 777 found.');
        }
    });

    test('Recolors a lane', () => {
        const { result } = renderHook(() => useBoardStore());

        const newColor = '#112233';
        act(() => {
            const [firstLane] = result.current.board.lanes;
            result.current.updateLaneColor(firstLane.id, newColor);
        });

        act(() => {
            const [firstLane] = result.current.board.lanes;
            expect(firstLane.color).toBe(newColor);
        });

        // check negative case
        try {
            result.current.updateLaneColor(777, newColor);
        } catch (e) {
            expect(e.message).toBe('No lane with id 777 found.');
        }
    });

    test('Moves a lane', () => {
        const { result } = renderHook(() => useBoardStore());

        const laneId = 1;
        const newPosition = 3;
        act(() => {
            result.current.moveLane(result.current.board, laneId, newPosition);
        });

        act(() => {
            expect(result.current.board.lanes[newPosition].id).toBe(laneId);
        });
    });

    test('Enters a board', () => {
        const { result } = renderHook(() => useBoardStore());

        const boardId = 1;
        act(() => {
            result.current.enterBoard(boardId);
        });

        act(() => {
            expect(result.current.board.id).toBe(boardId);
        });

        // check negative case
        try {
            result.current.enterBoard(777);
        } catch (e) {
            expect(e.message).toBe('No board with id 777 found.');
        }
    });
});
