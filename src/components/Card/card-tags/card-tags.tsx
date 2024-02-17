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
    editMode = false,
    onRemoveTag,
}) => {
    return (
        <div
            className="flex gap-1 wrap w-full"
            data-testid={editMode ? 'card-edit-tags' : 'card-tags'}
        >
            {tags.map((t: Tag) => (
                <Badge variant={t.variant} key={t.id}>
                    <span className="flex gap-2">
                        {t.text}
                        {editMode ?? (
                            <Trash2
                                onClick={() => {
                                    if (onRemoveTag != null) {
                                        onRemoveTag(t);
                                    }
                                }}
                            />
                        )}
                    </span>
                </Badge>
            ))}
        </div>
    );
};
