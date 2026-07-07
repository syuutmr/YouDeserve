/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        page: '#F4F7F6',
        primary: '#1a1a2e',
        secondary: '#6b7280',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        handwriting: ['Caveat', '"Segoe Script"', 'cursive'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blobFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translate(40px, -60px) rotate(90deg) scale(1.1)' },
          '50%': { transform: 'translate(-30px, 20px) rotate(180deg) scale(0.9)' },
          '75%': { transform: 'translate(20px, 40px) rotate(270deg) scale(1.05)' },
        },
        blobFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate(-50px, 30px) rotate(-120deg) scale(1.15)' },
          '66%': { transform: 'translate(40px, -40px) rotate(-240deg) scale(0.85)' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'blob-float': 'blobFloat 20s ease-in-out infinite',
        'blob-float-2': 'blobFloat2 25s ease-in-out infinite',
        'slide-up-fade': 'slideUpFade 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
