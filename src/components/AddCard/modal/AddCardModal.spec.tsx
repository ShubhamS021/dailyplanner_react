import { fireEvent, render } from '@testing-library/react';
import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import type Task from '@/interfaces/Task';
import { type Shirt } from '@/types/Shirt';
import { AddCardModal } from './AddCardModal';

test('renders the basic AddCardModal', () => {
    const card: Card = {
        id: 1,
        title: 'test card',
        tasks: [{ id: 1, description: 'Task 1' }],
        shirt: 'S',
    };

    const { getByTestId, getAllByTestId } = render(
        <AddCardModal
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

    const titleInput = getByTestId(/addcard-title-input/) as HTMLInputElement;
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

    const firstTagColor = getAllByTestId(/addcard-tag-color-button/)[0];
    fireEvent.click(firstTagColor);

    const tagButton = getByTestId(/addcard-tag-button/);
    fireEvent.click(tagButton);

    // add a estimation
    const estimationSelect = getByTestId(
        /addcard-estimation-select/
    ) as HTMLSelectElement;
    fireEvent.change(estimationSelect, { target: { value: 'M' } });

    // add a due date
    const lowerTagInput = getByTestId(
        /addcard-lowertags-input/
    ) as HTMLInputElement;
    fireEvent.change(lowerTagInput, { target: { value: '01.01.2000' } });

    // remove a task from rendered card
    const taskRemoveButton = getAllByTestId(/task-remove-button/)[0];
    fireEvent.click(taskRemoveButton);

    // TODO: create 2 tasks to drag and drop them in the list
});
