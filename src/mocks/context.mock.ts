export const mockAddCardToLane = jest.fn();
export const mockRemoveCardFromLane = jest.fn();
export const mockHandleDragEnd = jest.fn();
export const mockClearBoard = jest.fn();
export const mockExportBoardToJSON = jest.fn();
export const mockImportBoardFromJSON = jest
    .fn()
    .mockImplementation((e: React.ChangeEvent<HTMLInputElement>) => {
        mockImportBoardFromJSON.mock.calls.push([e]);
    });

export const mockContext = {
    board: [],
    addCardToLane: mockAddCardToLane,
    removeCardFromLane: mockRemoveCardFromLane,
    handleDragEnd: mockHandleDragEnd,
    clearBoard: mockClearBoard,
    exportBoardToJSON: mockExportBoardToJSON,
    importBoardFromJSON: mockImportBoardFromJSON,
};
