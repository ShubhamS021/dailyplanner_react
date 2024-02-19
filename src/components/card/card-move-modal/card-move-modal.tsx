import PageTitle from '@/components/common/page-title/page-title';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { type Board } from '@/interfaces/Board';
import { Button } from '@/ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select';
import { t } from 'i18next';

export interface CardMoveModalProps {
    title: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    modalConfirmation: (newBoardId: number) => void;
    closeModal: () => void;
}

export const CardMoveModal: React.FC<CardMoveModalProps> = ({
    title,
    submitButtonText,
    cancelButtonText,
    closeModal,
    modalConfirmation,
}) => {
    const [boards, board] = useBoardStore((state) => [
        state.boards,
        state.board,
    ]);

    const [selectedBoardId, setSelectedBoardId] = useState(board.id);

    const handleBoardChange = (boardId: number) => {
        setSelectedBoardId(boardId);
    };

    return (
        <div className="modal" data-testid="confirmation-modal">
            <div className="relative w-1/4 my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="modal-content">
                    {/* header */}
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] items-center gap-2">
                        <PageTitle title={title}></PageTitle>
                        <div>
                            <Button
                                size={'icon'}
                                variant={'ghost'}
                                data-testid="confirmation-modal-close-button"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                <Cross1Icon />
                            </Button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex flex-col gap-2">
                        <Select
                            onValueChange={(value) => {
                                handleBoardChange(+value);
                            }}
                        >
                            <SelectTrigger
                                className="w-full"
                                data-testid="board-selection"
                            >
                                <SelectValue
                                    placeholder={t('components.Lane.moveText')}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {boards
                                    .filter((b) => b.id !== board.id)
                                    .map((b: Board) => {
                                        return (
                                            <SelectItem
                                                key={`board-${b.id}`}
                                                value={`${b.id}`}
                                                data-testid={`board-selection-${b.id}`}
                                            >
                                                {b.title}
                                            </SelectItem>
                                        );
                                    })}
                            </SelectContent>
                        </Select>
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
                        <Button
                            size={'sm'}
                            variant={'outline'}
                            data-testid="confirmation-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ?? 'Cancel'}
                        </Button>
                        <Button
                            size={'sm'}
                            data-testid="confirmation-modal-button"
                            disabled={board.id === selectedBoardId}
                            onClick={() => {
                                modalConfirmation(selectedBoardId);
                                closeModal();
                            }}
                        >
                            {submitButtonText ?? 'Ok'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
