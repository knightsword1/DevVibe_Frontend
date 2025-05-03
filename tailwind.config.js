/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use the imported 'daisyui' variable
  daisyui: {
    themes: [
      "black", // Set to 'black' theme
    ],
  },
};
