/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,json}'],
  theme: {
    extend: {
      screens: {
        mobile: { min: '300px', max: '1000px' },
        // tablet: { min: '600px', max: '1200px' }
      },
      fontFamily: {
        inter: 'Inter, sans-serif'
      },
      colors: {
        success: '#0EDE6E',
        failed: '#DC2626',
        sats: {
          10: "#4497EE",
          30: "#083C76",
          60: "#F9F9F9",
        }

      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
