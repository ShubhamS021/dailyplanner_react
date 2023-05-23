export interface DropzoneProps {
    text: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ text }) => {
    return (
        <div
            className="p-5 border border-dashed rounded-lg border-[#DDDDDD] dark:border-[#8B8B8B] dark:text-[#8B8B8B]"
            data-testid="dropzone"
        >
            {text}
        </div>
    );
};

export default Dropzone;
