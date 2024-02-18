export interface DropzoneProps {
    text: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ text }) => {
    return (
        <div
            className="p-2 py-4 text-sm border border-dashed rounded-md text-center text-gray-300"
            data-testid="dropzone"
        >
            {text}
        </div>
    );
};

export default Dropzone;
