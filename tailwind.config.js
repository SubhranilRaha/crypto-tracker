/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["bumblebee","halloween"],
    darkTheme: "halloween",
  },
  plugins: [require("daisyui")],
}
