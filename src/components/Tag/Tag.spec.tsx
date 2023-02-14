import { render, screen } from '@testing-library/react';
import { colors } from '../../../theme/colors';

import { TagComponent } from './Tag';

test('renders basic tag', () => {
    render(<TagComponent color={colors.green} text="Tag ABC" />);
    const tag = screen.getByText(/Tag ABC/i);
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveAttribute('style');
});
