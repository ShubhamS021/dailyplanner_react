import { type ThemeMode } from '../src/types/ThemeMode';

export const mockAddLaneToBoard = jest.fn();
export const mockAddCardToLane = jest.fn();
export const mockAddCardToInitialBoardLane = jest.fn();
export const mockRemoveLaneFromBoard = jest.fn();
export const mockRemoveCardFromLane = jest.fn();
export const mockRemoveCardsFromLane = jest.fn();
export const mockMoveCardToBoard = jest.fn();
export const mockHandleDragEnd = jest.fn();
export const mockClearBoard = jest.fn();
export const mockExportBoardToJSON = jest.fn();
export const mockExportBoardsToJSON = jest.fn();
export const mockImportBoardFromJSON = jest
    .fn()
    .mockImplementation(
        (e: React.ChangeEvent<HTMLInputElement>, all: boolean) => {
            mockImportBoardFromJSON.mock.calls.push([e]);
        }
    );
export const mockUpdateCard = jest.fn();
export const mockUpdateTask = jest.fn();

let mockedLastTaskId = 1;
export const mockFindLastTaskIdInSpecificCard = jest.fn(() => {
    mockedLastTaskId++;
    return mockedLastTaskId;
});

export const mockToggleCompactMode = jest.fn();
export const mockToggleBoardMode = jest.fn();
export const mockToggleThemeMode = jest
    .fn()
    .mockImplementation((current: ThemeMode) => {
        if (current === 'light') return 'dark';
        return 'light';
    });
export const mockAddBoard = jest.fn();
export const mockRemoveBoard = jest.fn();
export const mockRenameBoard = jest.fn();
export const mockRenameLane = jest.fn();
export const mockMoveLane = jest.fn();
export const mockUpdateLaneColor = jest.fn();
export const mockEnterBoard = jest.fn();
export const mockUpdateLanguage = jest.fn();
