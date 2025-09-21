/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React project scanning
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "var(--black)",
        "black-14": "var(--black-14)",
        "white-FD": "var(--white-FD)",
        "brown-31": "var(--brown-31)",
        "brown-A43": "var(--brown-A43)",
        "light-brown-c0": "var(--light-brown-c0)",
        "gray-55": "var(--gray-55)",
        "white-F0": "var(--white-F0)",
        "light-brown-11p": "var(--light-brown-11p)",
        "brown-97": "var(--brown-97)",
        "light-brown-c1": "var(--light-brown-c1)",
        "gray-245": "var(--gray-245)",
        "light-brown-c1-o5": "var(--light-brown-c1-o5)",
        "white-d3": "var(--white-d3)",
        "brown-E0": "var(--brown-E0)",
        "white-d9": "var(--white-d9)",
        "white-E9": "var(--white-E9)",
        "blueCD": "var(--blueCD)",
        "blueEC": "var(--blueEC)",
        "blueB8": "var(--blueB8)",
      },

      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        manrope: ["Manrope", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "480px",     // Extra small (phones)
        sm: "640px",     // Small (landscape phones)
        md: "768px",     // Medium (tablets)
        lg: "1024px",    // Large (laptops)
        xl: "1280px",    // Extra large (desktops)
        "2xl": "1536px", // Ultra-wide
        "3xl": "1920px", // Custom breakpoint for 1920px screens
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "5rem",
          "3xl": "120px", // 👈 Custom padding for 1920px
        },
      },

      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #FDFDFD, #F0F0F0)',
      },

       width: {
        fill: "-webkit-fill-available",
      },
    },
  },
  plugins: [],
}
