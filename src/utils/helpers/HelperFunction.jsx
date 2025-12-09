import { ToastService } from "../ToastService";
import { useEffect } from "react";

export const handleApiError = (error) => {
  console.log(error, "Comming Error");
  const messages = error.response?.data?.responseMessage;
  console.log(messages, "Comming Message");

  if (Array.isArray(messages)) {
    messages.forEach((message) => {
      ToastService.error(`${message}`);
    });
  } else if (messages) {
    ToastService.error(messages);
  } else {
    ToastService.error("An unexpected error occurred.");
  }
};

export const formatDate = (dateString) => {
  console.log("commingDate", dateString);
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const monthName = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day}-${monthName}-${year}`;
};

export const truncateText = (text = "", limit = 15) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

export const createMarkup = (htmlContent) => {
  return { __html: htmlContent };
};

export const formatDateNew = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const sanitizeLinks = (html) => {
  if (!html) return "";
  return html.replace(
    /<a /g,
    '<a target="_blank" rel="noopener noreferrer" class="text-blue-600 underline" '
  );
};

// export default function useCoiffeurReplacement() {
//   useEffect(() => {
//     const phraseReplacements = [
//       {
//         // full phrase replacement
//         pattern:
//           /Trouvez et réservez des coiffeurs afro\/noirs de confiance partout au Canada, n'importe quand, n'importe où\./gi,
//         replacement:
//           "Trouvez et réservez des coiffeuses afro de confiance partout au Canada, à tout moment.",
//       },
//       {
//         pattern: /Où es-tu situé/gi,
//         replacement: "Où êtes-vous situé ",
//       },
//       {
//         pattern: /Tresses africaines, tresses collées/gi,
//         replacement:
//           "Trouvez une coiffeuse experte en cheveux afro et bouclés près de chez vous, et prenez rendez-vous en toute confiance.",
//       },
//       {
//         pattern:
//           /Trouvez un Coiffeuse afro et bouclé de confiance près de chez vous et réservez en toute sérénité./gi,
//         replacement:
//           "Trouvez une coiffeuse experte en cheveux afro et bouclés près de chez vous, et prenez rendez-vous en toute confiance.",
//       },
//       {
//         pattern: /coiffeuse recommandé/gi,
//         replacement: "coiffeuses recommandées",
//       },
//       {
//         pattern: /Pages utilitaires/gi,
//         replacement: "Politiques & Conditions",
//       },
//       {
//         pattern: /politique de confidentialité/gi,
//         replacement: "Politique de confidentialité",
//       },
//       {
//         pattern:
//           /Nous mettons en relation nos clients avec des coiffeurs afro et bouclés qualifiés et certifiés, soucieux de la qualité, du professionnalisme et de l'obtention de résultats exceptionnels à chaque fois./gi,
//         replacement:
//           "Nous connectons nos clientes à des coiffeuses spécialisées dans les cheveux afro et bouclés, qualifiées, offrant un service professionnel et des résultats exceptionnels.",
//       },
//       {
//         pattern: /les coiffeurs/gi,
//         replacement: "les coiffeuses",
//       },
//       {
//         pattern: / la Coiffeuse/gi,
//         replacement: " La coiffeuse",
//       },
//       {
//         pattern: / de coiffeurs/gi,
//         replacement: " de coiffeuses",
//       },
//       {
//         pattern: /les coiffeurs/gi,
//         replacement: "les coiffeuses",
//       },
//       {
//         pattern: /Coiffeuse\s*\(\s*se\s*\)/gi,
//         replacement: "Coiffeuse",
//       },
//       {
//         pattern: /macrownité.com/gi,
//         replacement: "mycrownity.com",
//       },
//       {
//         pattern: /adresse contact@mycrownity.com/gi,
//         replacement: "contact@mycrownity.com",
//       },
//     ];

//     const wordReplacements = [
//       { pattern: /\bCoiffeur\b/gi, replacement: "Coiffeuse" },
//       { pattern: /\bMaison\b/gi, replacement: "Accueil" },
//       { pattern: /\bCouronne\b/gi, replacement: "Crownity" },
//       { pattern: /\ble\b/gi, replacement: "la" },
//       { pattern: /\bidéal\b/gi, replacement: "idéale" },

//     ];

//     const replaceWords = (text) => {
//       // 1️⃣ Apply full phrase replacements first
//       phraseReplacements.forEach(({ pattern, replacement }) => {
//         text = text.replace(pattern, replacement);
//       });

//       // 2️⃣ Then apply single-word replacements
//       wordReplacements.forEach(({ pattern, replacement }) => {
//         text = text.replace(pattern, replacement);
//       });

//       return text;
//     };

//     const replaceWordsInNode = (node) => {
//       const walker = document.createTreeWalker(
//         node,
//         NodeFilter.SHOW_TEXT,
//         null,
//         false
//       );

//       let textNode;
//       while ((textNode = walker.nextNode())) {
//         textNode.textContent = replaceWords(textNode.textContent);
//       }
//     };

//     // Initial replacement
//     replaceWordsInNode(document.body);

//     // Watch dynamic content (Google Translate + React renders)
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         mutation.addedNodes.forEach((node) => {
//           if (node.nodeType === Node.TEXT_NODE) {
//             node.textContent = replaceWords(node.textContent);
//           } else if (node.nodeType === Node.ELEMENT_NODE) {
//             replaceWordsInNode(node);
//           }
//         });
//       });
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });

//     return () => observer.disconnect();
//   }, []);
// }

export default function useCoiffeurReplacement() {
  useEffect(() => {
    // Detect current language from <html lang="...">
    const currentLang = document.documentElement.lang || "en";

    // Full phrase replacements
    const PHRASE_REPLACEMENTS = [
      {
        pattern:
          /Trouvez et réservez des coiffeurs afro\/noirs de confiance partout au Canada, n'importe quand, n'importe où\./gi,
        replacement:
          "Trouvez et réservez des coiffeuses afro de confiance partout au Canada, à tout moment.",
      },
      {
        pattern: /Où es-tu situé/gi,
        replacement: "Où êtes-vous situé ",
      },
      {
        pattern: /Tresses africaines, tresses collées/gi,
        replacement:
          "Trouvez Une Coiffeuse Experte En Cheveux Afro Et Bouclés Près De Chez Vous, Et Prenez Rendez-vous En Toute Confiance.",
      },
      {
        pattern:
          /Trouvez un Coiffeur afro et bouclé de confiance près de chez vous et réservez en toute sérénité./gi,
        replacement:
          "Trouvez une coiffeuse experte en cheveux afro et bouclés près de chez vous, et prenez rendez-vous en toute confiance.",
      },

      {
        pattern: /tresses au crochet/gi,
        replacement: "Crochet braids",
      },
      {
        pattern: /Lissage des cheveux (brushing, lisage brésilien) /gi,
        replacement: "Lissage (Brushing, silk press etc)"
      },

      {
        pattern: /Torsades/gi,
        replacement: "Twists",
      },
      {
        pattern: /Se maquiller/gi,
        replacement: "Make up",
      },

      {
        pattern: /Pages utilitaires/gi,
        replacement: "Politiques & Conditions",
      },
      {
        pattern: /politique de confidentialité/gi,
        replacement: "Politique de confidentialité",
      },
      {
        pattern:
          /Nous mettons en relation nos clients avec des coiffeurs afro et bouclés qualifiés et certifiés/gi,
        replacement:
          "Nous connectons nos clientes à des coiffeuses spécialisées dans les cheveux afro et bouclés, qualifiées, offrant un service professionnel et des résultats exceptionnels.",
      },
      { pattern: /les coiffeurs/gi, replacement: "les coiffeuses" },
      { pattern: / la Coiffeuse/gi, replacement: " La coiffeuse" },
      { pattern: / de coiffeurs/gi, replacement: " de coiffeuses" },
      { pattern: /Coiffeuse\s*\(\s*se\s*\)/gi, replacement: "Coiffeuse" },
      { pattern: /macrownité.com/gi, replacement: "mycrownity.com" },
      {
        pattern: /adresse contact@mycrownity.com/gi,
        replacement: "contact@mycrownity.com",
      },
      {
        pattern: /Coiffeuse recommandé/gi,
        replacement: "Coiffeuses recommandées",
      },
      {
        pattern: /Coiffeur recommandé/gi,
        replacement: "Coiffeuses recommandées",
      },
    ];

    // Word replacements
    const WORD_REPLACEMENTS = [
      { word: "Coiffeur", replacement: "Coiffeuse" },
      { word: "Maison", replacement: "Accueil" },

      { word: "Crown", replacement: "Couronne", conditionalLang: "fr" }, // Conditional French
      { word: "le", replacement: "la" },
      { word: "idéal", replacement: "idéale" },
    ];

    // Strict single-word replacement
    const replaceWordStrict = (text, word, replacement) => {
      return text
        .split(/\b/) // split by word boundaries
        .map((t) => (t.toLowerCase() === word.toLowerCase() ? replacement : t))
        .join("");
    };

    // Apply all replacements on text
    const replaceWords = (text) => {
      let updated = text;

      // 1️⃣ Phrase replacements
      PHRASE_REPLACEMENTS.forEach(({ pattern, replacement }) => {
        updated = updated.replace(pattern, replacement);
      });

      // 2️⃣ Word replacements
      WORD_REPLACEMENTS.forEach(
        ({ word, replacement, strict, conditionalLang }) => {
          // Conditional language check
          if (conditionalLang && conditionalLang !== currentLang) return;

          if (strict) {
            updated = replaceWordStrict(updated, word, replacement);
          } else {
            const regex = new RegExp(`\\b${word}\\b`, "gi");
            updated = updated.replace(regex, replacement);
          }
        }
      );

      return updated;
    };

    // Replace text in a single node safely
    const replaceTextNode = (node) => {
      if (!node || !node.textContent) return;

      // Skip nodes inside "no-translate"
      if (node.parentElement?.classList.contains("notranslate")) return;

      // Prevent infinite loops
      if (node.parentElement?.dataset?.translated === "yes") return;

      const updatedText = replaceWords(node.textContent);

      if (updatedText !== node.textContent) {
        node.textContent = updatedText;
        node.parentElement.dataset.translated = "yes";
      }
    };

    // Walk through all text nodes
    const walkDOM = (root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        replaceTextNode(node);
      }
    };

    // Always fix the title
    const fixTitle = () => {
      const titleEl = document.querySelector("title");
      if (titleEl && titleEl.textContent !== "Crownity") {
        titleEl.textContent = "Crownity";
      }
    };

    // Initial run
    walkDOM(document.body);
    fixTitle();

    // Observe DOM changes (Google Translate / React renders)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            replaceTextNode(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            walkDOM(node);
          }
        }
      }
      // Re-fix title in case Google Translate changes it
      fixTitle();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
}
