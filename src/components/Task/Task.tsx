import { useState } from 'react';
import { tagCloseSVG } from '../../assets/svgs/tagClose.svg';

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

    const bulletSVG = (
        <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#5A5A65"
            className="initial"
        >
            <circle cx="8" cy="8" r="2" />
        </svg>
    );

    const checkSVG = (
        <svg
            className="fill-current hidden w-3 h-3 text-[#5A5A65] pointer-events-none"
            version="1.1"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="none" fillRule="evenodd">
                <path
                    d="M1.5 4L4.5 7L10.5 1"
                    stroke="#5A5A65"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );

    return (
        <div
            className={`text-sm text-[#5A5A65] py-1 w-full`}
            data-testid="card-task"
        >
            <div className="grid grid-cols-[auto,1fr,auto] items-center mr-4 cursor-pointer">
                <input
                    type="checkbox"
                    className="opacity-0 absolute h-4 w-4 cursor-pointer"
                    data-testid="task-checkbox"
                    onChange={handleChange}
                    checked={checked}
                />
                <div className="bg-[#E1E4E8] rounded-md w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 cursor-pointer">
                    {bulletSVG}
                    {checkSVG}
                </div>
                <label
                    onClick={() => {
                        handleLabelClick(checked);
                    }}
                    data-testid="task-label"
                    className={`select-none cursor-pointer ${
                        checked ? 'line-through opacity-60' : ''
                    }`}
                >
                    {description}
                </label>
                {isRemoveable === true && (
                    <div
                        onClick={onRemove}
                        data-testid="task-remove-button"
                        className="items-end"
                    >
                        {tagCloseSVG}
                    </div>
                )}
            </div>
        </div>
    );
};
