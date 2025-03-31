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
        'background-primary': '#FEFBF2',
        'background-green-accent': '#A39F66',
        'background-blue-accent': '#659DBD',
        'background-dark': '#313131',
      },
      fontFamily: {
        'primary': ['Poppins', 'sans-serif'],
        'secondary': ['Poor Story', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
