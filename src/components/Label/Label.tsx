export interface LabelProps {
    color: string;
    text: string;
}

export const LabelComponent: React.FC<LabelProps> = ({ color, text }) => {
    return (
        <div
            className={`text-base text-[#4d4d4d] px-3 py-1 rounded-[20px] font-semibold`}
            style={{ backgroundColor: color }}
            data-testid="page-label"
        >
            {text}
        </div>
    );
};
