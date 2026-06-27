import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAF1E8",
        surface: "#FEFAF5",
        border: "#DCD0BC",
        text: "#161616",
        soft: "#6E6557",
        indigo: "#3B43F0",
      },
      fontFamily: {
        sans: ["Zen Kaku Gothic New", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
