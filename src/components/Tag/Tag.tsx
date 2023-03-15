import { tagCloseSVG } from 'assets/svgs/tagClose.svg';

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
    if (hasOutline === true) {
        style = { ...style, border: '2px solid rgba(0,0,0,0.3)' };
    }
    return (
        <div
            className={`text-sm text-[#5A5A65] px-2.5 py-1 rounded-lg font-medium min-h-[28px] min-w-[28px]`}
            style={style}
            data-testid="tag"
        >
            <div className="flex gap-1 items-center">
                <div>{text}</div>
                {isRemoveable && <div onClick={onRemove}>{tagCloseSVG}</div>}
            </div>
        </div>
    );
};
