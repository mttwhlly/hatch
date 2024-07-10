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
        serif: ['var(--font-stix-two-text)'],
      },
      colors: {
        blue: {
          50: "#F4F6FB",
          100: "#ECF0F9",
          200: "#D5DEF1",
          300: "#BECCE9",
          400: "#7D9AD3",
          500: "#406ABF",
          600: "#2D4A86",
          700: "#233967",
          800: "#162441",
          900: "#0E172A",
          950: "#080D17",
        },
        yellow: {
          50: "#FBF9F4",
          100: "#F7F2E8",
          200: "#ECDFC6",
          300: "#E2CEA7",
          400: "#C09744",
          500: "#82652C",
          600: "#5C471F",
          700: "#453617",
          800: "#2A210E",
          900: "#1F180A",
          950: "#130F06",
        },
        orange: {
          50: "#FCF9F7",
          100: "#F7ECE8",
          200: "#F0D9D1",
          300: "#E8C6BA",
          400: "#CE866E",
          500: "#A45237",
          600: "#733926",
          700: "#582C1D",
          800: "#351B12",
          900: "#26130D",
          950: "#130A06",
        },
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
