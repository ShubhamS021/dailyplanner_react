import { useTranslation } from 'react-i18next';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import { CompactModeIcon } from 'ui/Icons/Icons';

export const CompactModeToggle = () => {
    const [compactMode, toggleCompactMode] = useBoardStore(
        (state) => [state.compactMode, state.toggleCompactMode],
        shallow
    );

    const { t } = useTranslation();

    return (
        <>
            <button
                className="hover:text-[#17A2B8] font-semibold dark:text-[#B5B5B5] dark:hover:text-[#17A2B8]"
                data-testid="compactmode-toggle-button"
                onClick={(_e) => {
                    toggleCompactMode();
                }}
            >
                <div className="flex gap-2 items-center p-2 stroke-[#5E5E5E] dark:stroke-[#B5B5B5] dark:hover:stroke-[#17A2B8] hover:stroke-[#17A2B8] soft">
                    <CompactModeIcon
                        viewBox={{ x: 0, y: 0, width: 18, height: 18 }}
                    />
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
