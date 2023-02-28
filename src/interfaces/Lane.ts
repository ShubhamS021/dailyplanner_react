import { type Card } from './Card';

export interface Lane {
    id: number;
    title: string;
    color: string;
    cards?: Card[];
}
