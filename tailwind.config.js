module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#007FFF",
          red: "var(--color-bg)",
        },
        secondary: {
          500: "#f5f7f4",
          // 500: "1e1d22",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
