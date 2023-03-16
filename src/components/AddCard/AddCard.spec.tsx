import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { useContext } from 'react';
import BoardContextProvider, { BoardContext } from '../../context/BoardContext';
import { AddCard } from './AddCard';

describe('AddCard', () => {
    test('renders the basic addCard', () => {
        const { getByTestId } = render(
            <AddCard placeholder={'add a card'} text={'button text'} />
        );
        expect(getByTestId(/addcard-input/)).toHaveAttribute(
            'placeholder',
            'add a card'
        );
        expect(getByTestId(/addcard-button/).textContent).toBe('button text');
    });

    test('add a new card', () => {
        const { getByTestId, getAllByTestId } = render(
            <AddCard placeholder={'add a card'} text={'button text'} />
        );

        const input = getByTestId(/addcard-input/) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'NEW CARD' } });

        expect(input.value).toBe('NEW CARD');
        fireEvent.click(getByTestId(/addcard-button/));

        expect(getByTestId(/addcard-modal-title/).textContent).toBe('NEW CARD');

        // updateTitle
        fireEvent.click(getByTestId(/addcard-title-edit-button/));

        const titleInput = getByTestId(
            /addcard-title-edit-input/
        ) as HTMLInputElement;
        fireEvent.change(titleInput, {
            target: { value: 'NEW TITLE' },
        });

        fireEvent.click(getByTestId(/addcard-title-edit-submit-button/));

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
        fireEvent.click(getAllByTestId(/addcard-tag-color-button/)[0]);
        fireEvent.click(getByTestId(/addcard-tag-button/));

        // updateLowerTags
        const lowerTagInput = getByTestId(
            /addcard-lowertags-input/
        ) as HTMLInputElement;
        fireEvent.change(lowerTagInput, { target: { value: '2000-01-01' } });
        fireEvent.click(getByTestId(/addcard-lowertags-button/));
        const button = getByTestId(/addcard-modal-button/);
        fireEvent.click(button);

        expect(input.value).toBe('');
    });

    test('cancel add a new card modal', () => {
        const { getByTestId } = render(
            <AddCard placeholder={'add a card'} text={'button text'} />
        );

        const input = getByTestId(/addcard-input/) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'NEW CARD' } });

        expect(input.value).toBe('NEW CARD');

        // 1: via cancel button at bottom
        const modalButton = getByTestId(/addcard-button/);
        fireEvent.click(modalButton);

        expect(getByTestId(/addcard-modal-title/).textContent).toBe('NEW CARD');

        const button = getByTestId(/addcard-modal-cancel-button/);
        fireEvent.click(button);

        expect(input.value).toBe('');

        // 2: via close button at top
        fireEvent.change(input, { target: { value: 'NEW CARD 2' } });
        expect(input.value).toBe('NEW CARD 2');
        fireEvent.click(modalButton);

        expect(getByTestId(/addcard-modal-title/).textContent).toBe(
            'NEW CARD 2'
        );

        const closeButton = getByTestId(/addcard-modal-close-button/);
        fireEvent.click(closeButton);

        expect(input.value).toBe('');
    });

    afterAll(() => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BoardContextProvider>{children}</BoardContextProvider>
        );
        const { result } = renderHook(() => useContext(BoardContext), {
            wrapper,
        });
        act(() => {
            result.current.clearBoard();
        });
    });
});
