import { BoardHistory } from 'components/BoardHistory/BoardHistory';
import { useContext } from 'react';
import Board from '../../components/Board/Board';
import MyBoardLanes from '../../components/MyBoardLanes/MyBoardLanes';
import MyBoards from '../../components/MyBoards/MyBoards';
import { BoardContext } from '../../context/BoardContext';
import AddBoard from '../AddBoard/AddBoard';

export const App = () => {
    const { boardMode } = useContext(BoardContext);

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
