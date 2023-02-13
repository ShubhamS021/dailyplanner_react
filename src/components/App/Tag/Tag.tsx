export interface TagProps {
    color: string;
    text: string;
}

export const TagComponent = (props: TagProps) => {
    return (
        <div
            className={`text-sm text-[#5A5A65] px-2.5 py-1 rounded-lg font-medium`}
            style={{ backgroundColor: props.color }}
        >
            {props.text}
        </div>
    );
};
