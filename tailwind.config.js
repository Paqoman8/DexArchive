/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          colors: {
            "neon-yellow": "#FFE066",
            "neon-turq": "#4DE1C1",
            "neon-blue": "#58A6FF",
            "neon-orange": "#FF944D",
            "neon-pink": "#D28CFF",
            "night-900": "#04132b",
            "night-800": "#06203a"
          },
          fontFamily: {
            pixel: ["'Press Start 2P'", 'monospace']
          },
          boxShadow: {
            'neon-deep': '0 10px 30px rgba(2,8,23,0.7), inset 0 1px 0 rgba(255,255,255,0.02)'
          }
        }
      },
    plugins: []
  }