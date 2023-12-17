const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.slate
      },
      keyframes: {
        slideDownIn: {
          '0%': { transform: 'translateY(-200%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'slide-down-in': 'slideDownIn 500ms'
      }
    }
  },
  plugins: [],
}

