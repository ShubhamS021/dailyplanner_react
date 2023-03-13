import { fireEvent, render } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import { mockContext, mockImportBoardFromJSON } from '../../mocks/context.mock';
import Import from './Import';

test('triggers the import', () => {
    const { getByTestId } = render(
        <BoardContext.Provider value={mockContext}>
            <Import />
        </BoardContext.Provider>
    );

    const button = getByTestId('import-button');
    button.click();
});

test('imports a board context', () => {
    const { getByTestId } = render(
        <BoardContext.Provider value={mockContext}>
            <Import />
        </BoardContext.Provider>
    );

    const input = getByTestId('import-input') as HTMLInputElement;
    const file = new File([''], 'test.json', { type: 'application/json' });
    const event = {
        target: { files: [file] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    fireEvent.change(input, event);

    expect(mockImportBoardFromJSON).toHaveBeenCalledTimes(2);
});
