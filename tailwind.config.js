/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'color1' : '#1D84B5',
        'color2' : '#1776A3'
      }
    },
  },
  plugins: [require("daisyui")],
}
