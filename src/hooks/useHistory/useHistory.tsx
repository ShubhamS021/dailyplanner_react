import { useCallback, useEffect, useMemo, useState } from 'react';
import { type HistoryListEntry } from '@/hooks/useHistory/interfaces/HistoryListEntry';
import { useDayplannerDB } from '@/hooks/useDayplannerDB/useDayplannerDB';
import { type HistoryType } from '@/types/HistoryType';
import { type Card } from '@/interfaces/Card';

const useHistory = (boardId: number) => {
    const { loading, addData, getDataByIndex } = useDayplannerDB('history');
    const [history, setHistory] = useState<HistoryListEntry[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const history = await getHistory(boardId);
            return history;
        } catch (error) {
            console.error(error);
        }
    }, [boardId, loading]);

    const saveToHistory = useCallback(
        (type: HistoryType, boardId: number, params: any) => {
            const id = Date.now();
            addData({
                id,
                type,
                boardId,
                data: { ...params },
            }).catch(console.error);
        },
        [addData]
    );

    const getHistory = useCallback(
        async (boardId: number): Promise<HistoryListEntry[]> => {
            return (await getDataByIndex(
                'boardIdIndex',
                boardId
            )) as HistoryListEntry[];
        },
        [getDataByIndex]
    );

    const addDeletionToHistory = useCallback(
        (card: Card, boardId: number) => {
            saveToHistory('DELETION', boardId, { card });
        },
        [saveToHistory]
    );

    const addUpdateToHistory = useCallback(
        (card: Card, boardId: number) => {
            saveToHistory('UPDATE', boardId, { card });
        },
        [saveToHistory]
    );

    const addCreationToHistory = useCallback(
        (card: Card, boardId: number) => {
            saveToHistory('CREATION', boardId, { card });
        },
        [saveToHistory]
    );

    const addMovementToHistory = useCallback(
        (card: Card, boardId: number, laneStart: number, laneEnd: number) => {
            saveToHistory('MOVEMENT', boardId, { card, laneStart, laneEnd });
        },
        [saveToHistory]
    );

    const addBoardMovementToHistory = useCallback(
        (card: Card, boardId: number, boardStart: number, boardEnd: number) => {
            saveToHistory('BOARDMOVEMENT', boardId, {
                card,
                boardStart,
                boardEnd,
            });
        },
        [saveToHistory]
    );

    useEffect(() => {
        console.log('loading state', loading);

        if (!loading) {
            fetchData()
                .then((history) => {
                    setHistory(history ?? []);
                })
                .catch(console.error);
        }
    }, [loading, fetchData]);

    const value = useMemo(
        () => ({
            history,
            addDeletionToHistory,
            addUpdateToHistory,
            addCreationToHistory,
            addMovementToHistory,
            addBoardMovementToHistory,
        }),
        [
            history,
            addDeletionToHistory,
            addUpdateToHistory,
            addCreationToHistory,
            addMovementToHistory,
            addBoardMovementToHistory,
        ]
    );

    return value;
};

export default useHistory;
