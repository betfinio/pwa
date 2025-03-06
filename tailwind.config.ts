import preset from '@betfinio/components/tailwind-config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [preset],
  important: 'body',
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      colors: {
        sidebar: 'radial-gradient(circle, var(--background) 20%, var(--secondary) 50%);',
      }
    },
  },
};
