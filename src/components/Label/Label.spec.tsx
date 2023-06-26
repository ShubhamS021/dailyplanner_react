import { render } from '@testing-library/react';
import { colors } from '../../theme/colors';

import { LabelComponent } from './Label';

test('renders basic label', () => {
    const { getByTestId } = render(
        <LabelComponent color={colors.Green} text="label ABC" />
    );

    expect(getByTestId(/page-label/i).textContent).toBe('label ABC');
    expect(getByTestId(/page-label/i)).toHaveStyle(
        `background-color: ${colors.Green}`
    );
});
