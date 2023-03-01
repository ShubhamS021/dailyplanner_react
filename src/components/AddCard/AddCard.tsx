import { BoardContext } from 'context/BoardContext';
import { type Card } from 'interfaces/Card';
import { useContext, useState } from 'react';

export interface AddCardProps {
    placeholder: string;
    text: string;
}

export const AddCard: React.FC<AddCardProps> = ({ text, placeholder }) => {
    const [inputValue, setInputValue] = useState('');
    const { addCardToLane, lastCardId } = useContext(BoardContext);

    return (
        <>
            <div className="bg-[#f8f8f8] border border-[#f5f4f4] p-2 rounded-lg">
                <input
                    placeholder={placeholder}
                    className="bg-[#f8f8f8] focus:outline-none"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                ></input>
                <button
                    disabled={inputValue === ''}
                    type="button"
                    className="bg-[#17A2B8] text-white px-2 py-1 rounded font-semibold hover:ring-2 hover:ring-[#057C8E] hover:shadow-[0_2px_4px_rgba(5,124,142,0.4)] disabled:bg-gray-400 disabled:ring-0 disabled:shadow-none"
                    onClick={() => {
                        const card: Card = {
                            title: inputValue,
                            id: lastCardId + 1,
                        };
                        addCardToLane(card, 1);
                        setInputValue('');
                    }}
                >
                    {text}
                </button>
            </div>
        </>
    );
};
