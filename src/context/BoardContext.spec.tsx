import { act, fireEvent, renderHook } from '@testing-library/react';
import { useContext } from 'react';
import { type DropResult } from 'react-beautiful-dnd';
import { type Board } from '../interfaces/Board';
import BoardContextProvider, {
    BoardContext,
    initialBoardState,
    initialLanes,
} from './BoardContext';

let boardContext: any;

describe('BoardContext', () => {
    beforeAll(() => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });

        const board: Board = {
            id: 0,
            title: 'Testboard',
            subtitle: 'Testboards subtitle',
            lanes: initialLanes,
        };

        boardContext = result.current;

        act(() => {
            boardContext.board = board;
            boardContext.addBoard(board);
        });
    });

    // it('should add a card to a lane', () => {
    //     const card: Card = {
    //         id: 1,
    //         title: 'Test Card',
    //         description: '',
    //     };

    //     act(() => {
    //         boardContext.addCardToLane(card, 1);
    //     });
    //     expect(boardContext.board[0].cards.length).toBe(1);
    //     expect(boardContext.board[0].cards[0].title).toBe('Test Card');
    // });

    // it('should remove a card from a lane', () => {
    //     const wrapper = ({ children }: { children: React.ReactNode }) => (
    //         <BoardContextProvider>{children}</BoardContextProvider>
    //     );
    //     const { result } = renderHook(() => useContext(BoardContext), {
    //         wrapper,
    //     });

    //     expect(boardContext.board[0].cards.length).toBe(1);
    //     expect(boardContext.board[0].cards[0].title).toBe('Test Card');

    //     act(() => {
    //         boardContext.removeCardFromLane(2, 1);
    //     });
    //     expect(boardContext.board[0].cards.length).toBe(0);
    // });

    // it('should reorder cards in the same lane', () => {
    //     const card1: Card = {
    //         id: 2,
    //         title: 'Card 1',
    //         description: '',
    //     };
    //     const card2: Card = {
    //         id: 3,
    //         title: 'Card 2',
    //         description: '',
    //     };
    //     const wrapper = ({ children }: { children: React.ReactNode }) => (
    //         <BoardContextProvider>{children}</BoardContextProvider>
    //     );
    //     const { result } = renderHook(() => useContext(BoardContext), {
    //         wrapper,
    //     });

    //     act(() => {
    //         boardContext.addCardToLane(card1, 1);
    //         boardContext.addCardToLane(card2, 1);
    //     });
    //     const source = {
    //         droppableId: '1',
    //         index: 0,
    //     };
    //     const destination = {
    //         droppableId: '1',
    //         index: 1,
    //     };
    //     act(() => {
    //         const dropResult: DropResult = {
    //             source,
    //             destination,
    //             reason: 'DROP',
    //             combine: undefined,
    //             mode: 'FLUID',
    //             draggableId: '1',
    //             type: '',
    //         };
    //         boardContext.handleDragEnd(dropResult);
    //     });
    //     expect(boardContext.board[0].cards[0]).toEqual(card2);
    //     expect(boardContext.board[0].cards[1]).toEqual(card1);
    // });

    // it('should move a card to a different lane', () => {
    //     const card3: Card = {
    //         id: 3,
    //         title: 'Card 2-1',
    //         description: '',
    //     };

    //     const card4: Card = {
    //         id: 4,
    //         title: 'Card 2-2',
    //         description: '',
    //     };

    //     const wrapper = ({ children }: { children: React.ReactNode }) => (
    //         <BoardContextProvider>{children}</BoardContextProvider>
    //     );
    //     const { result } = renderHook(() => useContext(BoardContext), {
    //         wrapper,
    //     });
    //     act(() => {
    //         boardContext.addCardToLane(card3, 2);
    //         boardContext.addCardToLane(card4, 2);
    //     });
    //     const source = {
    //         droppableId: '1',
    //         index: 0,
    //     };
    //     const destination = {
    //         droppableId: '2',
    //         index: 0,
    //     };
    //     act(() => {
    //         const dropResult: DropResult = {
    //             source,
    //             destination,
    //             reason: 'DROP',
    //             combine: undefined,
    //             mode: 'FLUID',
    //             draggableId: '1',
    //             type: '',
    //         };
    //         boardContext.handleDragEnd(dropResult);
    //     });
    //     expect(boardContext.board[0].cards.length).toEqual(1);
    //     expect(boardContext.board[1].cards.length).toEqual(3);
    // });

    it('should return early', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        renderHook(() => useContext(BoardContext), {
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
            boardContext.handleDragEnd(dropResult);
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
            boardContext.handleDragEnd(dropResult);
        });
    });

    it('should export a board', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        renderHook(() => useContext(BoardContext), {
            wrapper,
        });

        boardContext.exportBoardToJSON();
    });

    it('should import a board', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        renderHook(() => useContext(BoardContext), {
            wrapper,
        });

        const boardImport = new File(
            [JSON.stringify(initialBoardState)],
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

        boardContext.importBoardFromJSON(
            event as React.ChangeEvent<HTMLInputElement>
        );
    });
});

// it('should update a existing card', () => {
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//         <BoardContextProvider>{children}</BoardContextProvider>
//     );
//     const { result } = renderHook(() => useContext(BoardContext), {
//         wrapper,
//     });

//     const card: Card = {
//         id: 1,
//         title: 'Card 1',
//     };

//     act(() => {
//         boardContext.addCardToLane(card, 1);
//     });

//     act(() => {
//         const updatedCard: Card = {
//             ...boardContext.board[0].cards[0],
//             title: 'Card 1 updated',
//         };
//         boardContext.updateCard(updatedCard, 1);
//     });

//     expect(boardContext.board[0].cards[0].title).toBe('Card 1 updated');
// });

// it('should update a existing cards task', () => {
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//         <BoardContextProvider>{children}</BoardContextProvider>
//     );
//     const { result } = renderHook(() => useContext(BoardContext), {
//         wrapper,
//     });

//     act(() => {
//         boardContext.clearBoard();
//     });

//     const card: Card = {
//         id: 0,
//         title: 'Card 1',
//         tasks: [{ id: 1, description: 'Task' }],
//     };

//     act(() => {
//         boardContext.addCardToLane(card, 1);
//     });

//     act(() => {
//         boardContext.updateTask(2, 1, true);
//     });

//     expect(boardContext.board[0]?.cards[0]?.tasks?.[0].fulfilled).toBe(true);
// });

// it('should remove cards from existing lane', () => {
//     const wrapper = ({ children }: { children: React.ReactNode }) => (
//         <BoardContextProvider>{children}</BoardContextProvider>
//     );
//     const { result } = renderHook(() => useContext(BoardContext), {
//         wrapper,
//     });

//     act(() => {
//         boardContext.removeCardsFromLane(1);
//     });

//     expect(boardContext.board[0]?.cards.length).toBe(0);
// });
