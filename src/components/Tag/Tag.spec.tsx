import { render } from '@testing-library/react';
import { colors } from '../../theme/colors';

import { TagComponent } from './Tag';

test('renders basic tag', () => {
    const { getByTestId } = render(
        <TagComponent color={colors.green} text="Tag ABC" />
    );

    expect(getByTestId('tag').textContent).toBe('Tag ABC');
    expect(getByTestId('tag')).toHaveStyle(`background-color: ${colors.green}`);
});
