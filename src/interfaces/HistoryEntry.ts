import { type HistoryType } from '../types/HistoryType';
import { type Card } from './Card';

export class HistoryEntry {
    date: Date;
    type: HistoryType;
    card: Card;
}
