export interface BoardTitleProps {
    title: string;
    subtitle?: string;
}

export const BoardTitle: React.FC<BoardTitleProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col gap-2">
            <div
                className="text-3xl font-bold text-[#212121] dark:text-[#DEDEDE]"
                data-testid="page-title"
            >
                {title}
            </div>
            {subtitle !== undefined ? (
                <div
                    className="text-sm text-[#5A5A65] dark:text-[#8B8B8B]"
                    data-testid="page-subtitle"
                >
                    {subtitle}
                </div>
            ) : null}
        </div>
    );
};

export default BoardTitle;
