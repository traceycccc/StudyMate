/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Custom blue color
        secondary: '#F59E0B', // Custom yellow color
      },
      fontFamily: {
        body: ['Nunito', 'sans-serif'], // Custom font
      },
    },
  },
  plugins: [],
}

