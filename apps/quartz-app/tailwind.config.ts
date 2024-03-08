import type { Config } from "tailwindcss";
/** @type {Config} */
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontWeight: {
      hairline: "100",
      "extra-light": "100",
      thin: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },
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
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1750px",
      "4xl": "1900px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["ui-monospace", ...defaultTheme.fontFamily.mono],
        serif: ["Source Code Pro", ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      colors: {
        amber: {
          DEFAULT: "#FFD053",
          50: "#FFFFFF",
          100: "#FFFDF6",
          200: "#FFF1CD",
          300: "#FFE6A5",
          // 400: "#FFDB7C",
          400: "#FFD053",
          600: "#FFC11B",
          700: "#E2A400",
          800: "#AA7B00",
          900: "#725300",
        },
        "ocf-yellow": {
          DEFAULT: "#FFD053",
          50: "#FFFFFF",
          100: "#FFFDF6",
          200: "#FFF1CD",
          300: "#FFE6A5",
          400: "#FFDB7C",
          500: "#FFD053",
          600: "#FFC11B",
          700: "#E2A400",
          800: "#AA7B00",
          900: "#725300",
        },
        "ocf-dusty-orange": {
          DEFAULT: "#FFAC5F",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFEBD9",
          300: "#FFD6B1",
          400: "#FFC188",
          500: "#FFAC5F",
          600: "#FF8F27",
          700: "#EE7200",
          800: "#B65700",
          900: "#7E3C00",
        },
        // DEFAULT is the brand colour, others are guesstimated shades
        "ocf-orange": {
          DEFAULT: "#FF9736",
          50: "#fff1eb",
          100: "#ffe1d1",
          200: "#ffd5b8",
          300: "#FEBF83",
          400: "#FFC188",
          500: "#ffac69",
          600: "#FF9736",
          700: "#e67c19",
          800: "#e67802",
          900: "#7d4500",
        },
        "ocf-grey": {
          DEFAULT: "#E4E4E4",
          50: "#FFFFFF",
          100: "#F0F0F0",
          200: "#E4E4E4",
          300: "#DDDDDD",
          400: "#909090",
          500: "#6C6C6C",
          600: "#595959",
          700: "#444444",
          800: "#2C2C2C",
          900: "#191A1A",
        },
        "mapbox-black": {
          DEFAULT: "#191a1a",
          300: "#A9A9A9",
          400: "#8c8c8c",
          500: "#6C6C6C",
          600: "#545454",
          700: "#343332",
          900: "#191a1a",
        },
        "ocf-black": {
          DEFAULT: "#14120E",
          50: "#80735A",
          100: "#746851",
          200: "#5C5340",
          300: "#443D30",
          400: "#2C281F",
          500: "#14120E",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        "ocf-blue": {
          DEFAULT: "#48B0DF",
          50: "#E4F3FA",
          100: "#D3ECF7",
          200: "#B0DDF1",
          300: "#8DCEEB",
          400: "#6BBFE5",
          500: "#48B0DF",
          600: "#2497CB",
          700: "#1B749C",
          800: "#13506C",
          900: "#0B2D3C",
        },
        "ocf-green": {
          DEFAULT: "#63BCAF",
          50: "#E3F3F1",
          100: "#D5EDEA",
          200: "#B9E1DB",
          300: "#9CD5CC",
          400: "#80C8BE",
          500: "#63BCAF",
          600: "#45A294",
          700: "#357A70",
          800: "#24534C",
          900: "#132C28",
        },
        "ocf-teal": {
          DEFAULT: "#7BCDF3",
          50: "#F1F9F8",
          100: "#E2F3F0",
          200: "#C6E7E2",
          300: "#A9DAD3",
          400: "#8DCEC5",
          500: "#70C2B6",
          600: "#4BAFA0",
          700: "#3A887C",
          800: "#296158",
          900: "#183934",
        },
        "ocf-delta": {
          DEFAULT: "#6C6C6C",
          100: "#9AA1F9",
          200: "#9EC8FA",
          300: "#70859D",
          400: "#4F5D66",
          500: "#6C6C6C",
          600: "#67643B",
          700: "#9F973A",
          800: "#FCED4F",
          900: "#F19F38",
          950: "#595959",
        },
        "ocf-sites": {
          DEFAULT: "#6C6C6C",
          100: "#444444",
        },
        "quartz-green": {
          DEFAULT: "#49CD8D",
        },
        "quartz-mint-green": {
          DEFAULT: "#B5F5AA",
        },
        "quartz-blue": {
          DEFAULT: "#53D6FF",
        },
      },
    },
  },
  plugins: [],
};
