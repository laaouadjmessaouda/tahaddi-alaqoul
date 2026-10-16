/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          cream: {
          50:  '#fafdff',
          100: '#f0f9ff',
          200: '#e0f2fe',
          300: '#bae6fd',
          400: '#7dd3fc',
          500: '#38bdf8',
          600: '#0ea5e9',
          700: '#0284c7',
          800: '#075985',
          900: '#0c4a6e',
        },
             human: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        ai: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
        },
        hot: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        rose: {
          400: '#fb7185',
          500: '#ec4899',
          600: '#db2777',
        },
      },
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}