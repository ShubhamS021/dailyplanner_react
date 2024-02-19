import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { useDayplannerDB } from '@/hooks/useDayplannerDB/useDayplannerDB';
import { colorVariants } from '@/types/ColorVariant';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { CardAdd } from './card-add';

describe('AddCard', () => {
    // add a default board with some columns
    beforeEach(() => {
        renderHook(() => useDayplannerDB('history'));
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            const boardId = 0;
            result.current.addBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            });
        });
    });

    test('renders the basic addCard', () => {
        const { getByTestId } = render(
            <CardAdd placeholder={'add a card'} text={'button text'} />
        );
        expect(getByTestId(/addcard-input/)).toHaveAttribute(
            'placeholder',
            'add a card'
        );
        expect(getByTestId(/addcard-button/).textContent).toBe('button text');
    });

    test('add a new card', () => {
        const { getByTestId } = render(
            <CardAdd placeholder={'add a card'} text={'button text'} />
        );

        const input = getByTestId(/addcard-input/) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'NEW CARD' } });

        expect(input.value).toBe('NEW CARD');
        fireEvent.click(getByTestId(/addcard-button/));

        // updateDescription
        const descriptionInput = getByTestId(
            /addcard-description-input/
        ) as HTMLInputElement;
        fireEvent.change(descriptionInput, {
            target: { value: 'NEW DESCRIPTION' },
        });

        // updateTasks
        const taskInput = getByTestId(
            /addcard-subtask-input/
        ) as HTMLInputElement;
        fireEvent.change(taskInput, { target: { value: 'NEW TASK' } });

        fireEvent.click(getByTestId(/addcard-subtask-button/));

        // updateTags
        const tagInput = getByTestId(/addcard-tags-input/) as HTMLInputElement;
        fireEvent.change(tagInput, { target: { value: 'NEW TAG' } });
        fireEvent.click(getByTestId(`badge-color-${colorVariants[0]}`));
        fireEvent.click(getByTestId(/addcard-tag-button/));

        const selectElement = getByTestId('addcard-estimation-select');
        fireEvent.click(selectElement);

        // TODO: readd tests but without setTimeout
        // updateEstimation
        // setTimeout(() => {
        //     const selectElementL = getByTestId('addcard-estimation-select-L');
        //     fireEvent.click(selectElementL);

        //     const button = getByTestId(/addcard-modal-button/);
        //     fireEvent.click(button);

        //     expect(input.value).toBe('');
        // }, 500);
    });

    test('cancel add a new card modal', () => {
        const { getByTestId } = render(
            <CardAdd placeholder={'add a card'} text={'button text'} />
        );

        const input = getByTestId(/addcard-input/) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'NEW CARD' } });

        expect(input.value).toBe('NEW CARD');

        // via cancel button at bottom
        const modalButton = getByTestId(/addcard-button/);
        fireEvent.click(modalButton);

        const button = getByTestId(/addcard-modal-cancel-button/);
        fireEvent.click(button);

        expect(input.value).toBe('');
    });
});
