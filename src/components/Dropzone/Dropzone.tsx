export interface DropzoneProps {
    text: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ text }) => {
    return (
        <div
            className="p-5 border border-dashed rounded-lg border-[#DDDDDD]"
            data-testid="dropzone"
        >
            {text}
        </div>
    );
};

export default Dropzone;
