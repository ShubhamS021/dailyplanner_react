import { type Card } from 'interfaces/Card';
import { type Lane } from 'interfaces/Lane';
import { createContext, useMemo, useState } from 'react';
import { colors } from 'theme/colors';

const initialState: Lane[] = [
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
});

interface BoardProviderProps {
    children: React.ReactNode;
}

const BoardContextProvider: React.FC<BoardProviderProps> = ({ children }) => {
    const [board, setBoard] = useState<Lane[]>(initialState);

    const addCardToLane = (card: Card, laneId: number) => {
        setBoard((prevBoard) => {
            return prevBoard.map((lane) => {
                if (lane.id === laneId) {
                    return { ...lane, cards: [...lane.cards, card] };
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

    const value = useMemo(
        () => ({ board, addCardToLane, removeCardFromLane }),
        [board]
    );

    return (
        <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
    );
};

export default BoardContextProvider;
