import { useEffect } from "react";

const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
];

export default function LanguageSelector() {
    const changeLanguage = (code) => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
            select.value = code;
            select.dispatchEvent(new Event("change"));
            localStorage.setItem("lang", code);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            const savedLang = localStorage.getItem("lang");
            if (savedLang) changeLanguage(savedLang);
        }, 1000);
    }, []);

    return (
        <div className="flex flex-wrap gap-2 items-center">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium shadow-sm hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-lg">{lang.flag}</span>
                    {lang.name}
                </button>
            ))}
        </div>
    );
}
