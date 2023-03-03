export interface TagProps {
    color: string;
    text?: string;
}

export const TagComponent = (props: TagProps) => {
    return (
        <div
            className={`text-sm text-[#5A5A65] px-2.5 py-1 rounded-lg font-medium min-h-[28px] min-w-[28px]`}
            style={{ backgroundColor: props.color }}
            data-testid="tag"
        >
            {props.text}
        </div>
    );
};
