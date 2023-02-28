import type Tag from 'interfaces/Tag';
import type Task from 'interfaces/Task';

export interface Card {
    id: number;
    title: string;
    description?: string;
    upperTags?: Tag[];
    lowerTags?: Tag[];
    tasks?: Task[];
}
