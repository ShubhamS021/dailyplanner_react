export const mockAddCardToLane = jest.fn();
export const mockRemoveCardFromLane = jest.fn();
export const mockRemoveCardsFromLane = jest.fn();
export const mockHandleDragEnd = jest.fn();
export const mockClearBoard = jest.fn();
export const mockExportBoardToJSON = jest.fn();
export const mockImportBoardFromJSON = jest
    .fn()
    .mockImplementation((e: React.ChangeEvent<HTMLInputElement>) => {
        mockImportBoardFromJSON.mock.calls.push([e]);
    });
export const mockUpdateCard = jest.fn();
export const mockUpdateTask = jest.fn();

export const mockContext = {
    board: [],
    addCardToLane: mockAddCardToLane,
    removeCardFromLane: mockRemoveCardFromLane,
    removeCardsFromLane: mockRemoveCardsFromLane,
    handleDragEnd: mockHandleDragEnd,
    clearBoard: mockClearBoard,
    exportBoardToJSON: mockExportBoardToJSON,
    importBoardFromJSON: mockImportBoardFromJSON,
    updateCard: mockUpdateCard,
    updateTask: mockUpdateTask,
};
