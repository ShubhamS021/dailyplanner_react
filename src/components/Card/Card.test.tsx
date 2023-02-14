import { render, screen } from '@testing-library/react';
import { CardComponent } from './Card';

test('renders basic card', () => {
    render(
        <CardComponent title={'card title'} description="card description" />
    );
    const title = screen.getByText(/card title/i);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(/description/i);
    expect(description).toBeInTheDocument();
});

test('breaks render on card with empty title', () => {
    try {
        render(<CardComponent title={''} />);
    } catch (e) {
        expect(e.message).toBe('no title set');
    }
});
