import {
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useRef, useState, type KeyboardEvent } from 'react';

import { cn } from '@/utils';
import { Check, X } from 'lucide-react';
import { Button } from './button';
import { Skeleton } from './skeleton';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type AutoCompleteProps = {
    options: Option[];
    emptyMessage: string;
    value?: Option;
    onValueChange?: (value: Option) => void;
    isLoading?: boolean;
    disabled?: boolean;
    testId?: string;
    placeholder?: string;
};

export const AutoComplete: React.FC<AutoCompleteProps> = ({
    options,
    placeholder,
    emptyMessage,
    value,
    onValueChange,
    disabled,
    testId,
    isLoading = false,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Option>(value as Option);
    const [inputValue, setInputValue] = useState<string>(value?.label ?? '');
    const [isInputFilled, setIsInputFilled] = useState(!!inputValue);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (!input) {
                return;
            }

            // Keep the options displayed when the user is typing
            if (!isOpen) {
                setIsOpen(true);
            }

            // This is not a default behaviour of the <input /> field
            if (event.key === 'Enter' && input.value !== '') {
                const optionToSelect = options.find(
                    (option) => option.label === input.value
                );
                if (optionToSelect) {
                    setSelected(optionToSelect);
                    onValueChange?.(optionToSelect);
                } else {
                    const newOption = {
                        value: input.value,
                        label: input.value,
                    } as Option;
                    setSelected(newOption);
                    onValueChange?.(newOption);
                    setInputValue(newOption.label);
                    setIsInputFilled(true);
                }
            }

            if (event.key === 'Escape') {
                setInputValue('');
                input.blur();
            }
        },
        [isOpen, options, onValueChange]
    );

    const handleBlur = useCallback(() => {
        setIsOpen(false);
        setInputValue(selected?.label);
    }, [selected]);

    const handleSelectOption = useCallback(
        (selectedOption: Option) => {
            setInputValue(selectedOption.label);
            setIsInputFilled(true);

            setSelected(selectedOption);
            onValueChange?.(selectedOption);

            // This is a hack to prevent the input from being focused after the user selects an option
            // We can call this hack: "The next tick"
            setTimeout(() => {
                inputRef?.current?.blur();
            }, 0);
        },
        [onValueChange]
    );

    const handleClearValue = () => {
        setInputValue('');
        setIsInputFilled(false);
        if (selected) {
            setSelected({} as Option);
            onValueChange?.({} as Option);
        }
    };

    return (
        <CommandPrimitive onKeyDown={handleKeyDown} className="w-full">
            <div className="flex gap-2 items-center">
                <CommandInput
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={isLoading ? undefined : setInputValue}
                    onBlur={handleBlur}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    data-testid={testId}
                />

                {isInputFilled && (
                    <Button
                        type="button"
                        variant={'secondary'}
                        size={'icon-xs'}
                        onClick={handleClearValue}
                        className="flex items-center justify-center h-full cursor-pointer"
                    >
                        <span className="sr-only">
                            Clear input/Eingabe löschen
                        </span>
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <div className="mt-1 relative">
                {isOpen ? (
                    <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
                        <CommandList className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                            {isLoading ? (
                                <CommandPrimitive.Loading>
                                    <div className="p-1">
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                </CommandPrimitive.Loading>
                            ) : null}
                            {options.length > 0 && !isLoading ? (
                                <CommandGroup>
                                    {options.map((option) => {
                                        const isSelected =
                                            selected?.value === option.value;
                                        return (
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onMouseDown={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                }}
                                                onSelect={() =>
                                                    handleSelectOption(option)
                                                }
                                                className={cn(
                                                    'flex items-center gap-2 w-full',
                                                    !isSelected ? 'pl-8' : null
                                                )}
                                            >
                                                {isSelected ? (
                                                    <Check className="w-4" />
                                                ) : null}
                                                {option.label}
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            ) : null}
                            {!isLoading ? (
                                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-sm">
                                    {emptyMessage}
                                </CommandPrimitive.Empty>
                            ) : null}
                        </CommandList>
                    </div>
                ) : null}
            </div>
        </CommandPrimitive>
    );
};
