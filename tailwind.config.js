/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Paleta Corporativa Azul Tech
        'primary': {
          DEFAULT: '#3A7BD5',
          light: '#5EA8FF',
          dark: '#2A5FA5',
        },
        'accent': {
          DEFAULT: '#5EA8FF',
          bright: '#0FE0FF',
          glow: '#0FE0FF',
        },
        'surface': {
          dark: '#0B0E13',
          DEFAULT: '#141821',
          light: '#1E2532',
          lighter: '#2A3143',
        },
        'text': {
          primary: '#E5EAF0',
          secondary: '#A8B2C1',
          muted: '#6B7A93',
        },
        'status': {
          success: '#42D392',
          warning: '#FAD643',
          error: '#E03E3E',
        },
        // Tokens semánticos
        'btn-primary': '#3A7BD5',
        'btn-primary-hover': '#5EA8FF',
        'input-border': '#2A3143',
        'input-focus': '#5EA8FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(58, 123, 213, 0.3)',
        'glow-accent': '0 0 20px rgba(94, 168, 255, 0.3)',
        'glow-bright': '0 0 30px rgba(15, 224, 255, 0.4)',
      },
    },
  },
  plugins: [],
}
