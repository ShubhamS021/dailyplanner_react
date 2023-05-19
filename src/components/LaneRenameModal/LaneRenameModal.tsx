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
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            data-testid="confirmation-modal"
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
                        <div className="border border-[#f5f4f4] p-2 rounded-lg">
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
                            className="bg-[#ECEEF8] text-black p-2 py-1.5 rounded-md font-semibold hover:text-gray-400 ease-linear transition-all duration-150"
                            type="button"
                            data-testid="confirmation-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ?? 'Cancel'}
                        </button>
                        <button
                            className="bg-[#17A2B8] text-white p-2 py-1.5 rounded-md font-semibold ease-linear transition-all duration-150"
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
