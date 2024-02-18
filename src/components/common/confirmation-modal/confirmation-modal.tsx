import { Button } from '@/ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import PageTitle from '../page-title/page-title';

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
                    <div className="px-6 pt-6 rounded-t grid grid-cols-[1fr,auto] items-center gap-2">
                        <PageTitle title={title}></PageTitle>
                        <div>
                            <Button
                                size={'icon'}
                                variant={'ghost'}
                                data-testid="confirmation-modal-close-button"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                <Cross1Icon />
                            </Button>
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex flex-col gap-2">
                        {text}
                    </div>
                    {/* footer */}
                    <div className="flex items-center gap-2 justify-end px-6 pb-6 rounded-b">
                        <Button
                            size={'sm'}
                            variant={'outline'}
                            data-testid="confirmation-modal-cancel-button"
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            {cancelButtonText ?? 'Cancel'}
                        </Button>
                        <Button
                            size={'sm'}
                            data-testid="confirmation-modal-button"
                            onClick={() => {
                                modalConfirmation();
                                closeModal();
                            }}
                        >
                            {submitButtonText ?? 'Ok'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
