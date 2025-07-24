import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0a0a0f',
        'secondary-bg': '#1a1a2e',
        'accent-main': '#00ffff',
        'accent-sub': '#ff00ff',
        'text-base': '#e0e0e0',
        'text-sub': '#888888',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
        dotgothic: ['DotGothic16', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
