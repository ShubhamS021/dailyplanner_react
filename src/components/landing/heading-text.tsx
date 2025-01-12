interface HeadingProps {
    children: string;
    subtext?: string;
    className?: string;
}

export const HeadingText: React.FC<HeadingProps> = ({
    children,
    subtext,
    className,
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <h1 className="text-3xl font-bold text-primary lg:text-4xl">
                {children}
            </h1>
            {subtext != null && (
                <h2 className="font-light text-muted-foreground lg:text-lg">
                    {subtext}
                </h2>
            )}
        </div>
    );
};
