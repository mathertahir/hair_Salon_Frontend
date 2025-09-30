
import { useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "./GoogleTranslate.css";
import CustomSelectBox from "../components/ui/CustomSelectBox";

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];

// 🔑 Fix: Reset Google Translate cookies
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

  // Also root scope (no domain)
  document.cookie = `googtrans=/en/${lang}; path=/;`;
};

export default function GoogleTranslate({ closeSidebar }) {
  const [selectedLang, setSelectedLang] = useState(
    () => localStorage.getItem("selectedLang") || "en"
  );
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isInitialMount = useRef(true);

  // On mount → reset cookies and enforce default/saved language
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLang") || "en";
    setTranslateCookie(savedLang);

    // Remove translate hash from URL
    if (window.location.hash.includes("#googtrans")) {
      window.location.hash = "";
    }

    // Hide Google Translate UI elements
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

    // Safety interval to re-hide banners
    const interval = setInterval(() => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.style.display = "none";

      document.querySelectorAll(
        "iframe.skiptranslate, iframe.goog-te-banner-frame"
      ).forEach((iframe) => (iframe.style.display = "none"));

      document.body.style.top = "0";
      document.body.style.position = "static";
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Ensure saved language is applied after widget loads
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLang") || "en";

    const applySavedLanguage = () => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = savedLang;
        select.dispatchEvent(new Event("change"));
      } else {
        setTimeout(applySavedLanguage, 300);
      }
    };

    setTimeout(applySavedLanguage, 600);
  }, []);

  // Function to change language
  const changeLanguage = (lang) => {
    setLoading(true);
    setSelectedLang(lang);
    localStorage.setItem("selectedLang", lang);

    // Reset cookies
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

  // Handle CustomSelectBox change
  const handleChange = (e) => {
    changeLanguage(e.target.value);
  };

  // On route change → reapply selected language
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
      className={`pb-[8px] fade-translate${
        loading ? " fade-out" : " fade-in"
      }`}
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
        handleChange={handleChange}
        loading={loading}
        closeSidebar={closeSidebar}
      />
    </div>
  );
}


