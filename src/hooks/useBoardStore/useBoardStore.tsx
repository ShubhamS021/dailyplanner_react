import { type BoardStoreActions } from '@/hooks/useBoardStore/interfaces/BoardStoreActions';
import { type BoardStoreState } from '@/hooks/useBoardStore/interfaces/BoardStoreState';
import {
    exportBoardToJson,
    findLastBoardId,
    findLastCardId,
    findLastCardIdInBoard,
} from '@/hooks/useBoardStore/util/board.util';
import { Board } from '@/interfaces/Board';
import { type Card } from '@/interfaces/Card';
import { type Lane } from '@/interfaces/Lane';
import type Task from '@/interfaces/Task';
import { ColorVariant } from '@/types/ColorVariant';
import { type ThemeMode } from '@/types/ThemeMode';
import { type DropResult } from 'react-beautiful-dnd';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { usePageStore } from '../usePageStore/usePageStore';

export const useBoardStore = create<BoardStoreState & BoardStoreActions>()(
    devtools(
        persist(
            (set) => ({
                boards: new Array<Board>(),
                board: new Board(),
                compactMode: false,
                themeMode: 'light' as ThemeMode,

                /**
                 * Adds a lane to the board.
                 * @param {Lane} lane - The lane to be added.
                 * @param {number} boardId - The ID of the board to add the lane to.
                 */
                addLaneToBoard: (lane: Lane, boardId: number): void => {
                    set((state) => {
                        const newLane = {
                            ...lane,
                            id:
                                state.boards.find((b) => b.id === boardId)
                                    ?.lanes?.length ?? 1,
                        };

                        return {
                            board: {
                                ...state.board,
                                lanes: [...state.board.lanes, newLane],
                            },
                        };
                    });
                },

                /**
                 * Adds a card to a lane.
                 * @param {Card} card - The card to be added.
                 * @param {number} laneId - The ID of the lane to add the card to.
                 */
                addCardToLane: (card: Card, laneId: number) => {
                    set((state) => {
                        card.id = findLastCardId(state.board) + 1;

                        return {
                            ...state,
                            board: {
                                ...state.board,
                                lanes: state.board.lanes.map((lane: Lane) => {
                                    if (lane.id === laneId) {
                                        return {
                                            ...lane,
                                            cards: [...lane.cards, card],
                                        };
                                    }
                                    return lane;
                                }),
                            },
                        };
                    });
                },

                /**
                 * Adds a card to the initial lane of a board.
                 * @param {Card} card - The card to be added.
                 * @param {number} boardId - The ID of the board.
                 */
                addCardToInitialBoardLane: (card: Card, boardId: number) => {
                    set((state) => {
                        const board = state.boards.find(
                            (b) => b.id === boardId
                        );

                        if (board == null)
                            throw new Error(
                                'addCardToInitialBoardLane no board found'
                            );

                        const [firstLane] = board.lanes;
                        firstLane.cards.push(card);

                        return { boards: [...state.boards, { ...board }] };
                    });
                },

                /**
                 * Removes a lane from a board.
                 * @param {number} laneId - The ID of the lane to remove.
                 * @param {number} boardId - The ID of the board.
                 */
                removeLaneFromBoard: (laneId: number, boardId: number) => {
                    set((state) => {
                        const board = state.boards.find(
                            (b) => b.id === boardId
                        );
                        if (board == null)
                            throw new Error(
                                'removeLaneFromBoard no board found'
                            );

                        const newBoard = {
                            ...board,
                            lanes: [
                                ...board.lanes.filter(
                                    (l: Lane) => l.id !== laneId
                                ),
                            ],
                        };

                        return { board: { ...newBoard } };
                    });
                },

                /**
                 * Removes a card from a lane.
                 * @param {number} cardId - The ID of the card to remove.
                 * @param {number} laneId - The ID of the lane.
                 */
                removeCardFromLane: (cardId: number, laneId: number) => {
                    set((state) => {
                        const updatedLanes = state.board.lanes.map(
                            (lane: Lane) => {
                                if (lane.id === laneId) {
                                    return {
                                        ...lane,
                                        cards: lane.cards.filter(
                                            (card) => card.id !== cardId
                                        ),
                                    };
                                }
                                return lane;
                            }
                        );

                        const updatedBoard = {
                            ...state.board,
                            lanes: updatedLanes,
                        };

                        return { board: { ...updatedBoard } };
                    });
                },

                /**
                 * Removes all cards from a lane.
                 * @param {number} laneId - The ID of the lane.
                 */
                removeCardsFromLane: (laneId: number) => {
                    set((state) => {
                        const laneIndex = state.board.lanes.findIndex(
                            (lane: Lane) => lane.id === laneId
                        );

                        if (laneIndex === -1) {
                            return { ...state };
                        }

                        const newLanes = [...state.board.lanes];
                        newLanes[laneIndex] = {
                            ...newLanes[laneIndex],
                            cards: [],
                        };

                        return { board: { ...state.board, lanes: newLanes } };
                    });
                },

                /**
                 * Moves a card to a different board.
                 * @param {Card} card - The card to move.
                 * @param {Board} newboard - The target board to move the card to.
                 */
                moveCardToBoard: (card: Card, newboard: Board) => {
                    set((state) => {
                        const newCard = {
                            ...card,
                            id: findLastCardIdInBoard(newboard) + 1,
                        };
                        state.addCardToInitialBoardLane(newCard, newboard.id);

                        return { ...state };
                    });
                },

                /**
                 * Handles the end of a drag operation.
                 * @param {DropResult} result - The result of the drag operation.
                 */
                handleDragEnd: (result: DropResult) => {
                    set((state) => {
                        const { source, destination } = result;
                        if (destination === null || destination === undefined) {
                            return { ...state };
                        }
                        if (
                            source.droppableId === destination.droppableId &&
                            source.index === destination.index
                        ) {
                            return { ...state };
                        }

                        const sourceLaneId = parseInt(source.droppableId);
                        const destLaneId = parseInt(destination.droppableId);
                        const sourceCardIndex = source.index;
                        const destCardIndex = destination.index;

                        if (sourceLaneId === destLaneId) {
                            // Reorder cards in the same lane
                            const laneIndex = state.board.lanes.findIndex(
                                (lane: Lane) => lane.id === sourceLaneId
                            );
                            const lane = state.board.lanes[laneIndex];
                            const newCards = Array.from(lane.cards);
                            const [removedCard] = newCards.splice(
                                sourceCardIndex,
                                1
                            );
                            newCards.splice(destCardIndex, 0, removedCard);

                            const newLane = { ...lane, cards: newCards };
                            const newBoard = {
                                ...state.board,
                                lanes: [...state.board.lanes],
                            };
                            newBoard.lanes.splice(laneIndex, 1, newLane);
                            return { board: { ...newBoard } };
                        } else {
                            // Move card to a different lane
                            const sourceLaneIndex = state.board.lanes.findIndex(
                                (lane: Lane) => lane.id === sourceLaneId
                            );
                            const destLaneIndex = state.board.lanes.findIndex(
                                (lane: Lane) => lane.id === destLaneId
                            );
                            const sourceLane =
                                state.board.lanes[sourceLaneIndex];
                            const destLane = state.board.lanes[destLaneIndex];
                            const sourceCards = Array.from(sourceLane.cards);
                            const destCards = Array.from(destLane.cards);
                            const [removedCard] = sourceCards.splice(
                                sourceCardIndex,
                                1
                            );
                            destCards.splice(destCardIndex, 0, removedCard);

                            const newSourceLane = {
                                ...sourceLane,
                                cards: sourceCards,
                            };
                            const newDestLane = {
                                ...destLane,
                                cards: destCards,
                            };
                            const newBoard = {
                                ...state.board,
                                lanes: [...state.board.lanes],
                            };
                            newBoard.lanes.splice(
                                sourceLaneIndex,
                                1,
                                newSourceLane
                            );
                            newBoard.lanes.splice(
                                destLaneIndex,
                                1,
                                newDestLane
                            );
                            return { board: { ...newBoard } };
                        }
                    });
                },

                /**
                 * Clears the current board.
                 */
                clearBoard: () => {
                    set((state) => {
                        return {
                            board: {
                                ...state.board,
                                lanes: state.board.lanes.map((lane: Lane) => {
                                    return {
                                        ...lane,
                                        cards: [],
                                    };
                                }),
                            },
                        };
                    });
                },

                /**
                 * Exports a board to JSON.
                 * @param {Board} board - The board to export.
                 */
                exportBoardToJSON: (board: Board) => {
                    set((state) => {
                        exportBoardToJson(board);
                        return { ...state };
                    });
                },

                /**
                 * Exports all boards to JSON.
                 */
                exportBoardsToJSON: () => {
                    set((state) => {
                        state.boards.forEach((board) => {
                            state.exportBoardToJSON(board);
                        });
                        return { ...state };
                    });
                },

                /**
                 * Imports a board from JSON.
                 * @param {React.ChangeEvent<HTMLInputElement>} e - The file change event.
                 * @param {boolean} multiple - Indicates whether to import multiple boards or just one.
                 */
                importBoardFromJSON: (
                    e: React.ChangeEvent<HTMLInputElement>,
                    multiple: boolean
                ) => {
                    set((state) => {
                        if (e.target.files !== null) {
                            let lastBoardId = findLastBoardId(state.boards) + 1;
                            for (const file of e.target.files) {
                                const fileReader = new FileReader();
                                fileReader.readAsText(file, 'UTF-8');
                                fileReader.onload = () => {
                                    const boardJSON = String(fileReader.result);

                                    const parsedBoard = JSON.parse(
                                        boardJSON
                                    ) as Board;
                                    if (multiple) {
                                        lastBoardId = lastBoardId + 1;
                                        parsedBoard.id = lastBoardId;

                                        state.addBoard(parsedBoard);
                                    } else {
                                        state.updateBoard(parsedBoard);
                                    }
                                };
                            }
                        }
                        return { ...state };
                    });
                },

                /**
                 * Updates a card in a lane.
                 * @param {Card} card - The updated card.
                 * @param {number} laneId - The ID of the lane.
                 */
                updateCard: (card: Card, laneId: number) => {
                    set((state) => {
                        const laneIndex = state.board.lanes.findIndex(
                            (lane: Lane) => lane.id === laneId
                        );

                        if (laneIndex === -1) {
                            return { ...state };
                        }

                        const newLanes = [...state.board.lanes];
                        const newLaneCards = newLanes[laneIndex].cards.map(
                            (c: Card) => (c.id === card.id ? card : c)
                        );

                        newLanes[laneIndex] = {
                            ...newLanes[laneIndex],
                            cards: newLaneCards,
                        };

                        return {
                            board: {
                                ...state.board,
                                lanes: newLanes,
                            },
                        };
                    });
                },

                /**
                 * Updates a task in a card.
                 * @param {number} cardId - The ID of the card.
                 * @param {number} taskId - The ID of the task.
                 * @param {boolean} fulfilled - Indicates whether the task is fulfilled or not.
                 */
                updateTask: (
                    cardId: number,
                    taskId: number,
                    fulfilled: boolean
                ) => {
                    set((state) => {
                        const card = state.board.lanes
                            .flatMap((l: Lane) => l.cards)
                            .find((c: Card) => c.id === cardId);

                        if (card == null) {
                            throw new Error('Expected card not in lanes!');
                        }

                        const task = card.tasks?.find(
                            (t: Task) => t.id === taskId
                        );

                        if (task == null) {
                            throw new Error('Expected task not in card!');
                        }

                        task.fulfilled = fulfilled;

                        const lane = state.board.lanes.find((l: Lane) =>
                            l.cards.includes(card)
                        );

                        if (lane != null) {
                            state.updateCard(card, lane.id);
                        }

                        return { ...state };
                    });
                },

                /**
                 * Toggles the compact mode.
                 */
                toggleCompactMode: () => {
                    set((state) => {
                        return { ...state, compactMode: !state.compactMode };
                    });
                },

                /**
                 * Toggles the theme mode.
                 * @param {ThemeMode} mode - The mode to toggle.
                 */
                toggleThemeMode: (mode: ThemeMode) => {
                    set((state) => {
                        return { ...state, themeMode: mode };
                    });
                },

                /**
                 * Adds a board to the state.
                 * @param {Board} board - The board to add.
                 */
                addBoard: (board: Board) => {
                    set((state) => {
                        const newBoard = { ...board };
                        if (newBoard.id === 0) {
                            newBoard.id = findLastBoardId(state.boards) + 1;
                        }

                        return {
                            boards: [...state.boards, newBoard],
                            board: {
                                ...newBoard,
                            },
                        };
                    });
                },

                /**
                 * Removes a board from the state.
                 * @param {number} boardId - The ID of the board to remove.
                 */
                removeBoard: (boardId: number) => {
                    set((state) => {
                        const newBoards = [
                            ...state.boards.filter((b) => b.id !== boardId),
                        ];

                        let currentBoard = state.board;

                        if (newBoards.length === 0) {
                            currentBoard = new Board();
                            usePageStore.getState().setPage('boardCreatePage');
                        }
                        return {
                            board: currentBoard,
                            boards: [...newBoards],
                        };
                    });
                },

                /**
                 * Renames a board.
                 * @param {number} boardId - The ID of the board to rename.
                 * @param {string} title - The new title of the board.
                 * @param {string} subtitle - The new subtitle of the board.
                 */
                renameBoard: (
                    boardId: number,
                    title: string,
                    subtitle: string
                ) => {
                    set((state) => {
                        const newBoard = state.boards.find(
                            (b) => b.id === boardId
                        );
                        if (newBoard === undefined) {
                            throw new Error(
                                `No board with id ${boardId} found.`
                            );
                        }

                        newBoard.title = title;
                        newBoard.subtitle = subtitle;

                        state.updateBoards(newBoard);
                        return { ...state };
                    });
                },

                /**
                 * Updates the boards in the state.
                 * @param {Board} board - The updated board.
                 */
                updateBoards: (board: Board) => {
                    set((state) => {
                        const updatedBoard = { ...board };
                        return {
                            ...state,
                            boards: [
                                ...state.boards.map((b) => {
                                    return b.id === board.id ? updatedBoard : b;
                                }),
                            ],
                        };
                    });
                },

                /**
                 * Updates the current board in the state.
                 * @param {Board} board - The updated board.
                 */
                updateBoard: (board: Board) => {
                    set((state) => {
                        return {
                            ...state,
                            board: { ...board },
                        };
                    });
                },

                /**
                 * Renames a lane.
                 * @param {number} laneId - The ID of the lane to rename.
                 * @param {string} title - The new title of the lane.
                 */
                renameLane: (laneId: number, title: string) => {
                    set((state) => {
                        const newBoard = { ...state.board };
                        const newLane = newBoard.lanes.find(
                            (l: Lane) => l.id === laneId
                        );
                        if (newLane === undefined) {
                            throw new Error(`No lane with id ${laneId} found.`);
                        }

                        newLane.title = title;

                        state.updateBoards(newBoard);
                        return { ...state };
                    });
                },

                /**
                 * Moves a lane within a board.
                 * @param {Board} targetBoard - The target board.
                 * @param {number} laneId - The ID of the lane to move.
                 * @param {number} newId - The new ID of the lane.
                 */
                moveLane: (
                    targetBoard: Board,
                    laneId: number,
                    newId: number
                ) => {
                    set((state) => {
                        const newBoard = { ...targetBoard };
                        const removedLane = newBoard.lanes.splice(laneId, 1);
                        newBoard.lanes.splice(newId, 0, ...removedLane);

                        state.updateBoards(newBoard);
                        return { ...state };
                    });
                },

                /**
                 * Updates the color of a lane.
                 * @param {number} laneId - The ID of the lane to update.
                 * @param {ColorVariant} variant - The new variant color of the lane.
                 */
                updateLaneColor: (laneId: number, variant: ColorVariant) => {
                    set((state) => {
                        const newBoard = { ...state.board };
                        const newLane = newBoard.lanes.find(
                            (l: Lane) => l.id === laneId
                        );
                        if (newLane === undefined) {
                            throw new Error(`No lane with id ${laneId} found.`);
                        }

                        newLane.variant = variant;

                        state.updateBoards(newBoard);
                        return { ...state };
                    });
                },

                /**
                 * Sets the current board to the one with the specified ID.
                 * @param {number} boardId - The ID of the board to enter.
                 */
                enterBoard: (boardId: number) => {
                    set((state) => {
                        const targetBoard = state.boards.find(
                            (b) => b.id === boardId
                        );
                        if (targetBoard === undefined) {
                            throw new Error(
                                `No board with id ${boardId} found.`
                            );
                        }

                        usePageStore.getState().setPage('boardDefaultPage');

                        return { board: { ...targetBoard } };
                    });
                },

                /**
                 * Updates the language in the state.
                 * @param {string} language - The new language.
                 */
                updateLanguage: (language: string) => {
                    set((state) => {
                        localStorage.setItem('language', language);
                        return { ...state };
                    });
                },

                updateCurrentBoard: (boardId: number) => {
                    set((state) => {
                        return { ...state, currentBoard: boardId };
                    });
                },
            }),
            {
                name: 'board-store',
                version: 1,
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
