


// import { useLocation } from "react-router-dom";
// import React from "react";
// import './GoogleTranslate.css';

// const languages = [
//   { code: "en", name: "English" },
//   { code: "fr", name: "French" },
//   { code: "es", name: "Spanish" },
// ];

// // Force 'en' as default in memory on every window reload
// const defaultLang = 'en';

// export default function GoogleTranslate() {
//   const [selectedLang, setSelectedLang] = React.useState(defaultLang);
//   const [loading, setLoading] = React.useState(false);
//   const location = useLocation();

//   // Clear Google Translate cookies and reset to English on mount
//   React.useEffect(() => {
//     // Clear Google Translate cookies to prevent auto-translation
//     document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;

//     // Remove the hash that Google Translate adds
//     if (window.location.hash.includes('#googtrans')) {
//       window.location.hash = '';
//     }

//     const style = document.createElement('style');
//     style.innerHTML = `
//       .goog-te-banner-frame { display: none !important; }
//       body { top: 0 !important; }
//       #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
//       iframe.skiptranslate { display: none !important; }
//       iframe.goog-te-banner-frame { display: none !important; }
//       body > .skiptranslate { display: none !important; }
//     `;
//     document.head.appendChild(style);

//     // Hide banner frame and iframes if they appear dynamically
//     const hideElements = setInterval(() => {
//       // Hide banner
//       const banner = document.querySelector('.goog-te-banner-frame');
//       if (banner) {
//         banner.style.display = 'none';
//       }

//       // Hide all Google Translate iframes
//       const iframes = document.querySelectorAll('iframe.skiptranslate, iframe.goog-te-banner-frame');
//       iframes.forEach(iframe => {
//         iframe.style.display = 'none';
//       });

//       // Reset body position
//       document.body.style.top = '0';
//       document.body.style.position = 'static';

//       // Clear cookies again if they reappear
//       if (document.cookie.includes('googtrans')) {
//         document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//       }
//     }, 100);

//     return () => clearInterval(hideElements);
//   }, []);

//   // Force reset to English on component mount
//   React.useEffect(() => {
//     // Wait for Google Translate to initialize, then force English
//     const forceEnglish = () => {
//       const select = document.querySelector('.goog-te-combo');
//       if (select && select.value !== 'en') {
//         select.value = 'en';
//         select.dispatchEvent(new Event('change'));
//       }
//     };

//     // Try multiple times to ensure it works
//     setTimeout(forceEnglish, 500);
//     setTimeout(forceEnglish, 1000);
//     setTimeout(forceEnglish, 1500);
//   }, []);

//   // Function to change language
//   const changeLanguage = (lang) => {
//     setLoading(true);
//     setSelectedLang(lang);
//     const tryChangeLanguage = () => {
//       const select = document.querySelector('.goog-te-combo');
//       if (select) {
//         select.value = lang;
//         select.dispatchEvent(new Event('change'));
//         setTimeout(() => setLoading(false), 600);
//       } else {
//         setTimeout(tryChangeLanguage, 300);
//       }
//     };
//     tryChangeLanguage();
//   };

//   // Handle dropdown change
//   const handleChange = (e) => {
//     changeLanguage(e.target.value);
//   };

//   // On mount and on route change, auto-apply saved language
//   React.useEffect(() => {
//     changeLanguage(selectedLang);
//     // eslint-disable-next-line
//   }, [location]);

//   return (
//     <div className={`pb-[8px] fade-translate${loading ? ' fade-out' : ' fade-in'}`} style={{ position: 'relative' }}>
//       {loading && (
//         <div className="translate-loader">
//           <div className="spinner"></div>
//         </div>
//       )}
//       <select
//         className="border-none none outline-none"
//         onChange={handleChange}
//         value={selectedLang}
//         disabled={loading}
//       >
//         {languages.map((lang) => (
//           <option key={lang.code} value={lang.code}>
//             {lang.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

import { useLocation } from "react-router-dom";
import React from "react";
import './GoogleTranslate.css';
import  CustomSelectBox from  "../components/ui/CustomSelectBox"

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
];

// Force 'en' as default in memory on every window reload
const defaultLang = 'en';

export default function GoogleTranslate({ closeSidebar }) {
  const [selectedLang, setSelectedLang] = React.useState(defaultLang);
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();

  console.log("closeSidebar prop:", closeSidebar);

  // Clear Google Translate cookies and reset to English on mount
  React.useEffect(() => {
    // Clear Google Translate cookies to prevent auto-translation
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;

    // Remove the hash that Google Translate adds
    if (window.location.hash.includes('#googtrans')) {
      window.location.hash = '';
    }

    const style = document.createElement('style');
    style.innerHTML = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
      iframe.skiptranslate { display: none !important; }
      iframe.goog-te-banner-frame { display: none !important; }
      body > .skiptranslate { display: none !important; }
    `;
    document.head.appendChild(style);

    // Hide banner frame and iframes if they appear dynamically
    const hideElements = setInterval(() => {
      // Hide banner
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) {
        banner.style.display = 'none';
      }

      // Hide all Google Translate iframes
      const iframes = document.querySelectorAll('iframe.skiptranslate, iframe.goog-te-banner-frame');
      iframes.forEach(iframe => {
        iframe.style.display = 'none';
      });

      // Reset body position
      document.body.style.top = '0';
      document.body.style.position = 'static';

      // Clear cookies again if they reappear
      if (document.cookie.includes('googtrans')) {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    }, 100);

    return () => clearInterval(hideElements);
  }, []);

  // Force reset to English on component mount
  React.useEffect(() => {
    // Wait for Google Translate to initialize, then force English
    const forceEnglish = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select && select.value !== 'en') {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      }
    };

    // Try multiple times to ensure it works
    setTimeout(forceEnglish, 500);
    setTimeout(forceEnglish, 1000);
    setTimeout(forceEnglish, 1500);
  }, []);

  // Function to change language
  const changeLanguage = (lang) => {
    setLoading(true);
    setSelectedLang(lang);
    const tryChangeLanguage = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
        setTimeout(() => setLoading(false), 600);
      } else {
        setTimeout(tryChangeLanguage, 300);
      }
    };
    tryChangeLanguage();
  };

  // Handle dropdown change
  const handleChange = (e) => {
    changeLanguage(e.target.value);
  };

  // On route change, auto-apply current selected language
  React.useEffect(() => {
    // Wait a bit for the page to load new content
    const timer = setTimeout(() => {
      if (selectedLang !== 'en') {
        changeLanguage(selectedLang);
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div className={`pb-[8px] fade-translate${loading ? ' fade-out' : ' fade-in'}`} style={{ position: 'relative' }}>
      {loading && (
        <div className="translate-loader">
          <div className="spinner"></div>
        </div>
      )}
      {/* <select
        className="border-none none outline-none custom-select "
        onChange={handleChange}
        value={selectedLang}
        disabled={loading}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select> */}

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