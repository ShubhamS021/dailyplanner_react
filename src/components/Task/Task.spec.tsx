import { fireEvent, render } from '@testing-library/react';

import { TaskComponent } from './Task';

test('renders unchecked basic task', () => {
    const { getByTestId } = render(
        <TaskComponent description="test unchecked task" fulfilled={false} />
    );

    expect(getByTestId('task-checkbox')).not.toBeChecked();
});

test('renders checked basic task without prop', () => {
    const { getByTestId } = render(
        <TaskComponent description="test unchecked task" />
    );
    expect(getByTestId('task-checkbox')).not.toBeChecked();
});

test('renders checked basic task', () => {
    const { getByTestId } = render(
        <TaskComponent description="test checked task" fulfilled={true} />
    );
    expect(getByTestId('task-checkbox')).toBeChecked();
});

test('ticks a task', () => {
    const { getByTestId } = render(
        <TaskComponent
            description="test unchecked task to be checked"
            fulfilled={false}
        />
    );
    const checkbox = getByTestId('task-checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
});

test('ticks a task by label', () => {
    const { getByTestId } = render(
        <TaskComponent
            description="test unchecked task to be checked"
            fulfilled={false}
        />
    );
    const checkbox = getByTestId('task-checkbox');
    expect(checkbox).not.toBeChecked();
    const label = getByTestId('task-label');
    fireEvent.click(label);
    expect(checkbox).toBeChecked();
});
