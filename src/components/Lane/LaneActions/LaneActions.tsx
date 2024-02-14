import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/DropdownMenu/DropdownMenu';
import { DotsIcon, EditIcon, TrashIcon } from '@/ui/Icons/Icons';
import { Button } from '@/ui/button';
import { t } from 'i18next';

interface LaneActionProps {
    onShowLaneEditModal: () => void;
    onShowDeleteModal: () => void;
    isLastLane: boolean;
}

export const LaneActions: React.FC<LaneActionProps> = ({
    onShowLaneEditModal,
    onShowDeleteModal,
    isLastLane,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size={'icon'}
                    className="h-8 w-8"
                    data-testid="lane-action-button"
                >
                    <DotsIcon classes="mt-1 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                    {t('components.Lane.actions') ?? ''}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        data-testid="edit-lane-button"
                        onClick={() => {
                            onShowLaneEditModal();
                        }}
                    >
                        <EditIcon classes="mr-2 h-4 w-4 stroke-black" />
                        {t('components.Lane.edit') ?? ''}
                        {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    {isLastLane && (
                        <DropdownMenuItem
                            data-testid="delete-all-from-lane-button"
                            onClick={() => {
                                onShowDeleteModal();
                            }}
                        >
                            <TrashIcon classes="mr-2 h-4 w-4 stroke-black" />
                            {t('components.Lane.deleteAll') ?? ''}
                            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
