import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { t } from 'i18next';
import { vi } from 'vitest';
import BoardAdd from './board-add';

describe('board-add component', () => {
    // add a default board with some columns
    beforeEach(() => {
        const { result: boardStore } = renderHook(() => useBoardStore());

        act(() => {
            const boardId = 0;
            boardStore.current.addBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            });
        });
    });

    test('renders the component', () => {
        // Arrange
        const { result: pageStore } = renderHook(() => usePageStore());

        // Act
        act(() => {
            pageStore.current.setPage('boardCreatePage');
        });
        const { getByText } = render(<BoardAdd />);

        // Assert
        expect(getByText(t('components.board-add.title'))).toBeInTheDocument();
        expect(
            getByText(t('components.board-add.subtitle'))
        ).toBeInTheDocument();
        expect(
            getByText(t('components.board-add.standardBoard'))
        ).toBeInTheDocument();
        expect(
            getByText(t('components.board-add.standard'))
        ).toBeInTheDocument();
        expect(getByText(t('components.board-add.create'))).toBeInTheDocument();
        expect(getByText(t('components.board-add.custom'))).toBeInTheDocument();
    });

    test('calls board-add and toggleBoardMode with the correct arguments when standard board is created', () => {
        const { result: boardStore } = renderHook(() => useBoardStore());
        const { result: pageStore } = renderHook(() => usePageStore());

        const spyboardadd = vi.spyOn(boardStore.current, 'addBoard');
        const spySetPage = vi.spyOn(pageStore.current, 'setPage');
        const { getByTestId } = render(<BoardAdd />);

        fireEvent.click(getByTestId('board-add-create-standard-button'));

        expect(spyboardadd).toHaveBeenCalledTimes(1);
        expect(spyboardadd).toHaveBeenCalledWith({
            id: 0,
            lanes: [...initialLanes],
            subtitle: 'An overview of my tasks.',
            title: 'My tasks',
        });

        expect(spySetPage).toHaveBeenCalledTimes(1);
        expect(spySetPage).toHaveBeenCalledWith('boardDefaultPage');
    });

    test('calls board-add and toggleBoardMode with the correct arguments when custom board is created', () => {
        const { result: boardStore } = renderHook(() => useBoardStore());
        const { result: pageStore } = renderHook(() => usePageStore());

        const spyboardadd = vi.spyOn(boardStore.current, 'addBoard');
        const spySetPage = vi.spyOn(pageStore.current, 'setPage');

        const { getByTestId } = render(<BoardAdd />);

        const nameInput = getByTestId('board-add-enter-name-input');
        const descriptionInput = getByTestId(
            'board-add-enter-description-input'
        );
        const createOwnButton = getByTestId('board-add-create-own-button');

        fireEvent.change(nameInput, { target: { value: 'A custom title' } });
        fireEvent.change(descriptionInput, {
            target: { value: 'A custom subtitle.' },
        });
        fireEvent.click(createOwnButton);

        expect(spyboardadd).toHaveBeenCalledTimes(1);
        expect(spyboardadd).toHaveBeenCalledWith({
            id: 0,
            lanes: [],
            subtitle: 'A custom subtitle.',
            title: 'A custom title',
        });

        expect(spySetPage).toHaveBeenCalledTimes(1);
        expect(spySetPage).toHaveBeenCalledWith('boardCustomLanesPage');
    });
});
