import { type Card } from '../interfaces/Card';
import { type HistoryListEntry } from '../hooks/useHistory/interfaces/HistoryListEntry';
import { type HistoryType } from '../types/HistoryType';
import { IDBStores, addData, getDataByIndex } from './indexdb.util';

const saveToHistory = (type: HistoryType, boardId: number, params: any) => {
    const id = Date.now();
    void addData(IDBStores.History, {
        id,
        type,
        boardId,
        data: { ...params },
    });
};

export const getHistory = async (
    boardId: number
): Promise<HistoryListEntry[]> => {
    return (await getDataByIndex(
        IDBStores.History,
        'boardIdIndex',
        boardId
    )) as HistoryListEntry[];
};

export const saveDeletionToHistory = (card: Card, boardId: number) => {
    saveToHistory('DELETION', boardId, { card });
};

export const saveUpdateToHistory = (card: Card, boardId: number) => {
    saveToHistory('UPDATE', boardId, { card });
};

export const saveCreationToHistory = (card: Card, boardId: number) => {
    saveToHistory('CREATION', boardId, { card });
};

export const saveMovementToHistory = (
    card: Card,
    boardId: number,
    laneStart: number,
    laneEnd: number
) => {
    saveToHistory('MOVEMENT', boardId, { card, laneStart, laneEnd });
};

export const saveBoardMovementToHistory = (
    card: Card,
    boardId: number,
    boardStart: number,
    boardEnd: number
) => {
    saveToHistory('BOARDMOVEMENT', boardId, { card, boardStart, boardEnd });
};
