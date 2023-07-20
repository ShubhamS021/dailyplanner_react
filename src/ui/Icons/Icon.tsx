import icons from './data/icons.svg';
import { type IconType } from './types/icon.type';

interface IconProps {
    name: IconType;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
    return (
        <>
            <svg viewBox="0 0 24 24" width={24} height={24}>
                <use
                    href={`${icons}#${name}`}
                    className={`${name} ${className}`.trimEnd()}
                />
            </svg>
        </>
    );
};
