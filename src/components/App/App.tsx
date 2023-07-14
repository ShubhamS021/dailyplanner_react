import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import Board from '../../components/Board/Board';
import { BoardHistory } from '../../components/BoardHistory/BoardHistory';
import MyBoardLanes from '../../components/MyBoardLanes/MyBoardLanes';
import MyBoards from '../../components/MyBoards/MyBoards';
import AddBoard from '../AddBoard/AddBoard';
import { type Board as BordType } from 'interfaces/Board';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

export const App = () => {
    const [boards, board, themeMode, boardMode, toggleBoardMode, updateBoards] =
        useBoardStore(
            (state) => [
                state.boards,
                state.board,
                state.themeMode,
                state.boardMode,
                state.toggleBoardMode,
                state.updateBoards,
            ],
            shallow
        );

    // Read the initial boards state from localStorage and toggle initial app mode
    useEffect(() => {
        const storedBoards = localStorage.getItem('boards');

        if (storedBoards === null || storedBoards === undefined) {
            toggleBoardMode('boardCreateMode');
            return;
        }

        const parsedBoards: BordType[] = JSON.parse(storedBoards);

        parsedBoards.forEach((board) => {
            updateBoards(board);
        });

        const currentBoardId: number = +(
            localStorage.getItem('currentBoard') ?? '-1'
        );
        const currentBoard = parsedBoards.find((b) => b.id === currentBoardId);
        toggleBoardMode(
            currentBoard === null || parsedBoards.length === 0
                ? 'boardCreateMode'
                : 'boardDefaultMode'
        );

        if (currentBoard != null) {
            updateBoards(currentBoard);
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

    // Update localStorage whenever the color-theme change
    useEffect(() => {
        localStorage.setItem('color-theme', themeMode);
        document.documentElement.classList.value = '';
        document.documentElement.classList.add(themeMode);
    }, [themeMode]);

    const renderBoards = () => {
        switch (boardMode) {
            case 'boardCreateMode':
                return <AddBoard />;
            case 'boardChooseMode':
                return <MyBoards />;
            case 'boardCustomLanesMode':
                return <MyBoardLanes />;
            case 'boardHistoryMode':
                return <BoardHistory />;
            default:
                return <Board />;
        }
    };

    return <div className="dark:bg-[#171D23] h-full">{renderBoards()}</div>;
};

export default App;
