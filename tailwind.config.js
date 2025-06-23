/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
      },
      animation: {
    borderWaves: "borderWaves 6s ease-in-out infinite",
  },
  keyframes: {
    borderWaves: {
      "0%, 100%": {
        borderColor: "transparent",
        transform: "rotate(0deg) scale(1)",
      },
      "25%": {
        borderColor: "#ff4d4d",
        transform: "rotate(2deg) scale(1.01)",
      },
      "50%": {
        borderColor: "#4facfe",
        transform: "rotate(-2deg) scale(1.015)",
      },
      "75%": {
        borderColor: "#43e97b",
        transform: "rotate(1deg) scale(1.005)",
      },
    },
  },
    },
  },
  plugins: [],
};
