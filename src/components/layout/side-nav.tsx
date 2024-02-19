import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/layout/subnav-accordion';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { useSidebarStore } from '@/hooks/useSidebarStore/useSidebarStore';
import { NavItem } from '@/types/NavItem.type';
import { Button, buttonVariants } from '@/ui/button';
import { cn } from '@/utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

interface SideNavProps {
    items: NavItem[];
    setOpen?: (open: boolean) => void;
    className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
    const { isOpen } = useSidebarStore();
    const [boards] = useBoardStore((state) => [state.boards]);
    const [openItem, setOpenItem] = useState('');
    const [lastOpenItem, setLastOpenItem] = useState('');
    const [page, setPage] = usePageStore((state) => [
        state.page,
        state.setPage,
    ]);

    useEffect(() => {
        if (isOpen) {
            setOpenItem(lastOpenItem);
        } else {
            setLastOpenItem(openItem);
            setOpenItem('');
        }
    }, [isOpen]);

    const isDisabled = (item: NavItem): boolean => {
        if (item.disabledBy === 'boardsEmpty') {
            if (boards?.length === 0) return true;
        }
        return false;
    };

    return (
        <nav className="space-y-2">
            {items.map((item) =>
                item.isChildren ?? false ? (
                    <Accordion
                        type="single"
                        collapsible
                        className="space-y-2"
                        key={item.title}
                        value={openItem}
                        onValueChange={setOpenItem}
                    >
                        <AccordionItem
                            value={t(item.title)}
                            className="border-none "
                        >
                            <AccordionTrigger
                                className={cn(
                                    buttonVariants({ variant: 'ghost' }),
                                    'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline'
                                )}
                            >
                                <div>
                                    <item.icon
                                        className={cn('h-5 w-5', item.color)}
                                    />
                                </div>
                                <div
                                    className={cn(
                                        'absolute left-12 text-base duration-200',
                                        !isOpen && className
                                    )}
                                >
                                    {t(item.title)}
                                </div>

                                {isOpen && (
                                    <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                                )}
                            </AccordionTrigger>
                            <AccordionContent className="mt-2 space-y-4 pb-1">
                                {item.children?.map((child) => (
                                    <a
                                        key={child.title}
                                        onClick={() => {
                                            if (setOpen != null) setOpen(false);
                                            setPage(item.page);
                                        }}
                                        className={cn(
                                            buttonVariants({
                                                variant: 'ghost',
                                            }),
                                            'group relative flex h-12 justify-start gap-x-3 cursor-pointer ml-2',
                                            page === child.page &&
                                                'bg-muted font-bold hover:bg-muted'
                                        )}
                                    >
                                        <child.icon
                                            className={cn(
                                                'h-5 w-5',
                                                child.color
                                            )}
                                        />
                                        <div
                                            className={cn(
                                                'absolute left-12 text-base duration-200',
                                                !isOpen && className
                                            )}
                                        >
                                            {child.title}
                                        </div>
                                    </a>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <Button
                        variant={'ghost'}
                        size={'default'}
                        disabled={isDisabled(item)}
                        key={item.title}
                        onClick={() => {
                            if (setOpen != null) setOpen(false);
                            setPage(item.page);
                        }}
                        className={cn(
                            'group relative flex gap-3 h-12 justify-start cursor-pointer w-full',
                            page === item.page &&
                                'bg-muted font-bold hover:bg-muted'
                        )}
                    >
                        <item.icon className={cn('h-5 w-5', item.color)} />
                        {isOpen && (
                            <div
                                className={cn(
                                    'text-base duration-200',
                                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                                    !isOpen && className
                                )}
                            >
                                {t(item.title)}
                            </div>
                        )}
                    </Button>
                )
            )}
        </nav>
    );
}
