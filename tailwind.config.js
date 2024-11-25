/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "background-purple": "#333250",
      },
      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
      },
    },
    plugins: [],
  },
};
