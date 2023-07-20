import { useTranslation } from 'react-i18next';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import { HistoryIcon } from 'ui/Icons/Icons';

export const HistoryToggle = () => {
    const { t } = useTranslation();

    const [toggleBoardMode] = useBoardStore(
        (state) => [state.toggleBoardMode],
        shallow
    );

    const handleHistoryToggle = () => {
        toggleBoardMode('boardHistoryMode');
    };

    return (
        <button
            className="hover:text-[#17A2B8] font-semibold dark:text-[#B5B5B5] dark:hover:text-[#17A2B8]"
            data-testid="export-button"
            onClick={() => {
                handleHistoryToggle();
            }}
        >
            <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] dark:stroke-[#B5B5B5] hover:stroke-[#17A2B8] dark:hover:stroke-[#17A2B8] soft">
                <HistoryIcon />
                <p className="font-semibold text-sm">
                    {t('components.HistoryToggle.history')}
                </p>
            </div>
        </button>
    );
};
