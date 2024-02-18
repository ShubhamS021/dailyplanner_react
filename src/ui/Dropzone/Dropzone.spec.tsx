import { render } from '@testing-library/react';
import Dropzone from './dropzone';

test('renders basic dropzone', () => {
    const { getByTestId } = render(<Dropzone text="Place tasks here..." />);
    expect(getByTestId(/dropzone/i).textContent).toBe('Place tasks here...');
});
