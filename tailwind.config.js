
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['Space Mono', 'monospace'],
        'body': ['DM Sans', 'sans-serif'],
      },
      colors: {
        
        'aqi-good': '#22c55e',
        'aqi-fair': '#86efac',
        'aqi-moderate': '#eab308',
        'aqi-poor': '#f97316',
        'aqi-very-poor': '#ef4444',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'spin-slow': 'spin 2s linear infinite',
        'pulse-ring': 'pulseRing 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
        },
      },
      backgroundColor: {
        'dark-bg': '#030712',
        'dark-card': '#111827',
        'dark-hover': '#1f2937',
      },
    },
  },
  plugins: [],
}
