import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import addSVG from '../../../assets/svgs/add.svg';
import { type Card } from '../../../interfaces/Card';
import type Tag from '../../../interfaces/Tag';
import { colors } from '../../../theme/colors';

export interface AddCardDueDateProps {
    headline: string;
    card: Card;
    updateTags: (tags: Tag[]) => void;
}

export const AddCardDueDate: React.FC<AddCardDueDateProps> = ({
    headline,
    card,
    updateTags,
}) => {
    const MAX_TAGS = 1;
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
            color: colors.Green,
            tagType: 'lower',
        };
        updateTags([...card.lowerTags, newTag]);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="field-caption">
                <div
                    className="flex gap-1 font-bold"
                    data-testid="AddCardDueDate-headline"
                >
                    {headline}
                    <div
                        className={`field-caption-additional self-center place-self-end`}
                    >
                        ({card.lowerTags?.length ?? 0}/{MAX_TAGS})
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[1fr,auto] gap-1">
                <input
                    className="formField focus:outline-none text-sm w-full border-none rounded-lg"
                    data-testid="addcard-lowertags-input"
                    type={'date'}
                    onChange={(e) => {
                        handleDueDateChanges(e.target.value);
                    }}
                ></input>
                <div className="self-center">
                    <button
                        className="button"
                        data-testid="addcard-lowertags-button"
                        onClick={() => {
                            handleAddNewTag();
                        }}
                        disabled={
                            dueDate === '' ||
                            card.lowerTags?.length === MAX_TAGS
                        }
                    >
                        <div className="flex gap-2 items-center p-2">
                            <img src={addSVG} className="svg" loading="lazy" />
                            <p className="font-semibold text-sm">
                                {t('components.AddCard.modal.AddDueDate.add')}
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
