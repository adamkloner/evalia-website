/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#102A43',
        'learning-blue': '#2F80ED',
        'soft-blue': '#EAF4FF',
        'interface-grey': '#F5F7FA',
        'border-grey': '#D8E2EC',
        'slate-text': '#52606D',
        'progress-green': '#B7E84A',
        'success-green': '#DDF7C2',
        'insight-cyan': '#56CCF2',
        purple: '#9B8AFB',
        'warning-amber': '#F5A623',
        'error-red': '#D64545',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #102A43 0%, #1a3a5c 60%, #0d2235 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(47,128,237,0.08) 0%, rgba(86,204,242,0.05) 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(16,42,67,0.08)',
        'card-hover': '0 8px 40px rgba(16,42,67,0.14)',
        'feature': '0 2px 16px rgba(47,128,237,0.10)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
