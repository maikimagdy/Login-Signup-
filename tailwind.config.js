/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms", // Note: 'duration-2000' is not necessary, use the duration directly
      },
      width: {
        800: "800px",
      },
      height: {
        100: "100vh",
      },
    },
  },
  plugins: [],
};
