import { type HistoryType } from '../../../types/HistoryType';
import { type HistoryEntry } from './HistoryEntry';

export class HistoryListEntry {
    id: number;
    type: HistoryType;
    data: HistoryEntry;
}
