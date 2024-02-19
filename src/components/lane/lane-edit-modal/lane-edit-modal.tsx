import { ColorChooser } from '@/components/common/color-chooser/color-chooser';
import PageTitle from '@/components/common/page-title/page-title';
import { type Board } from '@/interfaces/Board';
import { ColorVariant } from '@/types/ColorVariant';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Separator } from '@/ui/separator';
import { Cross1Icon } from '@radix-ui/react-icons';
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
                    <div className="relative p-6 grid grid-cols-[1fr,auto,1fr] gap-2">
                        <div className="flex flex-col gap-3">
                            <Label>{editNameText}</Label>
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

                            <Label>{editLabelText}</Label>
                            <ColorChooser
                                onSelectColor={(variant: ColorVariant) =>
                                    setSelectedColor(variant)
                                }
                            ></ColorChooser>
                        </div>
                        <Separator orientation="vertical" className="mx-4" />
                        <div className="flex flex-col gap-3">
                            <Label>
                                {t('components.LaneEditModal.newLane') ?? ''}
                            </Label>
                            <Badge variant={selectedColor}>{laneTitle}</Badge>
                        </div>
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
                                modalConfirmation(laneTitle, selectedColor);
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
