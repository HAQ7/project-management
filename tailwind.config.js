/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.5s',
        topMoveDown: 'moveSelfAmount 0.25s',
        bottomMoveUp: 'moveScreenAmount 0.25s',
        opacity: 'opacity 0.25s',
        opacityWithDelay: 'opacity 0.25s 0.2s forwards',
        fadeIn: `fadeIn 0.25s`
      },
      keyframes: {
        shake: {
          '25%': { transform: 'translateX(-20px)' },
          '50%': { transform: 'translateX(20px)' },
          '75%': { transform: 'translateX(-20px)' },
          '100%': { transform: 'translateX(0)' },
        },
        moveSelfAmount: {
          '0%': { transform: 'translateY(-100%)' },

          '100%': { transform: 'translateY(0)' },
        },
        moveScreenAmount: {
          '0%': { transform: 'translateY(100vh)' },

          '100%': { transform: 'translateY(0)' },
        },
        opacity: {
          'from': {opacity: '0'},
          'to': {opacity: '100'}
        },
        fadeIn: {
          'from': {opacity: '0', transform: 'translateY(-100%)'},
          'to': {opacity: '100', transform: 'translateY(0)'}
        }
      }
    },
  },
  plugins: [],
}