/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackMode: {
          900: "#000000", // Preto puro
          800: "#0A0A0A", // Preto suave
          700: "#121212", // Preto carvão
          600: "#1C1C1C", // Cinza escuro
          500: "#2A2A2A", // Cinza médio
          400: "#3D3D3D", // Cinza claro
        },
        gold: {
          900: "#FFD700", // Dourado puro
          800: "#FFC300", // Dourado mais suave
          700: "#FFB000", // Tom quente de dourado
        },
        white: "#FFFFFF", // Branco para contraste
      },
    },
  },
  plugins: [],
}