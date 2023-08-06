import { useEffect, useMemo, useState } from 'react';
import { calculateIlluminance } from '@/utils/color.util';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import { TagCloseIcon } from '@/ui/Icons/Icons';

export interface TagProps {
    color: string;
    text?: string;
    hasOutline?: boolean;
    isRemoveable?: boolean;
    onRemove?: () => void;
}

export const TagComponent: React.FC<TagProps> = ({
    color,
    text,
    hasOutline,
    isRemoveable,
    onRemove,
}) => {
    const [themeMode] = useBoardStore((state) => [state.themeMode], shallow);
    const [tagColor, setTagColor] = useState(color);

    useEffect(() => {
        setTagColor(color);
    }, [themeMode]);

    let style = { backgroundColor: tagColor, border: '' };
    const textColor = useMemo(
        () =>
            calculateIlluminance(color) > 0.5 ? 'text-[#5A5A65]' : 'text-white',
        []
    );

    if (hasOutline === true) {
        style = {
            ...style,
            border: '2px solid var(--light-button-background--primary)',
        };
    }
    return (
        <div
            className={`text-sm ${textColor} px-2.5 py-1 rounded-lg font-medium min-h-[28px] min-w-[28px]`}
            style={style}
            data-testid="tag"
        >
            <div className="flex gap-1 items-center">
                <div
                    className="tag-description max-w-[140px] truncate"
                    title={text}
                >
                    {text}
                </div>
                {isRemoveable === true && (
                    <div onClick={onRemove} data-testid="tag-remove-button">
                        <TagCloseIcon
                            classes="w-3 h-3 sm:h-4 sm:w-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:cursor-pointer"
                            viewBox={{ x: 0, y: 0, width: 20, height: 20 }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
