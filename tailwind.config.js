/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inria': ['Inria Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'konkhmer': ['Konkhmer Sleokchher', 'cursive'],
        'inria': ['Inria Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}