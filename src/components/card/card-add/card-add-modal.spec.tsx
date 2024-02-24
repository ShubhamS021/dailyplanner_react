import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import type Task from '@/interfaces/Task';
import { colorVariants } from '@/types/ColorVariant';
import { type Shirt } from '@/types/Shirt';
import { fireEvent, render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { CardAddModal } from './card-add-modal';

describe('AddCardModal', () => {
    test('renders the basic AddCardModal', () => {
        const card: Card = {
            id: 1,
            title: 'test card',
            tasks: [{ id: 1, description: 'Task 1' }],
            shirt: 'S',
        };

        const { getByTestId, getAllByTestId } = render(
            <CardAddModal
                card={card}
                updateTitle={(_title: string): void => {}}
                updateDescription={(_description: string): void => {}}
                updateTasks={(tasks: Task[]): void => {
                    expect(tasks.length).toBe(2);
                }}
                updateTags={(tags: Tag[]): void => {
                    expect(tags.length).toBe(1);
                }}
                closeModal={(): void => {}}
                saveCard={(): void => {}}
                updateLowerTags={(tags: Tag[]): void => {
                    expect(tags.length).toBe(1);
                }}
                updateEstimation={(_shirt: Shirt): void => {}}
            />
        );

        const titleInput = getByTestId(
            /addcard-title-input/
        ) as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: 'NEW TITLE' } });

        // add a subtask
        const subtaskInput = getByTestId(
            /addcard-subtask-input/
        ) as HTMLInputElement;
        fireEvent.change(subtaskInput, { target: { value: 'NEW SUBTASK' } });

        const button = getByTestId(/addcard-subtask-button/);
        fireEvent.click(button);

        // add a tag
        const tagInput = getByTestId(/addcard-tags-input/) as HTMLInputElement;
        fireEvent.change(tagInput, { target: { value: 'NEW TAG' } });

        const firstTagColor = getByTestId(`badge-color-${colorVariants[0]}`);
        fireEvent.click(firstTagColor);

        const tagButton = getByTestId(/addcard-tag-button/);
        fireEvent.click(tagButton);

        // add a estimation
        // setTimeout(() => {
        //     const selectElementL = getByTestId('addcard-estimation-select-L');
        //     fireEvent.click(selectElementL);

        //     const button = getByTestId(/addcard-modal-button/);
        //     fireEvent.click(button);
        // }, 500);

        // TODO: find solution for shadcn calender tests
        // add a duedate
        // setTimeout(() => {
        //     const calender = getByTestId('addcard-duedate-calender');
        //     fireEvent.click(calender);
        // }, 500);

        // setTimeout(() => {
        //     const select = getByTestId('addcard-duedate-select');
        //     fireEvent.click(select);
        // }, 1000);

        // setTimeout(() => {
        //     const selectToday = getByTestId('addcard-duedate-today');
        //     fireEvent.click(selectToday);
        // }, 1500);

        // remove a task from rendered card
        const taskRemoveButton = getAllByTestId(/task-remove-button/)[0];
        fireEvent.click(taskRemoveButton);

        // TODO: create 2 tasks to drag and drop them in the list
    });
});
