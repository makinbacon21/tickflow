import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
        fontFamily: {
            sans: ["var(--font-base)"],
        },
        colors: {
            primary: "#31425f",
            "page-bg": "#d1d1d1",
            "card-bg": "#f1f1f1",
            accent: "#f46523",
            "alt-blue": "#364a6d",
            "dark-blue": "#161e2c",
        },
        screens: {
            'xs': '0px',
        },
    }
  },
  plugins: [],
}
export default config
