import { useState } from 'react';
import { type Card } from '@/interfaces/Card';
import { type Shirt } from '@/types/Shirt';

export interface AddCardEstimationProps {
    headline: string;
    card: Card;
    updateEstimation: (shirt: Shirt) => void;
}

export const AddCardEstimation: React.FC<AddCardEstimationProps> = ({
    headline,
    card,
    updateEstimation,
}) => {
    const [shirt, setShirt] = useState(card.shirt);
    const shirts = ['XS', 'S', 'M', 'L', 'XL'];

    const handleEstimationChanges = (shirt: Shirt) => {
        setShirt(shirt);
        updateEstimation(shirt);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="field-caption">
                <div
                    className="flex gap-1 font-bold"
                    data-testid="AddCardEstimation-headline"
                >
                    {headline}
                </div>
            </div>
            <div className="grid grid-cols-[1fr,auto] gap-1">
                <select
                    className="formField focus:outline-none text-sm w-full border-none rounded-lg"
                    data-testid="addcard-estimation-select"
                    value={shirt}
                    onChange={(e) => {
                        handleEstimationChanges(
                            e.target.value as unknown as Shirt
                        );
                    }}
                >
                    {shirts.map((s) => {
                        return (
                            <option value={s} key={s}>
                                {s}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};
