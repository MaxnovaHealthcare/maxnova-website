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
        humane: ["MangoGrotesqueExtLt", "sans-serif"],
        helvetica: ["Helvetica Neue", "sans-serif"],
      },
      fontSize: {
        min: ["1rem", "1.4"],
        para: ["1.125rem", "1.4"],
        subhead: ["1.5rem", "1.4"],
        head: ["1.9rem", "1.2"],
        max: ["8.5rem", "7rem"],
      },
      backgroundColor: {
        primary: "#EEEEEE",
        secondary: "#222831",
        accent1: "#76ABAE",
        accent2: "#31363F",
      },
      textColor: {
        primary: "#222831",
        secondary: "#EEEEEE",
        accent1: "#76ABAE",
        accent2: "#31363F",
      },
      colors: {
        primary: "#EEEEEE",
        secondary: "#222831",
        accent1: "#76ABAE",
        accent2: "#31363F",
      },
    },
  },
  plugins: [],
  darkMode: ["selector", '[data-mode="dark"]'],
};
export default config;
