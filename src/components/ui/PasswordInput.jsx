import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ placeholder = "Enter password", error, register }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative my-2">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                {...register}
                className="w-full pr-10"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
            >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            {error && <p className="text-sm font-medium text-destructive mt-2">{error}</p>}
        </div>
    );
};

export default PasswordInput;
