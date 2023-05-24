import { useContext } from 'react';
import { BoardContext } from '../../context/BoardContext';
import {
    calculateIlluminance,
    determineSulzerColorByMode,
} from '../../utils/color.util';

export interface LabelProps {
    color: string;
    text: string;
}

export const LabelComponent: React.FC<LabelProps> = ({ color, text }) => {
    const { themeMode } = useContext(BoardContext);
    const textColor =
        calculateIlluminance(color) > 0.5 ? 'text-[#4d4d4d]' : 'text-white';
    const labelColor = determineSulzerColorByMode(color, themeMode);

    return (
        <div
            className={`text-base ${textColor} px-3 py-1 rounded-[20px] font-semibold`}
            style={{ backgroundColor: labelColor }}
            data-testid="page-label"
        >
            {text}
        </div>
    );
};
