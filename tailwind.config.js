/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        positive: "var(--color-positive)",
        negative: "var(--color-negative)",
        background: "var(--color-background)",
        headertxt: "var(--color-headertxt)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [],
};
