import { type Board } from 'interfaces/Board';
import { type Card } from 'interfaces/Card';
import { type Lane } from 'interfaces/Lane';
import { type DropResult } from 'react-beautiful-dnd';
import { type BoardMode } from 'types/BoardMode';
import { type ThemeMode } from 'types/ThemeMode';

export interface Actions {
    addLaneToBoard: (lane: Lane, boardId: number) => void;
    addCardToLane: (card: Card, laneId: number) => void;
    addCardToInitialBoardLane: (card: Card, boardId: number) => void;
    removeLaneFromBoard: (laneId: number, boardId: number) => void;
    removeCardFromLane: (cardId: number, laneId: number) => void;
    removeCardsFromLane: (laneId: number) => void;
    moveCardToBoard: (
        card: Card,
        currentLaneId: number,
        newboard: Board
    ) => void;
    handleDragEnd: (result: DropResult) => void;
    clearBoard: () => void;
    exportBoardToJSON: (board: Board) => void;
    exportBoardsToJSON: () => void;
    importBoardFromJSON: (
        e: React.ChangeEvent<HTMLInputElement>,
        all: boolean
    ) => void;
    updateCard: (card: Card, laneId: number) => void;
    updateTask: (cardId: number, taskId: number, fulfilled: boolean) => void;
    toggleCompactMode: () => void;
    toggleBoardMode: (mode: BoardMode) => void;
    toggleThemeMode: (mode: ThemeMode) => void;
    addBoard: (board: Board) => void;
    removeBoard: (boardId: number) => void;
    renameBoard: (boardId: number, title: string, subtitle: string) => void;
    renameLane: (laneId: number, title: string) => void;
    moveLane: (targetBoard: Board, laneId: number, newId: number) => void;
    updateLaneColor: (laneId: number, color: string) => void;
    enterBoard: (boardId: number) => void;
    updateLanguage: (language: string) => void;
    restoreBoard: (board: Board) => void;
    updateBoards: (board: Board) => void;
}
