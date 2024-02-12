import logo from '@/assets/logo.png';
import { BoardEditModal } from '@/components/Board/modal/BoardEditModal/BoardEditModal';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';
import Export from '@/components/Export/Export';
import Import from '@/components/Import/Import';
import { LanguageChooser } from '@/components/LanguageChooser/LanguageChooser';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import {
    ArrowNarrowRightIcon,
    EditIcon,
    GitlabIcon,
    TrashIcon,
} from '@/ui/Icons/Icons';
import { Button } from '@/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
                    modalConfirmation={(title, subtitle) => {
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

    return (
        <main className="p-10 h-screen grid grid-cols-1 grid-rows-[1fr,auto] justify-center items-center">
            <div className="flex flex-col items-center gap-3">
                <div>
                    <img
                        src={logo}
                        alt="Dayplanner Logo"
                        className="h-20 w-20"
                    ></img>
                </div>
                <div
                    className="text-3xl font-bold text-[#212121] dark:text-[#DEDEDE]"
                    data-testid="myboards-title"
                >
                    {t('components.MyBoards.title')}
                </div>
                <div
                    className="w-full grid justify-center gap-2"
                    data-testid="myboards-list"
                >
                    {boards.map((board) => {
                        return (
                            <div
                                className="group dark:bg-[#2E3842] dark:text-[#DEDEDE] border border-[#f5f4f4] dark:border-[#34414E] p-2 rounded-lg grid grid-cols-[1fr,auto,auto] items-center gap-2"
                                key={`board-${board.id}`}
                                data-testid={`board-${board.id}`}
                            >
                                <div
                                    className="group-hover:font-bold w-[20rem]"
                                    data-testid="myboards-boardname"
                                >
                                    {board.title}
                                </div>
                                <div
                                    className="invisible group-hover:visible flex gap-2"
                                    data-testid={`board-${board.id}-actions`}
                                >
                                    <Button
                                        size={'icon'}
                                        variant={'ghost'}
                                        onClick={() => {
                                            setBoardToEdit(board);
                                            setShowEditModal(true);
                                        }}
                                        title={
                                            t('components.MyBoards.edit') ?? ''
                                        }
                                        data-testid="edit-board-button"
                                    >
                                        <EditIcon classes="h-4 w-4 stroke-[#000] hover:stroke-white" />
                                    </Button>

                                    <Button
                                        size={'icon'}
                                        variant={'ghost'}
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                        title={
                                            t('components.MyBoards.remove') ??
                                            ''
                                        }
                                        data-testid="remove-board-button"
                                    >
                                        <TrashIcon classes="h-4 w-4 stroke-[#000] hover:stroke-white" />
                                    </Button>

                                    {showModal
                                        ? renderDeleteConfirmationModal(
                                              board.id
                                          )
                                        : null}
                                </div>
                                <div>
                                    <Button
                                        size={'icon'}
                                        className="bg-[#17A2B8] hover:bg-[#17A2B8] text-white font-semibold"
                                        data-testid="myboards-enterboard-button"
                                        title={
                                            t('components.MyBoards.enter') ?? ''
                                        }
                                        onClick={() => {
                                            enterBoard(board.id);
                                        }}
                                    >
                                        <ArrowNarrowRightIcon />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex gap-2">
                    <Export all={true} />
                    <Import all={true} />
                </div>
                <div className="flex items-center justify-center w-1/3">
                    <hr className="border-t-1 border-gray-300 w-1/3 mr-4 dark:border-[#585858]" />
                    <span className="text-gray-600 font-semibold dark:text-[#8B8B8B]">
                        {t('components.MyBoards.or')}
                    </span>
                    <hr className="border-t-1 border-gray-300 w-1/3 ml-4 dark:border-[#585858]" />
                </div>
                <div
                    className="text-xl text-[#212121] dark:text-[#8B8B8B]"
                    data-testid="myboards-subtitle"
                >
                    {t('components.MyBoards.create')}
                </div>

                <button
                    className="button primary-button px-8 py-1.5 soft"
                    type="button"
                    data-testid="myboards-create-own-button"
                    onClick={() => {
                        setPage('boardCreatePage');
                    }}
                >
                    {t('components.MyBoards.start')}
                </button>
            </div>

            <footer className="flex flex-col items-center gap-3 self-end">
                <a
                    className="text-[#5A5A65] dark:text-[#8B8B8B] flex gap-2 items-center"
                    href="https://gitlab.com/Kevin.Hahn/dayplanner"
                >
                    <GitlabIcon />

                    {t('components.MyBoards.git')}
                    <b
                        className="hover:text-[#FC6D27] transition-all duration-200"
                        title={`Git Commit - ${
                            import.meta.env.VITE_APP_VERSION
                        }`}
                    >
                        gitlab.com
                    </b>
                </a>
                <LanguageChooser />
            </footer>
            {showEditModal ? renderEditBoardModal() : null}
        </main>
    );
};
export default MyBoards;
