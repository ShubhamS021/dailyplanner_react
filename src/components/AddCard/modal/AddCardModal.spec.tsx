import { fireEvent, render } from '@testing-library/react';
import { type Card } from '../../../interfaces/Card';
import type Tag from '../../../interfaces/Tag';
import type Task from '../../../interfaces/Task';
import { AddCardModal } from './AddCardModal';

test('renders the basic AddCardModal', () => {
    const card: Card = {
        id: 1,
        title: 'test card',
        tasks: [{ id: 1, description: 'Task 1' }],
    };

    const { getByTestId } = render(
        <AddCardModal
            card={card}
            updateDescription={function (description: string): void {
                throw new Error('Function not implemented.');
            }}
            updateTasks={function (tasks: Task[]): void {
                throw new Error('Function not implemented.');
            }}
            updateTags={function (tags: Tag[]): void {
                throw new Error('Function not implemented.');
            }}
            closeModal={function (): void {
                throw new Error('Function not implemented.');
            }}
            saveCard={function (): void {
                throw new Error('Function not implemented.');
            }}
        />
    );

    expect(getByTestId(/addcard-modal-title/).textContent).toBe('test card');
});

test('renders the basic AddCardModal', () => {
    const card: Card = {
        id: 1,
        title: 'test card',
        tasks: [{ id: 1, description: 'Task 1' }],
    };

    const { getByTestId, getAllByTestId } = render(
        <AddCardModal
            card={card}
            updateDescription={function (description: string): void {
                throw new Error('Function not implemented.');
            }}
            updateTasks={function (tasks: Task[]): void {
                expect(tasks.length).toBe(2);
            }}
            updateTags={function (tags: Tag[]): void {
                expect(tags.length).toBe(1);
            }}
            closeModal={function (): void {
                throw new Error('Function not implemented.');
            }}
            saveCard={function (): void {
                throw new Error('Function not implemented.');
            }}
        />
    );

    expect(getByTestId(/addcard-modal-title/).textContent).toBe('test card');

    const input = getByTestId(/addcard-subtask-input/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW TAG' } });

    const button = getByTestId(/addcard-subtask-button/);
    fireEvent.click(button);

    const tagInput = getByTestId(/addcard-tags-input/) as HTMLInputElement;
    fireEvent.change(tagInput, { target: { value: 'NEW TAG' } });

    const firstTagColor = getAllByTestId(/addcard-tag-color-button/)[0];
    fireEvent.click(firstTagColor);

    const tagButton = getByTestId(/addcard-tag-button/);
    fireEvent.click(tagButton);
});
