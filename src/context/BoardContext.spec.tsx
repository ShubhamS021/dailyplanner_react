import { act, fireEvent, renderHook } from '@testing-library/react';
import { useContext } from 'react';
import { type DropResult } from 'react-beautiful-dnd';
import { type Card } from '../interfaces/Card';
import BoardContextProvider, {
    BoardContext,
    initialState,
} from './BoardContext';

describe('BoardContext', () => {
    it('should add a card to a lane', () => {
        const card: Card = {
            id: 1,
            title: 'Test Card',
            description: '',
        };
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });
        act(() => {
            result.current.addCardToLane(card, 1);
        });
        expect(result.current.board[0].cards.length).toBe(1);
        expect(result.current.board[0].cards[0].title).toBe('Test Card');
    });

    it('should remove a card from a lane', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });

        expect(result.current.board[0].cards.length).toBe(1);
        expect(result.current.board[0].cards[0].title).toBe('Test Card');

        act(() => {
            result.current.removeCardFromLane(2, 1);
        });
        expect(result.current.board[0].cards.length).toBe(0);
    });

    it('should reorder cards in the same lane', () => {
        const card1: Card = {
            id: 2,
            title: 'Card 1',
            description: '',
        };
        const card2: Card = {
            id: 3,
            title: 'Card 2',
            description: '',
        };
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });

        act(() => {
            result.current.addCardToLane(card1, 1);
            result.current.addCardToLane(card2, 1);
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
        expect(result.current.board[0].cards[0]).toEqual(card2);
        expect(result.current.board[0].cards[1]).toEqual(card1);
    });

    it('should move a card to a different lane', () => {
        const card3: Card = {
            id: 3,
            title: 'Card 2-1',
            description: '',
        };

        const card4: Card = {
            id: 4,
            title: 'Card 2-2',
            description: '',
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });
        act(() => {
            result.current.addCardToLane(card3, 2);
            result.current.addCardToLane(card4, 2);
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
        expect(result.current.board[0].cards.length).toEqual(1);
        expect(result.current.board[1].cards.length).toEqual(3);
    });

    it('should return early', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });

        const source = {
            droppableId: '1',
            index: 0,
        };

        // no destination
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

        // same destination
        const destination = {
            droppableId: '1',
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
    });

    it('should export a board', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });

        result.current.exportBoardToJSON();
    });

    it('should import a board', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });

        const boardImport = new File(
            [JSON.stringify(initialState)],
            'data.json',
            {
                type: 'application/json',
            }
        );

        const fileList = {
            0: boardImport,
            length: 1,
            item: (index: number) => {
                return this?.[index];
            },
        };

        const input = document.createElement('input');
        input.type = 'file';
        Object.defineProperty(input, 'files', {
            value: fileList,
        });

        fireEvent.change(input);

        const event = {
            target: { files: input.files },
        };

        result.current.importBoardFromJSON(
            event as React.ChangeEvent<HTMLInputElement>
        );
    });
});

it('should update a existing card', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BoardContextProvider>{children}</BoardContextProvider>
    );
    const { result } = renderHook(() => useContext(BoardContext), {
        wrapper,
    });

    const card: Card = {
        id: 1,
        title: 'Card 1',
    };

    act(() => {
        result.current.addCardToLane(card, 1);
    });

    act(() => {
        const updatedCard: Card = {
            ...result.current.board[0].cards[0],
            title: 'Card 1 updated',
        };
        result.current.updateCard(updatedCard, 1);
    });

    expect(result.current.board[0].cards[0].title).toBe('Card 1 updated');
});

it('should update a existing cards task', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BoardContextProvider>{children}</BoardContextProvider>
    );
    const { result } = renderHook(() => useContext(BoardContext), {
        wrapper,
    });

    act(() => {
        result.current.clearBoard();
    });

    const card: Card = {
        id: 0,
        title: 'Card 1',
        tasks: [{ id: 1, description: 'Task' }],
    };

    act(() => {
        result.current.addCardToLane(card, 1);
    });

    act(() => {
        result.current.updateTask(2, 1, true);
    });

    expect(result.current.board[0]?.cards[0]?.tasks?.[0].fulfilled).toBe(true);
});

it('should remove cards from existing lane', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BoardContextProvider>{children}</BoardContextProvider>
    );
    const { result } = renderHook(() => useContext(BoardContext), {
        wrapper,
    });

    act(() => {
        result.current.removeCardsFromLane(1);
    });

    expect(result.current.board[0]?.cards.length).toBe(0);
});
