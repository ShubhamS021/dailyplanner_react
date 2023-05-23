import { type Board } from 'interfaces/Board';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { closeSVG } from '../../assets/svgs/close.svg';
import { infoCircleSVG } from '../../assets/svgs/infoCircle.svg';

export interface LaneRenameModalProps {
    title: string;
    text: string;
    board: Board;
    laneId: number;
    submitButtonText?: string;
    cancelButtonText?: string;
    modalConfirmation: (title: string) => void;
    closeModal: () => void;
}

export const LaneRenameModal: React.FC<LaneRenameModalProps> = ({
    title,
    text,
    board,
    laneId,
    submitButtonText,
    cancelButtonText,
    closeModal,
    modalConfirmation,
}) => {
    const lane = board.lanes.find((l) => l.id === laneId);
    const [laneTitle, setLaneTitle] = useState(lane?.title ?? '');
    const { t } = useTranslation();

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
                        <div className="formField p-2 rounded-lg">
                            <input
                                placeholder={
                                    t('components.LaneRenameModal.title') ?? ''
                                }
                                className="focus:outline-none text-sm w-full"
                                data-testid="LaneRename-title-input"
                                value={laneTitle}
                                onChange={(e) => {
                                    setLaneTitle(e.target.value);
                                }}
                            ></input>
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
                                modalConfirmation(laneTitle);
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
