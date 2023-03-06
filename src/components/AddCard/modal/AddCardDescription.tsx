export interface AddCardDescriptionProps {
    headline: string;
    explanation: string;
    updateDescription: (description: string) => void;
}

export const AddCardDescription: React.FC<AddCardDescriptionProps> = ({
    headline,
    explanation,
    updateDescription,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-sm text-[#5E5E5E]">
                <div className="font-bold">{headline}</div>
                <p>{explanation}</p>
            </div>
            <div className="border border-[#f5f4f4] p-2 rounded-lg">
                <input
                    placeholder={'Define your task.'}
                    className="focus:outline-none text-sm w-full"
                    data-testid="addcard-description-input"
                    onChange={(e) => {
                        updateDescription(e.target.value);
                    }}
                ></input>
            </div>
        </div>
    );
};
