import { Login } from '@/components/authentication/components/login';
import { Register } from '@/components/authentication/components/register';
import { BoardHistory } from '@/components/board-history/board-history';
import { Board } from '@/components/board/board';
import BoardAdd from '@/components/board/board-add/board-add';
import { Landing } from '@/components/landing/landing';
import { Layout } from '@/components/layout';
import MyBoardLanes from '@/components/my-board-lanes/my-board-lanes';
import MyBoards from '@/components/my-boards/my-boards';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { useEffect } from 'react';

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
            setPage('landingPage');
            return;
        }

        setPage(
            board === null || boards.length === 0
                ? 'landingPage'
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
        let pageContent;
        let standalone = false;

        switch (page) {
            // Authentication pages
            case 'loginPage':
                pageContent = <Login />;
                standalone = true;
                break;
            case 'registerPage':
                pageContent = <Register />;
                standalone = true;
                break;
            // Board pages
            case 'boardCreatePage':
                pageContent = <BoardAdd />;
                break;
            case 'boardChoosePage':
                pageContent = <MyBoards />;
                break;
            case 'boardCustomLanesPage':
                pageContent = <MyBoardLanes />;
                break;
            case 'boardHistoryPage':
                pageContent = <BoardHistory />;
                break;
            case 'boardDefaultPage':
                pageContent = <Board />;
                break;
            default:
                pageContent = <Landing />;
                standalone = true;
                break;
        }

        if (standalone) {
            return pageContent;
        } else {
            return <Layout>{pageContent}</Layout>;
        }
    };

    return renderPage();
};

export default App;
