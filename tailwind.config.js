/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
    },
    fontFamily: {
      main: ["Montserrat", "sans-serif"],
      second: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        text: "var(--text)",
        "text/70": "var(--text-80)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "secondary/20": "var(--secondary-200)",
        destructive: "hsl(var(--destructive))",
        muted: "hsl(var(--muted))",
        accent: "var(--secondary-200)",
        "accent-b": "var(--accent-b)",
        "accent-y": "var(--accent-y)",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "primary-button": "0 20px 50px -5px var(--primary)",
        "form-shadow":
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        footer: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "back-img": "url(./src/assets/images/log-in-back-2.svg)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
