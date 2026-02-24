import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#659DBD',
        'secondary': '#A39F66',
        'text-white': '#ffffff',
        'text-dark': '#313131',
        'text-white-off': '#FEFBF2',
        'background-primary': '#FEFBF2',
        'background-green-accent': '#A39F66',
        'background-blue-accent': '#659DBD',
        'background-dark': '#313131',
      },
      fontFamily: {
        'primary': ['Poppins', 'sans serif'],
        'secondary': ['Poor Story', 'cursive'],
      },
      keyframes: {
        "modal-right-enter-kf": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "modal-right-exit-kf": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "cookie-consent-fade-in-kf": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "cookie-consent-fade-out-kf": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        }
      },
      animation: {
        "modal-right-enter": "modal-right-enter-kf 0.3s ease-out forwards",
        "modal-right-exit": "modal-right-exit-kf 0.3s ease-out forwards",
        "cookie-consent-fade-in": "cookie-consent-fade-in-kf 0.3s ease-out forwards",
        "cookie-consent-fade-out": "cookie-consent-fade-out-kf 0.3s ease-out forwards"
      }
    },
  },
  plugins: [],
  corePlugins: {
    boxSizing: true, // This ensures box-sizing is used as expected
  }
};

export default config;
