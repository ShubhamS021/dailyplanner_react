import { t } from 'i18next';
import closeSVG from '../../assets/svgs/close.svg';
import infoCircleSVG from '../../assets/svgs/infoCircle.svg';

export interface ConfirmationModalProps {
    title: string;
    text: string;
    submitButtonText?: string;
    cancelButtonText?: string;
    modalConfirmation: () => void;
    closeModal: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title,
    text,
    submitButtonText,
    cancelButtonText,
    closeModal,
    modalConfirmation,
}) => {
    return (
        <div className="modal" data-testid="confirmation-modal">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/* content */}
                <div className="modal-content">
                    {/* header */}
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] gap-2">
                        <div className="flex gap-2 dark:stroke-[#fff] dark:fill-[#fff]">
                            <img
                                src={infoCircleSVG}
                                className="svg"
                                loading="lazy"
                            />

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
                                <img
                                    src={closeSVG}
                                    className="svg"
                                    loading="lazy"
                                />
                            </button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex flex-col gap-2">
                        {text}
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
                        <button
                            className="button text-black p-2 py-1.5 soft"
                            type="button"
                            data-testid="confirmation-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ??
                                t('components.ConfirmationModal.cancel')}
                        </button>
                        <button
                            className="button primary-button p-2 py-1.5 soft"
                            type="button"
                            data-testid="confirmation-modal-button"
                            onClick={() => {
                                modalConfirmation();
                                closeModal();
                            }}
                        >
                            {submitButtonText ??
                                t('components.ConfirmationModal.ok')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
