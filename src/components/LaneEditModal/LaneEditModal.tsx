import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseColors, colors } from 'theme/colors';
import { TagComponent } from '../../components/Tag/Tag';
import { type Board } from '../../interfaces/Board';
import { CloseIcon, InfoCircleIcon } from 'ui/Icons';

export interface LaneEditModalProps {
    title: string;
    editNameText: string;
    editLabelText: string;
    board: Board;
    laneId: number;
    submitButtonText?: string;
    cancelButtonText?: string;
    modalConfirmation: (title: string, color: string) => void;
    closeModal: () => void;
}

export const LaneEditModal: React.FC<LaneEditModalProps> = ({
    title,
    editNameText,
    editLabelText,
    board,
    laneId,
    submitButtonText,
    cancelButtonText,
    closeModal,
    modalConfirmation,
}) => {
    const editColors = [...BaseColors];

    const lane = board.lanes.find((l) => l.id === laneId);
    const [laneTitle, setLaneTitle] = useState(lane?.title ?? '');
    const [selectedColor, setSelectedColor] = useState(
        lane?.color ?? colors.Light_Grey
    );
    const [selectedColorIndex, setSelectedColorIndex] = useState(
        editColors.indexOf(selectedColor)
    );
    const { t } = useTranslation();

    const handleTagColorSelection = (color: string) => {
        setSelectedColor(color);
    };

    const handleTagColorSelectionIndex = (index: number) => {
        setSelectedColorIndex(index);
    };

    return (
        <div className="modal" data-testid="confirmation-modal">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="modal-content">
                    {/* header */}
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] gap-2">
                        <div className="flex gap-2 dark:stroke-[#fff] dark:fill-[#fff]">
                            <InfoCircleIcon />
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
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex flex-col gap-2">
                        {editNameText}
                        <div className="formField p-2 rounded-lg">
                            <input
                                placeholder={
                                    t('components.LaneEditModal.title') ?? ''
                                }
                                className="focus:outline-none text-sm w-full"
                                data-testid="LaneEdit-title-input"
                                value={laneTitle}
                                onChange={(e) => {
                                    setLaneTitle(e.target.value);
                                }}
                            ></input>
                        </div>
                        {editLabelText}
                        <div className="flex gap-2">
                            {editColors.map((color, index) => (
                                <div
                                    key={color}
                                    className={`cursor-pointer `}
                                    data-testid="myboardlanes-lane-color-button"
                                    onClick={() => {
                                        handleTagColorSelectionIndex(index);
                                        handleTagColorSelection(color);
                                    }}
                                >
                                    <TagComponent
                                        color={color}
                                        hasOutline={
                                            index === selectedColorIndex
                                        }
                                    ></TagComponent>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
                        <button
                            className="button p-2 py-1.5 soft"
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
                                modalConfirmation(laneTitle, selectedColor);
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
