/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './components/**/*.{html,js}', './assets/**/*.{html,js}', 'screens/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        LibreBarcode: ['LibreBarcode', 'sans-serif'],
        InterRegular: ['Inter-Regular', 'sans-serif'],
        InterSemiBold: ['Inter-SemiBold', 'Inter-Regular'],
      },
    },
  },
  plugins: [],
}

