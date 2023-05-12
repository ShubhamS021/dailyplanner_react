import { type Card } from 'interfaces/Card';
import { useTranslation } from 'react-i18next';

export interface AddCardDescriptionProps {
    headline: string;
    card: Card;
    updateDescription: (description: string) => void;
    updateTitle: (title: string) => void;
}

export const AddCardDescription: React.FC<AddCardDescriptionProps> = ({
    headline,
    card,
    updateDescription,
    updateTitle,
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            <div className="text-sm text-[#5E5E5E]">
                <div
                    className="font-bold"
                    data-testid="addcarddescription-headline"
                >
                    {headline}
                </div>
            </div>
            <div className="border border-[#f5f4f4] bg-white p-2 rounded-lg">
                <input
                    placeholder={
                        t(
                            'components.AddCard.modal.AddCardDescription.placeholderTitle'
                        ) ?? ''
                    }
                    className="focus:outline-none text-sm w-full"
                    data-testid="addcard-title-input"
                    value={card.title}
                    onChange={(e) => {
                        updateTitle(e.target.value);
                    }}
                ></input>
            </div>
            <div className="border border-[#f5f4f4] bg-white p-2 rounded-lg">
                <input
                    placeholder={
                        t(
                            'components.AddCard.modal.AddCardDescription.placeholderDescription'
                        ) ?? ''
                    }
                    className="focus:outline-none text-sm w-full"
                    data-testid="addcard-description-input"
                    value={card.description}
                    onChange={(e) => {
                        updateDescription(e.target.value);
                    }}
                ></input>
            </div>
        </div>
    );
};
