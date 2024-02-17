import { ColorVariant } from '@/types/ColorVariant';
import { type TagType } from '../types/TagType';

export interface Tag {
    id: number;
    text: string;
    variant: ColorVariant;
    tagType: TagType;
}

export default Tag;
