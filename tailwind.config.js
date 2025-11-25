/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: '#100030',
        card: {
          DEFAULT: '#33274d',  // Main container background
          inner: '#241b36',    // Result cards background
        },
        input: '#1a1528',      // Input fields background
        primary: {
          DEFAULT: '#E561A0',  // Main Pink Button color
          hover: '#d44d8d',
        },
        // These mimic the 'text-pink-400' and 'purple-500' used in gradients
        brand: {
          pink: '#f472b6',
          purple: '#a855f7',
        }
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #E561A0 0%, #A363E3 100%)',
        'text-gradient': 'linear-gradient(to right, #f472b6, #a855f7)',
      },
      borderRadius: {
        lg: '1rem',      // rounded-2xl
        xl: '1.5rem',    // rounded-3xl
      }
    },
  },
}