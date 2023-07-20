import icons from '../assets/svgs/icons.svg';

type IconType =
    | 'add'
    | 'arrowLeft'
    | 'arrowNarrowRight'
    | 'check'
    | 'close'
    | 'compactMode'
    | 'edit'
    | 'fileExport'
    | 'fileImport'
    | 'gitlab'
    | 'gripVertical'
    | 'history'
    | 'infoCircle'
    | 'layoutCards'
    | 'moon'
    | 'plus'
    | 'route'
    | 'save'
    | 'sun'
    | 'tagClose'
    | 'tags'
    | 'trash'
    | 'unchecked';

interface IconProps {
    name: IconType;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
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

export const AddIcon = () => <Icon name="add" />;
export const ArrowLeftIcon = () => <Icon name="arrowLeft" />;
export const ArrowNarrowRightIcon = () => <Icon name="arrowNarrowRight" />;
export const CheckIcon = () => <Icon name="check" />;
export const CloseIcon = () => <Icon name="close" />;
export const CompactModeIcon = () => <Icon name="compactMode" />;
export const EditIcon = () => <Icon name="edit" />;
export const FileExportIcon = () => <Icon name="fileExport" />;
export const FileImportIcon = () => <Icon name="fileImport" />;
export const GitlabIcon = () => <Icon name="gitlab" />;
export const GripVerticalIcon = () => <Icon name="gripVertical" />;
export const HistoryIcon = () => <Icon name="history" />;
export const InfoCircleIcon = () => <Icon name="infoCircle" />;
export const LayoutCardsIcon = () => <Icon name="layoutCards" />;
export const MoonIcon = () => <Icon name="moon" />;
export const PlusIcon = () => <Icon name="plus" />;
export const RouteIcon = () => <Icon name="route" />;
export const SaveIcon = () => <Icon name="save" />;
export const SunIcon = () => <Icon name="sun" />;
export const TagCloseIcon = () => <Icon name="tagClose" />;
export const TagsIcon = () => <Icon name="tags" />;
export const TrashIcon = () => <Icon name="trash" />;
export const UncheckedIcon = () => <Icon name="unchecked" />;
