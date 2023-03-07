import { useRef, useState } from 'react';
import { addSVG } from '../../../assets/svgs/add.svg';
import { tagsSVG } from '../../../assets/svgs/tags.svg';
import { TagComponent } from '../../../components/Tag/Tag';
import { type Card } from '../../../interfaces/Card';
import type Tag from '../../../interfaces/Tag';
import { colors } from '../../../theme/colors';

export interface AddCardTagsProps {
    headline: string;
    explanation: string;
    card: Card;
    updateTags: (tags: Tag[]) => void;
}

export const AddCardTags: React.FC<AddCardTagsProps> = ({
    headline,
    explanation,
    card,
    updateTags,
}) => {
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(colors.sulzer33_blue);

    const tagTitle = useRef('');

    const handleTagTitleChanges = (title: string) => {
        tagTitle.current = title;
    };

    const handleTagColorSelection = (color: string) => {
        setSelectedColor(color);
    };

    const handleTagColorSelectionIndex = (index: number) => {
        setSelectedColorIndex(index);
    };

    const handleAddNewTag = () => {
        if (card.upperTags == null) card.upperTags = [];
        const newTag: Tag = {
            id: card.upperTags?.length + 1,
            text: tagTitle.current,
            color: selectedColor,
        };
        updateTags([...card.upperTags, newTag]);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="text-sm text-[#5E5E5E]">
                <div className="font-bold" data-testid="addcardtags-headline">
                    {headline}
                </div>
                <p data-testid="addcardtags-explanation">{explanation}</p>
            </div>
            <div className="grid grid-cols-[1fr,auto,auto,auto] gap-2">
                <div className="self-center">
                    <div className="border border-[#f5f4f4] p-2 rounded-lg flex gap-2 items-center">
                        {tagsSVG}
                        <input
                            placeholder={'Enter a tag.'}
                            className="focus:outline-none text-sm w-full"
                            data-testid="addcard-tags-input"
                            onChange={(e) => {
                                handleTagTitleChanges(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>
                <div className="grid grid-cols-4 grid-rows-2 gap-1 mx-2">
                    {[
                        colors.sulzer33_blue,
                        colors.sulzer33_red,
                        colors.green,
                        colors.lavender,
                        colors.sulzer33_purple,
                        colors.sulzer33_yellow,
                        colors.rose,
                        colors.light_grey,
                    ].map((color, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer `}
                            data-testid="addcard-tag-color-button"
                            onClick={() => {
                                handleTagColorSelectionIndex(index);
                                handleTagColorSelection(color);
                            }}
                        >
                            <TagComponent
                                color={color}
                                hasOutline={index === selectedColorIndex}
                            ></TagComponent>
                        </div>
                    ))}
                </div>
                <div className="self-center">
                    <button
                        className="bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white font-semibold"
                        data-testid="addcard-tag-button"
                        onClick={(_e) => {
                            handleAddNewTag();
                        }}
                    >
                        <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] hover:stroke-white">
                            {addSVG}
                            <p className="font-semibold text-sm">Add tag</p>
                        </div>
                    </button>
                </div>
            </div>
            <div
                className="flex flex-row flex-wrap gap-2"
                data-testid="addcardtags-list"
            >
                {card.upperTags?.map((t, index) => {
                    return (
                        <TagComponent
                            key={index}
                            color={t.color}
                            text={t.text}
                        ></TagComponent>
                    );
                })}
            </div>
        </div>
    );
};
