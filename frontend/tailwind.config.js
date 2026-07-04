/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        aurora: {
          violet: '#8b5cf6',
          indigo: '#6366f1',
          cyan: '#22d3ee',
          teal: '#2dd4bf',
          amber: '#f59e0b',
          rose: '#fb7185',
        },
      },
      animation: {
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'float-slower': 'floatSlow 13s ease-in-out infinite reverse',
        'float-mid': 'floatSlow 10.5s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'pulse-glow': 'pulseGlow 3.5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -24px) scale(1.05)' },
          '66%': { transform: 'translate(-22px, 18px) scale(0.97)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
