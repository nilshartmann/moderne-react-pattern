/** @type {import("prettier").Options} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "twMerge", "class"],
};

module.exports = config;
