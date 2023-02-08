export const CardComponent = () => {
    return (
        <div className="bg-white border border-solid rounded-lg border-[#DDDDDD] p-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-start">
                {/* <Tags /> */}
                <h3 className="font-semibold text-base">Card title</h3>
                <p className="text-sm text-[#5A5A65]">
                    A description of a task.
                </p>
                {/* <Tasks /> */}
                {/* <Tags /> */}
            </div>
        </div>
    )
}
