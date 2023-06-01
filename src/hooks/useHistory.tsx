import { useEffect, useState } from 'react';
import { type HistoryListEntry } from '../interfaces/HistoryListEntry';
import { getHistory } from '../utils/history.util';

const useHistory = (boardId: number) => {
    const [history, setHistory] = useState<HistoryListEntry[]>([]);

    const fetchData = async () => {
        try {
            return await getHistory(boardId);
        } catch (error) {}
    };

    useEffect(() => {
        void fetchData().then((historyData) => {
            setHistory(historyData ?? []);
        });
    }, [boardId]);

    return { history };
};

export default useHistory;
