import { useContext, useEffect, useState } from 'react';
import { tagCloseSVG } from '../../assets/svgs/tagClose.svg';
import { BoardContext } from '../../context/BoardContext';
import { calculateIlluminance } from '../../utils/color.util';

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
    const { themeMode } = useContext(BoardContext);
    const [tagColor, setTagColor] = useState(color);

    useEffect(() => {
        setTagColor(color);
    }, [themeMode]);

    let style = { backgroundColor: tagColor, border: '' };
    const textColor =
        calculateIlluminance(color) > 0.5 ? 'text-[#5A5A65]' : 'text-white';

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
                        {tagCloseSVG}
                    </div>
                )}
            </div>
        </div>
    );
};
