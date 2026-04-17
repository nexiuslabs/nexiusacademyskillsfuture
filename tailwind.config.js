/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
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
        brand: {
          orange: '#FF6B2C',
          orangeLight: '#FF8A4C',
          orangeSoft: '#FFE7DB',
          purple: '#6C3FD1',
          purpleDark: '#4E2BA4',
          purpleSoft: '#EFE7FF',
          cream: '#FFF7F0',
          ink: '#141B2D',
          graphite: '#4D5568',
          muted: '#7B8498',
          beige: '#E8DACC',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(29, 42, 77, 0.1)',
        'soft': '0 14px 40px -18px rgba(20, 27, 45, 0.28)',
      }
    },
  },
  plugins: [],
}
