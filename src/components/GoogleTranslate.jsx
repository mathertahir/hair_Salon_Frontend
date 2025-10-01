import { useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "./GoogleTranslate.css";
import CustomSelectBox from "../components/ui/CustomSelectBox";

// ✅ languages must be plain objects with string `name`

// 🔑 Set Translate Cookie
const setTranslateCookie = (lang = "en") => {
  const host = window.location.hostname;

  const cookieDomains = [
    host,
    "." + host,
    window.location.host,
    "translate.googleapis.com",
    "google.com",
    ".google.com",
  ];

  cookieDomains.forEach((domain) => {
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain};`;
  });

  // Also root scope
  document.cookie = `googtrans=/en/${lang}; path=/;`;
};

export default function GoogleTranslate({ closeSidebar }) {

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];





  const [selectedLang, setSelectedLang] = useState(
    () => localStorage.getItem("selectedLang") || "en"
  );
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isInitialMount = useRef(true);

  // 🔥 Force correct language after widget init
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLang") || "en";
    setSelectedLang(savedLang);
    setTranslateCookie(savedLang);

    // Remove #googtrans from URL if added
    if (window.location.hash.includes("#googtrans")) {
      window.location.hash = "";
    }

    // Hide Google banner
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame, 
      #goog-gt-tt, 
      .goog-te-balloon-frame,
      iframe.skiptranslate,
      iframe.goog-te-banner-frame,
      body > .skiptranslate {
        display: none !important;
      }
      body { top: 0 !important; position: static !important; }
    `;
    document.head.appendChild(style);

    // 🔄 Keep forcing saved language until stable
    const enforceLanguage = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select && select.value !== savedLang) {
        select.value = savedLang;
        select.dispatchEvent(new Event("change"));
        setTranslateCookie(savedLang);
        console.log("Forced language:", savedLang);
      }
    };

    const t1 = setTimeout(enforceLanguage, 1000);
    const interval = setInterval(enforceLanguage, 2000);
    const stopper = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearTimeout(t1);
      clearTimeout(stopper);
      clearInterval(interval);
    };
  }, []);

  // 🌀 Change language handler
  const changeLanguage = (lang) => {
    setLoading(true);
    setSelectedLang(lang);
    localStorage.setItem("selectedLang", lang);
    setTranslateCookie(lang);

    const tryChange = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        setTimeout(() => setLoading(false), 500);
      } else {
        setTimeout(tryChange, 300);
      }
    };
    tryChange();
  };

  // On route change → reapply language
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      const savedLang = localStorage.getItem("selectedLang") || "en";
      changeLanguage(savedLang);
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`pb-[8px] fade-translate${loading ? " fade-out" : " fade-in"}`}
      style={{ position: "relative" }}
    >
      {loading && (
        <div className="translate-loader">
          <div className="spinner"></div>
        </div>
      )}
                    
      <CustomSelectBox
        languages={languages}
        selectedLang={selectedLang}
        handleChange={(e) => changeLanguage(e.target.value)} // ✅ pass value only
        loading={loading}
        closeSidebar={closeSidebar}
      />
    </div>
  );
}
