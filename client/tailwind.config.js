/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,json}'],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter, sans-serif'
      },
      colors: {
        success: '#0ede6e'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ]
}
