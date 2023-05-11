import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BoardContext } from '../../context/BoardContext';

export const CompactModeToggle = () => {
    const { toggleCompactMode, compactMode } = useContext(BoardContext);
    const { t } = useTranslation();

    return (
        <>
            <button
                className="bg-[#ECEEF8] rounded-md hover:bg-[#17A2B8] hover:text-white font-semibold"
                data-testid="compactmode-toggle-button"
                onClick={(_e) => {
                    toggleCompactMode();
                }}
            >
                <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] hover:stroke-white">
                    <p className="font-semibold text-sm">
                        {compactMode
                            ? t('components.CompactModeToggle.normal')
                            : t('components.CompactModeToggle.compact')}
                    </p>
                </div>
            </button>
        </>
    );
};

export default CompactModeToggle;
