import { ColorChooser } from '@/components/common/color-chooser/color-chooser';
import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import { ColorVariant } from '@/types/ColorVariant';
import { TagsIcon } from '@/ui/Icons/Icons';
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
            <div className="field-caption">
                <div
                    className="flex gap-1 font-bold"
                    data-testid="addcardtags-headline"
                >
                    {headline}
                    <div
                        className={`field-caption-additional self-center place-self-end`}
                    >
                        ({card.upperTags?.length ?? 0}/{MAX_TAGS})
                    </div>
                </div>
            </div>
            <div className="grid grid-rows-2 gap-2">
                <div className="flex gap-2">
                    <div className="self-center">
                        <div className="formField flex gap-2 items-center">
                            <input
                                placeholder={'Enter a tag.'}
                                className="focus:outline-none text-sm w-full"
                                data-testid="addcard-tags-input"
                                value={tag}
                                onChange={(e) => {
                                    handleTagChanges(e.target.value);
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className="self-center">
                        <button
                            className="group button"
                            data-testid="addcard-tag-button"
                            onClick={(_e) => {
                                handleAddNewTag();
                            }}
                            disabled={
                                tag === '' ||
                                card.upperTags?.length === MAX_TAGS
                            }
                        >
                            <div className="flex gap-2 items-center p-2">
                                <TagsIcon
                                    viewBox={{
                                        x: 0,
                                        y: 0,
                                        width: 16,
                                        height: 16,
                                    }}
                                />
                                <p className="font-semibold text-sm">
                                    {t(
                                        'components.AddCard.modal.AddCardTags.add'
                                    ) ?? ''}
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="flex gap-1">
                        <ColorChooser
                            onSelectColor={(variant: ColorVariant) => {
                                handleTagColorSelection(variant);
                            }}
                        ></ColorChooser>
                    </div>
                </div>
            </div>
            {card.upperTags?.length === MAX_TAGS && (
                <small className="text-[#e0004d]">
                    {t('components.AddCard.modal.AddCardTags.limit') ?? ''}
                </small>
            )}
        </div>
    );
};
