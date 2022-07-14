const defaultTheme = require("tailwindcss/defaultTheme");
const consistentLocalFontForVisualTest = "sans-serif";

// use a local font for visual tests , because downloading a font from the internet is slow and does not always get applied on first load
const fontFamily =
  process.env.NEXT_PUBLIC_ENV_NAME === "test" ? consistentLocalFontForVisualTest : "Inter";

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        sans: [fontFamily, ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "mapbox-black": {
          DEFAULT: "#191a1a",
          300: "#A9A9A9",
          500: "#6C6C6C",
          900: "#191a1a",
        },
        blue: {
          DEFAULT: "#48B0DF",
        },
        danube: {
          DEFAULT: "#468AC9",
          50: "#D4E4F2",
          100: "#C4DAEE",
          200: "#A5C6E5",
          300: "#85B2DB",
          400: "#669ED2",
          500: "#468AC9",
          600: "#316EA6",
          700: "#24517B",
          800: "#17344F",
          900: "#0B1824",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
