import React from 'react';

const Button = ({ text, onClick, type = "button" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full 
            hover:bg-gray-700 transition-colors duration-300"
        >
            {text}
        </button>
    );
};

export default Button;
