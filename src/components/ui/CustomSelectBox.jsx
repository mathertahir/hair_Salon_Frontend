// import { useState, useEffect, useRef } from "react";
// import { MdArrowDropDown } from "react-icons/md";
// import { GrLanguage } from "react-icons/gr";

// export default function CustomSelectBox({ languages, selectedLang, handleChange, loading, closeSidebar }) {
//     const [open, setOpen] = useState(false);
//     const dropdownRef = useRef(null);


//     console.log(languages, selectedLang ,"hvbb");
//     // find the selected language
//     const selected = languages.find((lang) => lang?.code === selectedLang);

//     const handleSelect = (lang) => {
//         handleChange({ target: { value: lang.code } }); // mimic <select> onChange
//         setOpen(false);
//         if (closeSidebar !== undefined) {
//             closeSidebar();
//         }
//         // close sidebar on selection
//     };

//     // ✅ Close dropdown on outside click
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <div
//             className={`pb-[8px] fade-translate${loading ? " fade-out" : " fade-in"}`}
//             style={{ position: "relative" }}
//             ref={dropdownRef}
//         >
//             {loading && (
//                 <div className="translate-loader absolute inset-0 flex items-center justify-center bg-white/70 z-20">
//                     <div className="spinner"></div>
//                 </div>
//             )}

//             {/* Custom Select */}
//             <div className="relative">
//                 {/* Button (selected item) */}
//                 <button
//                     type="button"
//                     onClick={() => setOpen(!open)}
//                     disabled={loading}
//                     className="w-full px-3 py-2  pb-0 rounded bg-white text-left flex justify-between items-center cursor-pointer"
//                 >
//                     <span>{selected?.name || "Select"}</span>
//                     <span className="ml-2 text-brown-A43"><GrLanguage size={24} /></span>
//                 </button>

//                 {/* Dropdown list */}
//                 {open && (
//                     <ul className="absolute w-full mt-1 bg-white border rounded z-10">
//                         {languages.map((lang) => (
//                             <li
//                                 key={lang.code}
//                                 onClick={() => handleSelect(lang)}
//                                 className={`px-3 py-2 cursor-pointer hover:bg-[var(--brown-A43)] hover:text-white ${lang.code === selectedLang ? "bg-transparent text-black" : ""
//                                     }`}
//                             >
//                                 {lang.name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// }
import { useState, useEffect, useRef } from "react";
import { GrLanguage } from "react-icons/gr";

export default function CustomSelectBox({
  languages,
  selectedLang,
  handleChange,
  loading,
  closeSidebar,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // find selected language
  const selected = languages.find((lang) => lang.code === selectedLang);

  const handleSelect = (lang) => {
    handleChange({ target: { value: lang.code } }); // mimic <select>
    setOpen(false);
    if (closeSidebar) closeSidebar();
  };

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`pb-[8px] fade-translate${loading ? " fade-out" : " fade-in"}`}
      style={{ position: "relative" }}
      ref={dropdownRef}
    >
      {loading && (
        <div className="translate-loader absolute inset-0 flex items-center justify-center bg-white/70 z-20">
          <div className="spinner"></div>
        </div>
      )}

      {/* Custom Select */}
      <div className="relative">
        {/* Button (selected item) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          disabled={loading}
          className="w-full px-3 py-2  pb-0 rounded bg-white text-left flex justify-between items-center cursor-pointer"
        >
          <span>{selected?.name || "Select"}</span>
          <span className="ml-2 text-brown-A43">
            <GrLanguage size={24} />
          </span>
        </button>

        {/* Dropdown list */}
        {open && (
          <ul className="absolute w-full mt-1 bg-white border rounded z-10">
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`px-3 py-2 cursor-pointer hover:bg-[var(--brown-A43)] hover:text-white ${
                  lang.code === selectedLang ? "bg-gray-100" : ""
                }`}
              >
                {lang.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

