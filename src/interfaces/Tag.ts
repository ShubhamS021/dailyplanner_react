export type TagType = 'upper' | 'lower';

export interface Tag {
    id: number;
    text: string;
    color: string;
    tagType: TagType;
}

export default Tag;
