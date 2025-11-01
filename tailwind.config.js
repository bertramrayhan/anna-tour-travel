/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#A43A81", // Changed to Magenta as per user request for CTAs
        "secondary": "#34A8DB", // Blue for other elements
        "background-light": "#FFFFFF",
        "background-dark": "#111c21",
        "text-light": "#333333",
        "text-dark": "#f0f0f0",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem", 
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

