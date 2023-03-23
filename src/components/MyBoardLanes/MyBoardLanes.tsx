import { useContext, useState } from 'react';
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
    const [selectedColor, setSelectedColor] = useState(colors.sulzer33_blue);

    const handleTagColorSelection = (color: string) => {
        setSelectedColor(color);
    };

    const handleTagColorSelectionIndex = (index: number) => {
        setSelectedColorIndex(index);
    };

    const handleStart = () => {
        enterBoard(boards.length - 1);
    };

    const handleAddNewLane = () => {
        const newLane: Lane = {
            id: -1,
            title: laneValue,
            color: selectedColor,
            cards: [],
        };
        addLaneToBoard(newLane, boards.length - 1);
        setLaneValue('');
    };

    const handleLaneRemove = (laneId: number) => {
        removeLaneFromBoard(laneId, boards.length - 1);
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
                    className="text-3xl font-bold text-[#212121]"
                    data-testid="myboardlanes-title"
                >
                    Define your lanes
                </div>
                <div
                    className="text-xl text-[#212121]"
                    data-testid="myboardlanes-subtitle"
                >
                    Define the lanes to add your tasks to.
                </div>
                <div className="w-full grid justify-center gap-6">
                    <div className="border border-[#f5f4f4] p-2 rounded-lg flex gap-2 items-center ">
                        {layoutCardsSVG}
                        <input
                            placeholder={'Enter a lane name.'}
                            className="focus:outline-none text-sm w-full"
                            data-testid="myboardlanes-lanename-input"
                            onChange={(e) => {
                                handleLaneChanges(e.target.value);
                            }}
                            value={laneValue}
                        ></input>
                    </div>
                    <div className="flex gap-2">
                        Pick a lane color:
                        {[
                            colors.sulzer33_blue,
                            colors.sulzer33_red,
                            colors.green,
                            colors.lavender,
                            colors.sulzer33_purple,
                            colors.sulzer33_yellow,
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
                            className="bg-[#ECEEF8] disabled:bg-[#ECEEF8] disabled:text-white rounded-md hover:bg-[#17A2B8] hover:text-white font-semibold stroke-[#5E5E5E] hover:stroke-white disabled:stroke-white"
                            data-testid="myboardlanes-addlane-button"
                            onClick={() => {
                                handleAddNewLane();
                            }}
                        >
                            <div className="flex gap-2 items-center p-2 ">
                                {plusSVG}
                                <p className="font-semibold text-sm">
                                    Add lane
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
                            className="bg-[#17A2B8] disabled:bg-[#ECEEF8] text-white px-8 py-1.5 rounded-md font-semibold ease-linear transition-all duration-150"
                            type="button"
                            data-testid="myboardlanes-create-own-button"
                            onClick={() => {
                                handleStart();
                            }}
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};
export default MyBoardLanes;
