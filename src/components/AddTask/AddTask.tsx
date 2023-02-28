export const AddTask = () => {
    return (
        <>
            <div className="bg-[#f8f8f8] border border-[#f5f4f4] p-2 rounded-lg">
                <input
                    placeholder="Write a new task"
                    className="bg-[#f8f8f8] focus:outline-none"
                ></input>
                <button
                    type="button"
                    className="bg-[#17A2B8] text-white px-2 py-1 rounded font-semibold hover:ring-2 hover:ring-[#057C8E] hover:shadow-[0_2px_4px_rgba(5,124,142,0.4)]"
                >
                    add
                </button>
            </div>
        </>
    );
};
