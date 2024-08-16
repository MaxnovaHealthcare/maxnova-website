import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        humane: ["Humane", "sans-serif"],
        helvetica: ["Helvetica Neue", "sans-serif"],
      },
      fontSize: {
        min: ["1rem", "1rem"],
        para: ["1.125rem", "1.2rem"],
        subhead: ["1.5rem", "1.7rem"],
        head: ["1.875rem", "1.95rem"],
        max: ["8.5rem", "7rem"],
      },
      backgroundColor: {
        primary: "#ffffff",
        secondary: "#191919",
        accent1: "#FFD700",
        accent2: "#f7f4f3",
      },
      textColor: {
        primary: "#191919",
        secondary: "#ffffff",
        accent1: "#FFD700",
        accent2: "#f7f4f3",
      },
      colors: {
        primary: "#ffffff",
        secondary: "#191919",
        accent1: "#FFD700",
        accent2: "#f7f4f3",
      },
    },
  },
  plugins: [],
  darkMode: ["selector", '[data-mode="dark"]'],
};
export default config;
