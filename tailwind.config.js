/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: {
          bg: "#07111F",
          border: "#1E293B",
          hover: "#0F2038"
        },
        enterprise: {
          navy: "#0A192F",
          dark: "#0F172A",
          muted: "#64748B",
          subtle: "#94A3B8",
          border: "#E2E8F0",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          blue: "#2563EB",
          blueHover: "#1D4ED8",
          blueLight: "#EFF6FF",
          blueBorder: "#BFDBFE"
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'dropdown': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'modal': '0 20px 35px -10px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
