/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D2A4D',
        accent: '#00CABA',
        secondary: '#00CABA',
        neutral: '#F5F7FA',
        textDark: '#3A3A3A',
        charcoal: '#3A3A3A',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(29, 42, 77, 0.1)',
      }
    },
  },
  plugins: [],
}