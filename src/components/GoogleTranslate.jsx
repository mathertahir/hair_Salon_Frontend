


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
    // return () => {
    //   if (translateRef.current) {
    //     translateRef.current.innerHTML = "";
    //   }
    // };
  }, []);

  return (
    <div className="google-translate-container">
      <div ref={translateRef} id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
