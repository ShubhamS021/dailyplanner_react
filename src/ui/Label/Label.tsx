import {
    calculateIlluminance
} from '../../utils/color.util';

export interface LabelProps {
    color: string;
    text: string;
}

export const LabelComponent: React.FC<LabelProps> = ({ color, text }) => {
    const textColor =
        calculateIlluminance(color) > 0.5 ? 'text-[#4d4d4d]' : 'text-white';

    return (
        <div
            className={`text-base ${textColor} px-3 py-1 rounded-[20px] font-semibold`}
            style={{ backgroundColor: color }}
            data-testid="page-label"
        >
            {text}
        </div>
    );
};
