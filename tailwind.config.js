/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./web/src/**/*.{html,ts}",
    "./web/src/**/*.component.html",
  ],
  theme: {
    extend: {
      colors: {
        // Dark tech theme
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
