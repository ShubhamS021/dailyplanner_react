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
        const { getByTestId } = render(
            <AddCard placeholder={'add a card'} text={'button text'} />
        );

        const input = getByTestId(/addcard-input/) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'NEW CARD' } });

        expect(input.value).toBe('NEW CARD');
        const modalButton = getByTestId(/addcard-button/);
        fireEvent.click(modalButton);

        expect(getByTestId(/addcard-modal-title/).textContent).toBe(
            'New Task: NEW CARD'
        );

        const descriptionInput = getByTestId(
            /addcard-description-input/
        ) as HTMLInputElement;
        fireEvent.change(descriptionInput, {
            target: { value: 'new description' },
        });

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

        expect(getByTestId(/addcard-modal-title/).textContent).toBe(
            'New Task: NEW CARD'
        );

        const button = getByTestId(/addcard-modal-cancel-button/);
        fireEvent.click(button);

        expect(input.value).toBe('');

        // 2: via close button at top
        fireEvent.change(input, { target: { value: 'NEW CARD 2' } });
        expect(input.value).toBe('NEW CARD 2');
        fireEvent.click(modalButton);

        expect(getByTestId(/addcard-modal-title/).textContent).toBe(
            'New Task: NEW CARD 2'
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
