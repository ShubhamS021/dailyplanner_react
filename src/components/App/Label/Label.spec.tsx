import { render, screen } from '@testing-library/react';
import { colors } from '../../../theme/colors';

import { LabelComponent } from './Label';

test('renders basic label', () => {
    render(<LabelComponent color={colors.green} text="label ABC" />);
    const label = screen.getByText(/label ABC/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('style');
});
