// import React, { useState, useRef, useEffect } from "react";
// import { FaSort } from "react-icons/fa";

// const FilterDropdown = ({
//     items = [],
//     selectedKey = null,
//     onSelect,
//     placeholder = "Sort",
//     clearable = true,
// }) => {
//     const [open, setOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const selectedItem = items.find((i) => i.key === selectedKey);

//     const handleSelect = (key) => {
//         onSelect?.(key);
//         setOpen(false);
//     };

//     const handleClear = (e) => {
//         e.stopPropagation();
//         onSelect?.(null);
//     };

//     return (
//         <div className="relative inline-block" ref={dropdownRef}>
//             {/* Trigger Button */}
//             <button
//                 onClick={() => setOpen(!open)}
//                 className="bg-gray-100 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-gray-200 transition"
//             >
//                 <span>{selectedItem ? selectedItem.label : placeholder}</span>
//                 <FaSort className="text-gray-500" />
//             </button>

//             {/* Clear Button */}
//             {clearable && selectedItem && (
//                 <button
//                     onClick={handleClear}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
//                 >
//                     ×
//                 </button>
//             )}

//             {/* Dropdown Menu */}
//             {open && (
//                 <div className="absolute left-[-60px] mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10  ">
//                     {items.map((item) => (
//                         <div className="mx-4 my-2">
//                             <button
//                                 key={item.key}
//                                 onClick={() => handleSelect(item.key)}
//                                 className={`w-full text-left px-4 py-2 rounded-lg  text-sm hover:bg-brown-A43 hover:text-white transition ${selectedKey === item.key ? "bg-brown-A43 text-white font-semibold " : ""
//                                     }`}
//                             >
//                                 {item.label}
//                             </button>
//                         </div>

//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FilterDropdown;
import React, { useState, useRef, useEffect } from "react";
import { FaSort } from "react-icons/fa";

const FilterDropdown = ({
    items = [],
    selectedKey = null,
    onSelect,
    placeholder = "Sort",
    clearable = true,
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ✅ Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedItem = items.find((i) => i.key === selectedKey);

    const handleSelect = (key) => {
        onSelect?.(key);
        setOpen(false);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onSelect?.(null);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(!open)}
                className="bg-gray-100 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-gray-200 transition"
            >
                <span>{selectedItem ? selectedItem.label : placeholder}</span>
                <FaSort className="text-gray-500" />
            </button>

            {/* Clear Button */}
            {clearable && selectedItem && (
                <button
                    onClick={handleClear}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                >
                    ×
                </button>
            )}

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute left-[-60px] mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fadeIn">
                    {items.map((item) => (
                        <div className="mx-2 my-2">
                            <button
                                key={item.key} // ✅ move key here (important for React)
                                onClick={() => handleSelect(item.key)}
                                className={`w-full mx-auto my-1 text-left px-4 py-2 rounded-lg text-sm hover:bg-brown-A43 hover:text-white transition ${selectedKey === item.key
                                    ? "bg-brown-A43 text-white font-semibold"
                                    : ""
                                    }`}
                            >
                                {item.label}
                            </button>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;

