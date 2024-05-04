/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './components/**/*.{html,js}', './assets/**/*.{html,js}', 'screens/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        barcode: ['Libre Barcode 128 Text Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

