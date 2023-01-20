/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'primary-main': '#151A20',
      'primary-light': '#20252A',
      'primary-ultralight': '#2A2F34',
      'primary-superultralight': '#474F56',
      'white': '#FFFFFF',
      'dark-text': '#9CA3AF',
      'light-text': '#FFFFFF'
    },
    fontFamily: {
      'serif': ['Domine'],
      'header': ['Quattrocento']
    },
    extend: {},
  },
  plugins: [],
}
