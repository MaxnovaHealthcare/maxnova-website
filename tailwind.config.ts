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
        min: ["1rem", "1rem"],
        para: [
          "1.125rem",
          {
            lineHeight: "1.6875rem",
            letterSpacing: "0.12rem",
            fontWeight: "300",
          },
        ],
        subhead: [
          "1.875rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: "",
            fontWeight: "500",
          },
        ],
        head: [
          "1.9rem",
          {
            lineHeight: "2.4rem",
            letterSpacing: "0.075rem",
            fontWeight: "700",
          },
        ],
        max: [
          "9.5rem",
          {
            lineHeight: "7.725rem",
            letterSpacing: "0.05rem",
            fontWeight: "800",
          },
        ],
        scroll: [
          "10rem",
          {
            lineHeight: "0.1rem",
            letterSpacing: "0.1rem",
            fontWeight: "800",
          },
        ],
      },
      colors: {
        primary: "#f8f8f8",
        secondary: "#1a1a1a",
        accent1: "#97BBD1",
        accent2: "#1E3658",
        accent3: "#E63946",
      },
    },
  },
  plugins: [],
  darkMode: ["selector", '[data-mode="dark"]'],
};
export default config;
