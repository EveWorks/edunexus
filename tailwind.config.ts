/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /*
         * body, modal, drawer background & ring-offset-color
         */
        background: "rgb(var(--background) / <alpha-value>)",

        /*
         * body text color
         */
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        /*
         * border, default flat bg color for input components, tab & dropdown hover color
         */
        muted: "rgb(var(--muted) / <alpha-value>)",

        /*
         * disable foreground color
         */
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",

        /*
         * primary colors
         */
        primary: {
          lighter: "rgb(var(--primary-lighter))",
          DEFAULT: "rgb(var(--primary-default))",
          dark: "rgb(var(--primary-dark))",
          foreground: "rgb(var(--primary-foreground))",
        },

        /*
         * secondary colors
         */
        secondary: {
          lighter: "rgb(var(--secondary-lighter))",
          DEFAULT: "rgb(var(--secondary-default))",
          dark: "rgb(var(--secondary-dark))",
          foreground: "rgb(var(--secondary-foreground))",
        },

        /*
         * danger colors
         */
        red: {
          lighter: "rgb(var(--red-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--red-default) / <alpha-value>)",
          dark: "rgb(var(--red-dark) / <alpha-value>)",
        },

        /*
         * warning colors
         */
        orange: {
          lighter: "rgb(var(--orange-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--orange-default) / <alpha-value>)",
          dark: "rgb(var(--orange-dark) / <alpha-value>)",
        },

        /*
         * info colors
         */
        blue: {
          lighter: "rgb(var(--blue-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--blue-default) / <alpha-value>)",
          dark: "rgb(var(--blue-dark) / <alpha-value>)",
        },

        /*
         * success colors
         */
        green: {
          lighter: "rgb(var(--green-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--green-default) / <alpha-value>)",
          dark: "rgb(var(--green-dark) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
