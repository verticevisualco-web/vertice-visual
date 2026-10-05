/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./public/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#c59a6d',
        petroleum: '#264653',
        'background-light': '#f8f7f6',
        'background-dark': '#1d1915',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};
