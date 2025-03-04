import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        fancy:
          "`\r\n  radial-gradient(circle at top left, rgba(88,28,135,0.15), transparent 50%),\r\n  radial-gradient(circle at top right, rgba(192,132,252,0.1), transparent 50%),\r\n  linear-gradient(\r\n    to bottom right,\r\n    rgb(88,28,135), \r\n    rgb(88,28,135), /* Purple-900 */\r\n    rgb(126,34,206) /* Purple-700 */\r\n  )\r\n`",
        "navbar-fancy":
          "`\r\n     linear-gradient(\r\n            to right,\r\n            rgba(46, 16, 74, 0.9),\r\n            rgba(88, 28, 135, 0.9),\r\n            rgba(46, 16, 74, 0.9)\r\n          )\r\n`",
      },
      fontFamily: {
        passion: "var(--font-passion-one)",
        archivo: "var(--font-archivo-black)",
      },
      colors: {
        neonblue: "#00D4FF",
        darkneonblue: "#00A3CC",
        darkerneonblue: "#007A99",
        darkestneonblue: "#005566",
        neonpurple: "#9400D3",
        darkerneonpurple: "#6A0DAD",
        darkneonpurple: "#7A00CC",
        darkneonpink: "#FF69B4",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#5253A3",
            },
          },
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
};

export default config;
