import {
    initialBoardState,
    initialLanes,
    type BoardMode,
} from '../context/BoardContext';
import { type Board } from '../interfaces/Board';

export const mockAddLaneToBoard = jest.fn();
export const mockAddCardToLane = jest.fn();
export const mockRemoveLaneFromBoard = jest.fn();
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

let mockedLastTaskId = 1;
export const mockFindLastTaskIdInSpecificCard = jest.fn(() => {
    mockedLastTaskId++;
    return mockedLastTaskId;
});

export const mockToggleCompactMode = jest.fn();
export const mockToggleBoardMode = jest.fn();
export const mockAddBoard = jest.fn();
export const mockRemoveBoard = jest.fn();
export const mockEnterBoard = jest.fn();

const initialBoards: Board[] = [{ ...initialBoardState, lanes: initialLanes }];
const initialBoard: Board = { ...initialBoardState, lanes: initialLanes };

export const mockContext = {
    boards: initialBoards,
    board: initialBoard,
    compactMode: false,
    boardMode: 'boardChooseMode' as BoardMode,
    addLaneToBoard: mockAddLaneToBoard,
    addCardToLane: mockAddCardToLane,
    removeLaneFromBoard: mockRemoveLaneFromBoard,
    removeCardFromLane: mockRemoveCardFromLane,
    removeCardsFromLane: mockRemoveCardsFromLane,
    handleDragEnd: mockHandleDragEnd,
    clearBoard: mockClearBoard,
    exportBoardToJSON: mockExportBoardToJSON,
    importBoardFromJSON: mockImportBoardFromJSON,
    updateCard: mockUpdateCard,
    updateTask: mockUpdateTask,
    findLastTaskIdInSpecificCard: mockFindLastTaskIdInSpecificCard,
    toggleCompactMode: mockToggleCompactMode,
    toggleBoardMode: mockToggleBoardMode,
    addBoard: mockAddBoard,
    removeBoard: mockRemoveBoard,
    enterBoard: mockEnterBoard,
};
