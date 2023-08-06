import { fireEvent, render } from '@testing-library/react';
import { type Card } from '@/interfaces/Card';
import type Task from '@/interfaces/Task';
import { AddCardSubtasks } from './AddCardSubtasks';

test('renders the basic AddCardSubtasks', () => {
    const card: Card = {
        id: 1,
        title: 'test card',
        tasks: [{ id: 1, description: 'Task 1' }],
        shirt: 'S',
    };

    const { getByTestId } = render(
        <AddCardSubtasks
            headline={'tasks'}
            card={card}
            updateTasks={(tasks: Task[]): void => {}}
        />
    );

    expect(getByTestId(/addcardtasks-headline/).textContent).toBe('tasks');
});

test('adds a task', () => {
    const card: Card = {
        id: 1,
        title: 'test card',
        tasks: [{ id: 1, description: 'Task 1' }],
        shirt: 'S',
    };

    const { getByTestId } = render(
        <AddCardSubtasks
            headline={'tasks'}
            card={card}
            updateTasks={(tasks: Task[]) => {}}
        />
    );

    const input = getByTestId(/addcard-subtask-input/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW TAG' } });

    const button = getByTestId(/addcard-subtask-button/);
    fireEvent.click(button);
});
