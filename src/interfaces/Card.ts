import { type Shirt } from '../types/Shirt';
import type Tag from './Tag';
import type Task from './Task';

export interface Card {
    id: number;
    title: string;
    shirt: Shirt;
    description?: string;
    upperTags?: Tag[];
    lowerTags?: Tag[];
    tasks?: Task[];
}
