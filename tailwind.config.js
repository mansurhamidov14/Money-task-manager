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
        },
        slideUpOut: {
          '0%': {
            transform: 'translateY(0)',
            opacity: 1
          },
          '100%': {
            transform: 'translateY(-200%)',
            opacity: 0
          }
        },
        slideUp: {
          '0%': { transform: 'translateY(180px)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideLeftIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRightOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        bounceX: {
          '0%': { transform: 'translateX(5px)' },
          '33%': { transform: 'translateX(-5px)' },
          '67%': { transform: 'translateX(5px)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'slide-down-in': 'slideDownIn 500ms',
        'slide-up-out': 'slideUpOut 500ms',
        'slide-left-in': 'slideLeftIn 500ms',
        'slide-right-out': 'slideRightOut 500ms',
        'slide-up': 'slideUp 500ms',
        'fade-in': 'fadeIn 1000ms',
        'bounce-x': 'bounceX 500ms'
      }
    }
  },
  plugins: [],
}

