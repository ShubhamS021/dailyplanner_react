import { type HistoryType } from '@/typesHistoryType';
import { type HistoryEntry } from './HistoryEntry';

export class HistoryListEntry {
    id: number;
    type: HistoryType;
    data: HistoryEntry;
}
