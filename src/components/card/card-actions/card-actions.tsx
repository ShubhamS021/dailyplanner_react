import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { Button } from '@/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { EditIcon, RouteIcon, TrashIcon } from '@/ui/Icons/Icons';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { t } from 'i18next';

interface CardActionProps {
    onRemoveCard?: () => void;
    onEditCard?: () => void;
    onMoveCard?: () => void;
}

export const CardActions: React.FC<CardActionProps> = ({
    onRemoveCard,
    onEditCard,
    onMoveCard,
}) => {
    const [boards] = useBoardStore((state) => [state.boards]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size={'icon-xs'}
                    variant={'outline'}
                    data-testid="card-action-button"
                    className="flex items-center justify-center"
                >
                    <DotsHorizontalIcon width={12} height={12} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                    {t('components.Card.actions') ?? ''}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        data-testid="move-card-button"
                        disabled={boards?.length < 2}
                        onClick={() => {
                            if (onMoveCard != null) {
                                onMoveCard();
                            }
                        }}
                    >
                        <RouteIcon classes="mr-1 mt-1 h-5 w-5 stroke-black" />
                        {t('components.Card.move') ?? ''}
                        {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        data-testid="edit-card-button"
                        onClick={() => {
                            if (onEditCard != null) {
                                onEditCard();
                            }
                        }}
                    >
                        <EditIcon classes="mr-2 h-4 w-4 stroke-black" />
                        {t('components.Card.edit') ?? ''}
                        {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        data-testid="remove-card-button"
                        onClick={() => {
                            if (onRemoveCard != null) {
                                onRemoveCard();
                            }
                        }}
                    >
                        <TrashIcon classes="mr-2 h-4 w-4 stroke-black" />
                        {t('components.Card.remove') ?? ''}
                        {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
