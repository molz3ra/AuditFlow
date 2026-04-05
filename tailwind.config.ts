import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // A mágica que faz o botão de Sol/Lua funcionar
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;