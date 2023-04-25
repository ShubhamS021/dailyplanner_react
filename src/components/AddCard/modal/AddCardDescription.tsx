import { type Card } from 'interfaces/Card';

export interface AddCardDescriptionProps {
    headline: string;
    explanation: string;
    card: Card;
    updateDescription: (description: string) => void;
}

export const AddCardDescription: React.FC<AddCardDescriptionProps> = ({
    headline,
    explanation,
    card,
    updateDescription,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-sm text-[#5E5E5E]">
                <div
                    className="font-bold"
                    data-testid="addcarddescription-headline"
                >
                    {headline}
                </div>
                <p data-testid="addcarddescription-explanation">
                    {explanation}
                </p>
            </div>
            <div className="border border-[#f5f4f4] p-2 rounded-lg">
                <input
                    placeholder={'Define your task.'}
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
