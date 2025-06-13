/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
     screens: {
      ms:'375px',
      // sm:default
      ml:'425px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      'xl1': '1440px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}