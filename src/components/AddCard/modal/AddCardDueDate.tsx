import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addSVG } from '../../../assets/svgs/add.svg';
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
            color: colors.green,
            tagType: 'lower',
        };
        updateTags([...card.lowerTags, newTag]);
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="text-sm text-[#5E5E5E]">
                <div
                    className="flex gap-1 font-bold"
                    data-testid="AddCardDueDate-headline"
                >
                    {headline}
                    <div
                        className={`text-xs text-[#4d4d4d] font-semibold self-center place-self-end`}
                    >
                        ({card.lowerTags?.length ?? 0}/{MAX_TAGS})
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[1fr,auto] gap-1">
                <div className="self-center">
                    <div className="border border-[#f5f4f4] bg-white rounded-lg flex gap-2 items-center">
                        <input
                            className="focus:outline-none text-sm w-full border-none rounded-lg"
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
                        disabled={
                            dueDate === '' ||
                            card.lowerTags?.length === MAX_TAGS
                        }
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
        </div>
    );
};
