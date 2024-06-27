import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)'],
        serif: ['var(--font-libre-baskerville)'],
      },
      colors: {
        red: {
          25: "#fffcfc",
          50: "#fff8f7",
          75: "#ffeae8",
          100: "#ffdbd7",
          200: "#ffcac5",
          300: "#ffb9b3",
          400: "#fca49d",
          500: "#f38982",
          600: "#cb6560",
          700: "#bd5854",
          800: "#b6524e",
          900: "#631f1e",
        },
        tan: {
          default: "#F1EAE4"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
