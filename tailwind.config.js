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
              "primary": "#ff9900",
              "secondary": "#00AEEF",
              "tertiary": "#2A7394",
              "background-light": "#f8f7f5",
              "background-dark": "#231b0f",
          },
          fontFamily: {
              "display": ["Plus Jakarta Sans", "sans-serif"]
          },
          borderRadius: {
              "DEFAULT": "0.5rem", 
              "lg": "0.75rem", 
              "xl": "1rem", 
              "2xl": "1.5rem",
              "full": "9999px"
          },
      },
  },
  plugins: [],
}

