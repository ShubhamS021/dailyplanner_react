import { render, screen } from '@testing-library/react';
import { colors } from '../../../theme/colors';
import { LaneComponent } from './Lane';

test('renders basic lane', () => {
    render(<LaneComponent color={colors.green} text="Lane ABC" />);
    const lane = screen.getByText(/Lane ABC/i);
    expect(lane).toBeInTheDocument();
    expect(lane).toHaveAttribute('style');
});
