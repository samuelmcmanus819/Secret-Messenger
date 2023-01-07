/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'primary-main': '#151A20',
      'primary-light': '#20252A',
      'primary-ultralight': '#2A2F34'
    },
    extend: {},
  },
  plugins: [],
}
