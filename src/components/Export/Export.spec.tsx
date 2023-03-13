import { fireEvent, render } from '@testing-library/react';
import { BoardContext } from '../../context/BoardContext';
import { mockContext, mockExportBoardToJSON } from '../../mocks/context.mock';
import Export from './Export';

test('exports a board context', () => {
    const { getByTestId } = render(
        <BoardContext.Provider value={mockContext}>
            <Export />
        </BoardContext.Provider>
    );

    const exportButton = getByTestId('export-button');
    fireEvent.click(exportButton);

    expect(mockExportBoardToJSON).toHaveBeenCalledTimes(1);
});
