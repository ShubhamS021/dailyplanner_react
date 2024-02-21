import { type Card } from '@/interfaces/Card';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import { useTranslation } from 'react-i18next';

export interface CardAddDescriptionProps {
    headline: string;
    card: Card;
    updateDescription: (description: string) => void;
    updateTitle: (title: string) => void;
}

export const CardAddDescription: React.FC<CardAddDescriptionProps> = ({
    headline,
    card,
    updateDescription,
    updateTitle,
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            <Label data-testid="addcarddescription-headline">
                {t(
                    'components.AddCard.modal.AddCardDescription.placeholderTitle'
                ) ?? ''}
            </Label>
            <Input
                data-testid="addcard-title-input"
                value={card.title}
                onChange={(e) => {
                    updateTitle(e.target.value);
                }}
            ></Input>
            <Label data-testid="addcarddescription-description">
                {t(
                    'components.AddCard.modal.AddCardDescription.placeholderDescription'
                )}
            </Label>
            <Textarea
                data-testid="addcard-description-input"
                value={card.description}
                onChange={(e) => {
                    updateDescription(e.target.value);
                }}
            ></Textarea>
        </div>
    );
};
