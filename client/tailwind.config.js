/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,json}'],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter, sans-serif'
      },
      colors: {
        success: '#0ede6e',
        'sats-30': '#083c76',
        'sats-10': '#4497ee'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
