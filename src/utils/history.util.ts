import { type Card } from '../interfaces/Card';
import { type HistoryType } from '../types/HistoryType';
import { IDBStores, addData } from './indexdb.util';

const saveToHistory = (type: HistoryType, params: any) => {
    const id = Date.now();
    void addData(IDBStores.History, { id, type, data: { ...params } });
};

export const saveDeletionToHistory = (card: Card) => {
    saveToHistory('DELETION', { card });
};

export const saveUpdateToHistory = (card: Card) => {
    saveToHistory('UPDATE', { card });
};

export const saveCreationToHistory = (card: Card) => {
    saveToHistory('CREATION', { card });
};

export const saveMovementToHistory = (
    card: Card,
    laneStart: number,
    laneEnd: number
) => {
    saveToHistory('MOVEMENT', { card, laneStart, laneEnd });
};

export const saveBoardMovementToHistory = (
    card: Card,
    boardStart: number,
    boardEnd: number
) => {
    saveToHistory('BOARDMOVEMENT', { card, boardStart, boardEnd });
};
