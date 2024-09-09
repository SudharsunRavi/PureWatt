/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_green: '#3A4D39',
        green: '#4F6F52',
        light_green: '#739072',
        beige: '#ECE3CE',
      },
    },
  },
  plugins: [],
}