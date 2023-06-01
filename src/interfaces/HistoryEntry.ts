import { type Card } from './Card';

export class HistoryEntry {
    date: Date;
    card: Card;
    laneStart?: number;
    laneEnd?: number;
    boardStart?: number;
    boardEnd?: number;
}
