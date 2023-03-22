import { render } from '@testing-library/react';
import { BoardContext, type BoardMode } from '../../context/BoardContext';
import { mockContext } from '../../mocks/context.mock';
import App from './App';

describe('App component', () => {
    it('renders Board component by default', () => {
        const { getByTestId } = render(<App />);

        expect(getByTestId(/myboards-title/)).toBeInTheDocument();
    });

    it('renders AddBoard component when in boardCreateMode', () => {
        const boardContextValue = {
            ...mockContext,
            boardMode: 'boardCreateMode' as BoardMode,
        };
        const { getByTestId } = render(
            <BoardContext.Provider value={boardContextValue}>
                <App />
            </BoardContext.Provider>
        );

        expect(getByTestId(/addboard-title/)).toBeInTheDocument();
    });

    it('renders MyBoards component when in boardChooseMode', () => {
        const boardContextValue = {
            ...mockContext,
            boardMode: 'boardChooseMode' as BoardMode,
        };
        const { getByTestId } = render(
            <BoardContext.Provider value={boardContextValue}>
                <App />
            </BoardContext.Provider>
        );

        expect(getByTestId(/myboards-title/)).toBeInTheDocument();
    });

    it('renders MyBoardLanes component when in boardCustomLanesMode', () => {
        const boardContextValue = {
            ...mockContext,
            boardMode: 'boardCustomLanesMode' as BoardMode,
        };
        const { getByTestId } = render(
            <BoardContext.Provider value={boardContextValue}>
                <App />
            </BoardContext.Provider>
        );

        expect(getByTestId(/myboardlanes-title/)).toBeInTheDocument();
    });
});
