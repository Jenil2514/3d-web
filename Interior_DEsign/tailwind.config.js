/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E6DDD4',
          300: '#D5C7B7',
          400: '#C2AE98',
          500: '#B0977B',
        },
        charcoal: {
          800: '#232220',
          900: '#171615',
          950: '#0F0E0D',
        },
        gold: {
          500: '#C5A059',
          600: '#B08B44',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '16/10': '16 / 10',
      }
    },
  },
  plugins: [],
}
