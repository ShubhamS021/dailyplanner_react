import { render } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import { mockContext } from '../../mocks/context.mock';
import Board from './Board';

test('renders the basic board', () => {
    const { getByTestId } = render(
        <BoardContext.Provider value={mockContext}>
            <Board />
        </BoardContext.Provider>
    );

    expect(getByTestId(/page-board/)).toBeInTheDocument();
});
