import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
// import Board from '@/components/Board/Board';
import AddBoard from '@/components/AddBoard/AddBoard';
import { BoardHistory } from '@/components/BoardHistory/BoardHistory';
import MyBoardLanes from '@/components/MyBoardLanes/MyBoardLanes';
import MyBoards from '@/components/MyBoards/MyBoards';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { useEffect } from 'react';
import { Login } from '../Authentication/Login';
import { Register } from '../Authentication/Register';
import Board from '../Board/Board';

export const App = () => {
    const [page, setPage] = usePageStore((state) => [
        state.page,
        state.setPage,
    ]);

    const [boards, board, themeMode, updateBoards] = useBoardStore((state) => [
        state.boards,
        state.board,
        state.themeMode,
        state.updateBoards,
    ]);

    // Read the initial boards state from localStorage and toggle initial app mode
    useEffect(() => {
        if (boards === null) {
            setPage('boardCreatePage');
            return;
        }

        setPage(
            board === null || boards.length === 0
                ? 'boardCreatePage'
                : 'boardDefaultPage'
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

    const renderPage = () => {
        switch (page) {
            // Authentication pages
            case 'loginPage':
                return <Login />;
            case 'registerPage':
                return <Register />;
            // Board pages
            case 'boardCreatePage':
                return <AddBoard />;
            case 'boardChoosePage':
                return <MyBoards />;
            case 'boardCustomLanesPage':
                return <MyBoardLanes />;
            case 'boardHistoryPage':
                return <BoardHistory />;
            default:
                return <Board />;
        }
    };

    return <div className="dark:bg-[#171D23] h-full">{renderPage()}</div>;
};

export default App;
