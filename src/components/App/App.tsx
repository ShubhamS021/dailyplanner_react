import { useBoardStore } from '../../hooks/useBoardStore/useBoardStore';
import Board from '../../components/Board/Board';
import { BoardHistory } from '../../components/BoardHistory/BoardHistory';
import MyBoardLanes from '../../components/MyBoardLanes/MyBoardLanes';
import MyBoards from '../../components/MyBoards/MyBoards';
import AddBoard from '../AddBoard/AddBoard';
import { useEffect } from 'react';

export const App = () => {
    const [boards, board, themeMode, boardMode, toggleBoardMode, updateBoards] =
        useBoardStore((state) => [
            state.boards,
            state.board,
            state.themeMode,
            state.boardMode,
            state.toggleBoardMode,
            state.updateBoards,
        ]);

    // Read the initial boards state from localStorage and toggle initial app mode
    useEffect(() => {
        if (boards === null) {
            toggleBoardMode('boardCreateMode');
            return;
        }

        toggleBoardMode(
            board === null || boards.length === 0
                ? 'boardCreateMode'
                : 'boardDefaultMode'
        );
    }, []);

    // update boards whenever a board changes
    useEffect(() => {
        updateBoards(board);
    }, [board]);

    // Update localStorage whenever the color-theme change
    useEffect(() => {
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
