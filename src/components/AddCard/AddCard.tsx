import { useContext, useState } from 'react';
import { BoardContext } from '../../context/BoardContext';
import { type Card } from '../../interfaces/Card';

export interface AddCardProps {
    placeholder: string;
    text: string;
}

export const AddCard: React.FC<AddCardProps> = ({ text, placeholder }) => {
    const [title, setTitle] = useState('');
    const { addCardToLane } = useContext(BoardContext);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="bg-[#f8f8f8] border border-[#f5f4f4] p-2 rounded-lg">
                <input
                    placeholder={placeholder}
                    className="bg-[#f8f8f8] focus:outline-none"
                    data-testid="addcard-input"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                ></input>
                <button
                    disabled={title === ''}
                    type="button"
                    data-testid="addcard-button"
                    className="bg-[#17A2B8] text-white px-2 py-1 rounded font-semibold hover:ring-2 hover:ring-[#057C8E] hover:shadow-[0_2px_4px_rgba(5,124,142,0.4)] disabled:bg-gray-400 disabled:ring-0 disabled:shadow-none ease-linear transition-all duration-150"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    {text}
                </button>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        data-testid="addcard-modal"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/* content */}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/* header */}
                                <div className="p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3
                                        className="text-3xl font-semibold"
                                        data-testid="addcard-modal-title"
                                    >
                                        {title}
                                    </h3>
                                </div>
                                {/* body */}
                                <div className="relative p-6 flex-auto"></div>
                                {/* footer */}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-black px-3 py-2 rounded font-semibold hover:text-red-500 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                        }}
                                    >
                                        Abort
                                    </button>
                                    <button
                                        className="bg-[#17A2B8] text-white px-3 py-2 rounded font-semibold hover:ring-2 hover:ring-[#057C8E] hover:shadow-[0_2px_4px_rgba(5,124,142,0.4)] ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            const card: Card = {
                                                title,
                                                id: 0,
                                            };

                                            addCardToLane(card, 1);
                                            setTitle('');
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};
