/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B1120',
          secondary: '#111827',
          card: '#151F32',
        },
        accent: {
          primary: '#38BDF8',
          secondary: '#818CF8',
        },
        content: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
        },
      },
      borderColor: {
        DEFAULT: 'rgba(148, 163, 184, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(56, 189, 248, 0.45)',
        'glow-indigo': '0 0 40px -10px rgba(129, 140, 248, 0.45)',
        card: '0 20px 50px -20px rgba(2, 6, 23, 0.8)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 14s ease infinite',
      },
    },
  },
  plugins: [],
};
