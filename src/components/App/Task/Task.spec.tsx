import { fireEvent, render, screen } from '@testing-library/react';

import { TaskComponent } from './Task';

test('renders unchecked basic task', () => {
    render(
        <TaskComponent description="test unchecked task" fulfilled={false} />
    );
    const uncheckedTask = screen.getByText(/test unchecked task/i);
    expect(uncheckedTask).toBeInTheDocument();

    const uncheckedTaskCheckbox = screen.getByTestId('input-checkbox');
    expect(uncheckedTaskCheckbox).not.toBeChecked();
});

test('renders checked basic task without prop', () => {
    render(<TaskComponent description="test unchecked task" />);
    const uncheckedTask = screen.getByText(/test unchecked task/i);
    expect(uncheckedTask).toBeInTheDocument();

    const uncheckedTaskCheckbox = screen.getByTestId('input-checkbox');
    expect(uncheckedTaskCheckbox).not.toBeChecked();
});

test('renders checked basic task', () => {
    render(<TaskComponent description="test checked task" fulfilled={true} />);
    const checkedTask = screen.getByText(/test checked task/i);
    expect(checkedTask).toBeInTheDocument();

    const checkedTaskCheckbox = screen.getByTestId('input-checkbox');
    expect(checkedTaskCheckbox).toBeChecked();
});

test('ticks a task', () => {
    render(
        <TaskComponent
            description="test unchecked task to be checked"
            fulfilled={false}
        />
    );

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const checkBox = screen.getByTestId('input-checkbox') as HTMLInputElement;
    expect(checkBox.checked).toBeFalsy();
    fireEvent.click(checkBox);
    expect(checkBox.checked).toBeTruthy();
});
