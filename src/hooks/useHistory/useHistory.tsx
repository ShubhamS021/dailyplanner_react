import { useEffect, useState } from 'react';
import { type HistoryListEntry } from './interfaces/HistoryListEntry';
import { useDayplannerDB } from 'hooks/useDayplannerDB/useDayplannerDB';
import { type HistoryType } from 'types/HistoryType';
import { type Card } from 'interfaces/Card';

const useHistory = (boardId: number) => {
    const [history, setHistory] = useState<HistoryListEntry[]>([]);
    const { addData, getDataByIndex } = useDayplannerDB('history');

    const fetchData = async () => {
        try {
            return await getHistory(boardId);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        void fetchData().then((historyData) => {
            setHistory(historyData ?? []);
        });
    }, [boardId]);

    const saveToHistory = (type: HistoryType, boardId: number, params: any) => {
        const id = Date.now();
        void addData({
            id,
            type,
            boardId,
            data: { ...params },
        });
    };

    const getHistory = async (boardId: number): Promise<HistoryListEntry[]> => {
        return (await getDataByIndex(
            'boardIdIndex',
            boardId
        )) as HistoryListEntry[];
    };

    const addDeletionToHistory = (card: Card, boardId: number) => {
        saveToHistory('DELETION', boardId, { card });
    };

    const addUpdateToHistory = (card: Card, boardId: number) => {
        saveToHistory('UPDATE', boardId, { card });
    };

    const addCreationToHistory = (card: Card, boardId: number) => {
        saveToHistory('CREATION', boardId, { card });
    };

    const addMovementToHistory = (
        card: Card,
        boardId: number,
        laneStart: number,
        laneEnd: number
    ) => {
        saveToHistory('MOVEMENT', boardId, { card, laneStart, laneEnd });
    };

    const addBoardMovementToHistory = (
        card: Card,
        boardId: number,
        boardStart: number,
        boardEnd: number
    ) => {
        saveToHistory('BOARDMOVEMENT', boardId, { card, boardStart, boardEnd });
    };

    return {
        history,
        getHistory,
        addDeletionToHistory,
        addUpdateToHistory,
        addCreationToHistory,
        addMovementToHistory,
        addBoardMovementToHistory,
    };
};

export default useHistory;
