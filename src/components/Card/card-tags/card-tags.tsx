import Tag from '@/interfaces/Tag';
import { Badge } from '@/ui/badge';
import { Trash2 } from 'lucide-react';

export interface CardTagsProps {
    tags: Tag[];
    editMode?: boolean;
    onRemoveTag?: (tag: Tag) => void;
}

export const CardTags: React.FC<CardTagsProps> = ({
    tags,
    editMode,
    onRemoveTag,
}) => {
    return (
        <div
            className="flex gap-1 wrap w-full"
            data-testid={editMode === true ? 'card-edit-tags' : 'card-tags'}
        >
            {tags.map((t: Tag) => (
                <Badge variant={t.variant} key={t.id}>
                    <span className="flex items-center gap-2">
                        {t.text}
                        {editMode === true && (
                            <Trash2
                                width={12}
                                height={12}
                                className={`text-gray-500 hover:text-black hover:cursor-pointer`}
                                onClick={() => {
                                    if (onRemoveTag != null) {
                                        onRemoveTag(t);
                                    }
                                }}
                                data-testid="tag-remove-button"
                            />
                        )}
                    </span>
                </Badge>
            ))}
        </div>
    );
};
