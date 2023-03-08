/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '13': '3.25rem'
      },
      maxHeight: {
        '4/6': '100%;'
      },
      translate: {
        '1.1': '-100%'
      }
    },
  },
  plugins: [],
}
