// components/SearchSelect.tsx
import React from 'react';



const SearchSelect = ({ label, options, value, onChange, placeholder }) => {
    return (
        <div className="w-full xl:flex-1 flex flex-col justify-between">
            <p className="font-manrope font-bold xl:text-lg text-base text-brown-A43">{label}</p>
            <div className="flex items-center gap-2 border-b border-black-14 pb-2">
                <select
                    className="focus:border-none focus:outline-none border-none w-full bg-transparent"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="" disabled>
                        {placeholder || "Select an option..."}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchSelect;
