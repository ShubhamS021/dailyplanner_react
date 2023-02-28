import { fireEvent, render } from '@testing-library/react';

import { TaskComponent } from './Task';

test('renders unchecked basic task', () => {
    const { getByTestId } = render(
        <TaskComponent description="test unchecked task" fulfilled={false} />
    );

    expect(getByTestId('input-checkbox')).not.toBeChecked();
});

test('renders checked basic task without prop', () => {
    const { getByTestId } = render(
        <TaskComponent description="test unchecked task" />
    );
    expect(getByTestId('input-checkbox')).not.toBeChecked();
});

test('renders checked basic task', () => {
    const { getByTestId } = render(
        <TaskComponent description="test checked task" fulfilled={true} />
    );
    expect(getByTestId('input-checkbox')).toBeChecked();
});

test('ticks a task', () => {
    const { getByTestId } = render(
        <TaskComponent
            description="test unchecked task to be checked"
            fulfilled={false}
        />
    );
    const checkbox = getByTestId('input-checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
});
