import { type Card } from '../interfaces/Card';
import { type HistoryType } from '../types/HistoryType';

const saveToHistory = (type: HistoryType, params: any[]) => {
    console.log(type, ...params);
    // TODO: logging to an online system here possible
};

export const saveDeletionToHistory = (card: Card) => {
    saveToHistory('DELETION', [card]);
};

export const saveUpdateToHistory = (card: Card) => {
    saveToHistory('UPDATE', [card]);
};

export const saveCreationToHistory = (card: Card) => {
    saveToHistory('CREATION', [card]);
};

export const saveMovementToHistory = (
    card: Card,
    laneStart: number,
    laneEnd: number
) => {
    saveToHistory('CREATION', [card, laneStart, laneEnd]);
};

export const saveBoardMovementToHistory = (
    card: Card,
    boardStart: number,
    boardEnd: number
) => {
    saveToHistory('BOARDMOVEMENT', [card, boardStart, boardEnd]);
};
