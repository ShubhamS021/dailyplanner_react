import { useState } from 'react';
import { CheckIcon, TagCloseIcon } from '@/ui/Icons/Icons';

export interface TaskProps {
    description: string;
    fulfilled?: boolean;
    isRemoveable?: boolean;
    onFulfillTask: (fulfilled: boolean) => void;
    onRemove?: () => void;
}

export const TaskComponent: React.FC<TaskProps> = ({
    description,
    fulfilled,
    isRemoveable,
    onFulfillTask,
    onRemove,
}) => {
    const [checked, setChecked] = useState(fulfilled ?? false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onFulfillTask(event.target.checked);
    };

    function handleLabelClick(checked: boolean) {
        setChecked(!checked);
        onFulfillTask(!checked);
    }

    return (
        <div
            className={`text-sm text-[#5A5A65] py-1 w-full`}
            data-testid="card-task"
        >
            <div className="grid grid-cols-[auto,1fr,auto] items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="opacity-0 absolute h-4 w-4 cursor-pointer"
                    data-testid="task-checkbox"
                    onChange={handleChange}
                    checked={checked}
                />
                <div className="bg-[#E1E4E8] rounded-md w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 cursor-pointer">
                    <CheckIcon classes="hidden" />
                </div>
                <label
                    onClick={() => {
                        handleLabelClick(checked);
                    }}
                    data-testid="task-label"
                    className={`select-none cursor-pointer dark:text-[#fff] truncate ${
                        checked ? 'line-through opacity-60' : ''
                    }`}
                    title={description}
                >
                    {description}
                </label>
                {isRemoveable === true && (
                    <div
                        onClick={onRemove}
                        data-testid="task-remove-button"
                        className="self-middle"
                    >
                        <TagCloseIcon classes="w-3 h-3 sm:h-4 sm:w-4 fill-gray-500 hover:fill-gray-600 dark:fill-gray-400 dark:hover:fill-gray-300 hover:cursor-pointer" />
                    </div>
                )}
            </div>
        </div>
    );
};
