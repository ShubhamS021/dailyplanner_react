export interface TagProps {
    color: string;
    text?: string;
    hasOutline?: boolean;
}

export const TagComponent = (props: TagProps) => {
    let style = { backgroundColor: props.color, border: '' };
    if (props.hasOutline === true) {
        style = { ...style, border: '2px solid rgba(0,0,0,0.3)' };
    }
    return (
        <div
            className={`text-sm text-[#5A5A65] px-2.5 py-1 rounded-lg font-medium min-h-[28px] min-w-[28px]`}
            style={style}
            data-testid="tag"
        >
            {props.text}
        </div>
    );
};
