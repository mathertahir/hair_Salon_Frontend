import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputPassword = ({ placeholder = "Enter password", value, onChange, name, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative my-2  flex justify-between w-full">
            <input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full pr-10 focus:outline-none border-none bg-transparent"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
        </div>
    )
}

export default InputPassword