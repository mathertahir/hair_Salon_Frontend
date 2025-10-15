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
    console.log("Language changed to:", lang);
  };

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
        handleChange={handleChange}
        loading={loading}
        closeSidebar={closeSidebar}
      />
    </div>
  );
}
