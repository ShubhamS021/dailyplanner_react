export interface LabelProps {
    color: string;
    text: string;
}

export const LabelComponent = (props: LabelProps) => {
    return (
        <div
            className={`text-base text-[#4d4d4d] px-3 py-1 rounded-[20px] font-semibold`}
            style={{ backgroundColor: props.color }}
        >
            {props.text}
        </div>
    );
};
