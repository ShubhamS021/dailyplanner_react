import { type DBSchema } from 'idb';

export interface DayplannerDB extends DBSchema {
    history: {
        key: string;
        value: any;
        indexes: { boardIdIndex: string[] };
    };
}
