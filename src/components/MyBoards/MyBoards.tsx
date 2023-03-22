import { useContext, useState } from 'react';
import logo from '../../assets/logo.png';
import { arrowNarrowRight } from '../../assets/svgs/arrow-narrow-right.svg';
import { trashSVG } from '../../assets/svgs/trash.svg';
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { BoardContext } from '../../context/BoardContext';

export const MyBoards = () => {
    const { toggleBoardMode, removeBoard, enterBoard, boards } =
        useContext(BoardContext);
    const [showModal, setShowModal] = useState(false);

    const renderDeleteConfirmationModal = (boardId: number) => {
        return (
            <>
                <ConfirmationModal
                    title={'Warning: Deleting board'}
                    text={
                        'Are you sure you want to delete this board? This action cannot be undone.'
                    }
                    submitButtonText={'Yes, delete board.'}
                    modalConfirmation={() => {
                        removeBoard(boardId);
                    }}
                    closeModal={() => {
                        setShowModal(false);
                    }}
                ></ConfirmationModal>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
        );
    };

    return (
        <main className="p-10 grid grid-cols-1 grid-rows-1 justify-center items-center">
            <div className="flex flex-col items-center gap-3">
                <div>
                    <img src={logo} alt="Dayplanner Logo"></img>
                </div>
                <div
                    className="text-3xl font-bold text-[#212121]"
                    data-testid="myboards-title"
                >
                    My boards
                </div>
                <div className="w-full grid justify-center gap-2">
                    {boards.map((board, index) => {
                        return (
                            <div
                                className="group border border-[#f5f4f4] p-2 rounded-lg grid grid-cols-[1fr,auto,auto] items-center gap-2"
                                key={index}
                            >
                                <div className="group-hover:font-bold w-[20rem]">
                                    {board.title}
                                </div>
                                <div className="invisible group-hover:visible flex gap-2">
                                    {/* TODO: implement a board edit modal to edit title and lanes 
                                    <button
                                        className="inline-flex items-center justify-center transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white focus:shadow-outline"
                                        onClick={() => {
                                            // handleBoardNameEdit();
                                        }}
                                        title="Edit this Board."
                                        data-testid="edit-board-button"
                                    >
                                        <div className="flex gap-2 items-center p-2 stroke-white">
                                            {editSVG}
                                        </div>
                                    </button> */}

                                    <button
                                        className="inline-flex items-center justify-center transition-colors duration-150 bg-[#ECEEF8] rounded-md hover:bg-pink-600 hover:text-white focus:shadow-outline "
                                        onClick={() => {
                                            setShowModal(true);
                                        }}
                                        title="Remove this Board."
                                        data-testid="remove-board-button"
                                    >
                                        <div className="flex gap-2 items-center p-2 stroke-white">
                                            {trashSVG}
                                        </div>
                                    </button>
                                    {showModal
                                        ? renderDeleteConfirmationModal(
                                              board.id
                                          )
                                        : null}
                                </div>
                                <div>
                                    <button
                                        className="rounded-md bg-[#17A2B8] text-white font-semibold"
                                        data-testid="myboards-enterboard-button"
                                        onClick={() => {
                                            enterBoard(board.id);
                                        }}
                                    >
                                        <div className="flex gap-2 items-center p-2 stroke-white">
                                            {arrowNarrowRight}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center justify-center w-1/3">
                    <hr className="border-t-1 border-gray-300 w-1/3 mr-4" />
                    <span className="text-gray-600 font-semibold">or</span>
                    <hr className="border-t-1 border-gray-300 w-1/3 ml-4" />
                </div>
                <div
                    className="text-xl text-[#212121]"
                    data-testid="myboards-subtitle"
                >
                    Create a new board
                </div>

                <button
                    className="bg-[#17A2B8] text-white px-8 py-1.5 rounded-md font-semibold ease-linear transition-all duration-150"
                    type="button"
                    data-testid="myboards-create-own-button"
                    onClick={() => {
                        toggleBoardMode('boardCreateMode');
                    }}
                >
                    Start
                </button>
            </div>
        </main>
    );
};
export default MyBoards;
