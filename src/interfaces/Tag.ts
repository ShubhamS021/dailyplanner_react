import { type TagType } from 'types/TagType';

export interface Tag {
    id: number;
    text: string;
    color: string;
    tagType: TagType;
}

export default Tag;
