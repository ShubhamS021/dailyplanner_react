import { type ColorVariant } from '@/types/ColorVariant';
import { type Card } from './Card';

export interface Lane {
    id: number;
    title: string;
    variant: ColorVariant;
    cards: Card[];
}
