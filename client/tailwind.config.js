/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,json}'],
  theme: {
    extend: {
      screens: {
        mobile: { min: '300px', max: '1000px' }
        // tablet: { min: '600px', max: '1200px' }
      },
      fontFamily: {
        inter: 'Inter, sans-serif'
      },
      height: {
        'px-28': '28px',
        'px-30': '30px',
        'px-48': '48px',
        'px-36': '36px',
        'px-42': '42px',
        'px-51': '51px',
        'px-60': '60px',
        'px-90': '90px',
        'px-150': '150px',
        'px-200': '200px',
        'px-225': '225px',
        'px-250': '250px',
        'px-300': '300px',
        'px-342': '342px',
        'px-400': '400px',
        'px-450': '450px',
        'px-500': '500px',
        'px-550': '550px',
        'px-600': '600px',
        'px-650': '650px',
        'px-700': '700px',
        'px-750': '750px'
      },
      width: {
        'px-90': '90px',
        'px-102': '102px',
        'px-111': '111px',
        'px-114': '114px',
        'px-160': '160px',
        'px-162': '162px',
        'px-170': '170px',
        'px-210': '210px',
        'px-240': '240px',
        'px-300': '300px',
        'px-342': '342px',
        'px-400': '400px',
        'px-450': '450px',
        'px-500': '500px',
        'px-550': '550px',
        'px-600': '600px',
        'px-650': '650px',
        'px-700': '700px',
        'px-750': '750px'
      },
      colors: {
        success: '#0EDE6E',
        failed: '#DC2626',
        sats: {
          10: '#4497EE',
          30: '#083C76',
          60: '#F9F9F9'
        }
      },
      screens: {
        tablet: { min: '600px', max: '1200px' },
        // => @media (min-width: 640px) { ... }

        mobile: { min: '300px', max: '599px' }
        // => @media (min-width: 768px) { ... }
      },
      container: {
        center: true
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
