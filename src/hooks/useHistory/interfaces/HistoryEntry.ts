import { type Card } from '../../../interfaces/Card';

export class HistoryEntry {
    date: Date;
    card: Card;
    laneStart?: number;
    laneEnd?: number;
    boardStart?: number;
    boardEnd?: number;
}
