import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addSVG } from '../../../assets/svgs/add.svg';
import { type Card } from '../../../interfaces/Card';
import type Tag from '../../../interfaces/Tag';
import { colors } from '../../../theme/colors';
import { TagComponent } from '../../Tag/Tag';

export interface AddCardDueDateProps {
    headline: string;
    explanation: string;
    card: Card;
    updateTags: (tags: Tag[]) => void;
}

export const AddCardDueDate: React.FC<AddCardDueDateProps> = ({
    headline,
    explanation,
    card,
    updateTags,
}) => {
    const [dueDate, setDueDate] = useState('');
    const { t } = useTranslation();

    const handleDueDateChanges = (dueDate: string) => {
        setDueDate(dueDate);
    };

    const handleAddNewTag = () => {
        if (card.lowerTags == null) card.lowerTags = [];
        const newTag: Tag = {
            id: card.lowerTags.length + 1,
            text: dueDate,
            color: colors.green,
        };
        updateTags([...card.lowerTags, newTag]);
    };

    const handleOnRemoveTag = (id: number) => {
        if (card.lowerTags == null) card.lowerTags = [];
        updateTags([...card.lowerTags.filter((t) => t.id !== id)]);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="text-sm text-[#5E5E5E]">
                <div
                    className="font-bold"
                    data-testid="AddCardDueDate-headline"
                >
                    {headline}
                </div>
                <p data-testid="AddCardDueDate-explanation">{explanation}</p>
            </div>
            <div className="grid grid-cols-[1fr,auto,auto,auto] gap-2">
                <div className="self-center">
                    <div className="border border-[#f5f4f4] p-2 rounded-lg flex gap-2 items-center">
                        <input
                            placeholder={'Enter a tag.'}
                            className="focus:outline-none text-sm w-full border-none"
                            data-testid="addcard-lowertags-input"
                            type={'date'}
                            onChange={(e) => {
                                handleDueDateChanges(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>
                <div className="self-center">
                    <button
                        className="group bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white disabled:bg-[#ECEEF8] disabled:text-[#ccc] font-semibold"
                        data-testid="addcard-lowertags-button"
                        onClick={() => {
                            handleAddNewTag();
                        }}
                        disabled={dueDate === ''}
                    >
                        <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] hover:stroke-white group-disabled:stroke-[#ccc]">
                            {addSVG}
                            <p className="font-semibold text-sm">
                                {t('components.AddCard.modal.AddDueDate.add')}
                            </p>
                        </div>
                    </button>
                </div>
            </div>
            <div
                className="flex flex-row flex-wrap gap-2"
                data-testid="AddCardDueDate-list"
            >
                {card.lowerTags?.map((t, index) => {
                    return (
                        <TagComponent
                            key={index}
                            color={t.color}
                            text={t.text}
                            isRemoveable={true}
                            onRemove={() => {
                                handleOnRemoveTag(t.id);
                            }}
                        ></TagComponent>
                    );
                })}
            </div>
        </div>
    );
};
