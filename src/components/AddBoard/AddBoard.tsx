import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import { arrowLeftSVG } from '../../assets/svgs/arrow-left.svg';
import { BoardContext } from '../../context/BoardContext';
import {
    getLocalizedInitialBoardState,
    getLocalizedInitialLanesState,
} from '../../utils/context.util';

export const AddBoard = () => {
    const { addBoard, toggleBoardMode } = useContext(BoardContext);
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateStandardBoard = () => {
        const newBoard = {
            ...getLocalizedInitialBoardState(),
            lanes: getLocalizedInitialLanesState(),
        };
        addBoard(newBoard);
        toggleBoardMode('boardDefaultMode');
    };

    const handleCreateCustomBoard = () => {
        const customBoard = { ...getLocalizedInitialBoardState() };
        customBoard.title = name;
        customBoard.subtitle = description;

        addBoard(customBoard);
        toggleBoardMode('boardCustomLanesMode');
    };

    const handleBackToBoards = () => {
        toggleBoardMode('boardChooseMode');
    };

    const handleNameChanges = (name: string) => {
        setName(name);
    };

    const handleDescriptionChanges = (description: string) => {
        setDescription(description);
    };

    const isValid = () => {
        return name !== '' && description !== '';
    };

    return (
        <main className="p-10 grid grid-cols-1 grid-rows-1 justify-center items-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-16 mb-6 grid grid-cols-[auto,auto] items-center">
                    <div
                        className="cursor-pointer mr-4 stroke-[#14161F] dark:stroke-[#DEDEDE]"
                        data-testid="btnBackToBoards"
                        onClick={() => {
                            handleBackToBoards();
                        }}
                    >
                        {arrowLeftSVG}
                    </div>
                    <div>
                        <img src={logo} alt="Dayplanner Logo"></img>
                    </div>
                </div>

                <div
                    className="text-3xl font-bold text-[#212121] dark:text-[#DEDEDE]"
                    data-testid="addboard-title"
                >
                    {t('components.AddBoard.title')}
                </div>
                <div
                    className="text-xl text-[#212121] dark:text-[#8B8B8B]"
                    data-testid="addboard-standard-subtitle"
                >
                    {t('components.AddBoard.standard')}
                </div>
                <div>
                    <button
                        className="button primary-button px-8 py-1.5 soft"
                        type="button"
                        data-testid="addboard-create-standard-button"
                        onClick={() => {
                            handleCreateStandardBoard();
                        }}
                    >
                        {t('components.AddBoard.create')}
                    </button>
                </div>
                <div className="flex items-center justify-center w-1/3">
                    <hr className="border-t-1 border-gray-300 w-1/3 mr-4 dark:border-[#585858]" />
                    <span className="text-gray-600 font-semibold dark:text-[#8B8B8B]">
                        {t('components.AddBoard.or')}
                    </span>
                    <hr className="border-t-1 border-gray-300 w-1/3 ml-4 dark:border-[#585858]" />
                </div>
                <div
                    className="text-xl text-[#212121] dark:text-[#8B8B8B]"
                    data-testid="addboard-custom-subtitle"
                >
                    {t('components.AddBoard.custom')}
                </div>
                <div className="w-1/4">
                    <div className="formField flex gap-2 items-center w-full">
                        <input
                            placeholder={t('components.AddBoard.name') ?? ''}
                            className="focus:outline-none text-sm w-full dark:bg-[#2E3842] dark:text-white"
                            data-testid="addboard-enter-name-input"
                            onChange={(e) => {
                                handleNameChanges(e.target.value);
                            }}
                        ></input>
                    </div>
                    <small className="text-[#E1E4E8] dark:text-[#8B8B8B]">
                        {t('components.AddBoard.exampleName')}
                    </small>
                </div>
                <div className="w-1/4">
                    <div className="formField flex gap-2 items-center w-full">
                        <input
                            placeholder={
                                t('components.AddBoard.description') ?? ''
                            }
                            className="focus:outline-none text-sm w-full dark:bg-[#2E3842] dark:text-white"
                            data-testid="addboard-enter-description-input"
                            onChange={(e) => {
                                handleDescriptionChanges(e.target.value);
                            }}
                        ></input>
                    </div>
                    <small className="text-[#E1E4E8] dark:text-[#8B8B8B]">
                        {t('components.AddBoard.exampleDescription')}
                    </small>
                </div>
                <button
                    disabled={!isValid()}
                    className="button primary-button px-8 py-1.5 soft"
                    type="button"
                    data-testid="addboard-create-own-button"
                    onClick={() => {
                        handleCreateCustomBoard();
                    }}
                >
                    {t('components.AddBoard.create')}
                </button>
            </div>
        </main>
    );
};
export default AddBoard;
