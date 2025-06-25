// packages/frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A1E3D", // Navy blue
          50: "#E6EBF4",
          100: "#C2CFDF",
          200: "#9BB1CB",
          300: "#7494B7",
          400: "#4E77A3",
          500: "#365582",
          600: "#263C5C",
          700: "#162336",
          800: "#080E17",
          900: "#000000",
        },
        secondary: {
          DEFAULT: "#1C2536", // Dark blue/black
          50: "#E7E8EA",
          100: "#C4C7CF",
          200: "#9DA2AE",
          300: "#767D8D",
          400: "#4F586C",
          500: "#1C2536",
          600: "#171E2C",
          700: "#111622",
          800: "#0B0F17",
          900: "#05070D",
        },
        accent: {
          DEFAULT: "#FFFFFF", // White
          muted: "#F3F4F6", // Light gray for contrast
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 2s",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            transform: "translate(-50%, -50%)",
          },
          "25%": {
            transform: "translate(50%, -50%)",
          },
          "50%": {
            transform: "translate(50%, 50%)",
          },
          "75%": {
            transform: "translate(-50%, 50%)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        solid: "0 0 0 2px currentColor",
        elevated:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
