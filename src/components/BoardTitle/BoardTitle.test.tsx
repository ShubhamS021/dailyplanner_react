import { render } from '@testing-library/react';
import BoardTitle from './BoardTitle';

test('renders the board title', () => {
    const { getByTestId } = render(
        <BoardTitle title={'Test'} subtitle={'Testsubtitle'} />
    );

    expect(getByTestId(/page-title/i).textContent).toBe('Test');
    expect(getByTestId(/page-subtitle/i).textContent).toBe('Testsubtitle');
});

test('renders the board title without subtitle', () => {
    const { getByTestId, queryByTestId } = render(
        <BoardTitle title={'Test'} />
    );

    expect(getByTestId(/page-title/i).textContent).toBe('Test');
    expect(queryByTestId(/page-subtitle/i)).toBeNull();
});
