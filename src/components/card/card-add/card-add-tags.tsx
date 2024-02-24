import { ColorChooser } from '@/components/common/color-chooser/color-chooser';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import { ColorVariant } from '@/types/ColorVariant';
import { AutoComplete, Option } from '@/ui/autocomplete';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { ToastAction } from '@/ui/toast';
import { useToast } from '@/ui/use-toast';
import { useEffect, useState } from 'react';
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
    const [board] = useBoardStore((state) => [state.board]);
    const { toast } = useToast();

    const MAX_TAGS = 5;
    const [selectedColor, setSelectedColor] = useState(
        'light_grey' as ColorVariant
    );
    const [tag, setTag] = useState('');
    const [options, setOptions] = useState([] as Option[]);

    const { t } = useTranslation();

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
        // only add if not existent in card
        if (
            card.upperTags.find((value) => value.text === newTag.text) ===
            undefined
        ) {
            updateTags([...card.upperTags, newTag]);
            setTag('');

            handleGetAutoCompleteOptions(newTag);
        } else {
            toast({
                title: t(
                    'components.AddCard.modal.AddCardTags.tag_already_exists_title'
                ),
                action: (
                    <ToastAction
                        altText={t(
                            'components.AddCard.modal.AddCardTags.tag_already_exists_action'
                        )}
                    >
                        {t(
                            'components.AddCard.modal.AddCardTags.tag_already_exists_action'
                        )}
                        ,
                    </ToastAction>
                ),
                description: t(
                    'components.AddCard.modal.AddCardTags.tag_already_exists_description'
                ),
            });
        }
    };

    const handleGetAutoCompleteOptions = (newTag?: Tag) => {
        const options = getAutoCompleteOptions(newTag);
        console.log(options);

        setOptions(options);
    };

    useEffect(() => {
        handleGetAutoCompleteOptions();
    }, []);

    const getAutoCompleteOptions = (newTag?: Tag): Option[] => {
        const lanes = board.lanes;
        if (lanes === undefined) return [];
        const cards = lanes?.flatMap((lane) => lane.cards);
        if (cards === undefined) return [];
        const tags = cards?.flatMap((card) => card.upperTags ?? []);
        if (tags === undefined) return [];

        if (newTag != null) {
            tags.push(newTag);
        }

        const distinctTags = tags.reduce((acc: Tag[], cur: Tag) => {
            if (acc.find((tag) => tag.text === cur.text) === undefined) {
                acc.push(cur);
            }
            return acc;
        }, []);

        const options: Option[] = distinctTags.map((tag) => ({
            value: tag.text,
            label: tag.text,
        }));

        return options;
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
                    <AutoComplete
                        options={options}
                        emptyMessage={'No tags found. Create a new tag!'}
                        testId="addcard-tags-input"
                        onValueChange={(tagOption) => {
                            handleTagChanges(tagOption?.value ?? '');
                        }}
                        value={{ label: tag, value: tag }}
                    ></AutoComplete>

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
