/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,marko}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: { themes: ["night"] },
};
