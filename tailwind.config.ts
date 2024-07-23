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
        subhead: ["1.25rem", "1.875rem"],
        head: ["1.875rem", "2.375rem"],
        max: ["9.5rem", "7.625rem"],
      },
      backgroundColor: {
        primary: "#f2f0ea",
        secondary: "#27251f",
        accent1: "#adebff",
        accent2: "#003459",
      },
      textColor: {
        primary: "#27251f",
        secondary: "#f2f0ea",
      },
    },
  },
  plugins: [],
};
export default config;
