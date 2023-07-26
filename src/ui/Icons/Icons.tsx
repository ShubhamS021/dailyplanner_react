import { Icon } from './Icon';
import { defaultViewBox } from './data/defaultViewBox';
import { type ViewBox } from './interfaces/ViewBox.interface';

interface IconsProps {
    classes?: string;
    viewBox?: ViewBox;
}

export const AddIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="add" options={{ classes, viewBox }} />;

export const ArrowLeftIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="arrowLeft" options={{ classes, viewBox }} />;

export const ArrowNarrowRightIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="arrowNarrowRight" options={{ classes, viewBox }} />;

export const CheckIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="check" options={{ classes, viewBox }} />;

export const CloseIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="close" options={{ classes, viewBox }} />;

export const CompactModeIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="compactMode" options={{ classes, viewBox }} />;

export const EditIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="edit" options={{ classes, viewBox }} />;

export const FileExportIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="fileExport" options={{ classes, viewBox }} />;

export const FileImportIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="fileImport" options={{ classes, viewBox }} />;

export const GitlabIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="gitlab" options={{ classes, viewBox }} />;

export const GripVerticalIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="gripVertical" options={{ classes, viewBox }} />;

export const HistoryIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="history" options={{ classes, viewBox }} />;

export const InfoCircleIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="infoCircle" options={{ classes, viewBox }} />;

export const LayoutCardsIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="layoutCards" options={{ classes, viewBox }} />;

export const MoonIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="moon" options={{ classes, viewBox }} />;

export const PlusIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="plus" options={{ classes, viewBox }} />;

export const RouteIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="route" options={{ classes, viewBox }} />;

export const SaveIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="save" options={{ classes, viewBox }} />;

export const SunIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="sun" options={{ classes, viewBox }} />;

export const TagCloseIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="tagClose" options={{ classes, viewBox }} />;

export const TagsIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="tags" options={{ classes, viewBox }} />;

export const TrashIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="trash" options={{ classes, viewBox }} />;

export const UncheckedIcon: React.FC<IconsProps> = ({
    classes = '',
    viewBox = defaultViewBox,
}) => <Icon name="unchecked" options={{ classes, viewBox }} />;
