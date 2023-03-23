import { createContext, useEffect, useMemo, useState } from 'react';
import { type DropResult } from 'react-beautiful-dnd';
import { Board } from '../interfaces/Board';
import { type Card } from '../interfaces/Card';
import { type Lane } from '../interfaces/Lane';
import { colors } from '../theme/colors';

export type BoardMode =
    | 'boardDefaultMode'
    | 'boardChooseMode'
    | 'boardCreateMode'
    | 'boardCustomLanesMode';

export const initialBoardState: Board = {
    id: 0,
    title: 'My tasks',
    subtitle: 'An overview of my tasks.',
    lanes: [],
};

export const initialLanes: Lane[] = [
    {
        id: 1,
        title: 'Not Started',
        color: colors.light_grey,
        cards: [],
    },
    {
        id: 2,
        title: 'In Progress',
        color: colors.lavender,
        cards: [],
    },
    {
        id: 3,
        title: 'Blocked',
        color: colors.rose,
        cards: [],
    },
    {
        id: 4,
        title: 'Done',
        color: colors.green,
        cards: [],
    },
];

export const BoardContext = createContext({
    boards: new Array<Board>(),
    board: new Board(),
    compactMode: false,
    boardMode: 'boardChooseMode' as BoardMode,
    addLaneToBoard: (lane: Lane, boardId: number) => {},
    addCardToLane: (card: Card, laneId: number) => {},
    removeLaneFromBoard: (laneId: number, boardId: number) => {},
    removeCardFromLane: (cardId: number, laneId: number) => {},
    removeCardsFromLane: (laneId: number) => {},
    handleDragEnd: (result: DropResult) => {},
    clearBoard: () => {},
    exportBoardToJSON: () => {},
    importBoardFromJSON: (e: React.ChangeEvent<HTMLInputElement>) => {},
    updateCard: (card: Card, laneId: number) => {},
    updateTask: (cardId: number, taskId: number, fulfilled: boolean) => {},
    toggleCompactMode: () => {},
    toggleBoardMode: (mode: BoardMode) => {},
    addBoard: (board: Board) => {},
    removeBoard: (boardId: number) => {},
    enterBoard: (boardId: number) => {},
});

interface BoardProviderProps {
    children: React.ReactNode;
}

