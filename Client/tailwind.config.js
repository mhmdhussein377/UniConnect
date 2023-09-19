/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    screens: {
      xs: "400px",
      sm: "620px",
      smd: "720px",
      // => @media (min-width: 640px) { ... }

      md: "900px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#0E80D4",
        secondary: "#249AF1",
        danger: "#fe2566",
        grayLight: "#F9FAFE",
        grayMedium: "#ECEFF4",
        grayHard: "#B3B8C7",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

