import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import { layoutCardsSVG } from '../../assets/svgs/layoutCards.svg';
import { plusSVG } from '../../assets/svgs/plus.svg';
import { TagComponent } from '../../components/Tag/Tag';
import { BoardContext } from '../../context/BoardContext';
import { type Lane } from '../../interfaces/Lane';
import { colors } from '../../theme/colors';

export const MyBoardLanes = () => {
    const { addLaneToBoard, removeLaneFromBoard, enterBoard, boards } =
        useContext(BoardContext);

    const [laneValue, setLaneValue] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(colors.light_grey);
    const { t } = useTranslation();

    const handleTagColorSelection = (color: string) => {
        setSelectedColor(color);
    };

    const handleTagColorSelectionIndex = (index: number) => {
        setSelectedColorIndex(index);
    };

    const handleStart = () => {
        enterBoard(boards[boards.length - 1].id);
    };

    const handleAddNewLane = () => {
        const newLane: Lane = {
            id: -1,
            title: laneValue,
            color: selectedColor,
            cards: [],
        };

        addLaneToBoard(newLane, boards.length);
        setLaneValue('');
    };

    const handleLaneRemove = (laneId: number) => {
        removeLaneFromBoard(laneId, boards.length);
    };

    const handleLaneChanges = (name: string) => {
        setLaneValue(name);
    };

    return (
        <main className="p-10 grid grid-cols-1 grid-rows-1 justify-center items-center">
            <div className="flex flex-col items-center gap-3">
                <div>
                    <img src={logo} alt="Dayplanner Logo"></img>
                </div>
                <div
                    className="text-3xl font-bold text-[#212121] dark:text-[#DEDEDE]"
                    data-testid="myboardlanes-title"
                >
                    {t('components.MyBoardLanes.define')}
                </div>
                <div
                    className="text-xl text-[#212121] dark:text-[#8B8B8B]"
                    data-testid="myboardlanes-subtitle"
                >
                    {t('components.MyBoardLanes.subtitle')}
                </div>
                <div className="w-full grid justify-center gap-6">
                    <div className="dark:bg-[#2E3842] border border-[#f5f4f4] dark:border-[#34414E]  p-2 rounded-lg flex gap-2 items-center ">
                        {layoutCardsSVG}
                        <input
                            placeholder={
                                t('components.MyBoardLanes.name') ?? ''
                            }
                            className="focus:outline-none text-sm w-full dark:bg-[#2E3842] dark:text-white"
                            data-testid="myboardlanes-lanename-input"
                            onChange={(e) => {
                                handleLaneChanges(e.target.value);
                            }}
                            value={laneValue}
                        ></input>
                    </div>
                    <div className="flex gap-2 dark:text-[#8B8B8B]">
                        {t('components.MyBoardLanes.color')}
                        {[
                            colors.green,
                            colors.lavender,
                            colors.rose,
                            colors.light_grey,
                        ].map((color, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer `}
                                data-testid="myboardlanes-lane-color-button"
                                onClick={() => {
                                    handleTagColorSelectionIndex(index);
                                    handleTagColorSelection(color);
                                }}
                            >
                                <TagComponent
                                    color={color}
                                    hasOutline={index === selectedColorIndex}
                                ></TagComponent>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button
                            disabled={laneValue === ''}
                            className="button primary-button"
                            data-testid="myboardlanes-addlane-button"
                            onClick={() => {
                                handleAddNewLane();
                            }}
                        >
                            <div className="flex gap-2 items-center p-2 ">
                                {plusSVG}
                                <p className="font-semibold text-sm">
                                    {t('components.MyBoardLanes.add')}
                                </p>
                            </div>
                        </button>
                    </div>
                    <div className={`grid grid-flow-col-dense wrap gap-2`}>
                        {boards[boards.length - 1].lanes?.map((l, index) => {
                            return (
                                <TagComponent
                                    key={index}
                                    color={l.color}
                                    text={l.title}
                                    isRemoveable={true}
                                    onRemove={() => {
                                        handleLaneRemove(l.id);
                                    }}
                                ></TagComponent>
                            );
                        })}
                    </div>

                    <div className="flex justify-center">
                        <button
                            disabled={
                                boards[boards.length - 1].lanes.length === 0
                            }
                            className="button primary-button px-8 py-1.5 soft"
                            type="button"
                            data-testid="myboardlanes-create-own-button"
                            onClick={() => {
                                handleStart();
                            }}
                        >
                            {t('components.MyBoardLanes.start')}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
export default MyBoardLanes;
