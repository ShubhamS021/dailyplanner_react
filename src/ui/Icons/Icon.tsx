import icons from './data/icons.svg';
import { type ViewBox } from './interfaces/ViewBox.interface';
import { type IconType } from './types/icon.type';

interface IconProps {
    name: IconType;
    options: IconOptions;
}

interface IconOptions {
    viewBox: ViewBox;
    classes: string;
}

export const Icon: React.FC<IconProps> = ({ name, options }) => {
    const { viewBox, classes = '' } = options;
    const viewBoxVal = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;

    return (
        <>
            <svg
                viewBox={viewBoxVal}
                width={viewBox.width}
                height={viewBox.height}
                className={`${name} ${classes}`.trimEnd()}
            >
                <use href={`${icons}#${name}`} />
            </svg>
        </>
    );
};
