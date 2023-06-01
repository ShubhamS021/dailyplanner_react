import { useContext, useState } from 'react';
import { closeSVG } from '../../assets/svgs/close.svg';
import { infoCircleSVG } from '../../assets/svgs/infoCircle.svg';
import { BoardContext } from '../../context/BoardContext';

export interface CardMoveModalProps {
    title: string;
    text: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    modalConfirmation: (newBoardId: number) => void;
    closeModal: () => void;
}

export const CardMoveModal: React.FC<CardMoveModalProps> = ({
    title,
    text,
    submitButtonText,
    cancelButtonText,
    closeModal,
    modalConfirmation,
}) => {
    const boardContext = useContext(BoardContext);
    const [selectedBoardId, setSelectedBoardId] = useState(
        boardContext.boards.filter((b) => b.id !== boardContext.board.id)[0].id
    );

    const handleBoardChange = (boardId: number) => {
        setSelectedBoardId(boardId);
    };

    return (
        <div className="modal" data-testid="confirmation-modal">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="modal-content">
                    {/* header */}
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] gap-2">
                        <div className="flex gap-2 dark:stroke-[#fff] dark:fill-[#fff]">
                            {infoCircleSVG}
                            <h3
                                className="text-base font-semibold"
                                data-testid="confirmation-modal-title"
                            >
                                {title}
                            </h3>
                        </div>
                        <div>
                            <button
                                data-testid="confirmation-modal-close-button"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                {closeSVG}
                            </button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex flex-col gap-2">
                        {text}
                        <br />
                        <select
                            className="formField focus:outline-none text-sm w-full rounded-lg"
                            data-testid="board-selection"
                            onChange={(event) => {
                                handleBoardChange(+event.target.value);
                            }}
                        >
                            {boardContext.boards
                                .filter((b) => b.id !== boardContext.board.id)
                                .map((b, index) => {
                                    return (
                                        <option key={index} value={b.id}>
                                            {b.title}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
                        <button
                            className="button p-2 py-1.5 hover:text-gray-400 soft"
                            type="button"
                            data-testid="confirmation-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ?? 'Cancel'}
                        </button>
                        <button
                            className="button primary-button p-2 py-1.5 soft"
                            type="button"
                            data-testid="confirmation-modal-button"
                            onClick={() => {
                                modalConfirmation(selectedBoardId);
                                closeModal();
                            }}
                        >
                            {submitButtonText ?? 'Ok'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
