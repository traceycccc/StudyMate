// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import InputField from './InputField';

// const PasswordField = ({ value, onChange, label = "Password" }) => {
//     const [showPassword, setShowPassword] = useState(false);

//     return (
//         <div className="relative mb-4">
//             <InputField
//                 label={label}
//                 type={showPassword ? "text" : "password"}
//                 placeholder="********"
//                 value={value}
//                 onChange={onChange}
//             />
//             <span
//                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
//             >
//                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//             </span>
//         </div>
//     );
// };

// export default PasswordField;




import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import InputField from './InputField';

const PasswordField = ({ value, onChange, label = "Password" }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative mb-4">
            <InputField
                label={label}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={value}
                onChange={onChange}
            />
            <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                style={{ top: '45%' }} // Adjusted vertical alignment
            >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
        </div>
    );
};

export default PasswordField;
