import { type Card } from '@/interfaces/Card';
import { type Shirt } from '@/types/Shirt';
import { Label } from '@/ui/label';
import { useState } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select';

export interface CardAddEstimationProps {
    headline: string;
    card: Card;
    updateEstimation: (shirt: Shirt) => void;
}

export const CardAddEstimation: React.FC<CardAddEstimationProps> = ({
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
            <Label data-testid="AddCardEstimation-headline">{headline}</Label>
            <Select
                value={shirt}
                onValueChange={(shirt) => {
                    handleEstimationChanges(shirt as Shirt);
                }}
                data-testid="addcard-estimation-select"
            >
                <SelectTrigger
                    className="w-[180px]"
                    data-testid="addcard-estimation-select"
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {shirts.map((s) => {
                            return (
                                <SelectItem
                                    value={s}
                                    key={s}
                                    data-testid={`addcard-estimation-select-${s}`}
                                >
                                    {s}
                                </SelectItem>
                            );
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
