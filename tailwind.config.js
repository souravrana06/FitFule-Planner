export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // Emerald
        secondary: '#6366f1', // Electric Indigo
        accent: '#8b5cf6', // Purple/Violet
        dark: '#0b0f19', // Obsidian Dark
        light: '#f8fafc', // Slate Light
        brand: {
          bg: '#05070f',
          card: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(255, 255, 255, 0.06)',
          glow: 'rgba(99, 102, 241, 0.15)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}