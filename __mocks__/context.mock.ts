import { type ThemeMode } from '../src/types/ThemeMode';

export const mockAddLaneToBoard = vi.fn();
export const mockAddCardToLane = vi.fn();
export const mockAddCardToInitialBoardLane = vi.fn();
export const mockRemoveLaneFromBoard = vi.fn();
export const mockRemoveCardFromLane = vi.fn();
export const mockRemoveCardsFromLane = vi.fn();
export const mockMoveCardToBoard = vi.fn();
export const mockHandleDragEnd = vi.fn();
export const mockClearBoard = vi.fn();
export const mockExportBoardToJSON = vi.fn();
export const mockExportBoardsToJSON = vi.fn();
export const mockImportBoardFromJSON = jest
    .fn()
    .mockImplementation(
        (e: React.ChangeEvent<HTMLInputElement>, all: boolean) => {
            mockImportBoardFromJSON.mock.calls.push([e]);
        }
    );
export const mockUpdateCard = vi.fn();
export const mockUpdateTask = vi.fn();

let mockedLastTaskId = 1;
export const mockFindLastTaskIdInSpecificCard = vi.fn(() => {
    mockedLastTaskId++;
    return mockedLastTaskId;
});

export const mockToggleCompactMode = vi.fn();
export const mockToggleBoardMode = vi.fn();
export const mockToggleThemeMode = jest
    .fn()
    .mockImplementation((current: ThemeMode) => {
        if (current === 'light') return 'dark';
        return 'light';
    });
export const mockAddBoard = vi.fn();
export const mockRemoveBoard = vi.fn();
export const mockRenameBoard = vi.fn();
export const mockRenameLane = vi.fn();
export const mockMoveLane = vi.fn();
export const mockUpdateLaneColor = vi.fn();
export const mockEnterBoard = vi.fn();
export const mockUpdateLanguage = vi.fn();
