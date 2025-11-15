// import React, { useEffect, useState } from "react";
// import "./GoogleTranslate.css";
// import CustomSelectBox from "../components/ui/CustomSelectBox";

// export default function GoogleTranslate({ closeSidebar }) {
//   const languages = [
//     { code: "en", name: "English" },
//     { code: "fr", name: "French" },
//     { code: "es", name: "Spanish" },
//   ];

//   const [selectedLang, setSelectedLang] = useState("en");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const lang = e.target.value;
//     setSelectedLang(lang);
//     console.log("Language changed to:", lang);
//   };

//   const googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement(
//       {
//         pageLanguage: "en",
//         autoDisplay: false
//       },
//       "google_translate_element"
//     );
//   };
//   useEffect(() => {
//     var addScript = document.createElement("script");
//     addScript.setAttribute(
//       "src",
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//     );
//     document.body.appendChild(addScript);
//     window.googleTranslateElementInit = googleTranslateElementInit;
//   }, []);
//   return (
//     <div
//       className={`pb-[8px] fade-translate${loading ? " fade-out" : " fade-in"}`}
//       style={{ position: "relative" }}
//     >
//       {loading && (
//         <div className="translate-loader">
//           <div className="spinner"></div>
//         </div>
//       )}

//       <CustomSelectBox
//         languages={languages}
//         selectedLang={selectedLang}
//         handleChange={handleChange}
//         loading={loading}
//         closeSidebar={closeSidebar}
//       />
//     </div>

//   );

// }

import React, { useState } from "react";
import "./GoogleTranslate.css";
import CustomSelectBox from "../components/ui/CustomSelectBox";

export default function GoogleTranslate({ closeSidebar }) {
  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
  ];

  const [selectedLang, setSelectedLang] = useState("en");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    setLoading(true);

    // Google dynamic translation URL
    const url = `https://translate.google.com/translate?sl=en&tl=${lang}&u=${encodeURIComponent(
      window.location.href
    )}`;

    // Redirect to translated page
    window.location.href = url;
  };

  return (
    <div className={`pb-[8px] fade-translate${loading ? " fade-out" : " fade-in"}`}>
      {loading && (
        <div className="translate-loader">
          <div className="spinner"></div>
        </div>
      )}

      <CustomSelectBox
        languages={languages}
        selectedLang={selectedLang}
        handleChange={handleChange}
        loading={loading}
        closeSidebar={closeSidebar}
      />
    </div>
  );
}



