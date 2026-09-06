/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kerala: {
          bg: '#FDFBF5',
          parchment: '#FBF5E6',
          desk: '#E8D8B8',
          border: '#D4AF37',
          gold: '#EAB308',
          mustard: '#CA8A04',
          ochre: '#B45309',
          terracotta: '#9A3412',
          wood: '#451A03',
          darkwood: '#2E1002',
          ribbon: '#B91C1C',
          seal: '#047857',
          stamp: '#15803D'
        }
      },
      fontFamily: {
        malayalam: ['"Noto Sans Malayalam"', '"Manjari"', 'sans-serif'],
        office: ['"Courier Prime"', 'Courier', 'monospace'],
        display: ['"Baloo Chettan 2"', '"Noto Sans Malayalam"', '"Manjari"', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'fan': 'spin 1.5s linear infinite',
        'pulse-fast': 'pulse 0.7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'bounce-slight': 'bounceSlight 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'kerala-gold': '0 0 20px -2px rgba(234, 179, 8, 0.4)',
        'vintage': '0 10px 25px -5px rgba(69, 26, 3, 0.25), 0 8px 10px -6px rgba(69, 26, 3, 0.2)',
        'paper': '2px 4px 12px rgba(69, 26, 3, 0.15)',
        'stamp': 'inset 0 0 10px rgba(4, 120, 87, 0.2), 0 2px 5px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
}
