import { ColorVariant, colorVariants } from '@/types/ColorVariant';
import { Badge } from '@/ui/badge';
import { useState } from 'react';

export interface ColorChooserProps {
    onSelectColor: (variant: ColorVariant) => void;
    onSelectColorIndex?: (index: number) => void;
}

export const ColorChooser: React.FC<ColorChooserProps> = ({
    onSelectColor,
    onSelectColorIndex,
}) => {
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    const handleTagColorSelection = (color: ColorVariant) => {
        onSelectColor(color);
    };

    const handleTagColorSelectionIndex = (index: number) => {
        if (onSelectColorIndex != null) onSelectColorIndex(index);
        setSelectedColorIndex(index);
    };

    return (
        <div className="flex gap-2">
            {colorVariants.map((variant: ColorVariant, index: number) => (
                <div
                    key={variant}
                    className={`cursor-pointer `}
                    data-testid="myboardlanes-lane-color-button"
                    onClick={() => {
                        handleTagColorSelectionIndex(index);
                        handleTagColorSelection(variant);
                    }}
                >
                    <Badge
                        variant={variant}
                        data-testid={`badge-color-${variant}`}
                        className={`h-6 w-6 p-1.5 dark:text-gray-800
                                                    ${
                                                        index ===
                                                        selectedColorIndex
                                                            ? 'before:content-["✓"]'
                                                            : ''
                                                    }
                                                        `}
                    ></Badge>
                </div>
            ))}
        </div>
    );
};
