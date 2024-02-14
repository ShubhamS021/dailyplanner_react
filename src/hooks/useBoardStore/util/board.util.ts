import { type Board } from '@/interfaces/Board';
import { type Card } from '@/interfaces/Card';

export const findLastCardId = (board: Board) => {
    return findLastCardIdInBoard(board);
};

export const findLastBoardId = (boards: Board[]) => {
    return Math.max(...boards.map((board) => board.id), 0);
};

export const findLastCardIdInBoard = (board: Board) => {
    if (board.lanes === undefined) return 0;
    return Math.max(
        ...board.lanes.flatMap((lane) => lane.cards.map((card) => card.id)),
        0
    );
};

export const findLastTaskIdInCard = (card: Card): number => {
    return Math.max(...(card.tasks?.map((task) => task.id) ?? []), 0);
};

export const exportBoardToJson = (board: Board) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(board)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    const currentDate = new Date();
    link.download = `BoardExport-${board.title.replaceAll(
        ' ',
        '_'
    )}-${currentDate.toLocaleString()}.json`;

    link.click();
};
