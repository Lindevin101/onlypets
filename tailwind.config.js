/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,js,jsx}"],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        olive: {
          500: '#556B2F', // Adjust the hex code to your preferred shade of olive
        },
      },
    },
  },
  plugins: [],
};