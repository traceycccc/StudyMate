import React from 'react';

const FormContainer = ({ children }) => {
    return (
        <div className="w-full max-w-xs mx-auto mt-10">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {children}
            </div>
        </div>
    );
};

export default FormContainer;
