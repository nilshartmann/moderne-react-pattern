/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/main/resources/templates/**/*.{html,js}"],
  theme: {
    colors: {
      // tailwind:
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      // own:
      orange: {
        DEFAULT: "#E29F28",
      },
      red: {
        DEFAULT: "#D54418",
      },
      orange_2: {
        DEFAULT: "#F89223",
        200: "#f6e3cf",
        500: "#E18521",
      },
      green: {
        DEFAULT: "#6FB43F",
        200: "#9ccf77",
      },
      goldgray: {
        DEFAULT: "#F4F3F0",
      },
    },
    extend: {
      fontFamily: {
        space: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        inter: ["inter", ...defaultTheme.fontFamily.sans],
        barlow: ["barlow", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      sm: "767px",
      // => @media (min-width: 767px) { ... }

      md: "1024px",
      // => @media (min-width: 960px) { ... }

      lg: "1200px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};
