import { render, screen } from '@testing-library/react';
import Board from './Board';

test('renders the basic board', () => {
    render(<Board />);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByTestId('page-subtitle');
    expect(subtitle).toBeInTheDocument();

    const board = screen.getByTestId('page-board');
    expect(board).toBeInTheDocument();
});
