import { type Board } from '@/interfaces/Board';
import { type Card } from '@/interfaces/Card';
import { type Lane } from '@/interfaces/Lane';
import { ColorVariant } from '@/types/ColorVariant';
import { type ThemeMode } from '@/types/ThemeMode';
import { type DropResult } from 'react-beautiful-dnd';

export interface BoardStoreActions {
    addLaneToBoard: (lane: Lane, boardId: number) => void;
    addCardToLane: (card: Card, laneId: number) => void;
    addCardToInitialBoardLane: (card: Card, boardId: number) => void;
    removeLaneFromBoard: (laneId: number, boardId: number) => void;
    removeCardFromLane: (cardId: number, laneId: number) => void;
    removeCardsFromLane: (laneId: number) => void;
    moveCardToBoard: (card: Card, newboard: Board) => void;
    handleDragEnd: (result: DropResult) => void;
    clearBoard: () => void;
    exportBoardToJSON: (board: Board) => void;
    exportBoardsToJSON: () => void;
    importBoardFromJSON: (
        e: React.ChangeEvent<HTMLInputElement>,
        multiple: boolean
    ) => void;
    updateCard: (card: Card, laneId: number) => void;
    updateTask: (cardId: number, taskId: number, fulfilled: boolean) => void;
    toggleCompactMode: () => void;
    toggleThemeMode: (mode: ThemeMode) => void;
    addBoard: (board: Board) => void;
    removeBoard: (boardId: number) => void;
    renameBoard: (boardId: number, title: string, subtitle: string) => void;
    renameLane: (laneId: number, title: string) => void;
    moveLane: (targetBoard: Board, laneId: number, newId: number) => void;
    updateLaneColor: (laneId: number, cariant: ColorVariant) => void;
    enterBoard: (boardId: number) => void;
    updateLanguage: (language: string) => void;
    updateBoards: (board: Board) => void;
    updateBoard: (board: Board) => void;
}
