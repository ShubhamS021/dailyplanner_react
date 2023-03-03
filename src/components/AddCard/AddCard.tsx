import { useContext, useState } from 'react';
import { addSVG } from '../../assets/svgs/add.svg';
import { closeSVG } from '../../assets/svgs/close.svg';
import { infoCircleSVG } from '../../assets/svgs/infoCircle.svg';
import { tagsSVG } from '../../assets/svgs/tags.svg';
import { uncheckedSVG } from '../../assets/svgs/unchecked.svg';
import { TagComponent } from '../../components/Tag/Tag';
import { BoardContext } from '../../context/BoardContext';
import { type Card } from '../../interfaces/Card';
import { colors } from '../../theme/colors';

export interface AddCardProps {
    placeholder: string;
    text: string;
}

export const AddCard: React.FC<AddCardProps> = ({ text, placeholder }) => {
    const initialCard: Card = {
        title: '',
        id: 0,
    };

    const [card, setCard] = useState(initialCard);
    const { addCardToLane } = useContext(BoardContext);
    const [showModal, setShowModal] = useState(false);

    const saveCard = () => {
        addCardToLane(card, 1);
    };

    const resetToInitial = () => {
        setCard(initialCard);
    };

    const handleTitleChanges = (title: string) => {
        setCard({ ...card, title });
    };

    const handleDescriptionChanges = (description: string) => {
        setCard({ ...card, description });
    };

    const renderDescription = () => {
        return (
            <div className="flex flex-col gap-2">
                <div className="text-sm text-[#5E5E5E]">
                    <div className="font-bold">{`What's your task?`}</div>
                    <p>
                        Give a short description of the task you need to track.
                    </p>
                </div>
                <div className="border border-[#f5f4f4] p-2 rounded-lg">
                    <input
                        placeholder={'Define your task.'}
                        className="focus:outline-none text-sm"
                        data-testid="addcard-description-input"
                        value={card.description}
                        onChange={(e) => {
                            handleDescriptionChanges(e.target.value);
                        }}
                    ></input>
                </div>
            </div>
        );
    };

    const renderTags = () => {
        return (
            <div className="flex flex-col gap-2">
                <div className="text-sm text-[#5E5E5E]">
                    <div className="font-bold">Add Tags:</div>
                    <p>
                        Choose or define tags to your task to make it easier to
                        find and group with other similar tasks.
                    </p>
                </div>
                <div className="grid grid-cols-[1fr,auto,auto,auto] gap-2">
                    <div className="self-center">
                        <div className="border border-[#f5f4f4] p-2 rounded-lg flex gap-2 items-center">
                            {tagsSVG}
                            <input
                                placeholder={'Enter a tag.'}
                                className="focus:outline-none text-sm"
                                data-testid="addcard-tags-input"
                                onChange={(e) => {
                                    // TODO: Save the tag to the card
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-1 mx-2">
                        {[
                            colors.sulzer33_blue,
                            colors.sulzer33_red,
                            colors.sulzer33_purple,
                            colors.sulzer33_yellow,
                        ].map((color, index) => (
                            <TagComponent
                                key={index}
                                color={color}
                            ></TagComponent>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-1 mx-2">
                        {[
                            colors.green,
                            colors.lavender,
                            colors.rose,
                            colors.light_grey,
                        ].map((color, index) => (
                            <TagComponent
                                key={index}
                                color={color}
                            ></TagComponent>
                        ))}
                    </div>
                    <div className="self-center">
                        <button
                            className="bg-[#ECEEF8] rounded-md"
                            data-testid="addcard-tag-button"
                            onClick={(e) => {
                                // TODO: Add a subtask to the card
                            }}
                        >
                            <div className="flex gap-2 items-center p-2">
                                {addSVG}
                                <p className="font-semibold text-sm">Add tag</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderSubtasks = () => {
        return (
            <div className="flex flex-col gap-2">
                <div className="text-sm text-[#5E5E5E]">
                    <div className="font-bold">Subtasks:</div>
                    <p>
                        If your task has multiple steps, break it down into
                        subtasks and list them here.
                    </p>
                </div>
                <div className="grid grid-cols-[1fr,auto] gap-2">
                    <div className="border border-[#f5f4f4] p-2 rounded-lg flex gap-2 items-center">
                        {uncheckedSVG}
                        <input
                            placeholder={'Define a subtask.'}
                            className="focus:outline-none text-sm"
                            data-testid="addcard-subtask-input"
                            onChange={(e) => {
                                // TODO: Save the description to the card
                            }}
                        ></input>
                    </div>
                    <button
                        className="bg-[#ECEEF8] rounded-md"
                        data-testid="addcard-subtask-button"
                        onClick={(e) => {
                            // TODO: Add a subtask to the card
                        }}
                    >
                        <div className="flex gap-2 items-center p-2">
                            {addSVG}
                            <p className="font-semibold text-sm">Add subtask</p>
                        </div>
                    </button>
                </div>
            </div>
        );
    };

    const renderModal = () => {
        return (
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                data-testid="addcard-modal"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/* content */}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* header */}
                        <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] gap-2">
                            <div className="flex gap-2">
                                {infoCircleSVG}
                                <h3
                                    className="text-base font-semibold"
                                    data-testid="addcard-modal-title"
                                >
                                    New Task: {card.title}
                                </h3>
                            </div>
                            <div>
                                <button
                                    data-testid="addcard-modal-close-button"
                                    onClick={() => {
                                        resetToInitial();
                                        setShowModal(false);
                                    }}
                                >
                                    {closeSVG}
                                </button>
                            </div>
                        </div>
                        {/* body */}
                        <div className="relative px-6 flex flex-col gap-2">
                            <hr className="border-t-1 border-[#C4C4C4] max-h-[1px] my-4"></hr>
                            {renderDescription()}
                            {renderSubtasks()}
                            {renderTags()}
                            <hr className="border-t-1 border-[#C4C4C4] max-h-[1px] my-4"></hr>
                        </div>
                        {/* footer */}
                        <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
                            <button
                                className="bg-[#ECEEF8] text-black p-2 py-1.5 rounded-md font-semibold hover:text-red-500 ease-linear transition-all duration-150"
                                type="button"
                                data-testid="addcard-modal-cancel-button"
                                onClick={() => {
                                    resetToInitial();
                                    setShowModal(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#17A2B8] text-white p-2 py-1.5 rounded-md font-semibold ease-linear transition-all duration-150"
                                type="button"
                                data-testid="addcard-modal-button"
                                onClick={() => {
                                    saveCard();
                                    resetToInitial();
                                    setShowModal(false);
                                }}
                            >
                                Add task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="bg-[#f8f8f8] border border-[#f5f4f4] p-2 rounded-lg">
                <input
                    placeholder={placeholder}
                    className="bg-[#f8f8f8] focus:outline-none"
                    data-testid="addcard-input"
                    value={card.title}
                    onChange={(e) => {
                        handleTitleChanges(e.target.value);
                    }}
                ></input>
                <button
                    disabled={card.title === ''}
                    type="button"
                    data-testid="addcard-button"
                    className="bg-[#17A2B8] text-white px-2 py-1 rounded font-semibold hover:ring-2 hover:ring-[#057C8E] hover:shadow-[0_2px_4px_rgba(5,124,142,0.4)] disabled:bg-gray-400 disabled:ring-0 disabled:shadow-none ease-linear transition-all duration-150"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    {text}
                </button>
            </div>
            {showModal ? (
                <>
                    {renderModal()}
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};
