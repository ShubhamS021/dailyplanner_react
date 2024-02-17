import { type Board } from '@/interfaces/Board';
import { ColorVariant, colorVariants } from '@/types/ColorVariant';
import { CloseIcon, InfoCircleIcon } from '@/ui/Icons/Icons';
import { Badge } from '@/ui/badge';
import { Input } from '@/ui/input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    const lane = board.lanes.find((l) => l.id === laneId);
    const [laneTitle, setLaneTitle] = useState(lane?.title ?? '');
    const [selectedColor, setSelectedColor] = useState(
        lane?.variant ?? ('green' as ColorVariant)
    );

    const { t } = useTranslation();

    const handleTagColorSelection = (variant: ColorVariant) => {
        setSelectedColor(variant);
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
                        <Input
                            placeholder={
                                t('components.LaneEditModal.title') ?? ''
                            }
                            data-testid="LaneEdit-title-input"
                            value={laneTitle}
                            onChange={(e) => {
                                setLaneTitle(e.target.value);
                            }}
                        ></Input>
                        {editLabelText}
                        <div className="flex gap-2">
                            {colorVariants.map((variant: ColorVariant) => (
                                <div
                                    key={variant}
                                    className={`cursor-pointer `}
                                    data-testid="myboardlanes-lane-color-button"
                                    onClick={() => {
                                        handleTagColorSelection(variant);
                                    }}
                                >
                                    <Badge variant={variant}>&nbsp;</Badge>
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
