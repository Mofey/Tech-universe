import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        exo: ["Exo 2", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
