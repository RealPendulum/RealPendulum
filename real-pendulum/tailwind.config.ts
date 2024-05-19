import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "75vh": "75vh",
      },
      maxWidth: {
        "65vh": "65vh",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".info-text": {
          "@apply text-center text-pretty text-black leading-10 text-xl": "",
          "max-width": "65vh",
        },
      });
    },
  ],
};
export default config;
