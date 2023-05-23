import { calculateIlluminance } from 'utils/color.util';
import { tagCloseSVG } from '../../assets/svgs/tagClose.svg';

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
    let style = { backgroundColor: color, border: '' };
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
                <div className="tag-description">{text}</div>
                {isRemoveable === true && (
                    <div onClick={onRemove} data-testid="tag-remove-button">
                        {tagCloseSVG}
                    </div>
                )}
            </div>
        </div>
    );
};
