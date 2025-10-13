/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Dejamos nuestras variables de color aquí por si las necesitamos,
      // aunque nuestro theming principal está en globals.css
    },
  },
  plugins: [],
};

export default config;