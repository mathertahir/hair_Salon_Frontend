// import React, { useEffect, useRef } from "react";
// import "./GoogleTranslate.css";

// const GoogleTranslate = () => {
//   const translateRef = useRef(null);
//   const scriptLoadedRef = useRef(false);
//   const translateElementRef = useRef(null);

//   useEffect(() => {
//     // Prevent multiple script loads
//     if (scriptLoadedRef.current) {
//       if (window.google?.translate?.TranslateElement && translateRef.current && !translateElementRef.current) {
//         initializeTranslate();
//       }
//       return;
//     }

//     // Check if script is already loaded
//     if (window.google?.translate?.TranslateElement) {
//       scriptLoadedRef.current = true;
//       initializeTranslate();
//       return;
//     }

//     // Define initialization function
//     window.googleTranslateElementInit = () => {
//       scriptLoadedRef.current = true;
//       initializeTranslate();
//     };

//     // Load Google Translate script
//     const addScript = document.createElement("script");
//     addScript.src =
//       "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     addScript.async = true;
//     addScript.defer = true;
//     addScript.onerror = () => {
//       console.error("Failed to load Google Translate script");
//       scriptLoadedRef.current = false;
//     };

//     // Check if script already exists
//     const existingScript = document.querySelector('script[src*="translate.google.com"]');
//     if (existingScript) {
//       scriptLoadedRef.current = true;
//       setTimeout(() => {
//         if (window.google?.translate?.TranslateElement) {
//           initializeTranslate();
//         }
//       }, 100);
//     } else {
//       document.head.appendChild(addScript);
//     }

//     function initializeTranslate() {
//       if (window.google?.translate?.TranslateElement && translateRef.current && !translateElementRef.current) {
//         try {
//           translateElementRef.current = new window.google.translate.TranslateElement(
//             {
//               pageLanguage: "en",
//               includedLanguages: "en,es,fr",
//               layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//               autoDisplay: true,
//             },
//             translateRef.current
//           );
//         } catch (error) {
//           console.error("Error initializing Google Translate:", error);
//         }
//       }
//     }

//     // Cleanup
//     return () => {
//       if (translateRef.current) {
//         translateRef.current.innerHTML = "";
//       }
//     };
//   }, []);

//   return (
//     <div className="google-translate-container">
//       <div ref={translateRef} id="google_translate_element"></div>
//     </div>
//   );
// };

// export default GoogleTranslate;


import React, { useEffect, useRef } from "react";
import "./GoogleTranslate.css";

const GoogleTranslate = () => {
  const translateRef = useRef(null);
  const translateElementRef = useRef(null);

  useEffect(() => {
    // Initialize Google Translate
    const initializeTranslate = () => {
      if (
        window.google?.translate?.TranslateElement &&
        translateRef.current &&
        !translateElementRef.current
      ) {
        try {
          translateElementRef.current = new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,es,fr",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: true,
            },
            translateRef.current
          );
        } catch (error) {
          console.error("Error initializing Google Translate:", error);
        }
      }
    };

    // Define the callback function for Google Translate
    window.googleTranslateElementInit = initializeTranslate;

    // Check if script is already present
    let script = document.querySelector('script[src*="translate.google.com"]');
    if (!script) {
      script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
      script.onerror = () => console.error("Failed to load Google Translate script");
      document.head.appendChild(script);
    } else {
      // Script already exists, just initialize
      if (window.google?.translate?.TranslateElement) {
        initializeTranslate();
      }
    }

    // Cleanup on unmount
    return () => {
      if (translateRef.current) {
        translateRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="google-translate-container">
      <div ref={translateRef} id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
