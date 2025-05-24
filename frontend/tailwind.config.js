// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      animation: {
        blob: "blob 20s infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "33%": { transform: "translate(-48%, -52%) scale(1.1)" },
          "66%": { transform: "translate(-52%, -48%) scale(0.9)" },
        },
      },
    },
  },
  plugins: [],
}
