import { ColorChooser } from '@/components/common/color-chooser/color-chooser';
import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import { ColorVariant } from '@/types/ColorVariant';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface CardAddTagsProps {
    headline: string;
    card: Card;
    updateTags: (tags: Tag[]) => void;
}

export const CardAddTags: React.FC<CardAddTagsProps> = ({
    headline,
    card,
    updateTags,
}) => {
    const MAX_TAGS = 5;
    const [selectedColor, setSelectedColor] = useState(
        'light_grey' as ColorVariant
    );
    const { t } = useTranslation();

    const [tag, setTag] = useState('');

    const handleTagChanges = (tag: string) => {
        setTag(tag);
    };

    const handleTagColorSelection = (color: ColorVariant) => {
        setSelectedColor(color);
    };

    const handleAddNewTag = () => {
        if (card.upperTags == null) card.upperTags = [];
        const newTag: Tag = {
            id: card.upperTags?.length + 1,
            text: tag,
            variant: selectedColor,
            tagType: 'upper',
        };
        updateTags([...card.upperTags, newTag]);
        setTag('');
    };

    return (
        <div className="flex flex-col gap-2">
            <Label data-testid="addcardtags-headline">
                <div className="flex gap-1">
                    <div>{headline}</div>
                    <div className="flex gap-3">
                        ({card.upperTags?.length ?? 0}/{MAX_TAGS})
                        {card.upperTags?.length === MAX_TAGS && (
                            <span className="text-destructive">
                                {t(
                                    'components.AddCard.modal.AddCardTags.limit'
                                )}
                            </span>
                        )}
                    </div>
                </div>
            </Label>

            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <Input
                        data-testid="addcard-tags-input"
                        value={tag}
                        onChange={(e) => {
                            handleTagChanges(e.target.value);
                        }}
                    ></Input>
                    <Button
                        data-testid="addcard-tag-button"
                        size={'sm'}
                        onClick={(_e) => {
                            handleAddNewTag();
                        }}
                        disabled={
                            tag === '' || card.upperTags?.length === MAX_TAGS
                        }
                    >
                        {t('components.AddCard.modal.AddCardTags.add') ?? ''}
                    </Button>
                </div>
                <ColorChooser
                    onSelectColor={(variant: ColorVariant) => {
                        handleTagColorSelection(variant);
                    }}
                ></ColorChooser>
            </div>
        </div>
    );
};
