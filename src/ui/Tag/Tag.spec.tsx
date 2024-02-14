import { render } from '@testing-library/react';
import { colors } from '../../theme/colors';

import { TagComponent } from './Tag';

test('renders basic tag', () => {
    const { getByTestId } = render(
        <TagComponent
            color={colors.Green}
            text="Tag ABC"
            isRemoveable={false}
        />
    );

    expect(getByTestId('tag').textContent).toBe('Tag ABC');
    expect(getByTestId('tag')).toHaveStyle(`background-color: ${colors.Green}`);
});
