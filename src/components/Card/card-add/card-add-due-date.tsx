import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import { Label } from '@/ui/label';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { addDays, format } from 'date-fns';

import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select';
import { cn } from '@/utils';
import { de, enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

export interface CardAddDueDateProps {
    headline: string;
    card: Card;
    updateTags: (tags: Tag[]) => void;
}

export const CardAddDueDate: React.FC<CardAddDueDateProps> = ({
    headline,
    card,
    updateTags,
}) => {
    const MAX_TAGS = 1;
    const [dueDate, setDueDate] = useState<Date>();
    const { t, i18n } = useTranslation();

    const handleAddNewTag = () => {
        if (card.lowerTags == null) card.lowerTags = [];
        if (dueDate == null) return;

        const newTag: Tag = {
            id: card.lowerTags.length + 1,
            text: format(dueDate, 'PPP', {
                locale: i18n.resolvedLanguage === 'de' ? de : enUS,
            }),
            variant: 'green',
            tagType: 'lower',
        };
        updateTags([...card.lowerTags, newTag]);
    };

    return (
        <div className="flex flex-col gap-2">
            <Label data-testid="AddCardDueDate-headline">{headline}</Label>

            <div className="grid grid-cols-[1fr,auto] gap-1">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            data-testid="addcard-duedate-calender"
                            className={cn(
                                'w-[240px] justify-start text-left font-normal',
                                dueDate == null && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate != null ? (
                                format(dueDate, 'PPP', {
                                    locale:
                                        i18n.resolvedLanguage === 'de'
                                            ? de
                                            : enUS,
                                })
                            ) : (
                                <span>
                                    {t(
                                        'components.AddCard.modal.AddDueDate.pickADate'
                                    )}
                                </span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2"
                    >
                        <Select
                            data-testid="addcard-duedate-select"
                            onValueChange={(value) =>
                                setDueDate(addDays(new Date(), parseInt(value)))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={t(
                                        'components.AddCard.modal.AddDueDate.preset'
                                    )}
                                />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem
                                    value="0"
                                    data-testid="addcard-duedate-today"
                                >
                                    {t(
                                        'components.AddCard.modal.AddDueDate.today'
                                    )}
                                </SelectItem>
                                <SelectItem value="1">
                                    {t(
                                        'components.AddCard.modal.AddDueDate.tomorrow'
                                    )}
                                </SelectItem>
                                <SelectItem value="3">
                                    {t(
                                        'components.AddCard.modal.AddDueDate.threeDays'
                                    )}
                                </SelectItem>
                                <SelectItem value="7">
                                    {t(
                                        'components.AddCard.modal.AddDueDate.sevenDays'
                                    )}
                                </SelectItem>
                                <SelectItem value="14">
                                    {t(
                                        'components.AddCard.modal.AddDueDate.fourteenDays'
                                    )}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                            <Calendar
                                mode="single"
                                selected={dueDate}
                                onSelect={setDueDate}
                                ISOWeek={true}
                                fromDate={new Date()}
                                locale={
                                    i18n.resolvedLanguage === 'de' ? de : enUS
                                }
                            />
                        </div>
                    </PopoverContent>
                </Popover>

                <div className="self-center">
                    <Button
                        data-testid="addcard-lowertags-button"
                        size={'sm'}
                        onClick={() => {
                            handleAddNewTag();
                        }}
                        disabled={
                            dueDate === undefined ||
                            MAX_TAGS === card.lowerTags?.length
                        }
                    >
                        {t('components.AddCard.modal.AddDueDate.add')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