const BoardContextProvider: React.FC<BoardProviderProps> = ({ children }) => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [board, setBoard] = useState<Board>(new Board());
    const [compactMode, setCompactMode] = useState(false);
    const [boardMode, setBoardMode] = useState<BoardMode>('boardChooseMode');

    // Read the initial boards state from localStorage and toggle initial app mode
    useEffect(() => {
        const storedBoards = localStorage.getItem('boards');
        if (storedBoards !== null && storedBoards !== undefined) {
            const parsedBoards: Board[] = JSON.parse(storedBoards);
            setBoards(parsedBoards);

            // toggle startup mode
            const currentBoardId: number = +(
                localStorage.getItem('currentBoard') ?? '-1'
            );

            if (parsedBoards.some((b) => b.id === currentBoardId)) {
                setBoard(
                    parsedBoards.filter((b) => b.id === currentBoardId)[0]
                );
                toggleBoardMode('boardDefaultMode');
            } else {
                if (parsedBoards.length === 0) {
                    toggleBoardMode('boardCreateMode');
                }
            }
        }
    }, []);

    // Update localStorage whenever the boards change
    useEffect(() => {
        localStorage.setItem('boards', JSON.stringify(boards));
    }, [boards]);

    // update boards whenever a board changes
    useEffect(() => {
        updateBoards(board);
    }, [board]);

    const findLastCardId = () => {
        let lastId = 1;

        board.lanes.forEach((lane) => {
            lane.cards.forEach((card) => {
                if (card.id > lastId) lastId = card.id;
            });
        });

        return lastId;
    };

    const addCardToLane = (card: Card, laneId: number) => {
        card.id = findLastCardId() + 1;
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                lanes: prevBoard.lanes.map((lane) => {
                    if (lane.id === laneId) {
                        return { ...lane, cards: [...lane.cards, card] };
                    }
                    return lane;
                }),
            };
        });
    };

    const addLaneToBoard = (lane: Lane, boardId: number) => {
        const newLane = {
            ...lane,
            id: boards.find((b) => b.id === boardId)?.lanes?.length ?? 1,
        };
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                lanes: [...prevBoard.lanes, newLane],
            };
        });
    };

    const removeLaneFromBoard = (laneId: number, boardId: number) => {
        const board = boards.find((b) => b.id === boardId);
        if (board == null)
            throw new Error('removeLaneFromBoard no board found');

        const newBoard = {
            ...board,
            lanes: [...board.lanes.filter((l) => l.id !== laneId)],
        };

        setBoard((_prevBoard) => {
            return { ...newBoard };
        });
    };

    const updateBoards = (board: Board) => {
        const updatedBoard = { ...board };
        setBoards((prevBoards) => {
            return [
                ...prevBoards.map((b) => {
                    return b.id === board.id ? updatedBoard : b;
                }),
            ];
        });
    };

    const addBoard = (board: Board) => {
        const newBoard = { ...board };
        newBoard.id = boards.length;

        setBoards((prevBoards) => {
            return [...prevBoards, newBoard];
        });

        setBoard((_prevBoard) => {
            return { ...newBoard };
        });
    };

    const enterBoard = (boardId: number) => {
        const targetBoard = boards.find((b) => b.id === boardId);
        if (targetBoard === undefined) {
            throw new Error(`No board with id ${boardId} found.`);
        }
        setBoard(targetBoard);
        toggleBoardMode('boardDefaultMode');
        localStorage.setItem('currentBoard', boardId.toString());
    };

    const removeBoard = (boardId: number) => {
        setBoards((prevBoards) => {
            const newBoards = [...prevBoards.filter((b) => b.id !== boardId)];
            if (newBoards.length === 0) {
                toggleBoardMode('boardCreateMode');
            }
            return newBoards;
        });
    };

    const updateCard = (card: Card, laneId: number) => {
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                lanes: prevBoard.lanes.map((lane) => {
                    const newLaneCards = lane.cards.map((c) =>
                        c.id === card.id ? card : c
                    );
                    if (lane.id === laneId) {
                        return {
                            ...lane,
                            cards: [...newLaneCards],
                        };
                    }
                    return lane;
                }),
            };
        });
    };

    const updateTask = (cardId: number, taskId: number, fulfilled: boolean) => {
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                lanes: prevBoard.lanes.map((lane) => {
                    if (lane.cards.some((c) => c.id === cardId)) {
                        const card = lane.cards.find((c) => c.id) as Card;
                        if (card === null)
                            throw new Error('Expected card not in lane!');

                        if (card.tasks === null) {
                            throw new Error('Expected tasks not in card!');
                        }

                        card.tasks?.map((t) =>
                            t.id === taskId
                                ? (t.fulfilled = fulfilled)
                                : t.fulfilled
                        );

                        updateCard(card, lane.id);
                    }
                    return lane;
                }),
            };
        });
    };

    const removeCardFromLane = (cardId: number, laneId: number) => {
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                lanes: prevBoard.lanes.map((lane) => {
                    if (lane.id === laneId) {
                        return {
                            ...lane,
                            cards: lane.cards.filter(
                                (card) => card.id !== cardId
                            ),
                        };
                    }
                    return lane;
                }),
            };
        });
    };

    const removeCardsFromLane = (laneId: number) => {
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                lanes: prevBoard.lanes.map((lane) => {
                    if (lane.id === laneId) {
                        return {
                            ...lane,
                            cards: [],
                        };
                    }
                    return lane;
                }),
            };
        });
    };

    const clearBoard = () => {
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                lanes: prevBoard.lanes.map((lane) => {
                    return {
                        ...lane,
                        cards: [],
                    };
                }),
            };
        });
    };

    const restoreBoard = (board: Board) => {
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                title: board.title,
                subtitle: board.subtitle,
                lanes: board.lanes,
            };
        });
    };

    const importBoardFromJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        if (e.target.files !== null) {
            fileReader.readAsText(e.target.files[0], 'UTF-8');
            fileReader.onload = () => {
                const boardJSON = String(fileReader.result);
                try {
                    const parsedBoard = JSON.parse(boardJSON) as Board;
                    restoreBoard(parsedBoard);
                } catch (error) {}
            };
        }
    };

    const exportBoardToJSON = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(board)
        )}`;
        const link = document.createElement('a');
        link.href = jsonString;
        const currentDate = new Date();
        link.download = `BoardExport-${board.title.replaceAll(
            ' ',
            '_'
        )}-${currentDate.toLocaleString()}.json`;

        link.click();
    };

    const toggleCompactMode = () => {
        setCompactMode(!compactMode);
    };

    const toggleBoardMode = (mode: BoardMode) => {
        setBoardMode(mode);
    };

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (destination === null || destination === undefined) {
            return;
        }
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceLaneId = parseInt(source.droppableId);
        const destLaneId = parseInt(destination.droppableId);
        const sourceCardIndex = source.index;
        const destCardIndex = destination.index;

        if (sourceLaneId === destLaneId) {
            // Reorder cards in the same lane
            const laneIndex = board.lanes.findIndex(
                (lane) => lane.id === sourceLaneId
            );
            const lane = board.lanes[laneIndex];
            const newCards = Array.from(lane.cards);
            const [removedCard] = newCards.splice(sourceCardIndex, 1);
            newCards.splice(destCardIndex, 0, removedCard);

            const newLane = { ...lane, cards: newCards };
            const newBoard = { ...board, lanes: [...board.lanes] };
            newBoard.lanes.splice(laneIndex, 1, newLane);
            setBoard(newBoard);
        } else {
            // Move card to a different lane
            const sourceLaneIndex = board.lanes.findIndex(
                (lane) => lane.id === sourceLaneId
            );
            const destLaneIndex = board.lanes.findIndex(
                (lane) => lane.id === destLaneId
            );
            const sourceLane = board.lanes[sourceLaneIndex];
            const destLane = board.lanes[destLaneIndex];
            const sourceCards = Array.from(sourceLane.cards);
            const destCards = Array.from(destLane.cards);
            const [removedCard] = sourceCards.splice(sourceCardIndex, 1);
            destCards.splice(destCardIndex, 0, removedCard);

            const newSourceLane = { ...sourceLane, cards: sourceCards };
            const newDestLane = { ...destLane, cards: destCards };
            const newBoard = { ...board, lanes: [...board.lanes] };
            newBoard.lanes.splice(sourceLaneIndex, 1, newSourceLane);
            newBoard.lanes.splice(destLaneIndex, 1, newDestLane);
            setBoard(newBoard);
        }
    };

    const value = useMemo(
        () => ({
            boards,
            board,
            compactMode,
            boardMode,
            addCardToLane,
            addLaneToBoard,
            removeLaneFromBoard,
            removeCardFromLane,
            removeCardsFromLane,
            handleDragEnd,
            clearBoard,
            exportBoardToJSON,
            importBoardFromJSON,
            updateCard,
            updateTask,
            toggleCompactMode,
            toggleBoardMode,
            addBoard,
            removeBoard,
            enterBoard,
        }),
        [boards, board, compactMode, boardMode]
    );

    return (
        <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
    );
};

export default BoardContextProvider;
