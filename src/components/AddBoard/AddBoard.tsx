import { useContext, useRef } from 'react';
import logo from '../../assets/logo.png';
import {
    BoardContext,
    initialBoardState,
    initialLanes,
} from '../../context/BoardContext';

export const AddBoard = () => {
    const { addBoard, toggleBoardMode } = useContext(BoardContext);
    const nameRef = useRef('');
    const descriptionRef = useRef('');

    const handleCreateStandardBoard = () => {
        const newBoard = { ...initialBoardState, lanes: [...initialLanes] };
        addBoard(newBoard);
        toggleBoardMode('boardDefaultMode');
    };

    const handleCreateCustomBoard = () => {
        const customBoard = { ...initialBoardState };
        customBoard.title = nameRef.current;
        customBoard.subtitle = descriptionRef.current;

        addBoard(customBoard);
        toggleBoardMode('boardCustomLanesMode');
    };

    const handleNameChanges = (name: string) => {
        nameRef.current = name;
    };

    const handleDescriptionChanges = (description: string) => {
        descriptionRef.current = description;
    };

    return (
        <main className="p-10 grid grid-cols-1 grid-rows-1 justify-center items-center">
            <div className="flex flex-col items-center gap-3">
                <div>
                    <img src={logo} alt="Dayplanner Logo"></img>
                </div>
                <div
                    className="text-3xl font-bold text-[#212121]"
                    data-testid="addboard-title"
                >
                    Welcome to Dayplanner
                </div>
                <div
                    className="text-xl text-[#212121]"
                    data-testid="addboard-standard-subtitle"
                >
                    Start with a standard board
                </div>
                <div>
                    <button
                        className="bg-[#17A2B8] text-white px-8 py-1.5 rounded-md font-semibold ease-linear transition-all duration-150"
                        type="button"
                        data-testid="addboard-create-standard-button"
                        onClick={() => {
                            handleCreateStandardBoard();
                        }}
                    >
                        Create
                    </button>
                </div>
                <div className="flex items-center justify-center w-1/3">
                    <hr className="border-t-1 border-gray-300 w-1/3 mr-4" />
                    <span className="text-gray-600 font-semibold">or</span>
                    <hr className="border-t-1 border-gray-300 w-1/3 ml-4" />
                </div>
                <div
                    className="text-xl text-[#212121]"
                    data-testid="addboard-custom-subtitle"
                >
                    Create your own board
                </div>
                <div className="w-1/4">
                    <div className="border border-[#f5f4f4] p-2 rounded-lg flex gap-2 items-center w-full">
                        <input
                            placeholder={'Enter a name.'}
                            className="focus:outline-none text-sm w-full"
                            data-testid="addboard-enter-name-input"
                            onChange={(e) => {
                                handleNameChanges(e.target.value);
                            }}
                        ></input>
                    </div>
                    <small className="text-[#E1E4E8]">{`e.g. "My Tasks"`}</small>
                </div>
                <div className="w-1/4">
                    <div className="border border-[#f5f4f4] p-2 rounded-lg flex gap-2 items-center w-full">
                        <input
                            placeholder={'Enter a description.'}
                            className="focus:outline-none text-sm w-full"
                            data-testid="addboard-enter-description-input"
                            onChange={(e) => {
                                handleDescriptionChanges(e.target.value);
                            }}
                        ></input>
                    </div>
                    <small className="text-[#E1E4E8]">{`e.g. "An overview of my tasks."`}</small>
                </div>
                <button
                    className="bg-[#17A2B8] text-white px-8 py-1.5 rounded-md font-semibold ease-linear transition-all duration-150"
                    type="button"
                    data-testid="addboard-create-own-button"
                    onClick={() => {
                        handleCreateCustomBoard();
                    }}
                >
                    Create
                </button>
            </div>
        </main>
    );
};
export default AddBoard;
