import { useEffect, useMemo, useState } from 'react';
import { type HistoryListEntry } from '@/hooks/useHistory/interfaces/HistoryListEntry';
import { useDayplannerDB } from '@/hooks/useDayplannerDB/useDayplannerDB';
import { type HistoryType } from '@/types/HistoryType';
import { type Card } from '@/interfaces/Card';

const useHistory = (boardId: number) => {
    const [history, setHistory] = useState<HistoryListEntry[]>([]);
    const { addData, getDataByIndex } = useDayplannerDB('history');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const history = await getHistory(boardId);
                setHistory(history ?? []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().catch(console.error);
    }, [boardId]);

    const saveToHistory = (type: HistoryType, boardId: number, params: any) => {
        const id = Date.now();
        addData({
            id,
            type,
            boardId,
            data: { ...params },
        }).catch(console.error);
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

    const value = useMemo(
        () => ({
            history,
            getHistory,
            addDeletionToHistory,
            addUpdateToHistory,
            addCreationToHistory,
            addMovementToHistory,
            addBoardMovementToHistory,
        }),
        [history]
    );

    return value;
};

export default useHistory;
