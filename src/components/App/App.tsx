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
            default:
                return <Board />;
        }
    };

    return renderBoards();
};

export default App;
