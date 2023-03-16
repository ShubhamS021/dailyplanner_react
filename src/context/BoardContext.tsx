import { createContext, useEffect, useMemo, useState } from 'react';
import { type DropResult } from 'react-beautiful-dnd';
import { type Card } from '../interfaces/Card';
import { type Lane } from '../interfaces/Lane';
import { colors } from '../theme/colors';

export const initialState: Lane[] = [
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
    board: initialState,
    addCardToLane: (card: Card, laneId: number) => {},
    removeCardFromLane: (cardId: number, laneId: number) => {},
    removeCardsFromLane: (laneId: number) => {},
    handleDragEnd: (result: DropResult) => {},
    clearBoard: () => {},
    exportBoardToJSON: () => {},
    importBoardFromJSON: (e: React.ChangeEvent<HTMLInputElement>) => {},
    updateCard: (card: Card, laneId: number) => {},
    updateTask: (cardId: number, taskId: number, fulfilled: boolean) => {},
});

interface BoardProviderProps {
    children: React.ReactNode;
}

const BoardContextProvider: React.FC<BoardProviderProps> = ({ children }) => {
    const [board, setBoard] = useState<Lane[]>(initialState);

    // Read the initial state from localStorage
    useEffect(() => {
        const storedBoard = localStorage.getItem('board');
        if (storedBoard !== null && storedBoard !== undefined) {
            setBoard(JSON.parse(storedBoard));
        }
    }, []);

    // Update localStorage whenever the board changes
    useEffect(() => {
        localStorage.setItem('board', JSON.stringify(board));
    }, [board]);

    const findLastCardId = () => {
        let lastId = 1;

        board.forEach((lane) => {
            lane.cards.forEach((card) => {
                if (card.id > lastId) lastId = card.id;
            });
        });

        return lastId;
    };

    const addCardToLane = (card: Card, laneId: number) => {
        card.id = findLastCardId() + 1;
        setBoard((prevBoard) => {
            return prevBoard.map((lane) => {
                if (lane.id === laneId) {
                    return { ...lane, cards: [...lane.cards, card] };
                }
                return lane;
            });
        });
    };

    const updateCard = (card: Card, laneId: number) => {
        setBoard((prevBoard) => {
            return prevBoard.map((lane) => {
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
            });
        });
    };

    const updateTask = (cardId: number, taskId: number, fulfilled: boolean) => {
        setBoard((prevBoard) => {
            return prevBoard.map((lane) => {
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
            });
        });
    };

    const removeCardFromLane = (cardId: number, laneId: number) => {
        setBoard((prevBoard) => {
            return prevBoard.map((lane) => {
                if (lane.id === laneId) {
                    return {
                        ...lane,
                        cards: lane.cards.filter((card) => card.id !== cardId),
                    };
                }
                return lane;
            });
        });
    };

    const removeCardsFromLane = (laneId: number) => {
        setBoard((prevBoard) => {
            return prevBoard.map((lane) => {
                if (lane.id === laneId) {
                    return {
                        ...lane,
                        cards: [],
                    };
                }
                return lane;
            });
        });
    };

    const clearBoard = () => {
        setBoard((prevBoard) => {
            return prevBoard.map((lane) => {
                return {
                    ...lane,
                    cards: [],
                };
            });
        });
    };

    const restoreBoard = (board: Lane[]) => {
        setBoard((prevBoard) => {
            return prevBoard.map((lane, index) => {
                return {
                    ...lane,
                    cards: board[index].cards,
                };
            });
        });
    };

    const importBoardFromJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        if (e.target.files !== null) {
            fileReader.readAsText(e.target.files[0], 'UTF-8');
            fileReader.onload = () => {
                const boardJSON = String(fileReader.result);
                try {
                    const parsedBoard = JSON.parse(boardJSON);
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
        link.download = `BoardExport-${currentDate.toLocaleString()}.json`;

        link.click();
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
            const laneIndex = board.findIndex(
                (lane) => lane.id === sourceLaneId
            );
            const lane = board[laneIndex];
            const newCards = Array.from(lane.cards);
            const [removedCard] = newCards.splice(sourceCardIndex, 1);
            newCards.splice(destCardIndex, 0, removedCard);

            const newLane = { ...lane, cards: newCards };
            const newBoard = [...board];
            newBoard.splice(laneIndex, 1, newLane);
            setBoard(newBoard);
        } else {
            // Move card to a different lane
            const sourceLaneIndex = board.findIndex(
                (lane) => lane.id === sourceLaneId
            );
            const destLaneIndex = board.findIndex(
                (lane) => lane.id === destLaneId
            );
            const sourceLane = board[sourceLaneIndex];
            const destLane = board[destLaneIndex];
            const sourceCards = Array.from(sourceLane.cards);
            const destCards = Array.from(destLane.cards);
            const [removedCard] = sourceCards.splice(sourceCardIndex, 1);
            destCards.splice(destCardIndex, 0, removedCard);

            const newSourceLane = { ...sourceLane, cards: sourceCards };
            const newDestLane = { ...destLane, cards: destCards };
            const newBoard = [...board];
            newBoard.splice(sourceLaneIndex, 1, newSourceLane);
            newBoard.splice(destLaneIndex, 1, newDestLane);
            setBoard(newBoard);
        }
    };

    const value = useMemo(
        () => ({
            board,
            addCardToLane,
            removeCardFromLane,
            removeCardsFromLane,
            handleDragEnd,
            clearBoard,
            exportBoardToJSON,
            importBoardFromJSON,
            updateCard,
            updateTask,
        }),
        [board]
    );

    return (
        <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
    );
};

export default BoardContextProvider;
