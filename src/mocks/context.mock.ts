import { initialBoardState } from '../context/initialBoard.state';
import { initialLanes } from '../context/initialLanes.state';
import { type Board } from '../interfaces/Board';
import { type BoardMode } from '../types/BoardMode';
import { type ThemeMode } from '../types/ThemeMode';

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

const initialBoards: Board[] = [
    { ...initialBoardState, lanes: initialLanes },
    { ...initialBoardState, id: 1, lanes: initialLanes },
    { ...initialBoardState, id: 2, lanes: initialLanes },
];
const initialBoard: Board = { ...initialBoardState, lanes: initialLanes };

export const mockContext = {
    boards: initialBoards,
    board: initialBoard,
    compactMode: false,
    themeMode: 'light' as ThemeMode,
    boardMode: 'boardChooseMode' as BoardMode,
    addLaneToBoard: mockAddLaneToBoard,
    addCardToLane: mockAddCardToLane,
    addCardToInitialBoardLane: mockAddCardToInitialBoardLane,
    removeLaneFromBoard: mockRemoveLaneFromBoard,
    removeCardFromLane: mockRemoveCardFromLane,
    removeCardsFromLane: mockRemoveCardsFromLane,
    moveCardToBoard: mockMoveCardToBoard,
    handleDragEnd: mockHandleDragEnd,
    clearBoard: mockClearBoard,
    exportBoardToJSON: mockExportBoardToJSON,
    exportBoardsToJSON: mockExportBoardsToJSON,
    importBoardFromJSON: mockImportBoardFromJSON,
    updateCard: mockUpdateCard,
    updateTask: mockUpdateTask,
    findLastTaskIdInSpecificCard: mockFindLastTaskIdInSpecificCard,
    toggleCompactMode: mockToggleCompactMode,
    toggleBoardMode: mockToggleBoardMode,
    toggleThemeMode: mockToggleThemeMode,
    addBoard: mockAddBoard,
    removeBoard: mockRemoveBoard,
    renameBoard: mockRenameBoard,
    renameLane: mockRenameLane,
    moveLane: mockMoveLane,
    updateLaneColor: mockUpdateLaneColor,
    enterBoard: mockEnterBoard,
    updateLanguage: mockUpdateLanguage,
};
