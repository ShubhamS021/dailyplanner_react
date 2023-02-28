import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the basic app', () => {
    render(<App />);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByTestId('page-subtitle');
    expect(subtitle).toBeInTheDocument();

    const board = screen.getByTestId('page-board');
    expect(board).toBeInTheDocument();
});
