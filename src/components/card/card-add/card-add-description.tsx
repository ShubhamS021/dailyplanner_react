import { type Card } from '@/interfaces/Card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/ui/tooltip';
import { useTranslation } from 'react-i18next';
import { BsMarkdown } from 'react-icons/bs';

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
            <div className="flex justify-end">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <a
                                href="https://docs.gitlab.com/ee/user/markdown.html"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    data-testid="supports-markdown-button"
                                >
                                    <BsMarkdown />
                                </Button>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {t(
                                    'components.AddCard.modal.AddCardDescription.supportsMarkdown'
                                )}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};
