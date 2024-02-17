import { render } from '@testing-library/react';
import PageTitle from './page-title';

test('renders the page title', () => {
    const { getByTestId } = render(
        <PageTitle title={'Test'} subtitle={'Testsubtitle'} />
    );

    expect(getByTestId(/page-title/i).textContent).toBe('Test');
    expect(getByTestId(/page-subtitle/i).textContent).toBe('Testsubtitle');
});

test('renders the page title without subtitle', () => {
    const { getByTestId, queryByTestId } = render(<PageTitle title={'Test'} />);

    expect(getByTestId(/page-title/i).textContent).toBe('Test');
    expect(queryByTestId(/page-subtitle/i)).toBeNull();
});
