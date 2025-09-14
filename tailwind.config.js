/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lux: {
          dark: "#0f0f0f",    
          gold: "#FFD700",
          purple: "#6a11cb",
          blue: "#2575fc",
          gray: "#9ca3af",
        },
      },
    },
  },
  plugins: [],
};
