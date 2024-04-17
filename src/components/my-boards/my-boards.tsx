import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { Button } from '@/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BoardEditModal } from '../board/board-edit-modal/board-edit-modal';
import BoardExport from '../board/board-export/board-export';
import BoardImport from '../board/board-import/board-import';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import PageTitle from '../common/page-title/page-title';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/ui/table';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/ui/tooltip';

import { exportBoardToJson } from '@/hooks/useBoardStore/util/board.util';
import { Separator } from '@radix-ui/react-separator';
import { DownloadIcon, Edit2, Trash2 } from 'lucide-react';

export const MyBoards = () => {
    const [boards, enterBoard, renameBoard, removeBoard] = useBoardStore(
        (state) => [
            state.boards,
            state.enterBoard,
            state.renameBoard,
            state.removeBoard,
        ]
    );
    const [setPage] = usePageStore((state) => [state.setPage]);

    const [showModal, setShowModal] = useState(false);
    const [boardToEdit, setBoardToEdit] = useState(boards[0]);
    const [showEditModal, setShowEditModal] = useState(false);
    const { t } = useTranslation();

    const renderDeleteConfirmationModal = (boardId: number) => {
        return (
            <>
                <ConfirmationModal
                    title={t('components.MyBoards.warningDeleteTitle')}
                    text={t('components.MyBoards.warningDeleteText')}
                    submitButtonText={
                        t('components.MyBoards.warningDeleteSubmit') ?? ''
                    }
                    modalConfirmation={() => {
                        removeBoard(boardId);
                    }}
                    closeModal={() => {
                        setShowModal(false);
                    }}
                ></ConfirmationModal>
                <div className="backdrop"></div>
            </>
        );
    };

    const renderEditBoardModal = () => {
        return (
            <>
                <BoardEditModal
                    board={boardToEdit}
                    title={t('components.MyBoards.editTitle')}
                    cancelButtonText={t('components.MyBoards.editCancel') ?? ''}
                    submitButtonText={t('components.MyBoards.editSubmit') ?? ''}
                    modalConfirmation={(title: string, subtitle: string) => {
                        renameBoard(boardToEdit.id, title, subtitle);
                    }}
                    closeModal={() => {
                        setShowEditModal(false);
                    }}
                ></BoardEditModal>
                <div className="backdrop"></div>
            </>
        );
    };

    const title = t('components.MyBoards.title');

    return (
        <div className="py-10 px-5 grid grid-cols-1 grid-rows-[1fr,auto]">
            <div className="flex flex-col gap-5">
                <PageTitle
                    title={title}
                    subtitle={t('components.MyBoards.subtitle')}
                />

                <div className="flex gap-4 justify-end items-center">
                    <div className="flex gap-2">
                        <BoardExport />
                        <BoardImport />
                    </div>
                    <Separator orientation="vertical" />
                    <Button
                        data-testid="myboards-create-own-button"
                        size={'sm'}
                        variant={'default'}
                        onClick={() => {
                            setPage('boardCreatePage');
                        }}
                    >
                        {t('components.MyBoards.create')}
                    </Button>
                </div>

                <Table data-testid="myboards-list">
                    {boards.length === 0 ? (
                        <TableHeader>
                            <TableRow>
                                <TableHead>{title}</TableHead>
                            </TableRow>
                        </TableHeader>
                    ) : (
                        <TableHeader>
                            <TableRow>
                                <TableHead>{title}</TableHead>
                                {/* <TableHead className="w-[120px] text-right">
                                Save location
                            </TableHead> */}
                                <TableHead className="w-[150px] text-right">
                                    {t('components.MyBoards.actions')}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                    )}

                    <TableBody>
                        {boards.length === 0 && (
                            <TableRow>
                                <TableCell>
                                    {t('components.MyBoards.noData')}
                                </TableCell>
                            </TableRow>
                        )}
                        {boards.map((board) => {
                            return (
                                <TableRow
                                    key={`board-${board.id}`}
                                    data-testid={`board-${board.id}`}
                                    className="group"
                                >
                                    <TableCell
                                        data-testid="myboards-boardname"
                                        onClick={() => {
                                            enterBoard(board.id);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <div className="font-semibold">
                                            {board.title}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {board.subtitle}
                                        </div>
                                    </TableCell>
                                    {/* <TableCell>
                                        <div className="flex gap-2 justify-center">
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        data-testid="sync-board-button"
                                                    >
                                                        <Database width={16} />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Sync to online storage
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TableCell> */}
                                    <TableCell
                                        className="flex gap-2 justify-end"
                                        data-testid={`board-${board.id}-actions`}
                                    >
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    onClick={() => {
                                                        void exportBoardToJson(
                                                            board
                                                        );
                                                    }}
                                                    data-testid="download-board-button"
                                                    className="h-9 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                                >
                                                    <DownloadIcon className="h-4 w-4" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {t(
                                                            'components.MyBoards.download'
                                                        )}{' '}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    onClick={() => {
                                                        setBoardToEdit(board);
                                                        setShowEditModal(true);
                                                    }}
                                                    data-testid="edit-board-button"
                                                    className="h-9 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {t(
                                                            'components.MyBoards.edit'
                                                        )}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    onClick={() => {
                                                        setShowModal(true);
                                                    }}
                                                    data-testid="remove-board-button"
                                                    className="h-9 rounded-md px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {t(
                                                            'components.MyBoards.remove'
                                                        )}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        {showModal
                                            ? renderDeleteConfirmationModal(
                                                  board.id
                                              )
                                            : null}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {showEditModal ? renderEditBoardModal() : null}
        </div>
    );
};
export default MyBoards;
