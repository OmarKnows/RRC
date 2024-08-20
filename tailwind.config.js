/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#F59E0B",
        tertiary: "#22C55E",
        destructive: "#DC2626",
      },
    },
  },
  plugins: [],
};
