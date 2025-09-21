import React from 'react';

const CustomCheckbox = ({ 
  id, 
  checked, 
  onChange, 
  label, 
  className = "",
  labelClassName = ""
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        {/* Custom checkbox */}
        <div className="relative flex items-center justify-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
          />
          <label
            htmlFor={id}
            className={`relative inline-flex items-center justify-center w-6 h-6 bg-[#8B4513] rounded-md cursor-pointer transition-all duration-200 hover:bg-[#A0522D] ${
              checked ? 'shadow-lg' : ''
            }`}
          >
            {/* Checkmark */}
            {checked && (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
        </div>
      </div>
      
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`text-[20px] font-semibold text-black font-poppins cursor-pointer ${labelClassName}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomCheckbox;
