import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213d",
        sand: "#f6f3ea",
        coral: "#ef7c5d",
        mint: "#5fb49c",
        gold: "#f2c14e"
      },
      boxShadow: {
        card: "0 16px 40px rgba(20, 33, 61, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
