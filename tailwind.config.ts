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
        para: ["1.125rem", "1.6875rem"],
        subhead: ["1.5rem", "1.875rem"],
        head: ["1.875rem", "2.375rem"],
        max: ["9.5rem", "7.625rem"],
      },
      backgroundColor: {
        primary: "#e9e3d5",
        secondary: "#272724",
        accent1: "#fda521",
        accent2: "#033043",
      },
      textColor: {
        primary: "#272724",
        secondary: "#e9e3d5",
        accent1: "#fda521",
        accent2: "#033043",
      },
    },
  },
  plugins: [],
  darkMode: ["selector", '[data-mode="dark"]'],
};
export default config;
