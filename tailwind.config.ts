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
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        teko: ['var(--font-teko)', 'sans-serif'],
        dotgothic: ['var(--font-dotgothic)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
