import { Icon } from './Icon';
import { defaultViewBox } from './data/defaultViewBox';
import { type ViewBox } from './interfaces/ViewBox.interface';

interface IconsProps {
    classes?: string;
    viewBox?: ViewBox;
}

export const CheckIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="check" options={{ classes, viewBox }} />;

export const DotsIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="dots" options={{ classes, viewBox }} />;

export const EditIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="edit" options={{ classes, viewBox }} />;

export const GripVerticalIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="gripVertical" options={{ classes, viewBox }} />;

export const MoonIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="moon" options={{ classes, viewBox }} />;

export const RouteIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="route" options={{ classes, viewBox }} />;

export const SunIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="sun" options={{ classes, viewBox }} />;

export const TrashIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="trash" options={{ classes, viewBox }} />;
